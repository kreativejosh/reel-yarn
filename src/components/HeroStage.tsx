"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

// The hero's focal sequence: the headline is written, then the app mock builds
// the café promo in front of the visitor. The server HTML is the finished
// state, so with motion off (or no JavaScript) nothing is hidden.
export function HeroStage({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLElement>(null);

  useGSAP((_, contextSafe) => {
    const mm = gsap.matchMedia();
    mm.add({ ok: "(prefers-reduced-motion: no-preference)", small: "(max-width: 860px)" }, (c) => {
      if (!c.conditions!.ok) return;
      const small = c.conditions!.small;
      const q = gsap.utils.selector(ref);
      const app = q(".app")[0];

      const intro = contextSafe!(() => {
        const head = SplitText.create(q("h1 .ln"), { type: "lines", mask: "lines" });
        const msg = SplitText.create(q(".agent-msg"), { type: "words,chars" });
        const cap = SplitText.create(q(".cap"), { type: "words" });
        const steps = q(".steps-a > div");
        const final = steps.map((s) => s.className);
        const setStep = (i: number, cls: string) => () => { steps[i].className = cls; };

        const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
        tl.set(q("h1, .sub, .ctas > *, .fine, .app, .ribbon"), { visibility: "visible" })
          .from(head.lines, { yPercent: 110, duration: 1, stagger: 0.09 }, 0)
          .from(q("h1 .dim"), { color: "#0e0e13", duration: 1.1, ease: "power2.out" }, 0.45)
          .from(q(".ribbon"), { autoAlpha: 0, x: 60, duration: 1.6 }, 0.1)
          .from(q(".sub"), { autoAlpha: 0, y: 14, duration: 0.8 }, 0.35)
          .from(q(".ctas > *"), { autoAlpha: 0, y: 14, duration: 0.8, stagger: 0.07 }, 0.45)
          .from(q(".fine"), { autoAlpha: 0, duration: 0.8 }, 0.6)
          .from(app, { autoAlpha: 0, y: 70, duration: 1.2, ease: "power4.out" }, 0.5)

          // The assistant types its reply, then works through the steps.
          .call(() => steps.forEach((s) => (s.className = "todo")), undefined, 0.5)
          .add(() => q(".agent-msg")[0].classList.add("typing"), 1.0)
          .from(msg.chars, { autoAlpha: 0, duration: 0.01, stagger: 0.016, ease: "none" }, 1.0)
          .add(() => q(".agent-msg")[0].classList.remove("typing"))
          .add(setStep(0, "now"), "-=0.2")
          .add(setStep(0, "done"), "+=0.35")
          .from(steps[0].querySelector("i"), { scale: 0.4, duration: 0.4, ease: "back.out(3)" }, "<")
          .add(setStep(1, "now"))
          .add(setStep(1, "done"), "+=0.35")
          .from(steps[1].querySelector("i"), { scale: 0.4, duration: 0.4, ease: "back.out(3)" }, "<")
          .add(setStep(2, final[2]))
          .add(() => steps.forEach((s, i) => (s.className = final[i])), "+=0.1")

          // Meanwhile the video resolves on the canvas, pixel by pixel.
          .from(q(".phone-mock"), { autoAlpha: 0, scale: 0.92, filter: "blur(10px)", duration: 1, ease: "power3.out" }, 1.3)
          .from(q(".phone-mock .sun"), { scale: 0.5, autoAlpha: 0, duration: 1.4, ease: "power2.out" }, 1.4)
          .from(q(".dissolve span"), {
            autoAlpha: 0, scale: 0, duration: 0.5, ease: "power2.out",
            stagger: (_i: number, el: HTMLElement) => (parseFloat(el.style.left) / 290) * 0.9 + gsap.utils.random(0, 0.18),
          }, 1.5)
          .from(cap.words, { autoAlpha: 0, yPercent: 60, duration: 0.5, stagger: 0.14, ease: "back.out(2)" }, 2.0)
          .from(q(".phone-mock .t, .phone-mock .p"), { autoAlpha: 0, y: 12, duration: 0.6, stagger: 0.1 }, 2.3)
          .from(q(".timeline > span"), { scaleX: 0, transformOrigin: "0 50%", duration: 0.5, stagger: 0.1, ease: "power3.out" }, 1.6);

        // Playhead loops over the timeline, but only while the app is on screen.
        const play = gsap.fromTo(q(".playhead"), { xPercent: 0 }, { xPercent: 100, duration: 5, ease: "none", repeat: -1, paused: true });
        tl.add(() => {
          ScrollTrigger.create({ trigger: app, start: "top bottom", end: "bottom top", onToggle: (s) => (s.isActive ? play.play() : play.pause()) });
          if (ScrollTrigger.isInViewport(app)) play.play();
        });
      });

      // Scrolling flattens the app onto the page and drifts the ribbon.
      gsap.set(app, { transformPerspective: 1400, transformOrigin: "50% 0%" });
      gsap.fromTo(app, { rotateX: small ? 6 : 10, scale: 0.94 }, {
        rotateX: 0, scale: 1, ease: "none",
        scrollTrigger: { trigger: app, start: "top 95%", end: "top 30%", scrub: 0.6 },
      });
      gsap.to(q(".ribbon"), {
        yPercent: -14, rotate: 6, ease: "none",
        scrollTrigger: { trigger: ref.current, start: "top top", end: "bottom top", scrub: true },
      });

      // Wait for the fonts so lines split where they will actually break.
      Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 1200))]).then(intro);
    });
  }, { scope: ref });

  return <section className="hero band" aria-labelledby="hero-h" ref={ref}>{children}</section>;
}
