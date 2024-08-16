import express, { Router } from "express";
import { router as oauth2Router } from "./oauth2";

export const router = Router();

router.use("/oauth", oauth2Router);
