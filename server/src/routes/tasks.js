import { Router } from "express";
import Task from "../models/Task.js";

const router = Router();

router.get("/", async (request, response, next) => {
  try {
    const tasks = await Task.find()
      .populate("project", "name")
      .sort({ updatedAt: -1 })
      .lean();
    response.json(tasks);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (request, response, next) => {
  try {
    const task = await Task.create(request.body);
    response.status(201).json(task);
  } catch (error) {
    next(error);
  }
});

export default router;
