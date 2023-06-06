import getPrice from "./helpers/puppeteer.js";
import { WhatsApp } from "./helpers/whatsapp.js";

export class Application {
    constructor() {
        this.price = 0;
        this.oldPrice = 0;
    }

    async start(callback) {
        callback();

        await this.getPrice();
        setInterval(async () => {
            await this.getPrice();
            this.verifyPrice();
        }, 10000);
    }

    async getPrice() {
        const price = await getPrice();
        this.oldPrice = this.price;
        this.price = price;
    }

    async verifyPrice() {
        if (this.oldPrice !== this.price) {
            console.log("Preço alterado!");
            WhatsApp.sendMessage(
                `O preço do seu produto foi alterado para ${this.price} (Valor antigo: ${this.oldPrice}))`
            );
        }
    }
}
