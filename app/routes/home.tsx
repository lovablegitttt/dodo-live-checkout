import { useEffect, useState } from "react";
import { ArrowRight, Check, LockKeyhole, Play, Quote, Sparkles, Star } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

export function meta() {
  return [
    { title: "Premium Course — Master the next move" },
    { name: "description", content: "A practical premium course for turning ambitious goals into consistent progress." },
  ];
}

const outcomes = [
  ["Clarity", "Turn scattered ideas into a focused direction."],
  ["Momentum", "Build a practical system you can actually keep."],
  ["Confidence", "Make better decisions and move with intention."],
];

export default function Home() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => setSuccess(new URLSearchParams(window.location.search).get("payment") === "success"), []);

  async function startCheckout(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setLoading(true); setError("");
    try {
      const response = await fetch("/api/checkout", { method: "POST", body: new FormData(event.currentTarget) });
      const data = await response.json() as { error?: string; checkout_url?: string };
      if (!response.ok || !data.checkout_url) throw new Error(data.error || "Could not start checkout");
      window.location.href = data.checkout_url;
    } catch (err) { setError(err instanceof Error ? err.message : "Could not start checkout"); setLoading(false); }
  }

  return (
    <main className="min-h-svh overflow-hidden bg-[#f7f7f4] text-[#171717]">
      <div className="absolute inset-x-0 top-0 h-[650px] bg-[radial-gradient(circle_at_75%_0%,rgba(214,183,112,0.18),transparent_42%),linear-gradient(180deg,#f4f1ea_0%,#f7f7f4_75%)]" />
      <nav className="relative z-10 mx-auto flex max-w-7xl items-center justify-between border-b border-black/10 px-6 py-6 lg:px-10">
        <a href="#top" className="flex items-center gap-3 text-[15px] font-semibold tracking-[-0.02em]"><span className="grid size-8 place-items-center rounded-full bg-[#171717] text-[#e7c98d]"><Sparkles className="size-4" /></span> PREMIUM COURSE</a>
        <div className="hidden items-center gap-8 text-[13px] font-medium text-black/55 sm:flex"><a href="#outcomes" className="transition hover:text-black">Outcomes</a><a href="#curriculum" className="transition hover:text-black">Curriculum</a><a href="#enroll" className="rounded-full bg-[#171717] px-4 py-2.5 text-white transition hover:bg-black/75">Enroll now <ArrowRight className="ml-1 inline size-3.5" /></a></div>
      </nav>

      <section id="top" className="relative z-10 mx-auto grid max-w-7xl items-center gap-14 px-6 pb-24 pt-20 lg:grid-cols-[1fr_430px] lg:px-10 lg:pb-32 lg:pt-28">
        <div><p className="mb-7 text-[11px] font-bold uppercase tracking-[0.28em] text-[#92723a]">A course for your next chapter</p><h1 className="max-w-3xl text-[clamp(3.4rem,7vw,6.8rem)] font-semibold leading-[.94] tracking-[-0.075em]">Make your next move <em className="font-serif font-normal tracking-[-0.06em] text-[#92723a]">matter.</em></h1><p className="mt-8 max-w-lg text-[17px] leading-8 text-black/60">A concise, practical framework for people who are ready to stop overthinking and start building meaningful momentum.</p><div className="mt-9 flex items-center gap-4 text-[13px] text-black/55"><div className="flex -space-x-2"><span className="grid size-8 place-items-center rounded-full border-2 border-[#f7f7f4] bg-[#d3b184] text-xs font-bold">A</span><span className="grid size-8 place-items-center rounded-full border-2 border-[#f7f7f4] bg-[#8896a3] text-xs font-bold text-white">M</span><span className="grid size-8 place-items-center rounded-full border-2 border-[#f7f7f4] bg-[#b88b72] text-xs font-bold text-white">S</span></div><span>Designed for focused progress</span></div><a href="#enroll" className="mt-10 inline-flex items-center gap-3 rounded-full bg-[#171717] px-6 py-3.5 text-sm font-semibold text-white shadow-xl shadow-black/10 transition hover:-translate-y-0.5 hover:bg-black/80">Explore the course <ArrowRight className="size-4" /></a></div>

        <Card id="enroll" className="scroll-mt-8 overflow-hidden rounded-[26px] border-black/10 bg-white shadow-[0_24px_80px_rgba(35,31,24,.12)]"><div className="relative h-48 overflow-hidden bg-[#1e2a27] p-6 text-white"><div className="absolute -right-10 -top-20 size-64 rounded-full border border-[#d8bd82]/30" /><div className="absolute -bottom-28 left-12 size-72 rounded-full border border-[#d8bd82]/20" /><div className="relative flex h-full flex-col justify-between"><div className="flex items-center justify-between text-[10px] font-bold tracking-[0.2em] text-[#d8bd82]">PREMIUM COURSE <Sparkles className="size-4" /></div><div><p className="font-serif text-3xl leading-none">The next move</p><p className="mt-2 text-xs text-white/55">A practical masterclass in forward motion</p></div></div></div><CardHeader className="pb-3"><div className="mb-1 flex items-center gap-1 text-[#a47e3e]"><Star className="size-3 fill-current" /><Star className="size-3 fill-current" /><Star className="size-3 fill-current" /><Star className="size-3 fill-current" /><Star className="size-3 fill-current" /><span className="ml-2 text-[11px] font-medium text-black/45">Premium access</span></div><CardTitle className="text-2xl tracking-tight">Start with intention.</CardTitle><CardDescription className="text-[13px] leading-6 text-black/55">A focused course to help you turn ambition into a plan—and a plan into progress.</CardDescription></CardHeader><CardContent className="pt-3"><form onSubmit={startCheckout} className="space-y-4"><div className="space-y-2"><Label htmlFor="email" className="text-xs font-semibold text-black/70">Email address</Label><Input id="email" name="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="h-11 rounded-lg border-black/15 bg-[#fafaf8] text-sm" /></div><Button className="h-12 w-full rounded-lg bg-[#171717] text-sm text-white hover:bg-[#383530]" type="submit" disabled={loading}>{loading ? "Opening secure checkout…" : "Get instant access"}<ArrowRight className="ml-auto size-4" /></Button>{error && <p role="alert" className="text-sm text-red-600">{error}</p>}{success && <p className="text-sm font-medium text-emerald-700">Payment received — welcome to the course.</p>}</form><p className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-black/40"><LockKeyhole className="size-3" /> Secure payment via Dodo Payments</p></CardContent></Card>
      </section>

      <section id="outcomes" className="relative z-10 border-y border-black/10 bg-white/45 px-6 py-20 lg:px-10"><div className="mx-auto max-w-7xl"><div className="flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#92723a]">What changes</p><h2 className="mt-4 max-w-xl text-4xl font-semibold tracking-[-0.05em] sm:text-5xl">Less noise. More progress.</h2></div><p className="max-w-sm text-sm leading-6 text-black/50">No filler, no complicated jargon. Just a clear path from where you are to where you want to be.</p></div><div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-black/10 bg-black/10 sm:grid-cols-3">{outcomes.map(([title, detail], index) => <div key={title} className="bg-[#f7f7f4] p-7"><p className="text-xs font-bold text-[#a47e3e]">0{index + 1}</p><h3 className="mt-10 text-xl font-semibold tracking-tight">{title}</h3><p className="mt-3 text-sm leading-6 text-black/50">{detail}</p></div>)}</div></div></section>

      <section id="curriculum" className="relative z-10 mx-auto max-w-7xl px-6 py-20 lg:px-10"><div className="grid gap-12 md:grid-cols-[.8fr_1.2fr] md:items-start"><div><p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#92723a]">The curriculum</p><h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] sm:text-5xl">A simple system that sticks.</h2></div><div className="divide-y divide-black/10">{[["01", "Find your focus", "Create a clear direction without trying to do everything at once."], ["02", "Build your system", "Turn good intentions into a repeatable rhythm that fits your life."], ["03", "Make the move", "Leave with the confidence and tools to act on what matters." ]].map(([number, title, detail]) => <div key={number} className="grid gap-4 py-6 sm:grid-cols-[50px_1fr]"><span className="font-serif text-xl text-[#a47e3e]">{number}</span><div><h3 className="text-xl font-semibold tracking-tight">{title}</h3><p className="mt-2 max-w-lg text-sm leading-6 text-black/50">{detail}</p></div></div>)}</div></div></section>

      <section className="bg-[#1e2a27] px-6 py-20 text-white lg:px-10"><div className="mx-auto flex max-w-4xl flex-col items-center text-center"><Quote className="size-8 text-[#d8bd82]" /><p className="mt-6 max-w-2xl font-serif text-3xl leading-tight text-white/90 sm:text-4xl">“The value is not in learning more. It is in finally doing what you already know matters.”</p><p className="mt-6 text-[11px] font-bold uppercase tracking-[0.25em] text-white/45">Your next chapter starts here</p></div></section>
      <footer className="bg-[#1e2a27] px-6 pb-8 text-center text-[11px] text-white/35">© Premium Course · Learn with intention.</footer>
    </main>
  );
}
