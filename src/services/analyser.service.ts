import { Injectable, Logger } from '@nestjs/common';
import { BrowserService } from './browser.service';
import { Product } from 'src/types/Product';
import { EasyWhatsAppService } from './easy-whatsapp.service';

@Injectable()
export class AnalyserService {
  constructor(
    private browserService: BrowserService,
    private easyWhats: EasyWhatsAppService,
  ) {}

  private readonly logger = new Logger(AnalyserService.name);

  analyser() {
    this.logger.log('Calling Price-Analyzer API');

    sites.forEach(async (site) => {
      this.logger.log(`Website: ${site.name}`);

      const price = await this.browserService.getPrice(site.url, site.xPath);

      const product: Product = {
        name: site.product,
        price,
        website: site.name,
      };

      this.easyWhats.sendMessage(
        `O valor do ${product.name} está ${product.price} em ${product.website}`,
        process.env.PHONE_NUMBER,
      );

      this.logger.log(`Price for ${site.product} in ${site.name}: ${price}`);
    });
  }
}

const sites = [
  {
    name: 'BenchPromos',
    product: 'Samsung Galaxy Book3 360',
    url: 'https://benchpromos.com/notebooks/notebook-samsung-galaxy-book3-360-windows-11-home-intel-core-i71360p-16gb-1-tb-ssd-156-full-hd-amoled-146-kg-grafite',
    xPath:
      '/html/body/div/div/main/section[1]/div/div/div[2]/div/div/p[2]/strong',
  },
];
