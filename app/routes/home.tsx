import { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

export function meta() { return [{ title: "Secure checkout" }, { name: "description", content: "A simple Dodo Payments checkout" }]; }
export default function Home() {
  const [email, setEmail] = useState(""); const [loading, setLoading] = useState(false); const [error, setError] = useState(""); const [success, setSuccess] = useState(false);
  useEffect(() => setSuccess(new URLSearchParams(window.location.search).get("payment") === "success"), []);
  async function startCheckout(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setLoading(true); setError("");
    try { const response = await fetch("/api/checkout", { method: "POST", body: new FormData(event.currentTarget) }); const data = await response.json() as { error?: string; checkout_url?: string }; if (!response.ok || !data.checkout_url) throw new Error(data.error || "Could not start checkout"); window.location.href = data.checkout_url; }
    catch (err) { setError(err instanceof Error ? err.message : "Could not start checkout"); setLoading(false); }
  }
  return <main className="min-h-svh bg-slate-950 px-6 py-16 text-white"><div className="mx-auto grid w-full max-w-5xl items-center gap-12 md:grid-cols-2"><section><p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">Dodo Payments</p><h1 className="text-5xl font-bold tracking-tight">One simple checkout.</h1><p className="mt-5 max-w-md text-lg text-slate-300">A clean, secure hosted payment flow. Your card details go directly to Dodo Payments.</p></section><Card className="border-slate-700 bg-white text-slate-950 shadow-2xl"><CardHeader><CardTitle>Get access</CardTitle><CardDescription>Continue to secure checkout.</CardDescription></CardHeader><CardContent><form onSubmit={startCheckout} className="space-y-5"><div className="space-y-2"><Label htmlFor="email">Email (optional)</Label><Input id="email" name="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} /></div><Button className="w-full" type="submit" disabled={loading}>{loading ? "Opening checkout…" : "Continue to payment"}</Button>{error && <p role="alert" className="text-sm text-red-600">{error}</p>}{success && <p className="text-sm font-medium text-emerald-600">Payment return received. Thank you!</p>}</form></CardContent></Card></div></main>;
}
