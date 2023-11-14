import { Controller, Get } from '@nestjs/common';
import { AppService } from 'src/services/app.service';
import { Product } from 'src/types/Product';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(): Promise<Product> {
    return await this.appService.getHello();
  }
}
