import { Router, type IRouter } from "express";
import { eq } from "drizzle-orm";
import { db, waitlistLeadsTable } from "@workspace/db";
import {
  SubmitWaitlistLeadBody,
  ListWaitlistLeadsResponse,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.post("/waitlist", async (req, res): Promise<void> => {
  const parsed = SubmitWaitlistLeadBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const existing = await db
    .select({ id: waitlistLeadsTable.id })
    .from(waitlistLeadsTable)
    .where(eq(waitlistLeadsTable.email, parsed.data.email))
    .limit(1);

  if (existing.length > 0) {
    res.status(409).json({ error: "This email is already on the waitlist." });
    return;
  }

  try {
    const [lead] = await db
      .insert(waitlistLeadsTable)
      .values({
        firstName: parsed.data.firstName,
        email: parsed.data.email,
        canton: parsed.data.canton,
        situation: parsed.data.situation,
      })
      .returning();

    req.log.info({ leadId: lead.id }, "Waitlist lead created");
    res.status(201).json(lead);
  } catch (err) {
    // Handle race condition where two requests with the same email
    // pass the pre-check and try to insert simultaneously. Postgres
    // SQLSTATE 23505 = unique_violation.
    if (
      err != null &&
      typeof err === "object" &&
      "code" in err &&
      (err as { code: unknown }).code === "23505"
    ) {
      res
        .status(409)
        .json({ error: "This email is already on the waitlist." });
      return;
    }
    throw err;
  }
});

router.get("/waitlist", async (req, res): Promise<void> => {
  // Express lowercases all header names
  const providedSecret = req.headers["x-admin-secret"];
  const adminSecret = process.env.ADMIN_SECRET;

  if (!providedSecret || typeof providedSecret !== "string") {
    res.status(401).json({ error: "Missing admin secret." });
    return;
  }

  if (!adminSecret || providedSecret !== adminSecret) {
    res.status(401).json({ error: "Invalid admin secret." });
    return;
  }

  const leads = await db
    .select()
    .from(waitlistLeadsTable)
    .orderBy(waitlistLeadsTable.createdAt);

  res.json(ListWaitlistLeadsResponse.parse(leads));
});

export default router;
