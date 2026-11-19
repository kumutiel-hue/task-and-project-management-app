import { Router } from "express";
import Project from "../models/Project.js";

const router = Router();

router.get("/", async (request, response, next) => {
  try {
    const projects = await Project.find().sort({ updatedAt: -1 }).lean();
    response.json(projects);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (request, response, next) => {
  try {
    const project = await Project.create(request.body);
    response.status(201).json(project);
  } catch (error) {
    next(error);
  }
});

export default router;
