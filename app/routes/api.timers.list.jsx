import { json } from "@remix-run/node";
import { authenticate } from "../shopify.server";
import Timer from "../models/timer.server";

export const loader = async ({ request }) => {
  const { session } = await authenticate.admin(request);

  const timers = await Timer.find({ shop: session.shop }).sort({
    createdAt: -1,
  });

  return json(timers);
};
