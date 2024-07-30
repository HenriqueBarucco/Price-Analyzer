import { Module } from '@nestjs/common'
import { BrowserModule } from './browser.module'

@Module({
  imports: [BrowserModule],
})
export class AnalyserModule {}
