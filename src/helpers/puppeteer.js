import puppeteer from "puppeteer";
import "dotenv/config";

export default async function getPrice() {
    const browser = await puppeteer.launch({
        headless: "new",
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();

    await page.goto(process.env.URL);

    let valor = await page.waitForXPath(
        '//*[@id="blocoValores"]/div[2]/div[1]/h4',
        { timeout: 60000 }
    );

    valor = await valor.evaluate((node) => node.innerText);

    await browser.close();

    return valor;
}
