import { Router } from "express";
import { checkToken } from "../helper/writeFile";
import {
  addContact,
  deleteContact,
  getContact,
  getListContact,
  updateContact,
} from "../controller/contact";

export const router = Router();

router.get("/", checkToken, getListContact);
router.get("/get", checkToken, getContact);
router.post("/add", checkToken, addContact);
router.put("/update", checkToken, updateContact);
router.post("/delete", checkToken, deleteContact);
