import { Router } from "express";
import { router } from "../router";
import bodyParser from "body-parser";
import cors from "cors";
import { initAxios } from "../api/axios";

const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
  exposedHeaders: "token",
};

export async function config(app: Router) {
  await initAxios();
  await app.use(cors(corsOptions));
  await app.use(bodyParser.json());
  await app.use("/api", router);
}
