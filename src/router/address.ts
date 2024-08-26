import { Router } from "express";
import { checkToken } from "../helper/writeFile";
import { delelteAddress } from "../controller/address";

export const router = Router();

router.post("/delete", checkToken, delelteAddress);
