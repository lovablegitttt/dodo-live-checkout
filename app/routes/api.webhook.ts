import type { Route } from "./+types/api.webhook";

function timingSafeEqual(a: string, b: string): boolean { if (a.length !== b.length) return false; let mismatch = 0; for (let i = 0; i < a.length; i++) mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i); return mismatch === 0; }
function base64(bytes: ArrayBuffer): string { return Buffer.from(bytes).toString("base64"); }

export async function action({ request }: Route.ActionArgs) {
  if (request.method !== "POST") return new Response("Method not allowed", { status: 405 });
  const secret = process.env.DODO_WEBHOOK_SECRET;
  const body = await request.text(); const id = request.headers.get("webhook-id"); const timestamp = request.headers.get("webhook-timestamp"); const signatureHeader = request.headers.get("webhook-signature");
  if (!secret || !id || !timestamp || !signatureHeader) return new Response("Missing webhook configuration or headers", { status: 401 });
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const signature = base64(await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(`${id}.${timestamp}.${body}`)));
  const valid = signatureHeader.split(" ").some((part) => timingSafeEqual(part.replace(/^v\d+,/, ""), signature));
  if (!valid) return new Response("Invalid signature", { status: 401 });
  console.log("Verified Dodo webhook", id, body);
  return Response.json({ received: true });
}
export async function loader() { return new Response("Method not allowed", { status: 405 }); }
