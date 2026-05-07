import { Hono } from "hono";
import { JDController } from "../controllers/jd.controller";

export const jdRoutes = new Hono();

const controller = new JDController();

/**
 * POST /api/v1/jd/analyze
 * Pure routing layer
 */
jdRoutes.post("/analyze", (c) => controller.analyze(c));