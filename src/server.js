import getPrice from "./helpers/scrappy.js";
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
            console.log({ price: this.price });
            this.verifyPrice();
        }, 300000);
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
