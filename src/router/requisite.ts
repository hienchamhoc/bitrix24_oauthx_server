import { Router } from "express";
import { checkToken } from "../helper/writeFile";
import { deleteRequisite } from "../controller/requisite";

export const router = Router();

router.post("/delete", checkToken, deleteRequisite);
