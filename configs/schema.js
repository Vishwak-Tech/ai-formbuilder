import {
  pgTable,
  boolean,
  serial,
  varchar,
  text,
  timestamp,
  integer,
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

export const formResponses = pgTable("form_responses", {
  id: serial("id").primaryKey(),

  formRef: integer("form_ref")
    .references(() => forms.id)
    .notNull(),

  userEmail: varchar("user_email", { length: 255 }),
  jsonResponse: text("json_response").notNull(),

  submittedAt: timestamp("submitted_at").defaultNow(),
});

export const subscriptions = pgTable("subscriptions", {
  id: serial("id").primaryKey(),

  clerkUserId: varchar("clerk_user_id", { length: 255 }).notNull(),

  email: varchar("email", { length: 255 }).notNull(),

  plan: varchar("plan", { length: 20 }).default("PRO").notNull(),

  billingCycle: varchar("billing_cycle", { length: 20 }).notNull(),

  status: varchar("status", { length: 20 }).default("ACTIVE").notNull(),

  razorpayOrderId: varchar("razorpay_order_id", {
    length: 255,
  }).notNull(),

  razorpayPaymentId: varchar("razorpay_payment_id", {
    length: 255,
  }).notNull(),

  startDate: timestamp("start_date").defaultNow(),

  expiryDate: timestamp("expiry_date").notNull(),

  isActive: boolean("is_active").default(true),

  createdAt: timestamp("created_at").defaultNow(),
});