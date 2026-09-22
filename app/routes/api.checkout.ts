import type { Route } from "./+types/api.checkout";

interface CheckoutEnv { DODO_API_KEY?: string; DODO_PRODUCT_ID?: string; DODO_MODE?: string; }

export async function action({ request, context }: Route.ActionArgs) {
  if (request.method !== "POST") return new Response("Method not allowed", { status: 405 });
  const env = context.cloudflare.env as CheckoutEnv;
  if (!env.DODO_API_KEY || !env.DODO_PRODUCT_ID) return Response.json({ error: "Dodo is not configured yet. Add DODO_API_KEY and DODO_PRODUCT_ID." }, { status: 503 });
  const form = await request.formData();
  const email = String(form.get("email") ?? "").trim();
  const origin = new URL(request.url).origin;
  const baseUrl = env.DODO_MODE === "test" ? "https://test.dodopayments.com" : "https://live.dodopayments.com";
  const payload: Record<string, unknown> = { product_cart: [{ product_id: env.DODO_PRODUCT_ID, quantity: 1 }], return_url: `${origin}/?payment=success` };
  if (email) payload.customer = { email };
  const response = await fetch(`${baseUrl}/checkouts`, { method: "POST", headers: { Authorization: `Bearer ${env.DODO_API_KEY}`, "Content-Type": "application/json" }, body: JSON.stringify(payload) });
  const data = await response.json().catch(() => ({})) as { checkout_url?: unknown };
  if (!response.ok || typeof data.checkout_url !== "string") { console.error("Dodo checkout creation failed", response.status, data); return Response.json({ error: "Dodo could not create a checkout. Check the product ID and live API key." }, { status: 502 }); }
  return Response.json({ checkout_url: data.checkout_url });
}
export async function loader() { return new Response("Method not allowed", { status: 405 }); }
