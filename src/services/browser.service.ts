import type { Browser } from 'puppeteer';
import { Injectable } from '@nestjs/common';
import puppeteer from 'puppeteer';

@Injectable()
export class BrowserService {
  constructor() {
    this.browser = null;
  }

  private browser: Browser;

  async initBrowser() {
    this.browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox'],
    });
  }

  async getPrice(url: string, selector: string) {
    if (!this.browser) {
      await this.initBrowser();
    }

    const page = await this.browser.newPage();
    await page.goto(url);

    await page.waitForXPath(selector);

    const xPath = await page.$x(selector);

    const value = await page.evaluate((price) => price.textContent, xPath[0]);

    await this.closeBrowser();

    return value;
  }

  async closeBrowser() {
    await this.browser.close();
    this.browser = null;
  }
}
