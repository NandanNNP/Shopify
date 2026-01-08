import { json } from "@remix-run/node";
import { authenticate } from "../shopify.server";
import Timer from "../models/timer.server";

export const loader = async ({ params, request }) => {
  const { session } = await authenticate.admin(request);

  const timer = await Timer.findOne({
    _id: params.id,
    shop: session.shop,
  });

  if (!timer) {
    return json({ error: "Timer not found" }, { status: 404 });
  }

  return json(timer);
};

export const action = async ({ params, request }) => {
  const { session } = await authenticate.admin(request);
  const data = await request.json();

  const updated = await Timer.findOneAndUpdate(
    { _id: params.id, shop: session.shop },
    data,
    { new: true }
  );

  return json(updated);
};
