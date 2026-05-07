import { Hono } from "hono";
import { jdRoutes } from "./routes/jd.routes";
import { logger } from "./config/logger";

const app = new Hono();

/**
 * =====================================
 * GLOBAL MIDDLEWARE (Request Logger)
 * =====================================
 */
app.use("*", async (c, next) => {
  const start = Date.now();

  try {
    await next();
  } finally {
    const ms = Date.now() - start;

    logger.info(
      `${c.req.method} ${c.req.url} - ${c.res.status} - ${ms}ms`
    );
  }
});

/**
 * =====================================
 * CORS MIDDLEWARE (IMPORTANT FIX)
 * =====================================
 */
app.use("*", async (c, next) => {
  c.header("Access-Control-Allow-Origin", "*");
  c.header("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  c.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (c.req.method === "OPTIONS") {
    return c.text("");
  }

  await next();
});

/**
 * =====================================
 * HEALTH CHECK
 * =====================================
 */
app.get("/", (c) => {
  return c.json({
    success: true,
    message: "JD Intelligence API is running 🚀",
  });
});

/**
 * =====================================
 * API ROUTES
 * =====================================
 */
app.route("/api/v1/jd", jdRoutes);

/**
 * =====================================
 * GLOBAL ERROR HANDLER (IMPORTANT)
 * =====================================
 */
app.onError((err, c) => {
  logger.error(err);

  return c.json(
    {
      success: false,
      error: "Internal Server Error",
    },
    500
  );
});

export default app;