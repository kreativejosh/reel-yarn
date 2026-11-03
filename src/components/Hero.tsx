import { hero, nav, site } from "@/content/site";
import { HeroStage } from "./HeroStage";
import { LiquidGlass } from "./LiquidGlass";
import { Roll } from "./Roll";

export function Nav() {
  return (
    <header id="top" className="band">
      <div className="wrap">
        <nav className="top" aria-label="Main">
          <a href="#top" className="logo" aria-label={`${site.name} home`}><i></i>{site.name}</a>
          <div className="links">
            {nav.map((l) => <a key={l.href} href={l.href}>{l.label}</a>)}
          </div>
          <div className="navr">
            <a href={site.links.signIn} className="btn ghost"><Roll>Sign in</Roll></a>
            <a href={site.links.signUp} className="btn btn-black"><Roll>Start free</Roll></a>
          </div>
        </nav>
      </div>
    </header>
  );
}

// Seeded so the server and browser draw the same squares (no hydration mismatch).
function dissolveSquares() {
  let seed = 7;
  const rand = () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;
  const out: { left: number; top: number; background: string; opacity: number }[] = [];
  for (let r = 0; r < 20; r++)
    for (let c = 0; c < 14; c++) {
      const p = c / 13;
      if (rand() > p * 0.85 + 0.05) continue;
      const background = rand() < 0.5 ? "#ff5a1f" : rand() < 0.5 ? "#ffffff" : "#ffb27a";
      out.push({ left: c * 22, top: r * 22, background, opacity: +(0.25 + rand() * 0.75).toFixed(2) });
    }
  return out;
}

export function Hero() {
  return (
    <HeroStage>
      {/* Two glass pieces frame the hero: one tall on the right, one sweeping in from the left toward the app. */}
      <div className="ribbon r-right" aria-hidden="true">
        <LiquidGlass src="/media/glass-ribbon.webp" width={970} height={1946} sizes="(max-width: 860px) 74vw, 740px" priority />
      </div>
      <div className="ribbon r-left" aria-hidden="true">
        <LiquidGlass src="/media/glass-sweep.webp" width={1300} height={970} sizes="(max-width: 860px) 112vw, 900px" seed={3.7} />
      </div>
      <div className="wrap">
        <h1 id="hero-h"><span className="ln">{hero.lines[0]}</span> <span className="ln dim">{hero.lines[1]}</span></h1>
        <p className="sub">{hero.sub}</p>
        <div className="ctas">
          <a href={site.links.signUp} className="btn btn-orange"><Roll>Make your first video free</Roll></a>
          <a href="#gallery" className="btn btn-outline"><Roll>See what it makes</Roll></a>
        </div>
        <p className="fine">{hero.fine}</p>

        <div className="app" role="figure" aria-label="ReelYarn editor making a café promo">
          <div className="tools" aria-hidden="true"><b></b><b></b><b></b><b></b><b></b><b></b><b></b></div>
          <div className="stage">
            <div className="stagebar"><span className="chip-d on">☕ Café promo</span><span className="chip-d">30 s</span><span className="seg"><span className="on">9:16</span><span>1:1</span><span>16:9</span></span></div>
            <div className="canvas">
              <div className="phone-mock">
                <div className="sun"></div>
                <p className="cap">every morning at <em>7</em></p>
                <p className="t">Fresh croissants</p>
                <span className="p">Latte + croissant · $6</span>
              </div>
              <div className="dissolve" aria-hidden="true">
                {dissolveSquares().map((s, i) => <span key={i} style={s} />)}
              </div>
            </div>
            <div className="timeline" aria-hidden="true"><span></span><span></span><span></span><span></span><span></span><i className="playhead"></i></div>
          </div>
          <aside className="side">
            <div className="row"><span className="pill">🎙 Voice</span><span className="pill">🌍 Pidgin</span><span className="share">Download</span></div>
            <div><span className="seg"><span>Edit</span><span className="on">Assistant</span></span></div>
            <p className="agent-msg">Got it. I&apos;m making a 30-second promo for your café from your website.</p>
            <div className="steps-a">
              <div className="done"><i></i>Reading your website</div>
              <div className="done"><i></i>Writing the script</div>
              <div className="now"><i></i>Designing the scenes</div>
              <div className="todo"><i></i>Adding voice &amp; captions</div>
            </div>
          </aside>
        </div>
      </div>
    </HeroStage>
  );
}
