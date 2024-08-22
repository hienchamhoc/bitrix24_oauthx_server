import { Router } from "express";
import { checkToken } from "../helper/writeFile";
import { deleteRequisite } from "../controller/requisite";

export const router = Router();

router.delete("/delete", checkToken, deleteRequisite);
