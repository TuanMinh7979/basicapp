import express from "express";
import {
  getAllCategory,
  createCategory,
} from "../controllers/categoryController.js";
const router = express.Router();

//getAll: Home,...
router.get("/", getAllCategory);

//create: ADMIN
router.post("/", createCategory);

export default router;