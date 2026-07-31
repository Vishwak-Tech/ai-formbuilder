import { pgTable, serial, varchar, text, timestamp } from "drizzle-orm/pg-core";

export const forms = pgTable("forms", {
  id: serial("id").primaryKey(),
//   title: varchar("title", { length: 255 }).notNull(),
//   description: text("description"),
  jsonForm: text("json_form").notNull(),
  createdBy: varchar("created_by", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
