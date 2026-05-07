import type { Context } from "hono";
import { JDService } from "../services/jd.service";
import { JDRequestSchema } from "../schemas/jd.schema";
import { logger } from "../config/logger";

export class JDController {
  private service = new JDService();

  /**
   * 🧠 Controller layer (clean + safe + production-ready)
   */
  async analyze(c: Context) {
    try {
      let body: any;

      /**
       * 🚨 SAFE JSON PARSE
       */
      try {
        body = await c.req.json();
      } catch (err) {
        logger.error({
          message: "Invalid JSON body",
          error: err,
        });

        return c.json(
          {
            success: false,
            error: "Invalid JSON body",
          },
          400
        );
      }

      /**
       * 🧠 Validate input schema
       */
      const parsed = JDRequestSchema.safeParse(body);

      if (!parsed.success) {
        logger.error({
          message: "Validation failed",
          error: parsed.error.flatten(),
        });

        return c.json(
          {
            success: false,
            error: parsed.error.flatten(),
          },
          400
        );
      }

      logger.info({
        message: "JD analysis request received",
        length: parsed.data.job_description?.length,
      });

      /**
       * 🚀 SERVICE CALL
       */
      const result = await this.service.analyze(
        parsed.data.job_description
      );

      /**
       * ✅ SUCCESS RESPONSE
       */
      return c.json({
        success: true,
        data: result,
      });
    } catch (err: any) {
      logger.error({
        message: "Controller crashed",
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