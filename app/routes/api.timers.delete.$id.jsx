import { json } from "@remix-run/node";
import { authenticate } from "../shopify.server";
import Timer from "../models/timer.server";

export const action = async ({ params, request }) => {
  const { session } = await authenticate.admin(request);

  await Timer.deleteOne({
    _id: params.id,
    shop: session.shop,
  });

  return json({ success: true });
};
