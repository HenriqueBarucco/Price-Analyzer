import { Module } from '@nestjs/common';
import { PuppeteerModule } from 'nest-puppeteer';
import { BrowserService } from 'src/services/browser.service';

@Module({
  imports: [PuppeteerModule.forRoot()],
  providers: [BrowserService],
  exports: [BrowserService],
})
export class BrowserModule {}
