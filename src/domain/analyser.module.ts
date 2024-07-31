import { Module } from '@nestjs/common';
import { OpenAIModule } from 'src/libs/openai/openai.module';
import { PuppeteerModule } from 'src/libs/puppeteer/puppeteer.module';
import { AnalyzerService } from './analyser.service';

@Module({
  imports: [OpenAIModule, PuppeteerModule],
  providers: [AnalyzerService],
  exports: [AnalyzerService],
})
export class AnalyserModule {}