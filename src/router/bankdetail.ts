import { Router } from "express";
import { checkToken } from "../helper/writeFile";
import { delelteBankdetail } from "../controller/bankdetail";

export const router = Router();

router.delete("/delete", checkToken, delelteBankdetail);
