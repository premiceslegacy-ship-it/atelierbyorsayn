import express from "express";
import compression from "compression";
import { join } from "node:path";

const app = express();
const root = join(process.cwd(), "build/client");
const portFlag = process.argv.indexOf("--port");
const hostFlag = process.argv.indexOf("--host");
const port = portFlag >= 0 ? Number(process.argv[portFlag + 1]) : 4173;
const host = hostFlag >= 0 ? process.argv[hostFlag + 1] : "127.0.0.1";

app.use(compression());
app.use(express.static(root, { extensions: ["html"], redirect: true }));
app.use((_, response) => response.sendFile(join(root, "__spa-fallback.html")));
app.listen(port, host, () => console.log(`Atelier preview: http://${host}:${port}`));
