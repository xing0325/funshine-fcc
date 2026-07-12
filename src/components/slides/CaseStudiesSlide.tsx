"use client";

import "./CaseStudiesSlide.css";

/**
 * CaseStudiesSlide — dabbledee.com .casestudies-sec 克隆 → FCC 学员案例
 * 结构/布局/药丸卡形/逐字动画沿用 dabbledee 原件（slide-case-studies.source.html）
 * 内容改造依据: docs/research/FCC_CONTENT.md「CASE STUDIES（学员案例）」段
 * 样式在 CaseStudiesSlide.css（.casestudies-sec 作用域，webflow 权威值）
 * 入场: 引擎在根元素加 .is-active → 标题逐字上浮(--ci) + 药丸卡级联(--mi)
 * 本地化: 药丸卡内 <video> 改为静态封面图 <img>（/images/fcc/*），
 *          复用 .cs-cover-video 类保持 object-fit:cover 撑满药丸；不再引用 /videos/*。
 */

/** 把纯文本拆成 .word > .char，--ci 全局连续（对齐 CaseStudiesSlide.css 的 var(--ci)） */
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

type Study = {
  slug: string;
  /** 学员名（卡底左上行 + hover 遮罩） */
  name: string;
  /** 院校（卡底左下行） */
  school: string;
  /** 去向公司 · 岗位（卡底右上行，加粗） */
  offer: string;
  /** 地区（卡底右下行） */
  region: string;
  /** 药丸封面图（/images/fcc/*，object-fit:cover 撑满） */
  image: string;
};

/** 四位学员案例，文案取自 FCC_CONTENT.md「CASE STUDIES」段；配图顺序同任务约定 */
const STUDIES: Study[] = [
  {
    slug: "vicky",
    name: "Vicky",
    school: "香港大学 HKU",
    offer: "野村证券 Nomura · IBD",
    region: "（香港）",
    image: "/images/fcc/mentor-1v1.jpg",
  },
  {
    slug: "cecilia",
    name: "Cecilia",
    school: "约翰霍普金斯 JHU",
    offer: "联合利华 Unilever · FMCG",
    region: "（国内）",
    image: "/images/fcc/consult-sofa.jpg",
  },
  {
    slug: "nana",
    name: "NaNa",
    school: "墨尔本大学 Melbourne",
    offer: "字节跳动 ByteDance",
    region: "（国内）",
    image: "/images/fcc/group-discuss.jpg",
  },
  {
    slug: "sunny",
    name: "Sunny",
    school: "波士顿大学 BU",
    offer: "Capital One 第一资本",
    region: "（美国）",
    image: "/images/fcc/meeting-present.jpg",
  },
];

export function CaseStudiesSlide({ isActive }: { isActive?: boolean }) {
  return (
    <section
      id="casestudy"
      className={`casestudies-sec swiper-slide${isActive ? " is-active" : ""}`}
    >
      <div className="page-slider-cntnt">
        <div className="page-slider-cntnt-in">
          {/* ---- 头部带: CASES 描边标题 + 右侧副行 ---- */}
          <div className="slide-hdr">
            <div className="container">
              <div className="slide-hdr-in">
                <h2 data-text="CASES" data-splitting="" className="slide-hdr-hdng">
                  <SplitText text="CASES" />
                </h2>
                <div className="slide-hdr-right align-right full" data-splitting="">
                  <div>
                    我们已成功辅导上百位同学拿到理想 offer
                    <br />{" "}
                    <strong>
                      <em>100+ Offers Landed</em>
                    </strong>
                  </div>
                </div>
              </div>
            </div>
            <div className="sldr-hdr-btm-line" />
          </div>

          {/* ---- 2×2 药丸卡网格（左右红竖线成框）---- */}
          <div className="casestudy-cntnt-wpr">
            <div className="container h-full">
              <div data-move="" className="casestudy-cntnt-in">
                <div className="cs-lft-line" />
                <div className="cs-rht-line" />
                <div className="w-dyn-list">
                  <div role="list" className="casestudy-row w-dyn-items">
                    {STUDIES.map((s, i) => (
                      <div
                        role="listitem"
                        className="casestudy-col w-dyn-item"
                        key={s.slug}
                      >
                        <div
                          className="casestudy-card"
                          style={{ "--mi": i } as React.CSSProperties}
                          {...{ "move-up": "" }}
                        >
                          <a
                            href="#home"
                            className="casestudy-card-img-wpr w-inline-block"
                          >
                            <div className="casestudy-card-img w-embed">
                              <img
                                src={s.image}
                                alt={`${s.name} · ${s.school}`}
                                className="cs-cover-video"
                              />
                            </div>
                            <div className="cs-cover-overlay">
                              <div>{s.name}</div>
                            </div>
                          </a>
                          <div className="casestudy-card-btm">
                            <div className="casestudy-card-btm-lft">
                              <a
                                href="#home"
                                className="casestudy-card-link w-inline-block"
                              >
                                <div>{s.name}</div>
                              </a>
                              <div>{s.school}</div>
                            </div>
                            <div className="casestudy-card-btm-rht">
                              <div className="brand-name">{s.offer}</div>
                              <div>{s.region}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
