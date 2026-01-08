import { json } from "@remix-run/node";
import { authenticate } from "../shopify.server";
import Timer from "../models/timer.server";

export const loader = async ({ request }) => {
  await authenticate.admin(request);
  return json({ message: "Timers API running" });
};

export const action = async ({ request }) => {
  const { session } = await authenticate.admin(request);
  const shop = session.shop;

  const body = await request.json();

  if (!body.name || !body.type || !body.targeting) {
    return json({ error: "Missing required fields" }, { status: 400 });
  }

  const timer = await Timer.create({
    shop,
    ...body,
  });

  return json(timer, { status: 201 });
};
