import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class EasyWhatsAppService {
  constructor(private readonly httpService: HttpService) {}

  private readonly logger = new Logger(EasyWhatsAppService.name);

  sendMessage(message: string, phone: string) {
    this.httpService
      .post(`https://easy-whatsapp-api.henriquebarucco.com.br/message/text`, {
        token: process.env.EASY_WHATSAPP_TOKEN,
        message: message,
        phone: phone,
      })
      .subscribe((response) => {
        if (response.status === 201) {
          this.logger.log('Message sent successfully');
        } else {
          this.logger.error('Error sending message');
        }
      });
  }
}
