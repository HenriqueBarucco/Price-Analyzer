import { Injectable } from '@nestjs/common'
import puppeteer from 'puppeteer-core'

@Injectable()
export class PuppeteerService {
  async getScreenshot({ url }: { url: string }): Promise<string> {
    try {
      const browser = await puppeteer.connect({
        browserWSEndpoint: process.env.BROWSER_WS_ENDPOINT,
      })

      const page = await browser.newPage()

      await page.setViewport({ width: 1920, height: 1080 })

      await page.goto(url, { waitUntil: 'load' })

      const screenshot = await page.screenshot()

      await browser.close()

      return screenshot.toString('base64')
    } catch (error) {
      console.error(error)
      throw error
    }
  }
}
