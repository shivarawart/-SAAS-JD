import app from "./index";
import { logger } from "./config/logger";

/**
 * Bun server entrypoint
 * This is what actually runs in production
 */
const PORT = 3000;

logger.info(`🚀 Server starting on port ${PORT}`);

Bun.serve({
  port: 3000,
  fetch: app.fetch,
});