import { Injectable } from '@nestjs/common'
import puppeteer, { Browser } from 'puppeteer'

@Injectable()
export class PuppeteerService {
  private browser: Browser

  async initBrowser() {
    this.browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox'],
    })
  }

  async getScreenshot(url: string): Promise<string> {
    if (!this.browser) {
      await this.initBrowser()
    }

    const page = await this.browser.newPage()
    await page.setViewport({ width: 1920, height: 1080 })

    await page.goto(url)

    const screenshot = await page.screenshot()

    await this.closeBrowser()

    return screenshot.toString('base64')
  }

  async closeBrowser() {
    await this.browser.close()
    this.browser = null
  }
}
