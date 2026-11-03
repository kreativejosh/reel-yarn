import { faqs, formats, startWays, site } from "@/content/site";

const ticks = [0, 1, 2, 3, 4, 5, 6, 7, 8];

export function Formats() {
  const [lessons, lists, promos, captions, stick, ads] = formats.kinds;
  return (
    <section className="band sec" id="formats" style={{ paddingTop: 20 }} aria-labelledby="formats-h">
      <div className="wrap">
        <div className="sec-head">
          <h2 id="formats-h">{formats.heading}</h2>
          <p>{formats.intro}</p>
        </div>
        <div className="tiles">
          <div className="tile t1"><span className="tag">{lessons}</span>
            <p className="q">3 + <span>4</span> = ?</p>
            <div className="numline" aria-hidden="true">
              <span className="hop" style={{ left: "37.5%", width: "50%" }}></span>
              {ticks.map((n) => [
                <i key={`i${n}`} style={{ left: `${n * 12.5}%` }}></i>,
                <b key={`b${n}`} style={{ left: `${n * 12.5}%` }}>{n}</b>,
              ])}
            </div>
          </div>
          <div className="tile t2"><span className="tag">{lists}</span>
            <div className="stack5">
              {["Suya at midnight", "Puff-puff", "Boli and fish", "Akara", "Shawarma"].map((x, i) => <div key={x}><b>{i + 1}</b>{x}</div>)}
            </div>
          </div>
          <div className="tile t3"><span className="tag">{promos}</span>
            <div className="shot"><span className="hd">New this week</span><div className="rowp"><span></span><span></span></div><span className="cta">Order now</span></div>
          </div>
          <div className="tile t4"><span className="tag">{captions}</span>
            <div className="raw">
              <b>RAW</b><em>so here&apos;s</em>
              <div className="wave" aria-hidden="true">
                {Array.from({ length: 34 }, (_, i) => <i key={i} style={{ height: `${6 + Math.abs(Math.sin(i * 1.7)) * 22}px` }}></i>)}
              </div>
            </div>
          </div>
          <div className="tile t5"><span className="tag">{stick}</span>
            <svg viewBox="0 0 260 150" fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" aria-hidden="true"><circle cx="70" cy="30" r="16" /><path d="M70 46v50M70 62l-26 16M70 62l30-6M70 96l-20 40M70 96l22 40" /><circle cx="190" cy="30" r="16" /><path d="M190 46v50M190 62l-30-6M190 62l26-26M190 96l-20 40M190 96l22 40" /><path d="M110 18c10-10 30-10 40 0" stroke="#ffd29e" /><circle cx="130" cy="8" r="3" fill="#ffd29e" stroke="none" /></svg>
          </div>
          <div className="tile t6"><span className="tag">{ads}</span>
            <span className="frame"></span>
            <div className="ad"><small>New arrivals · Ankara</small><strong>Bold prints. <span>Made to stand out.</span></strong><div className="pills"><span>Free delivery in Lagos</span><span>Sizes 6–20</span></div></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function StartWays() {
  const [up, web] = startWays;
  return (
    <section className="band sec start" aria-labelledby="start-h">
      <div className="wrap">
        <div className="sec-head">
          <h2 id="start-h">Start however you like, end with a video you can post.</h2>
          <p>Bring an idea, your photos, your website or a video of you talking. ReelYarn picks the right format and makes your first draft.</p>
        </div>
        <div className="two">
          <div>
            <h3>{up.title}</h3>
            <p>{up.body}</p>
            <div className="visual v-up" aria-hidden="true">
              <div className="drop"><span className="ic"></span><b>Drop your files</b><span>Photos, logo or a talking video</span></div>
              <div className="files"><i>menu.jpg</i><i>logo.png</i><i>me-talking.mp4</i></div>
            </div>
          </div>
          <div>
            <h3>{web.title}</h3>
            <p>{web.body}</p>
            <div className="visual v-web" aria-hidden="true">
              <span className="rec"><i></i>Reading yourshop.com · <b className="n">4</b> pages</span>
              <div className="browser"><div className="bar"><i></i><i></i><i></i><span>yourshop.com/new-arrivals</span></div>
                <div className="pg"><div><span></span><b></b><b></b></div><div><span></span><b></b><b></b></div><div><span></span><b></b><b></b></div><span className="scan"></span></div></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Support() {
  return (
    <section className="band" id="learn" style={{ paddingBlock: "40px 70px" }} aria-labelledby="grow-h">
      <div className="wrap grow">
        <h2 id="grow-h">Get the skills, insights, and support to grow with content</h2>
        <div className="grow-cards">
          <div className="gcard">
            <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M3 12 16 6l13 6-13 6Z" /><path d="M8.5 14.6v6.2c0 1.8 3.4 3.7 7.5 3.7s7.5-1.9 7.5-3.7v-6.2" /><path d="M29 12v8" /></svg>
            <p>Enroll in the ReelYarn Academy to learn hooks, posting plans and growth</p>
            <a href={site.links.academy}>See the academy <span aria-hidden="true">&rarr;</span></a>
          </div>
          <div className="gcard">
            <svg viewBox="0 0 32 32" aria-hidden="true"><circle cx="16" cy="13" r="4" /><path d="M8.5 26c.8-4 3.8-6.5 7.5-6.5s6.7 2.5 7.5 6.5" /><circle cx="7.5" cy="9" r="3" /><path d="M2.5 19c.6-3 2.6-4.8 5-4.8 1 0 1.9.3 2.7.8" /><circle cx="24.5" cy="9" r="3" /><path d="M29.5 19c-.6-3-2.6-4.8-5-4.8-1 0-1.9.3-2.7.8" /></svg>
            <p>Join a community of business owners, creators and teachers who post every week</p>
            <a href={site.links.community}>Join the community <span aria-hidden="true">&rarr;</span></a>
          </div>
          <div className="gcard">
            <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M11 17V7.5a1.8 1.8 0 0 1 3.6 0V15" /><path d="M14.6 14V5.5a1.8 1.8 0 0 1 3.6 0V14" /><path d="M18.2 14V7a1.8 1.8 0 0 1 3.6 0v8" /><path d="M21.8 13.5a1.8 1.8 0 0 1 3.6 0V19c0 5-3.6 9-8.6 9-3.5 0-5.4-1.6-7.4-4.4L6 18.8a1.9 1.9 0 0 1 3-2.2l2 2.4" /><path d="M8 4.5 9.5 6M5 8l2 .6M22.5 3.5 21.5 5" /></svg>
            <p>Work with ReelYarn experts to plan your content and grow faster</p>
            <a href={site.links.services}>Learn more about services <span aria-hidden="true">&rarr;</span></a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Faq() {
  return (
    <section className="band sec" id="faq" style={{ paddingTop: 40 }} aria-labelledby="faq-h">
      <div className="wrap faq">
        <h2 id="faq-h">Frequently<br />asked questions</h2>
        <div>
          {faqs.map(({ q, a }) => (
            <details key={q} name="faq">
              <summary><span className="plus" aria-hidden="true"></span><h3 style={{ all: "unset" }}>{q}</h3></summary>
              <p className="ans">{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
