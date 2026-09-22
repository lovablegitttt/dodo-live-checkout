import { useEffect, useState } from "react";
import { Check, LockKeyhole, Play, Sparkles, Star } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

export function meta() {
  return [
    { title: "Premium Course | Learn with clarity" },
    { name: "description", content: "A focused premium course to help you build skills, confidence, and momentum." },
  ];
}

export default function Home() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setSuccess(new URLSearchParams(window.location.search).get("payment") === "success");
  }, []);

  async function startCheckout(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        body: new FormData(event.currentTarget),
      });
      const data = await response.json() as { error?: string; checkout_url?: string };
      if (!response.ok || !data.checkout_url) throw new Error(data.error || "Could not start checkout");
      window.location.href = data.checkout_url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not start checkout");
      setLoading(false);
    }
  }

  return (
    <main className="min-h-svh overflow-hidden bg-[#090b14] text-white">
      <div className="absolute inset-x-0 top-0 -z-0 h-[520px] bg-[radial-gradient(circle_at_50%_-20%,rgba(124,92,255,0.38),transparent_62%)]" />
      <nav className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-6 py-7 lg:px-8">
        <div className="flex items-center gap-2 font-semibold tracking-tight"><span className="grid size-9 place-items-center rounded-xl bg-violet-500 shadow-lg shadow-violet-500/30"><Sparkles className="size-5" /></span> Premium Course</div>
        <div className="hidden items-center gap-8 text-sm text-slate-400 sm:flex"><a href="#learn" className="transition hover:text-white">What you’ll learn</a><a href="#enroll" className="transition hover:text-white">Enroll now</a></div>
      </nav>

      <section className="relative z-10 mx-auto grid max-w-6xl items-center gap-14 px-6 pb-20 pt-12 lg:grid-cols-[1.08fr_0.92fr] lg:px-8 lg:pb-28 lg:pt-20">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-400/10 px-3 py-1.5 text-xs font-medium text-violet-200"><Star className="size-3.5 fill-current" /> A smarter way to grow</div>
          <h1 className="max-w-3xl text-5xl font-semibold leading-[1.04] tracking-[-0.04em] text-white sm:text-6xl lg:text-7xl">Turn your potential into <span className="bg-gradient-to-r from-violet-300 via-fuchsia-300 to-amber-200 bg-clip-text text-transparent">real progress.</span></h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-slate-300">A focused premium course with practical lessons, clear direction, and the confidence to take your next big step.</p>
          <div className="mt-9 flex flex-wrap items-center gap-5 text-sm text-slate-300"><span className="flex items-center gap-2"><Check className="size-4 text-emerald-300" /> Learn at your pace</span><span className="flex items-center gap-2"><Check className="size-4 text-emerald-300" /> Practical frameworks</span></div>
          <a href="#enroll" className="mt-10 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3.5 text-sm font-semibold text-slate-950 shadow-xl shadow-white/10 transition hover:-translate-y-0.5 hover:bg-violet-100"><Play className="size-4 fill-current" /> Start learning</a>
        </div>

        <Card id="enroll" className="scroll-mt-8 border-white/10 bg-white/[0.07] text-white shadow-2xl shadow-violet-950/30 backdrop-blur-xl">
          <CardHeader className="border-b border-white/10 pb-6"><div className="mb-5 aspect-[1.8/1] overflow-hidden rounded-xl bg-gradient-to-br from-violet-600 via-fuchsia-500 to-amber-300 p-5"><div className="flex h-full flex-col justify-between rounded-lg border border-white/25 bg-black/10 p-4"><div className="flex items-center justify-between text-xs font-medium text-white/80"><span>PREMIUM COURSE</span><Sparkles className="size-4" /></div><p className="max-w-[180px] text-2xl font-semibold leading-tight">Build your next chapter.</p></div></div><CardTitle className="text-2xl">Premium Course</CardTitle><CardDescription className="text-slate-300">Everything you need to learn with clarity and move forward with confidence.</CardDescription></CardHeader>
          <CardContent className="pt-6"><div className="mb-6 flex items-end justify-between"><div><p className="text-3xl font-semibold">One-time access</p><p className="mt-1 text-sm text-slate-400">Secure checkout powered by Dodo</p></div><LockKeyhole className="size-5 text-slate-400" /></div><form onSubmit={startCheckout} className="space-y-4"><div className="space-y-2"><Label htmlFor="email" className="text-slate-200">Your email</Label><Input id="email" name="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="border-white/15 bg-white/10 text-white placeholder:text-slate-500" /></div><Button className="h-12 w-full bg-violet-500 text-white hover:bg-violet-400" type="submit" disabled={loading}>{loading ? "Opening secure checkout…" : "Buy the course"}</Button>{error && <p role="alert" className="text-sm text-red-300">{error}</p>}{success && <p className="text-sm font-medium text-emerald-300">Payment received — welcome to the course!</p>}</form><p className="mt-4 text-center text-xs text-slate-500">Your payment details are handled securely by Dodo Payments.</p></CardContent>
        </Card>
      </section>

      <section id="learn" className="relative z-10 border-t border-white/10 bg-white/[0.025] px-6 py-16 lg:px-8"><div className="mx-auto max-w-6xl"><p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-300">Inside the course</p><h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Simple lessons. Meaningful momentum.</h2><div className="mt-10 grid gap-4 sm:grid-cols-3"><div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5"><p className="text-lg font-medium">01 · Find your focus</p><p className="mt-2 text-sm leading-6 text-slate-400">Cut through the noise and create a clear plan for your goals.</p></div><div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5"><p className="text-lg font-medium">02 · Learn the system</p><p className="mt-2 text-sm leading-6 text-slate-400">Use practical frameworks you can apply immediately.</p></div><div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5"><p className="text-lg font-medium">03 · Make it happen</p><p className="mt-2 text-sm leading-6 text-slate-400">Build consistency, confidence, and progress that lasts.</p></div></div></div></section>
    </main>
  );
}
