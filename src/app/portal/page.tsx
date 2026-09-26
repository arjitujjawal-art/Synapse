"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, BadgeCheck, Brain, LockKeyhole, Stethoscope, UserRound } from "lucide-react";

export default function DoctorPortalPage() {
  const router = useRouter();
  const [doctorId, setDoctorId] = useState("");
  const [password, setPassword] = useState("");
  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (doctorId && password) router.push("/prototype");
  };

  return (
    <main className="min-h-screen bg-bg-primary px-5 pt-28 pb-12 flex items-center">
      <div className="max-w-6xl mx-auto w-full overflow-hidden rounded-[32px] bg-white border border-border-soft shadow-[0_30px_100px_rgba(17,17,17,.09)] grid md:grid-cols-2">
        <section className="relative min-h-[560px] p-9 md:p-14 bg-[#17171a] text-white overflow-hidden flex flex-col justify-between">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_75%_20%,#9D8BC8_0,transparent_38%),radial-gradient(circle_at_20%_80%,#2457F5_0,transparent_34%)]" />
          <div className="relative">
            <div className="w-11 h-11 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center mb-8"><Brain size={22} /></div>
            <p className="text-[12px] tracking-[.18em] text-[#b8aad8] font-semibold mb-4">KORTEX CLINICAL WORKSPACE</p>
            <h1 className="text-4xl md:text-5xl font-medium tracking-[-.04em] leading-[1.08] max-w-md">Stroke imaging review, without the setup.</h1>
            <p className="text-neutral-400 mt-6 leading-relaxed max-w-md">Enter the guided demonstration with a prepared patient study and explore the complete imaging workstation.</p>
          </div>
          <div className="relative">
            <div className="flex items-center gap-2 text-sm text-neutral-400 mb-5"><BadgeCheck size={16} className="text-[#b8aad8]" /> No credentials required for the demo</div>
            <Link href="/prototype" className="w-full h-14 rounded-2xl bg-white text-black flex items-center justify-between px-6 font-semibold hover:bg-neutral-100 transition-colors">
              <span>Open demo workspace</span><ArrowRight size={19} />
            </Link>
          </div>
        </section>

        <section className="p-9 md:p-14 flex flex-col justify-center">
          <div className="w-11 h-11 rounded-2xl bg-accent-soft text-accent-deep flex items-center justify-center mb-8"><Stethoscope size={21} /></div>
          <p className="heading-label text-accent-deep mb-3">DOCTOR PORTAL</p>
          <h2 className="text-3xl font-semibold tracking-[-.035em]">Welcome back</h2>
          <p className="body-medium mt-3 mb-9">Sign in to access assigned patient imaging studies.</p>
          <form onSubmit={submit} className="space-y-5">
            <label className="block"><span className="text-sm font-medium">Doctor ID</span><div className="relative mt-2"><UserRound size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-tertiary" /><input value={doctorId} onChange={e => setDoctorId(e.target.value)} required placeholder="Enter your doctor ID" className="w-full h-13 rounded-xl border border-border-soft bg-bg-primary pl-12 pr-4 outline-none focus:border-accent text-[15px]" /></div></label>
            <label className="block"><span className="text-sm font-medium">Password</span><div className="relative mt-2"><LockKeyhole size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-tertiary" /><input type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="Enter your password" className="w-full h-13 rounded-xl border border-border-soft bg-bg-primary pl-12 pr-4 outline-none focus:border-accent text-[15px]" /></div></label>
            <div className="flex items-center justify-between text-sm"><label className="flex items-center gap-2 text-text-secondary"><input type="checkbox" className="accent-accent" /> Remember me</label><button type="button" className="text-accent-deep hover:underline">Forgot password?</button></div>
            <button type="submit" className="btn-primary w-full justify-center mt-2">Sign in securely <ArrowRight size={17} /></button>
          </form>
          <p className="text-[11px] text-text-tertiary mt-8 leading-relaxed">Prototype access only. Authentication is simulated and no credentials are stored.</p>
        </section>
      </div>
    </main>
  );
}
