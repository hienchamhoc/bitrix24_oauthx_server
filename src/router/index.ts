import express, { Router } from "express";
import { router as oauth2Router } from "./oauth2";
import { router as contactRouter } from "./contact";
import { router as requisiteRouter } from "./requisite";
import { router as addressRouter } from "./address";
import { router as bankdetailRouter } from "./bankdetail";

export const router = Router();

router.use("/oauth", oauth2Router);
router.use("/contact", contactRouter);
router.use("/requisite", requisiteRouter);
router.use("/address", addressRouter);
router.use("/bankdetail", bankdetailRouter);
