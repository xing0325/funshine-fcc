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
  btnHref: string; // FCC 联系方式：tel:4000155158（原站为 forms.gle / calendly 外链）
  wrapBtn?: boolean; // 保留：原站 CREATIVE SERVICES 卡多套一层 .tldr-card-btn-wpr；FCC 4 卡统一不用
};

const CARDS: Card[] = [
  {
    img: "images/fcc/consult-sofa.jpg",
    alt: "FCC 沙发咨询场景",
    title: "Light Your Path 探索精神",
    para: (
      <p>发掘全球高潜力赛道，看清亚太 / 北美 / 英国真正有潜力的机会。</p>
    ),
    linkText: "WHY FCC",
    linkHref: "#coaching",
    btnText: "Contact",
    btnHref: "tel:4000155158",
  },
  {
    img: "images/fcc/mentor-1v1.jpg",
    alt: "FCC 一对一带教",
    title: "Build Real Skills 实践精神",
    para: (
      <p>顶尖导师 1v1，从金融建模、AI 应用到职场表达，求职稳得住、打得赢。</p>
    ),
    linkText: "SERVICES",
    linkHref: "#services",
    btnText: "Contact",
    btnHref: "tel:4000155158",
  },
  {
    img: "images/fcc/blackboard-plan.jpg",
    alt: "FCC 黑板职业规划",
    title: "Play Long Game 长期主义",
    para: (
      <p>短期站上头部平台，长期搭建可持续增值的成长路线，转行晋升都不慌。</p>
    ),
    linkText: "CASES",
    linkHref: "#case-studies",
    btnText: "Contact",
    btnHref: "tel:4000155158",
  },
  {
    img: "images/fcc/meeting-present.jpg",
    alt: "FCC 会议演示场景",
    title: "Focus Sectors 关注赛道",
    para: (
      <p>
        数字智能 · 大健康 · 半导体 · 双碳 · 跨境出海——押注驱动人类进步的新赛道。
      </p>
    ),
    linkText: "ABOUT",
    linkHref: "#about",
    btnText: "Contact",
    btnHref: "tel:4000155158",
  },
];

export function TldrSlide({ isActive }: { isActive?: boolean }) {
  return (
    <section className={`tldr-sec bg-red${isActive ? " is-active" : ""}`}>
      <div className="page-slider-cntnt">
        <div className="page-slider-cntnt-in bg-red">
          {/* ---- 头部带: WHY FCC + 副标 ---- */}
          <div className="slide-hdr ylw">
            <div className="container">
              <div className="slide-hdr-in">
                <h2
                  className="slide-hdr-hdng ylw"
                  data-text="WHY FCC"
                  data-splitting=""
                >
                  <SplitText text="Why FCC" />
                </h2>
                <div className="slide-hdr-right tldr ylw">
                  <div data-splitting="">
                    <strong>在不确定世界中探索更确定的结果</strong>
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
