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
    this.connection = await amqp.connect('amqp://localhost:5672')
    this.channel = await this.connection.createChannel()
    await this.channel.assertQueue('product-process', { durable: true })
    this.channel.prefetch(1)
  }

  async consume() {
    await this.channel.consume('product-process', async (msg) => {
      if (msg !== null) {
        const content = msg.content.toString()
        const product = JSON.parse(content) as { id: string; url: string }

        this.logger.log(`Processing product ${product.id}...`)
        await this.analyzerService.process(product)
        this.logger.log(`Product ${product.id} processed!`)

        this.channel.ack(msg)
      }
    })
  }

  async sendMessage(
    routingKey: string,
    message: { id: string; value: number },
  ) {
    const msgBuffer = Buffer.from(JSON.stringify(message))

    this.channel.publish('baxo-exchange', routingKey, msgBuffer, {
      persistent: true,
    })
  }
}
