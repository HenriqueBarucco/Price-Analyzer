import { Application } from "./src/server.js";
import "dotenv/config";

const app = new Application();

app.start(() => {
    console.log("Aplicação iniciada!");
});
