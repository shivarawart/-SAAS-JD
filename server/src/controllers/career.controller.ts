import type { Context } from "hono";

import { logger } from "../config/logger";

import { CareerService } from "./career.service";

export class CareerController {
  private service: CareerService;

  constructor() {
    this.service = new CareerService();
  }

  /**
   * POST /career/analyze
   */
  async analyze(c: Context) {
    try {
      const body = await c.req.json();

      const input = body?.input;

      /**
       * Lightweight validation
       */
      if (!input || typeof input !== "string") {
        return c.json(
          {
            success: false,
            error: "Input is required",
          },
          400
        );
      }

      logger.info({
        message: "Career analysis request received",
      });

      const result =
        await this.service.analyzeCareer(input);

      return c.json({
        success: true,
        data: result,
      });
    } catch (err: any) {
      logger.error({
        message: "CareerController failed",
        error: err?.message || err,
      });

      return c.json(
        {
          success: false,
          error: "Internal Server Error",
        },
        500
      );
    }
  }
}