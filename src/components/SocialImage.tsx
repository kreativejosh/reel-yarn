import { ImageResponse } from "next/og";
import { hero, site } from "@/content/site";

export const socialSize = { width: 1200, height: 630 };
export const socialAlt = `${site.name}: ${site.tagline}`;

// Shared by opengraph-image and twitter-image.
export function renderSocialImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "72px 80px", background: "#ffffff", borderTop: "14px solid #ff5a1f", fontFamily: "sans-serif" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 40, fontWeight: 700, color: "#0e0e13", letterSpacing: "-0.03em" }}>
          <div style={{ width: 54, height: 54, borderRadius: 15, background: "#ff5a1f", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: 0, height: 0, borderTop: "12px solid transparent", borderBottom: "12px solid transparent", borderLeft: "18px solid #fff", marginLeft: 6 }} />
          </div>
          {site.name}
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 92, fontWeight: 600, lineHeight: 1.02, letterSpacing: "-0.045em" }}>
          <span style={{ color: "#0e0e13" }}>{hero.lines[0]}</span>
          <span style={{ color: "#77777f" }}>{hero.lines[1]}</span>
        </div>
        <div style={{ display: "flex", gap: 14, fontSize: 28, color: "#4d4d57" }}>
          {["AI video maker", "No subscription", "20 free credits"].map((t) => (
            <span key={t} style={{ display: "flex", padding: "10px 22px", borderRadius: 999, background: "#fff2ea", color: "#5a1f08" }}>{t}</span>
          ))}
        </div>
      </div>
    ),
    socialSize,
  );
}
