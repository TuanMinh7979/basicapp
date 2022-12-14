import express from "express";
import jwt from "jsonwebtoken";
const { verify } = jwt;
import { getJobs, getJobAppliedCandidates, getAllAppliedCandidates } from "../controllers/hrController.js";
import { checkAdmin, checkToken, checkUser } from "../utils/checkToken.js";

const router = express.Router();
router.use(checkToken);
router.get("/:id/job/:jobPostId/appliedcandidates", checkUser, getJobAppliedCandidates);
router.get("/:id/allappliedcandidates", checkUser, getAllAppliedCandidates);
router.get("/:id/jobs", checkUser, getJobs);

export default router;
