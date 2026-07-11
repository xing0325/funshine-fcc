"use client";

import "./ServicesSlide.css";

/**
 * ServicesSlide — dabbledee.com .service-sec 克隆
 * 结构/文案 1:1 取自 docs/research/components/slide-services.source.html
 * 样式在 ServicesSlide.css（webflow 权威值）
 * 入场: 引擎在根加 .is-active → 标题逐字(--char-index) + 三卡 [move-up] 级联(--data-delay)
 */

/** 拆成 .word > .char，--char-index 全局连续（对齐 ServicesSlide.css） */
function SplitHeading({ text }: { text: string }) {
  let ci = 0;
  return (
    <>
      {text.split(" ").map((word, wi, arr) => (
        <span className="word" key={wi}>
          {[...word].map((ch, k) => (
            <span
              className="char"
              key={k}
              style={{ "--char-index": ci++ } as React.CSSProperties}
            >
              {ch}
            </span>
          ))}
          {wi < arr.length - 1 ? " " : null}
        </span>
      ))}
    </>
  );
}

type Card = {
  title: string;
  groups: { h: string; items: string[] }[];
  price: string;
};

const CARDS: Card[] = [
  {
    title: "HARD WORK",
    groups: [
      {
        h: "Design",
        items: [
          "Graphic Design: web UI, flyer, EDM, graphics, typography, packaging etc.",
          "Illustration: book covers, print commission, brand icons, etc.",
        ],
      },
      { h: "Photo", items: ["Art Direction", "Retouching"] },
    ],
    price: "$110/ Hour",
  },
  {
    title: "BRANDING & REBRANDING",
    groups: [
      {
        h: "Basic",
        items: [
          "Visual Identity: logo/ wordmark, typography, art direction, design direction (packaging to digital interface design)",
        ],
      },
      {
        h: "Upgrade",
        items: [
          "Verbal Identity: brand naming, tagline, manifesto, voice guidelines",
          "Defining brand identity: core & growth demos , mission/vision/purpose",
        ],
      },
    ],
    price: "$10,000+",
  },
  {
    title: "CREATIVE STRATEGY",
    groups: [
      {
        h: "Campaigns",
        items: [
          "Strategic campaign concept & execution: Aligning with brand goals and engaging the target audience.",
        ],
      },
      {
        h: "Organization",
        items: [
          "Recruiting, hiring & onboarding",
          "Creative organization assessment & recommendations",
        ],
      },
    ],
    price: "$150/ Hour",
  },
];

export function ServicesSlide({ isActive }: { isActive?: boolean }) {
  return (
    <section className={`service-sec${isActive ? " is-active" : ""}`}>
      <div className="page-slider-cntnt">
        <div className="page-slider-cntnt-in">
          {/* ---- 头部带 ---- */}
          <div className="slide-hdr">
            <div className="container">
              <div className="slide-hdr-in">
                <h2 className="slide-hdr-hdng splitting" data-splitting="">
                  <SplitHeading text="CREATIVE SERVICES" />
                </h2>
                <div className="slide-hdr-right hide">
                  <div>
                    <strong>
                      <em>Want to work together?</em>
                    </strong>
                  </div>
                </div>
                <div className="slide-hdr-btn-wpr">
                  <a
                    href="https://forms.gle/yzWXcnkTXCTWrEpr6"
                    target="_blank"
                    rel="noreferrer"
                    className="cmn-btn white"
                  >
                    <div>CONTACT ME</div>
                  </a>
                </div>
              </div>
            </div>
            <div className="sldr-hdr-btm-line" />
          </div>

          {/* ---- 三卡价目 ---- */}
          <div data-move="" className="service-cntnt-wpr">
            <div className="container">
              <div className="service-row">
                {CARDS.map((card, i) => (
                  <div className="service-col" key={i}>
                    <div
                      {...{ "move-up": "" }}
                      className="service-card"
                      style={{ "--data-delay": i } as React.CSSProperties}
                    >
                      <div className="service-card-hdr">
                        <h2 className="service-card-title">{card.title}</h2>
                      </div>
                      <div className="service-card-body">
                        <div className="service-rich-txt">
                          {card.groups.map((g, gi) => (
                            <div key={gi}>
                              <h3>{g.h}</h3>
                              <ul role="list">
                                {g.items.map((it, ii) => (
                                  <li key={ii}>{it}</li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="service-card-footer">
                        <h3 className="service-footer-title">{card.price}</h3>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
