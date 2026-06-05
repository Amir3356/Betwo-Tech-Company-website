import session from "express-session";
import pgSession from "connect-pg-simple";

export default function createSessionMiddleware(pool) {
  const PgStore = pgSession(session);

  return session({
    store: new PgStore({ pool, createTableIfMissing: true, ttl: 24 * 60 * 60 }),
    secret: process.env.SESSION_SECRET || "dev-secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    },
  });
}
