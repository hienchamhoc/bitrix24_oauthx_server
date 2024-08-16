import { Router } from "express";
import { getToken } from "../controller/oauth2";

export const router = Router();

router.get("/token/", getToken);
