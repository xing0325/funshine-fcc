"use client";

import "./CaseStudiesSlide.css";

/**
 * CaseStudiesSlide — dabbledee.com .casestudies-sec 克隆
 * 结构/文案 1:1 取自 docs/research/components/slide-case-studies.source.html
 * 样式在 CaseStudiesSlide.css（.casestudies-sec 作用域，webflow 权威值）
 * 入场: 引擎在根元素加 .is-active → 标题逐字上浮(--ci) + 药丸卡级联(--mi)
 * 本地化: 视频 <source> webm 在前、mp4 兜底（原站 mp4 在前）；lj 仅 webm。
 *          视频指向本地 /videos/*，图片资产已抽到 /images/*。
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

type VideoSource = { src: string; type: string };

type Study = {
  slug: string;
  name: string;
  industry: string;
  role: string;
  years: string;
  /** webm 在前，mp4 兜底（原站顺序相反，本地化调整） */
  sources: VideoSource[];
};

/** 四组案例，文案/年份/职位/行业原样取自 source.html */
const STUDIES: Study[] = [
  {
    slug: "true-classic",
    name: "True Classic",
    industry: "Fashion E-Commerce",
    role: "Brand Director",
    years: "2022-2023",
    sources: [
      { src: "/videos/tc-cover.webm", type: "video/webm" },
      { src: "/videos/tc-cover.mp4", type: "video/mp4" },
    ],
  },
  {
    slug: "ettitude",
    name: "Ettitude",
    industry: "Home Goods E-Commerce",
    role: "Creative Director",
    years: "2018-2021",
    sources: [
      { src: "/videos/ettitude-cover.webm", type: "video/webm" },
      { src: "/videos/ettitude-cover.mp4", type: "video/mp4" },
    ],
  },
  {
    slug: "jordin-sparks",
    name: "Jordin Sparks",
    industry: "Music",
    role: "Creative Director",
    years: "2023",
    sources: [
      { src: "/videos/js-cover.webm", type: "video/webm" },
      { src: "/videos/js-cover.mp4", type: "video/mp4" },
    ],
  },
  {
    slug: "lauren-jauregui",
    name: "Lauren Jauregui",
    industry: "Music",
    role: "Creative Director",
    years: "2018",
    // lj 只有 webm 资产，无 mp4
    sources: [{ src: "/videos/lj-cover.webm", type: "video/webm" }],
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
          {/* ---- 头部带: CASE STUDIES 描边标题 + 右侧定义句 ---- */}
          <div className="slide-hdr">
            <div className="container">
              <div className="slide-hdr-in">
                <h2
                  data-text="CASE STUDIES"
                  data-splitting=""
                  className="slide-hdr-hdng"
                >
                  <SplitText text="CASE STUDIES" />
                </h2>
                <div className="slide-hdr-right align-right full" data-splitting="">
                  <div>
                    Brand building is akin to world building. Like anything in
                    nature,
                    <br />{" "}
                    <strong>
                      <em>it must stand strong</em>
                    </strong>
                    <em> but be always evolving.</em>
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
                            href={`/case-study/${s.slug}`}
                            className="casestudy-card-img-wpr w-inline-block"
                          >
                            <div className="casestudy-card-img w-embed">
                              <video
                                width="100%"
                                height="100%"
                                autoPlay
                                playsInline
                                muted
                                loop
                                className="cs-cover-video"
                              >
                                {s.sources.map((src) => (
                                  <source
                                    key={src.src}
                                    src={src.src}
                                    type={src.type}
                                  />
                                ))}
                                Your browser does not support the video tag.
                              </video>
                            </div>
                            <div className="cs-cover-overlay">
                              <div>{s.name}</div>
                            </div>
                          </a>
                          <div className="casestudy-card-btm">
                            <div className="casestudy-card-btm-lft">
                              <a
                                href={`/case-study/${s.slug}`}
                                className="casestudy-card-link w-inline-block"
                              >
                                <div>{s.name}</div>
                              </a>
                              <div>{s.industry}</div>
                            </div>
                            <div className="casestudy-card-btm-rht">
                              <div className="brand-name">{s.role}</div>
                              <div>{s.years}</div>
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
