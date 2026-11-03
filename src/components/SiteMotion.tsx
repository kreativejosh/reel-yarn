"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText, DrawSVGPlugin, useGSAP);

const EASE = "expo.out";
const $ = <T extends Element = HTMLElement>(s: string, root: ParentNode = document) => [...root.querySelectorAll<T>(s)];

// Scroll choreography for every section below the hero. Content is in the
// HTML at rest; starting states are only applied here, after hydration, so a
// failed script never hides anything.
export function SiteMotion() {
  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add({ ok: "(prefers-reduced-motion: no-preference)", fine: "(hover: hover) and (pointer: fine)", small: "(max-width: 860px)" }, (c) => {
      const { ok, fine, small } = c.conditions!;
      if (!ok) return;
      const dist = small ? 28 : 48;
      const once = (trigger: Element, start = "top 85%") => ({ trigger, start, once: true });

      // Headings rise line by line out of a mask.
      $("main h2:not(#hero-h)").forEach((h) => {
        SplitText.create(h, {
          type: "lines", mask: "lines", autoSplit: true,
          onSplit: (self) => gsap.from(self.lines, { yPercent: 110, duration: 1.15, stagger: 0.09, ease: EASE, scrollTrigger: once(h, "top 88%") }),
        });
      });

      // Supporting copy and small parts follow in a staged batch.
      const soft = ".sec-head p, .icp-head p, .icp-head .btn, .gal-head p, .gal-head .btn, .pr-head p, .pr-pills span, .two h3, .two p, .feat, .pr-foot > div, details";
      gsap.set(soft, { autoAlpha: 0, y: dist * 0.5 });
      ScrollTrigger.batch(soft, {
        start: "top 90%", once: true,
        onEnter: (els) => gsap.to(els, { autoAlpha: 1, y: 0, duration: 1, stagger: 0.07, ease: EASE, overwrite: true }),
      });

      // Who it's for: the visible cards slide in, photos settle from a zoom.
      const cards = $(".icp-card:not([aria-hidden])");
      gsap.timeline({ scrollTrigger: once($(".icp-car")[0], "top 80%") })
        .from(cards, { x: small ? 60 : 140, autoAlpha: 0, duration: 1.3, stagger: 0.08, ease: EASE })
        .from(cards.map((k) => k.querySelector("img")), { scale: 1.3, duration: 1.6, stagger: 0.08, ease: EASE }, 0)
        .from(cards.map((k) => k.querySelector("blockquote")), { y: 24, autoAlpha: 0, duration: 1, stagger: 0.08, ease: EASE }, 0.35);

      // Gallery and format tiles open upward like a shutter.
      const shutter = (els: HTMLElement[], radius: number) => {
        gsap.set(els, { clipPath: `inset(100% 0% 0% 0% round ${radius}px)` });
        return (batch: Element[]) => gsap.to(batch, { clipPath: `inset(0% 0% 0% 0% round ${radius}px)`, duration: 1.3, stagger: 0.09, ease: "expo.inOut", overwrite: true });
      };
      const vms = $(".vgrid .vm");
      const openVm = shutter(vms, small ? 14 : 20);
      gsap.set(".vgrid .vm img", { scale: 1.25 });
      gsap.set(".vgrid .prompt", { autoAlpha: 0, y: 14 });
      ScrollTrigger.batch(".vgrid .vc", {
        start: "top 88%", once: true,
        onEnter: (els) => {
          openVm(els.map((e) => e.querySelector(".vm")!));
          gsap.to(els.flatMap((e) => $("img", e)), { scale: 1, duration: 1.8, stagger: 0.09, ease: EASE, clearProps: "transform" });
          gsap.to(els.map((e) => e.querySelector(".prompt")), { autoAlpha: 1, y: 0, duration: 1, stagger: 0.09, delay: 0.5, ease: EASE });
        },
      });

      // Each format tile acts out its format once it has opened.
      const tiles = $(".tile");
      const openTile = shutter(tiles, 14);
      const acts: Record<string, (t: HTMLElement) => gsap.core.Timeline> = {
        t1: (t) => gsap.timeline()
          .from($(".q", t), { y: 20, autoAlpha: 0, duration: 0.8, ease: EASE })
          .from($(".numline i, .numline b", t), { scaleY: 0, autoAlpha: 0, duration: 0.5, stagger: 0.03, ease: EASE }, 0.1)
          .from($(".hop", t), { clipPath: "inset(0% 100% 0% 0%)", duration: 0.9, ease: "power2.inOut" }, 0.45),
        t2: (t) => gsap.timeline().from($(".stack5 > div", t), { x: -36, autoAlpha: 0, duration: 0.9, stagger: { each: 0.09, from: "end" }, ease: EASE }),
        t3: (t) => gsap.timeline()
          .from($(".shot", t), { y: 60, autoAlpha: 0, duration: 1, ease: EASE })
          .from($(".rowp span", t), { scale: 0.6, autoAlpha: 0, duration: 0.7, stagger: 0.08, ease: EASE }, 0.25)
          .from($(".cta", t), { scale: 0.4, autoAlpha: 0, duration: 0.6, ease: "back.out(2.2)" }, 0.5),
        t4: (t) => gsap.timeline()
          .from($(".wave i", t), { scaleY: 0, duration: 0.6, stagger: { each: 0.02, from: "center" }, ease: EASE })
          .from($(".raw em", t), { scale: 0.5, autoAlpha: 0, duration: 0.6, ease: "back.out(2.2)" }, 0.3),
        t5: (t) => gsap.timeline().from($("svg > *", t), { drawSVG: "0%", duration: 0.9, stagger: 0.07, ease: "power2.inOut" }),
        t6: (t) => gsap.timeline()
          .from($(".frame", t), { scale: 0, rotate: -25, duration: 1, ease: EASE })
          .from($(".ad > *", t), { y: 22, autoAlpha: 0, duration: 0.9, stagger: 0.1, ease: EASE }, 0.15),
      };
      const played = tiles.map((t) => {
        const tl = acts[[...t.classList].find((k) => k in acts)!]?.(t);
        tl?.pause();
        return tl;
      });
      ScrollTrigger.batch(tiles, {
        start: "top 88%", once: true,
        onEnter: (els) => {
          openTile(els as HTMLElement[]);
          els.forEach((e, i) => gsap.delayedCall(0.55 + i * 0.09, () => played[tiles.indexOf(e as HTMLElement)]?.play()));
        },
      });

      // Start however you like: files fly into the drop zone, the site gets read.
      $(".start .visual").forEach((v) => gsap.from(v, { y: dist, autoAlpha: 0, duration: 1.2, ease: EASE, scrollTrigger: once(v, "top 88%") }));
      const up = $(".v-up")[0];
      gsap.timeline({ scrollTrigger: once(up, "top 75%") })
        .from($(".drop", up), { scale: 0.9, autoAlpha: 0, duration: 1, ease: EASE }, 0.2)
        .from($(".files i", up), { y: -160, x: (i) => (i - 1) * 90, rotate: (i) => (i - 1) * 24, autoAlpha: 0, duration: 1.1, stagger: 0.12, ease: "power3.out" }, 0.45);
      const web = $(".v-web")[0];
      const pages = $(".rec .n", web)[0];
      const count = { v: 1 };
      gsap.timeline({ scrollTrigger: once(web, "top 75%") })
        .from($(".browser", web), { y: 50, autoAlpha: 0, duration: 1.1, ease: EASE }, 0.2)
        .from($(".rec", web), { y: -16, autoAlpha: 0, duration: 0.8, ease: EASE }, 0.35)
        .from($(".pg > div", web), { y: 18, autoAlpha: 0, duration: 0.8, stagger: 0.12, ease: EASE }, 0.6)
        .fromTo(count, { v: 1 }, { v: 4, duration: 1.6, ease: "steps(3)", onUpdate: () => { if (pages) pages.textContent = String(Math.round(count.v)); } }, 0.6);

      // Edit: the stage card and pricing card rise as one piece.
      [".edit .panel", ".pr-card"].forEach((s) => {
        const el = $(s)[0];
        gsap.from(el, { y: dist * 1.4, autoAlpha: 0, scale: 0.97, duration: 1.3, ease: EASE, scrollTrigger: once(el, "top 88%") });
      });
      gsap.from(".pr-list li", { x: 24, autoAlpha: 0, duration: 0.9, stagger: 0.08, ease: EASE, scrollTrigger: once($(".pr-list")[0]) });
      gsap.from(".pr-list svg > *", { drawSVG: "0%", duration: 1, stagger: 0.04, ease: "power2.inOut", scrollTrigger: once($(".pr-list")[0]) });

      // Support band grows to full size as it scrolls in; its cards stack up.
      const grow = $(".grow")[0];
      gsap.fromTo(grow, { clipPath: `inset(6% ${small ? 3 : 7}% 6% ${small ? 3 : 7}% round 40px)` }, {
        clipPath: "inset(0% 0% 0% 0% round 28px)", ease: "none",
        scrollTrigger: { trigger: grow, start: "top 95%", end: "top 30%", scrub: 0.6 },
      });
      gsap.from(".gcard", { y: dist * 1.5, autoAlpha: 0, duration: 1.2, stagger: 0.1, ease: EASE, scrollTrigger: once($(".grow-cards")[0]) });
      gsap.from(".gcard svg > *", { drawSVG: "0%", duration: 1.2, stagger: 0.05, delay: 0.3, ease: "power2.inOut", scrollTrigger: once($(".grow-cards")[0]) });

      // Footer: columns and corner ticks appear, then the wordmark rises into view.
      const foot = $(".foot")[0];
      gsap.timeline({ scrollTrigger: once(foot, "top 80%") })
        .from($(".fgrid > div", foot), { y: 30, autoAlpha: 0, duration: 1.1, stagger: 0.08, ease: EASE })
        .from($(".fgrid > i", foot), { scale: 0, rotate: 90, duration: 0.8, stagger: 0.03, ease: EASE }, 0.2);
      gsap.fromTo(".fmark span", { yPercent: 70 }, {
        yPercent: 0, ease: "none",
        scrollTrigger: { trigger: ".fmark", start: "top bottom", end: "bottom bottom", scrub: 0.6 },
      });

      if (!fine) return;
      const off: (() => void)[] = [];
      const on = (el: Element, type: string, fn: (e: PointerEvent) => void) => {
        el.addEventListener(type, fn as EventListener);
        off.push(() => el.removeEventListener(type, fn as EventListener));
      };

      // Who it's for: cards lean toward the pointer.
      $(".icp-card").forEach((k) => {
        gsap.set(k, { transformPerspective: 900 });
        const rx = gsap.quickTo(k, "rotateX", { duration: 0.6, ease: "power3.out" });
        const ry = gsap.quickTo(k, "rotateY", { duration: 0.6, ease: "power3.out" });
        on(k, "pointermove", (e) => {
          const r = k.getBoundingClientRect();
          ry(((e.clientX - r.left) / r.width - 0.5) * 7);
          rx(-((e.clientY - r.top) / r.height - 0.5) * 7);
        });
        on(k, "pointerleave", () => { rx(0); ry(0); });
      });

      // Gallery: a "Play" chip follows the pointer over the videos.
      const cur = document.createElement("div");
      cur.className = "cur";
      cur.setAttribute("aria-hidden", "true");
      cur.innerHTML = "<span>Play</span>";
      document.body.append(cur);
      const grid = $(".vgrid")[0];
      grid.classList.add("has-cur");
      // The page is CSS-zoomed on desktop; pointer coordinates are not.
      const z = () => parseFloat(getComputedStyle(document.documentElement).zoom) || 1;
      const cx = gsap.quickTo(cur, "x", { duration: 0.5, ease: "power3.out" });
      const cy = gsap.quickTo(cur, "y", { duration: 0.5, ease: "power3.out" });
      const move = (e: PointerEvent) => { cx(e.clientX / z()); cy(e.clientY / z()); };
      const enter = (e: PointerEvent) => {
        gsap.set(cur, { x: e.clientX / z(), y: e.clientY / z() });
        gsap.to(cur, { scale: 1, autoAlpha: 1, duration: 0.35, ease: EASE, overwrite: "auto" });
      };
      const leave = () => gsap.to(cur, { scale: 0.4, autoAlpha: 0, duration: 0.25, ease: "power2.in", overwrite: "auto" });
      $(".vgrid .vm").forEach((v) => {
        on(v, "pointerenter", enter);
        on(v, "pointermove", move);
        on(v, "pointerleave", leave);
      });
      return () => { off.forEach((f) => f()); cur.remove(); grid.classList.remove("has-cur"); };
    });

    // Lines and triggers shift once images and fonts settle.
    const refresh = () => ScrollTrigger.refresh();
    addEventListener("load", refresh);
    document.fonts.ready.then(refresh);
    return () => removeEventListener("load", refresh);
  });

  return null;
}
