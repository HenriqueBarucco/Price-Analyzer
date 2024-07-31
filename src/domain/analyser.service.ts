import { forwardRef, Inject, Injectable, Logger } from '@nestjs/common'
import { RabbitMQService } from 'src/entrypoint/rabbitmq/rabbitmq.service'
import { OpenAIService } from 'src/libs/openai/openai.service'
import { PuppeteerService } from 'src/libs/puppeteer/puppeteer.service'

Injectable()
export class AnalyzerService {
  private readonly logger = new Logger(AnalyzerService.name)

  constructor(
    @Inject(PuppeteerService)
    private readonly puppeteerService: PuppeteerService,
    private readonly openAiService: OpenAIService,
    @Inject(forwardRef(() => RabbitMQService))
    private readonly rabbitMQService: RabbitMQService,
  ) {}

  async process({ id, url }: { id: string; url: string }) {
    const screenshot = await this.puppeteerService.getScreenshot({ url })

    const value = await this.openAiService.getValue(screenshot)

    if (!value) {
      this.logger.warn(`Product ${id} not processed!`)
      return
    }

    this.rabbitMQService.sendMessage(process.env.RABBITMQ_PROCESSED_QUEUE, {
      id,
      value,
    })
  }
}
