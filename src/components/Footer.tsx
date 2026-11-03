"use client";

import { useState } from "react";
import { footerNav, site } from "@/content/site";

const Out = () => <svg viewBox="0 0 10 10" aria-hidden="true"><path d="M2 8 8 2M3.5 2H8v4.5" /></svg>;
const tick = (left: string, top: string) => <i key={left + top} style={{ left, top }}></i>;

export function Footer() {
  const [note, setNote] = useState("Weekly content ideas for your business. No spam.");

  // No backend yet: validate and thank.
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const m = e.currentTarget.elements.namedItem("email") as HTMLInputElement;
    setNote(m.checkValidity() && m.value ? "Thanks! You're on the list." : "Enter a valid email address.");
  };

  return (
    <footer className="foot">
      <div className="fgrid">
        {["0", "33.333%", "66.666%", "100%"].flatMap((l) => [tick(l, "0"), tick(l, "100%")])}
        <div>
          <h2 className="fh">Contact</h2>
          <div className="flinks"><a href={`mailto:${site.email}`}>{site.email}</a><a href={site.links.contact}>Get in touch</a></div>
          <p className="fnote">ReelYarn turns one line into<br />a finished video, ready to post.<br /><a href="#pricing">See pricing <Out /></a></p>
        </div>
        <div>
          <h2 className="fh">Connect</h2>
          <div className="flinks">
            <a href={site.social.instagram} rel="me noopener">Instagram</a>
            <a href={site.social.tiktok} rel="me noopener">TikTok</a>
            <a href={site.social.youtube} rel="me noopener">YouTube</a>
            <a href={site.social.linkedin} rel="me noopener">LinkedIn</a>
          </div>
        </div>
        <div>
          <h2 className="fh">Subscribe</h2>
          <form className="fsub" noValidate onSubmit={onSubmit}>
            <label className="sr" htmlFor="fmail">Email</label>
            <input id="fmail" name="email" type="email" placeholder="Email" autoComplete="email" />
            <button type="submit" aria-label="Subscribe"><svg viewBox="0 0 20 14" aria-hidden="true"><path d="M1 7h17M12 1l6 6-6 6" /></svg></button>
          </form>
          <p className="fsubnote" aria-live="polite">{note}</p>
        </div>
      </div>
      <nav className="fgrid fnav" aria-label="Footer">
        {["0", "33.333%", "66.666%", "100%"].map((l) => tick(l, "100%"))}
        <div>
          <h2 className="fh">Community</h2>
          <ul>{footerNav.community.map((m) => <li key={m.label}><a href={m.href}>{m.label}</a></li>)}</ul>
        </div>
        <div>
          <h2 className="fh">Company</h2>
          <ul><li><a href="#edit">How it works</a></li><li><a href="#pricing">Pricing</a></li><li><a href="#faq">Questions</a></li></ul>
        </div>
        <div>
          <h2 className="fh">Legal</h2>
          <ul>
            <li><a href={`mailto:${site.email}`}>Contact us</a></li>
            <li><a href={site.links.terms}>Terms of Service</a></li>
            <li><a href={site.links.privacy}>Privacy Policy</a></li>
          </ul>
        </div>
      </nav>
      <div className="fmark" aria-hidden="true"><span>ReelYarn</span></div>
      <div className="fbar"><span>&copy;2026 ReelYarn</span><a href="#top">Back to top <Out /></a></div>
    </footer>
  );
}
