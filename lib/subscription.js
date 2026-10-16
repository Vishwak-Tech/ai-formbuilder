import { getDb } from "@/configs";
import { subscriptions } from "@/configs/schema";
import { eq, and, gt } from "drizzle-orm";

export async function getUserSubscription(clerkUserId) {
  const db = getDb();

  const subscription = await db.query.subscriptions.findFirst({
    where: and(
      eq(subscriptions.clerkUserId, clerkUserId),
      eq(subscriptions.status, "ACTIVE"),
      eq(subscriptions.isActive, true),
      gt(subscriptions.expiryDate, new Date())
    ),
  });

  return subscription;
}

export async function isProUser(clerkUserId) {
  const subscription = await getUserSubscription(clerkUserId);

  return !!subscription;
}
