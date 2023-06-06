import axios from "axios";
import "dotenv/config";

export class WhatsApp {
    static async sendMessage(message) {
        const headers = {
            Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
        };

        const data = {
            id: process.env.PHONE,
            message: message,
        };

        try {
            axios.post(process.env.WHATSAPP_API, data, {
                headers,
            });
        } catch (error) {
            console.log(error);
        }
    }
}
