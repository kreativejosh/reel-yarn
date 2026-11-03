"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { sampleVideos, site, type SampleVideo } from "@/content/site";

export function Gallery() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [current, setCurrent] = useState<SampleVideo | null>(null);

  useEffect(() => {
    if (!current) return;
    dialogRef.current!.showModal();
    videoRef.current!.play().catch(() => {});
  }, [current]);

  const close = () => dialogRef.current!.close();

  return (
    <>
      <section className="band sec" id="gallery" aria-labelledby="gallery-h">
        <div className="wrap">
          <div className="gal-head">
            <div>
              <h2 id="gallery-h">If you can say it, you can post it</h2>
              <p>Every video below was made with ReelYarn from one line. Press play to watch, then type your own.</p>
            </div>
            <a href={site.links.signUp} className="btn btn-black">Create videos now</a>
          </div>

          <div className="vgrid">
            {sampleVideos.map((v) => (
              <figure key={v.slug} className={v.wide ? "vc wide" : "vc"} onClick={() => setCurrent(v)}>
                <div className="vm">
                  {v.wide && <Image className="blur" src={`/media/${v.poster}`} alt="" fill sizes="50vw" />}
                  <Image className={v.wide ? "fit" : undefined} src={`/media/${v.poster}`} alt={`${v.tag}: ${v.title}`} fill sizes={v.wide ? "(max-width: 980px) 100vw, 580px" : "(max-width: 980px) 50vw, 280px"} />
                  <span className="vc-tag">{v.tag}</span>
                  <button className="vc-play" aria-label={`Play preview: ${v.tag}`}></button>
                </div>
                <figcaption className="prompt"><b>Prompt:</b> {v.prompt}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <dialog
        className="vmodal"
        ref={dialogRef}
        aria-label="Video preview"
        onClick={(e) => { if (e.target === e.currentTarget) close(); }}
        onClose={() => { const vv = videoRef.current!; vv.pause(); setCurrent(null); }}
      >
        <button className="vclose" aria-label="Close preview" onClick={close}>&times;</button>
        <video ref={videoRef} controls playsInline src={current ? `/media/${current.slug}.mp4` : undefined} poster={current ? `/media/${current.poster}` : undefined} />
        <p>{current && <><b>Prompt:</b> {current.prompt}</>}</p>
      </dialog>
    </>
  );
}
