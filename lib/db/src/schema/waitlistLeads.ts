import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const waitlistLeadsTable = pgTable("waitlist_leads", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  email: text("email").notNull().unique(),
  canton: text("canton").notNull(),
  situation: text("situation").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertWaitlistLeadSchema = createInsertSchema(waitlistLeadsTable).omit({
  id: true,
  createdAt: true,
});
export type InsertWaitlistLead = z.infer<typeof insertWaitlistLeadSchema>;
export type WaitlistLead = typeof waitlistLeadsTable.$inferSelect;
