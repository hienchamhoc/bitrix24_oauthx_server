import { Router } from "express";
import { router } from "../router";
import bodyParser from "body-parser";
import cors from "cors";
import { initAxios } from "../api/axios";

const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  // preflightContinue: false,
  // optionsSuccessStatus: 204,
};

export async function config(app: Router) {
  await app.use(cors(corsOptions));
  await app.use(bodyParser.json());
  await app.use("/api", router);
  await initAxios();
}
