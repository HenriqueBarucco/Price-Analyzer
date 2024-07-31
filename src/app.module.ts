import { Module } from '@nestjs/common'
import { RabbitMqModule } from './entrypoint/rabbitmq/rabbitmq.module'
import { AnalyserModule } from './domain/analyser.module'
import { PuppeteerModule } from './libs/puppeteer/puppeteer.module'
import { OpenAIModule } from './libs/openai/openai.module'

@Module({
  imports: [RabbitMqModule, AnalyserModule, PuppeteerModule, OpenAIModule],
})
export class AppModule {}
