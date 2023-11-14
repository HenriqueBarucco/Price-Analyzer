import { Module } from '@nestjs/common';
import { BrowserService } from 'src/services/browser.service';

@Module({
  providers: [BrowserService],
  exports: [BrowserService],
})
export class BrowserModule {}
