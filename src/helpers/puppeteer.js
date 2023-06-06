import puppeteer from "puppeteer";

export default async function getPrice() {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();

    await page.goto(process.env.URL);

    let valor = await page.waitForXPath(
        '//*[@id="blocoValores"]/div[2]/div[1]/h4'
    );

    valor = await valor.evaluate((node) => node.innerText);

    await browser.close();

    return valor;
}
