import axios from "axios";
import cheerio from "cheerio";

export default async function getPrice() {
    try {
        const response = await axios.get(process.env.URL, {
            headers: {
                "User-Agent":
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
            },
        });

        const $ = cheerio.load(response.data);
        const valor = $(
            "#blocoValores > div:nth-child(2) > div:nth-child(1) > h4"
        ).text();

        return valor;
    } catch (error) {
        console.error("Erro ao obter o preço:", error);
        throw error;
    }
}
