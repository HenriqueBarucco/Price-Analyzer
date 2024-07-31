import { forwardRef, Module } from '@nestjs/common'
import { OpenAIModule } from 'src/libs/openai/openai.module'
import { PuppeteerModule } from 'src/libs/puppeteer/puppeteer.module'
import { AnalyzerService } from './analyser.service'
import { RabbitMqModule } from 'src/entrypoint/rabbitmq/rabbitmq.module'

@Module({
  imports: [PuppeteerModule, OpenAIModule, forwardRef(() => RabbitMqModule)],
  providers: [AnalyzerService],
  exports: [AnalyzerService],
})
export class AnalyserModule {}
