import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { EasyWhatsAppService } from 'src/services/easy-whatsapp.service';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  providers: [EasyWhatsAppService],
  exports: [EasyWhatsAppService],
})
export class EasyWhatsAppModule {}
