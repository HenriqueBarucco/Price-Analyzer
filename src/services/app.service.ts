import { Injectable } from '@nestjs/common';
import { BrowserService } from './browser.service';
import { Product } from 'src/types/Product';

@Injectable()
export class AppService {
  constructor(private browserService: BrowserService) {}

  async getHello(): Promise<Product> {
    const price = await this.browserService.getPrice(
      'https://benchpromos.com/notebooks/notebook-samsung-galaxy-book3-360-windows-11-home-intel-core-i71360p-16gb-1-tb-ssd-156-full-hd-amoled-146-kg-grafite',
      '/html/body/div/div/main/section[1]/div/div/div[2]/div/div/p[2]/strong',
    );

    const product: Product = {
      name: 'Samsung Galaxy Book3 360',
      price,
      website: 'BenchPromos',
    };

    return product;
  }
}
