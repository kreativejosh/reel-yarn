"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

declare global {
  interface Window { __ryMotion?: boolean }
}

// Page-wide motion: smooth scroll, the nav's hide/show, the active-section dot
// and magnetic primary buttons. Section sequences live in their own components.
export function MotionProvider() {
  useEffect(() => {
    window.__ryMotion = true;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = matchMedia("(hover: hover) and (pointer: fine)").matches;
    const cleanups: (() => void)[] = [];

    // Smooth scroll on desktop only. Touch keeps native momentum.
    if (!reduce && fine) {
      const lenis = new Lenis({ lerp: 0.11, anchors: { offset: -24 } });
      lenis.on("scroll", ScrollTrigger.update);
      const raf = (t: number) => lenis.raf(t * 1000);
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);
      cleanups.push(() => { gsap.ticker.remove(raf); lenis.destroy(); });
    }

    // Nav hides while scrolling down and returns on the way up.
    const header = document.getElementById("top")!;
    const navTrigger = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate(self) {
        const y = self.scroll();
        header.classList.toggle("nav-solid", y > 80);
        header.classList.toggle("nav-hidden", self.direction === 1 && y > 240 && !header.contains(document.activeElement));
      },
    });
    cleanups.push(() => navTrigger.kill());

    // Dot under the nav link of the section in view.
    const links = [...header.querySelectorAll<HTMLAnchorElement>(".links a")];
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) links.forEach((a) => a.classList.toggle("on", a.hash === `#${e.target.id}`));
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    links.forEach((a) => { const s = document.querySelector(a.hash); if (s) io.observe(s); });
    cleanups.push(() => io.disconnect());

    // Primary buttons lean a few pixels toward the cursor.
    if (!reduce && fine) {
      document.querySelectorAll<HTMLElement>(".btn-orange").forEach((b) => {
        const x = gsap.quickTo(b, "x", { duration: 0.45, ease: "power3.out" });
        const y = gsap.quickTo(b, "y", { duration: 0.45, ease: "power3.out" });
        const move = (e: PointerEvent) => {
          const r = b.getBoundingClientRect();
          x(gsap.utils.clamp(-6, 6, (e.clientX - r.left - r.width / 2) * 0.18));
          y(gsap.utils.clamp(-6, 6, (e.clientY - r.top - r.height / 2) * 0.3));
        };
        const leave = () => { x(0); y(0); };
        b.addEventListener("pointermove", move);
        b.addEventListener("pointerleave", leave);
        cleanups.push(() => { b.removeEventListener("pointermove", move); b.removeEventListener("pointerleave", leave); });
      });
    }

    return () => cleanups.forEach((f) => f());
  }, []);

  return null;
}
