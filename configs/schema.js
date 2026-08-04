import {
  pgTable,
  serial,
  varchar,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const forms = pgTable("forms", {
  id: serial("id").primaryKey(),

  formTitle: varchar("form_title", { length: 255 }).notNull(),

  jsonForm: text("json_form").notNull(),

  theme: varchar("theme", { length: 100 }).default("light"),
  background: varchar("background", { length: 100 }).default("none"),
  style: varchar("style", { length: 100 }).default("neobrutalism"),

  createdBy: varchar("created_by", { length: 255 }).notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
});