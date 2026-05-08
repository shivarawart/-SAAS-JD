import { Hono } from "hono";

import { CareerController } from "../controllers/career.controller";

const careerRoutes = new Hono();

const controller = new CareerController();

/**
 * Career Intelligence Routes
 */
careerRoutes.post(
  "/analyze",
  (c) => controller.analyze(c)
);

export { careerRoutes };