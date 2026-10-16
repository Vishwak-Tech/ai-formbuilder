
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "./schema";

function createDb() {
  const databaseUrl = process.env.NEXT_PUBLIC_DATABASE_URL_CONFIG;

  if (!databaseUrl) {
    throw new Error("Database connection string is not configured");
  }

  const sql = neon(databaseUrl);
  return drizzle(sql, { schema });
}

let dbInstance;

export function getDb() {
  if (!dbInstance) {
    dbInstance = createDb();
  }

  return dbInstance;
}

// Backward-compatible lazy database proxy for existing imports.
export const db = new Proxy(
  {},
  {
    get(_target, property) {
      const database = getDb();
      const value = Reflect.get(database, property, database);

      return typeof value === "function" ? value.bind(database) : value;
    },
  }
);
