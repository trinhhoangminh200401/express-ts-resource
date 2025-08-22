// src/server.ts
import "reflect-metadata";
import express from "express";
import { useExpressServer, useContainer } from "routing-controllers";
import { Container } from "typedi";
import { UserController } from "./controller/user.controller.js";
useContainer(Container);
const app = express();
app.use(express.json());
useExpressServer(app, {
    controllers: [UserController]
});
app.listen(3000, () => {
    console.log("🚀 Server running at http://localhost:3000");
});
//# sourceMappingURL=server.js.map