import { Module } from '@nestjs/common';
import { EasyWhatsAppModule } from './easy-whatsapp.module';
import { BrowserModule } from './browser.module';
import { AnalyserService } from 'src/services/analyser.service';

@Module({
  imports: [EasyWhatsAppModule, BrowserModule],
  providers: [AnalyserService],
  exports: [AnalyserService],
})
export class AnalyserModule {}
