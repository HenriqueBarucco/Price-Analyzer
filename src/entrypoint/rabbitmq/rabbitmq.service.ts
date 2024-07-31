import {
  forwardRef,
  Inject,
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common'
import * as amqp from 'amqplib'
import { AnalyzerService } from 'src/domain/analyser.service'

@Injectable()
export class RabbitMQService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(RabbitMQService.name)

  constructor(
    @Inject(forwardRef(() => AnalyzerService))
    private readonly analyzerService: AnalyzerService,
  ) {}

  private connection: amqp.Connection
  private channel: amqp.Channel

  async onModuleInit() {
    await this.connect()
    await this.consume()
  }

  async onModuleDestroy() {
    await this.channel.close()
    await this.connection.close()
  }

  private async connect() {
    this.connection = await amqp.connect(process.env.RABBITMQ_URL)
    this.channel = await this.connection.createChannel()
    await this.channel.assertQueue(process.env.RABBITMQ_PROCESS_QUEUE, {
      durable: true,
    })
    this.channel.prefetch(1)
  }

  async consume() {
    await this.channel.consume(
      process.env.RABBIT_MQ_PROCESS_QUEUE,
      async (msg) => {
        if (msg !== null) {
          const content = msg.content.toString()
          const product = JSON.parse(content) as { id: string; url: string }

          this.logger.log(`Processing product ${product.id}...`)
          await this.analyzerService.process(product)

          this.channel.ack(msg)
        }
      },
    )
  }

  async sendMessage(
    routingKey: string,
    message: { id: string; value: number },
  ) {
    const msgBuffer = Buffer.from(JSON.stringify(message))

    this.channel.publish(process.env.RABBITMQ_EXCHANGE, routingKey, msgBuffer, {
      persistent: true,
    })
  }
}
