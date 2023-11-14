import type { Browser } from 'puppeteer';
import { Injectable } from '@nestjs/common';
import { InjectBrowser } from 'nest-puppeteer';

@Injectable()
export class BrowserService {
  constructor(@InjectBrowser() private readonly browser: Browser) {}

  async getPrice(url: string, selector: string) {
    const page = await this.browser.newPage();
    await page.goto(url);

    await page.waitForXPath(selector);

    const xPath = await page.$x(selector);

    const value = await page.evaluate((price) => price.textContent, xPath[0]);

    return value;
  }
}
