import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import * as amqp from 'amqplib'
import { AnalyzerService } from 'src/domain/analyser.service'

@Injectable()
export class RabbitMQService implements OnModuleInit, OnModuleDestroy {
  constructor(private readonly analyzerService: AnalyzerService) {}

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

        await this.analyzerService.process(product)

        this.channel.ack(msg)
      }
    })
  }
}
