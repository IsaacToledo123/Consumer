import "./load-env-vars";
import { receiveNotification } from "./rabitQues";
import bodyParser from "body-parser";
import express from "express";

import { config } from "./config";


function boostrap() {
  const app = express();
receiveNotification()
  app.use(bodyParser.json());

  const { port } = config.server;

  app.listen(port, () => {
    console.log(`[APP] - Starting application on port ${port}`);
  });
}

boostrap();
