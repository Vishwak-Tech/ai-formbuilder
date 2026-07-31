import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle',
  schema: "./configs/schema.js",
  dialect: 'postgresql',
  dbCredentials: {
    url: "postgresql://neondb_owner:npg_GUZvg1WjxA5K@ep-fragrant-scene-azhsfv93-pooler.c-3.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require",
  },
});
