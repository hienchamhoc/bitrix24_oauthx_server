import { Router } from "express";
import { getToken, renewToken } from "../controller/oauth2";

export const router = Router();

router.get("/token/", getToken);
router.get("/token/renew", renewToken);
