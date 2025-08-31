// src/server.ts
import "reflect-metadata";
import express from "express";
import { useExpressServer, useContainer } from "routing-controllers";
import { Container } from "typedi";
import { UserController } from "./controller/user.controller.js";
import { AuthenticateController } from "./controller/authenticate.controller.js";
useContainer(Container);
const app = express();
useExpressServer(app, {
    controllers: [UserController, AuthenticateController],
});
app.listen(3000, "0.0.0.0", () => {
    console.log("🚀 Server running at http://localhost:3000");
});
//# sourceMappingURL=server.js.map