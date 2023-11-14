import { Module } from '@nestjs/common';
import { PuppeteerModule } from 'nest-puppeteer';

@Module({
  imports: [PuppeteerModule.forRoot()],
})
export class BrowserModule {}
