"use client";

import { useState } from "react";
import { creditCosts, DEFAULT_PACK, NGN_PER_USD, packs, pricing, site } from "@/content/site";

const icons: Record<(typeof creditCosts)[number]["icon"], React.ReactNode> = {
  promo: <><path d="M4 9v6h3l6 4V5L7 9Z" /><path d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12" /></>,
  captions: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M7 13h4M13 13h4M7 16h10" /></>,
  cinematic: <><rect x="3" y="6" width="13" height="12" rx="2" /><path d="m16 10 5-3v10l-5-3" /></>,
  realistic: <><path d="M12 3l1.8 4.7L18.5 9l-4.7 1.8L12 15.5l-1.8-4.7L5.5 9l4.7-1.3Z" /><path d="M18 15l.8 2.2L21 18l-2.2.8L18 21l-.8-2.2L15 18l2.2-.8Z" /></>,
  change: <><path d="M4 20h4L19 9l-4-4L4 16Z" /><path d="m13.5 6.5 4 4" /></>,
};

const fmt = (n: number) => n.toLocaleString("en-US");
const base = packs[0][1] / packs[0][0];

// One pack picker drives the price, the savings badge and what the credits make.
export function Pricing() {
  const [i, setI] = useState(DEFAULT_PACK);
  const [credits, usd] = packs[i];
  const save = Math.round((1 - usd / credits / base) * 100);

  return (
    <section className="band price-sec" id="pricing" aria-labelledby="pr-h">
      <div className="wrap">
        <div className="pr-head">
          <div><h2 id="pr-h">{pricing.heading}</h2></div>
          <div>
            <p>{pricing.intro}</p>
            <div className="pr-pills">{pricing.pills.map((p) => <span key={p}>{p}</span>)}</div>
          </div>
        </div>

        <div className="pr-card">
          <div className="pr-pick">
            <div className="pr-amount" aria-live="polite">
              <span className="big">${fmt(usd)}</span>
              <span className="meta"><span className="cr">{fmt(credits)} credits</span><span className="ngn">about ₦{fmt(usd * NGN_PER_USD)} · one-time</span></span>
            </div>
            <span className="pr-save" hidden={save <= 0}>{save}% cheaper per credit than the smallest pack</span>
            <div className="pr-range">
              <label htmlFor="prRange" className="pr-label">Slide to pick a pack</label>
              <input
                type="range" id="prRange" min={0} max={packs.length - 1} step={1} value={i}
                onChange={(e) => setI(+e.target.value)}
                aria-valuetext={`${fmt(credits)} credits for $${usd}`}
                style={{ "--p": `${(i / (packs.length - 1)) * 100}%` } as React.CSSProperties}
              />
              <div className="pr-ticks" aria-hidden="true">
                {packs.map(([c], k) => <span key={c} className={k === i ? "on" : undefined}>{c >= 1000 ? `${c / 1000}k` : c}</span>)}
              </div>
            </div>
            <a href={site.links.signUp} className="btn btn-orange pr-buy"><b>Get {fmt(credits)} credits</b><span aria-hidden="true">&rarr;</span></a>
            <a href={site.links.signUp} className="pr-custom">Need a different amount? Pay any sum from $5 at the bigger-pack rate.</a>
          </div>

          <div className="pr-get">
            <ul className="pr-list">
              {creditCosts.map((c) => (
                <li key={c.what}>
                  <span className="ic"><svg viewBox="0 0 24 24" aria-hidden="true">{icons[c.icon]}</svg></span>
                  <span className="what">{c.what}<small>{c.credits} credits each</small></span>
                  <span className="n">{fmt(Math.floor(credits / c.credits))}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pr-foot">
          <div><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 12a9 9 0 1 0 3-6.7" /><path d="M3 4v4h4" /><path d="M12 8v4l3 2" /></svg><span><b>Top up any time</b><p>Running low? Add a pack in seconds. Nothing renews on its own.</p></span></div>
          <div><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="6" width="18" height="13" rx="2" /><path d="M3 10h18M7 15h4" /></svg><span><b>Pay your way</b><p>Card, bank transfer, USSD or crypto. Prices shown in dollars and naira.</p></span></div>
          <div><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3 4 6v6c0 4.5 3.4 8.2 8 9 4.6-.8 8-4.5 8-9V6Z" /><path d="m8.5 12 2.5 2.5 4.5-5" /></svg><span><b>Start free</b><p>New accounts get 20 free credits for 30 days. See the <a href={site.links.refund}>refund policy</a>.</p></span></div>
        </div>
      </div>
    </section>
  );
}
