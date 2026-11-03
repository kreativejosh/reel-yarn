"use client";

import { useRef, useState } from "react";
import { editFeatures, languages, voices, type EditFeature } from "@/content/site";

const grads = ["linear-gradient(135deg,#0f6b5c,#e0913a)", "linear-gradient(135deg,#7a4a12,#ffb04a)", "linear-gradient(135deg,#b8470f,#ff8a3d)", "linear-gradient(135deg,#2a3a7a,#ff7a3d)", "linear-gradient(135deg,#5a1f08,#ff5a1f)", "linear-gradient(135deg,#3a2a5a,#ff9a6a)"];

const panels: Record<EditFeature["key"], React.ReactNode> = {
  voice: voices.map(([n, tags, saved], i) => (
    <div className="voice" key={n}>
      <span className="pl" style={{ background: grads[i] }}><i></i></span>
      <div><div className="nm">{n}</div><div className="tg">{tags.map((x) => <span key={x}>{x}</span>)}</div></div>
      <span className={saved ? "bm" : "bm off"}></span>
    </div>
  )),
  caps: (
    <div className="capstyles">
      <div><small>Bold</small><span className="c-bold">fresh <em>every</em> day</span></div>
      <div><small>Clean</small><span className="c-clean">fresh every day</span></div>
      <div><small>Pop</small><span className="c-pop">fresh every day</span></div>
      <div><small>Minimal</small><span className="c-min">fresh every day</span></div>
    </div>
  ),
  lang: (
    <div className="langs">
      {languages.map(([l, accents]) => (
        <div key={l}><b>{l}</b><span>{accents.map((x, i) => <i key={x} className={i === 0 ? "on" : ""}>{x}</i>)}</span></div>
      ))}
    </div>
  ),
  shape: (
    <div className="shapes">
      <div><span style={{ width: 90, height: 160 }}></span>9:16 · TikTok, Reels</div>
      <div><span style={{ width: 120, height: 120 }}></span>1:1 · Feed</div>
      <div><span style={{ width: 190, height: 107 }}></span>16:9 · YouTube</div>
    </div>
  ),
  words: (
    <div className="chat">
      <div className="me">make the price bigger</div>
      <div className="ry">Done. Updated scene 3 only.</div>
      <div className="me">use the blue logo and make it 15 seconds</div>
      <div className="ry">Swapped the logo and trimmed to 15 s. Want a Pidgin version too?</div>
      <div className="me">yes</div>
    </div>
  ),
};

export function EditFeatures() {
  const [active, setActive] = useState<EditFeature["key"]>("voice");
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKey = (e: React.KeyboardEvent, i: number) => {
    const n = e.key === "ArrowDown" ? 1 : e.key === "ArrowUp" ? -1 : 0;
    if (!n) return;
    e.preventDefault();
    const j = (i + n + editFeatures.length) % editFeatures.length;
    tabs.current[j]?.focus();
    setActive(editFeatures[j].key);
  };

  return (
    <section className="band sec" id="edit" aria-labelledby="edit-h">
      <div className="wrap">
        <div className="sec-head edit-head">
          <h2 id="edit-h"><span className="dim">Let ReelYarn edit.</span><br />Take control if you want.</h2>
          <p>Everything an editor would do, done for you. Ask for changes in plain words, or fine-tune every detail yourself.</p>
        </div>
        <div className="edit">
          <div className="feats" role="tablist" aria-label="Editing features" aria-orientation="vertical">
            {editFeatures.map((f, i) => (
              <button
                key={f.key}
                ref={(el) => { tabs.current[i] = el; }}
                className="feat"
                role="tab"
                id={`f-${f.key}`}
                aria-selected={active === f.key}
                aria-controls={`p-${f.key}`}
                tabIndex={active === f.key ? 0 : -1}
                onClick={() => setActive(f.key)}
                onKeyDown={(e) => onKey(e, i)}
              >
                {f.name}<p>{f.body}</p>
              </button>
            ))}
          </div>
          <div className="panel">
            {/* Every panel is in the HTML for crawlers; only the active one is shown. */}
            {editFeatures.map((f) => (
              <div key={f.key} className="card-d feat-panel" role="tabpanel" id={`p-${f.key}`} aria-labelledby={`f-${f.key}`} hidden={active !== f.key}>
                {panels[f.key]}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
