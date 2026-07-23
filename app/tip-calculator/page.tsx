"use client";

import { useState } from "react";
import AppHeader from "@/components/AppHeader";

export default function TipCalculatorPage() {
  const [bill, setBill] = useState("");
  const [percentage, setPercentage] = useState("20");
  const billValue = Math.max(0, Number(bill) || 0);
  const percentValue = Math.max(0, Number(percentage) || 0);
  const tip = billValue * percentValue / 100;
  const currency = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

  return (
    <main className="mx-auto min-h-screen max-w-3xl px-5 py-8 sm:px-8 sm:py-12">
      <AppHeader label="Tip Calculator" />
      <div className="mb-9"><h1 className="text-4xl font-bold tracking-[-.04em] sm:text-6xl">Leave a great tip</h1><p className="mt-3 text-black/50">Quick, simple, and no awkward math.</p></div>
      <section className="rounded-[2rem] bg-white/85 p-6 shadow-card ring-1 ring-black/5 sm:p-9">
        <div className="grid gap-6 sm:grid-cols-2">
          <label className="block"><span className="mb-2 block text-sm font-bold">Bill amount</span><div className="flex min-h-16 items-center rounded-2xl bg-canvas px-4 ring-1 ring-black/5 focus-within:ring-2 focus-within:ring-green-500"><span className="text-xl text-black/35">$</span><input value={bill} onChange={(e) => setBill(e.target.value)} inputMode="decimal" type="number" min="0" step="0.01" placeholder="0.00" className="w-full bg-transparent px-2 text-2xl font-semibold outline-none" /></div></label>
          <label className="block"><span className="mb-2 block text-sm font-bold">Tip percentage</span><div className="flex min-h-16 items-center rounded-2xl bg-canvas px-4 ring-1 ring-black/5 focus-within:ring-2 focus-within:ring-green-500"><input value={percentage} onChange={(e) => setPercentage(e.target.value)} inputMode="decimal" type="number" min="0" className="w-full bg-transparent text-2xl font-semibold outline-none" /><span className="text-xl text-black/35">%</span></div></label>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2">{[15, 18, 20].map((value) => <button key={value} onClick={() => setPercentage(String(value))} className={`min-h-12 rounded-xl text-sm font-bold transition active:scale-95 ${percentage === String(value) ? "bg-black text-white" : "bg-black/5 hover:bg-black/10"}`}>{value}%</button>)}</div>
        <div className="mt-8 rounded-[1.75rem] bg-gradient-to-br from-[#c8f1d2] to-[#a8e7bb] p-6 sm:p-8">
          <div className="flex items-end justify-between"><span className="font-semibold text-black/55">Tip amount</span><strong className="text-3xl tracking-tight">{currency.format(tip)}</strong></div>
          <div className="my-5 h-px bg-black/10" />
          <div className="flex items-end justify-between"><span className="font-bold">Total bill</span><strong className="text-4xl tracking-[-.04em] sm:text-5xl">{currency.format(billValue + tip)}</strong></div>
        </div>
      </section>
    </main>
  );
}
