import { Inject, Injectable } from '@nestjs/common'
import { OpenAIService } from 'src/libs/openai/openai.service'
import { PuppeteerService } from 'src/libs/puppeteer/puppeteer.service'

Injectable()
export class AnalyzerService {
  constructor(
    @Inject(PuppeteerService)
    private readonly puppeteerService: PuppeteerService,
    private readonly openAiService: OpenAIService,
  ) {}

  async process({ id, url }: { id: string; url: string }) {
    console.log(`Processing product ${id}`)
    const screenshot = await this.puppeteerService.getScreenshot({ url })

    const price = await this.openAiService.getPrice(screenshot)

    const productProcessed = {
      id,
      price,
    }

    console.log(productProcessed)
  }
}
