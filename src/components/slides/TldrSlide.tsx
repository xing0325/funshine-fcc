"use client";

import "./TldrSlide.css";

/**
 * TldrSlide — dabbledee.com #tldr (.tldr-sec) 克隆
 * 结构/文案 1:1 取自 docs/research/components/slide-tldr.source.html
 * 样式在 TldrSlide.css（.tldr-sec 作用域，webflow 权威值）
 * 入场: 引擎在根加 .is-active → 标题逐字上浮(--ci) + 4 卡 [move-up] 级联(--data-delay)
 * 卡内小链接原站是 data-goto 跳 slide；此处渲染成 href="#<slideKey>"，
 * 交给引擎 Swiper hashNavigation({watchState}) 处理（见 PageShell）——无需 onNavigate 回调。
 */

/** 把纯文本拆成 .word > .char，--ci 全局连续（对齐 TldrSlide.css 的 var(--ci)） */
function SplitText({ text }: { text: string }) {
  let ci = 0;
  const words = text.split(" ");
  return (
    <>
      {words.map((word, wi) => (
        <span className="word" key={wi}>
          {[...word].map((ch, k) => (
            <span
              className="char"
              key={k}
              style={{ "--ci": ci++ } as React.CSSProperties}
            >
              {ch}
            </span>
          ))}
          {wi < words.length - 1 ? " " : null}
        </span>
      ))}
    </>
  );
}

type Card = {
  img: string;
  alt: string;
  title: string;
  para: React.ReactNode;
  linkText: string;
  linkHref: string; // 内链 #<slideKey>：引擎 hashNavigation 跳 slide
  btnText: string;
  btnHref: string; // 外链 forms.gle / calendly（原样取自 source.html）
  wrapBtn?: boolean; // 仅 CREATIVE SERVICES 卡原站多套一层 .tldr-card-btn-wpr
};

const CARDS: Card[] = [
  {
    img: "/images/6991cbbddc0bfbb17c90205e_f164f18c-e041-4155-a88d-d18406d872aa.png",
    alt: "creative service image",
    title: "CREATIVE SERVICES",
    para: (
      <p>
        From building brands to creative direction to creative campaigns, I got
        you covered.
      </p>
    ),
    linkText: "SERVICES INFO",
    linkHref: "#services",
    btnText: "Contact Me",
    btnHref: "https://forms.gle/yzWXcnkTXCTWrEpr6",
    wrapBtn: true,
  },
  {
    img: "/images/66054ec00196cd052196e895_case-studies2.png",
    alt: "casestudy image",
    title: "CASE STUDIES",
    para: (
      <p>
        <em>
          Check out my previous projects across e-comm home, fashion &amp;
          music.
        </em>
      </p>
    ),
    linkText: "EXPLORE WORK",
    linkHref: "#case-studies",
    btnText: "Contact Me",
    btnHref: "https://forms.gle/yzWXcnkTXCTWrEpr6",
  },
  {
    // 原站文件名含空格/逗号 → 磁盘保存为 URL 编码字面量（%20/%2C），
    // 故 <img src> 需二次编码（% → %25），静态服务器 decode 一次后才匹配到真实文件。
    img: "/images/6991ccd8ec677b2ce2af2f9a_ChatGPT%2520Image%2520Feb%252015%252C%25202026%252C%252001_40_21%2520PM.png",
    alt: "coaching image",
    title: "COACHING",
    para: (
      <p>
        Feeling stuck in a creative rut or need some peer support to jumpstart a
        project?
      </p>
    ),
    linkText: "COACHING INFO",
    linkHref: "#coaching",
    btnText: "Schedule A Call",
    btnHref: "https://calendly.com/dabbldee/30min",
  },
  {
    img: "/images/6991cd4789ebd1d519665134_ChatGPT%2520Image%2520Feb%252015%252C%25202026%252C%252001_42_10%2520PM.png",
    alt: "art image",
    title: "FINE ART",
    para: (
      <p>Fine Arts is an ongoing personal practice. Explore or reach out to collab!</p>
    ),
    linkText: "EXPLORE ART",
    linkHref: "#fine-art",
    btnText: "Contact Me",
    btnHref: "https://forms.gle/yzWXcnkTXCTWrEpr6",
  },
];

export function TldrSlide({ isActive }: { isActive?: boolean }) {
  return (
    <section className={`tldr-sec bg-red${isActive ? " is-active" : ""}`}>
      <div className="page-slider-cntnt">
        <div className="page-slider-cntnt-in bg-red">
          {/* ---- 头部带: TL;DR + 副标 ---- */}
          <div className="slide-hdr ylw">
            <div className="container">
              <div className="slide-hdr-in">
                <h2
                  className="slide-hdr-hdng ylw"
                  data-text="TL;DR"
                  data-splitting=""
                >
                  <SplitText text="Tl;dr" />
                </h2>
                <div className="slide-hdr-right tldr ylw">
                  <div data-splitting="">
                    Welcome to my creative playground. <br />
                    <strong>
                      <em>Explore my work &amp; lets collab.</em>
                    </strong>
                  </div>
                </div>
              </div>
            </div>
            <div className="sldr-hdr-btm-line ylw" />
          </div>

          {/* ---- 4 张竖卡 ---- */}
          <div data-move="" className="tldr-btm-cntnt">
            <div className="container">
              <div className="tldr-row">
                {CARDS.map((card, i) => {
                  const btn = (
                    <a
                      href={card.btnHref}
                      target="_blank"
                      rel="noreferrer"
                      className="cmn-btn"
                    >
                      <div>{card.btnText}</div>
                    </a>
                  );
                  return (
                    <div className="tldr-col" key={i}>
                      <div
                        {...{ "move-up": "" }}
                        className="tldr-card"
                        style={{ "--data-delay": i } as React.CSSProperties}
                      >
                        <div className="tldr-card-img-wpr">
                          <img
                            src={card.img}
                            loading="eager"
                            alt={card.alt}
                            className="tldr-card-img"
                          />
                        </div>
                        <div className="tldr-card-body">
                          <h3 className="tldr-card-title">{card.title}</h3>
                          <div className="cmn-rich-txt tldr-card-para">
                            {card.para}
                          </div>
                          <a href={card.linkHref} className="tldr-card-link">
                            {card.linkText}
                          </a>
                          {card.wrapBtn ? (
                            <div className="tldr-card-btn-wpr">{btn}</div>
                          ) : (
                            btn
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="right-grdnt" />
        </div>
      </div>
    </section>
  );
}
