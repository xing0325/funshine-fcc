"use client";

import "./AboutSlide.css";

/**
 * AboutSlide — dabbledee.com .about-sec 克隆
 * 结构/文案 1:1 取自 docs/research/components/slide-about.source.html
 * 样式在 AboutSlide.css（.about-sec 作用域，webflow 权威值）
 * 入场: 引擎在根元素加 .is-active → 标题逐字上浮(--ci) + [move-up/down] 级联
 */

/** 把纯文本拆成 .word > .char，--ci 全局连续（对齐 AboutSlide.css 的 var(--ci)） */
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
          {wi < words.length - 1 ? " " : null}
        </span>
      ))}
    </>
  );
}

export function AboutSlide({ isActive }: { isActive?: boolean }) {
  return (
    <section className={`about-sec bg-red${isActive ? " is-active" : ""}`}>
      <div className="page-slider-cntnt">
        <div className="page-slider-cntnt-in bg-red">
          {/* ---- 头部带: ABOUT + 定义 + 星星 ---- */}
          <div className="about-sec-hdr">
            <div className="slide-hdr ylw about">
              <div className="container about">
                <div className="slide-hdr-in">
                  <h2 className="slide-hdr-hdng ylw" data-splitting="">
                    <SplitText text="ABOUT" />
                  </h2>
                  <div className="slide-hdr-right full ylw">
                    <div>
                      <strong>Dabbledee: </strong>
                      <em>(noun)</em> A polymath, embodying continuous
                      exploration,
                      <br />
                      blending diverse skills, knowledge, and passions to{" "}
                      <strong>innovate across multiple domains.</strong>
                    </div>
                  </div>
                </div>
              </div>
              <div className="sldr-hdr-btm-line ylw" />
            </div>
            <div className="about-star-wpr">
              {Array.from({ length: 6 }).map((_, i) => (
                <div className="about-star" key={i}>
                  <img
                    src="/images/65f137f19f11078973b6102a_single-star.svg"
                    loading="lazy"
                    alt="star icon"
                    className="star-icon"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* ---- 正文: 左自述 / 右插画 ---- */}
          <div className="about-page-cntnt">
            <div className="container h-full">
              <div className="about-row">
                <div className="about-lft-col">
                  <div data-move="" className="about-lft-cntnt">
                    <div {...{ "move-down": "" }} className="about-rich-txt">
                      <p>
                        dabbledee is a{" "}
                        <strong>
                          <em className="italic-text">
                            playground for showcasing my (Deena&rsquo;s) work
                          </em>
                        </strong>{" "}
                        over the last decade. I&rsquo;m an Egyptian American{" "}
                        <strong>artist &amp; creative director</strong> living
                        between LA, Lisbon &amp; Cairo. As a self proclaimed
                        polymath artist, I enjoy swiftly shifting between
                        performance driven creative to imaginative paintings and
                        everything in between.
                      </p>
                      <p>
                        I spent the last <strong>7 years</strong> working as a
                        creative director for{" "}
                        <strong>high growth e-commerce brands</strong> (e.g.
                        True Classic) as well as dabbling in the{" "}
                        <strong>music industry</strong> (e.g. Jordin Sparks)
                        here and there. I love building worlds for brands and
                        people with a strong vision.
                      </p>
                      <p>
                        My philosophy of life is rooted in fluidity and change.
                        I&rsquo;ve worn all types of hats;{" "}
                        <strong>
                          creative director, designer, strategist, brand
                          marketer, painter, sculptor &amp; photographer.
                        </strong>{" "}
                        I hope to continue evolving always.
                      </p>
                    </div>
                    <div className="about-link-wpr">
                      <a
                        href="https://cdn.prod.website-files.com/65e81d811a146057bcf24441/66025fadff741af27d114f2f_Deena-Creative%20Director%20%26%20Brand%20Strategist%20.pdf"
                        target="_blank"
                        rel="noreferrer"
                        className="link-txt"
                      >
                        Download CV
                      </a>
                      <a href="#" className="link-txt">
                        Privacy Policy | Deena Creative Inc.
                      </a>
                    </div>
                  </div>
                </div>
                <div className="about-rht-col">
                  <div data-move="" className="about-img-wpr">
                    <img
                      className="about-img"
                      src="/images/65f0193dff2b5651b1690188_about-img.png"
                      alt="about art icon"
                      {...{ "move-up": "" }}
                      loading="eager"
                    />
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
