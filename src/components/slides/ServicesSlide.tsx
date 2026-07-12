"use client";

import "./ServicesSlide.css";

/**
 * ServicesSlide — dabbledee.com .service-sec 克隆，文案改造为 FCC / Funshine Career Consulting
 * 结构/布局/动画 1:1 取自 docs/research/components/slide-services.source.html
 * 文案依据 docs/research/FCC_CONTENT.md（SERVICES 段）
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
    title: "Career Navigator™",
    groups: [
      {
        h: "专属职业规划",
        items: ["行业定位", "简历精修", "面试辅导", "职业测评 MBTI"],
      },
      {
        h: "独家职训系统",
        items: ["历年真题", "内享直播", "行业匹配", "求职通识课"],
      },
    ],
    price: "精英求职陪跑 · 6–36 个月",
  },
  {
    title: "Global Career Pro™",
    groups: [
      {
        h: "海外求职",
        items: ["无限内推", "直达招聘决策者", "技能提升包"],
      },
      {
        h: "全程无忧",
        items: ["赫子·学管·教研全程陪伴", "Networking 策略", "实战模拟"],
      },
    ],
    price: "海外求职精英 · 6–48 个月",
  },
  {
    title: "6-Phase Coaching",
    groups: [
      {
        h: "诊断 → 匹配",
        items: ["背景诊断", "顾问匹配"],
      },
      {
        h: "带教 → 落地",
        items: ["导师指导", "实战模拟", "职场分析", "最终申请"],
      },
    ],
    price: "全流程 1v1 · 终身校友网络",
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
                  <SplitHeading text="SERVICES" />
                </h2>
                <div className="slide-hdr-right hide">
                  <div>
                    <strong>
                      <em>Want to work together?</em>
                    </strong>
                  </div>
                </div>
                <div className="slide-hdr-btn-wpr">
                  <a href="tel:4000155158" className="cmn-btn white">
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
