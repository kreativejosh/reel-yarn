"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { icps, site, type Icp } from "@/content/site";

function Card({ c, copy }: { c: Icp; copy: boolean }) {
  return (
    <article className="icp-card" aria-hidden={copy || undefined} inert={copy || undefined}>
      <Image src={`https://images.unsplash.com/photo-${c.photo}?w=760&h=980&fit=crop&crop=faces&q=70`} alt="" fill sizes="(max-width: 700px) 82vw, 380px" />
      <div className="top"><span className="who">{c.who}</span><span className="tag">{c.tag}</span></div>
      <blockquote>&ldquo;{c.quote}&rdquo;</blockquote>
    </article>
  );
}

// Looping carousel: the cards are rendered three times and the scroll position
// jumps back to the middle copy, so it never runs out. Cards outside the
// content column fade out.
export function WhoItsFor() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const it = trackRef.current!;
    const N = icps.length;
    const cards = [...it.children] as HTMLElement[];
    const step = () => cards[1].offsetLeft - cards[0].offsetLeft;
    const edge = () => parseFloat(getComputedStyle(it).paddingLeft);
    const fade = () => {
      const r = it.getBoundingClientRect(), e = edge();
      cards.forEach((c) => {
        const b = c.getBoundingClientRect();
        c.classList.toggle("out", b.left < r.left + e - 4 || b.right > r.right - e + 4);
      });
    };
    const wrapAround = () => {
      const i = Math.round(it.scrollLeft / step());
      if (i < N || i >= 2 * N) {
        it.style.scrollSnapType = "none";
        it.scrollLeft += (i < N ? N : -N) * step();
        it.style.scrollSnapType = "";
      }
      fade();
    };
    it.scrollLeft = N * step();
    fade();
    let tm: ReturnType<typeof setTimeout>;
    const onScroll = () => { fade(); clearTimeout(tm); tm = setTimeout(wrapAround, 140); };
    const onResize = () => { it.scrollLeft = Math.round(it.scrollLeft / step()) * step(); fade(); };
    it.addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onResize);
    return () => { clearTimeout(tm); it.removeEventListener("scroll", onScroll); removeEventListener("resize", onResize); };
  }, []);

  const scroll = (d: number) => {
    const it = trackRef.current!;
    const step = (it.children[1] as HTMLElement).offsetLeft - (it.children[0] as HTMLElement).offsetLeft;
    it.scrollBy({ left: d * step, behavior: "smooth" });
  };

  return (
    <section className="icp" id="who" aria-labelledby="who-h">
      <div className="band"><div className="wrap icp-head">
        <h2 id="who-h">Built for people who grow with content</h2>
        <div>
          <p>ReelYarn isn&apos;t for making one video. It&apos;s for people who post every week to win customers, students and income. Find yourself below.</p>
          <a href={site.links.signUp} className="btn">Start free &rarr;</a>
        </div>
      </div></div>
      <div className="icp-car">
        <button className="arrow prev" aria-label="Previous" onClick={() => scroll(-1)}></button>
        <div className="icp-track" ref={trackRef}>
          {[0, 1, 2].flatMap((k) => icps.map((c) => <Card key={`${k}-${c.who}`} c={c} copy={k !== 1} />))}
        </div>
        <button className="arrow next" aria-label="Next" onClick={() => scroll(1)}></button>
      </div>
    </section>
  );
}
