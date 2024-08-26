import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { config } from "./config/config";
import { Contact, Email, Phone, Web } from "./type/contact";
import { Requisite } from "./type/requisite";
import { Address } from "./type/address";
import { Bankdetail } from "./type/bankdetail";

dotenv.config();

const app = express();
const port = process.env.PORT || 3030;

config(app).then(() => {
  console.log("Config successfully.");
});

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "ok" });
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
