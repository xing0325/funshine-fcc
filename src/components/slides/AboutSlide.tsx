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
                    <SplitText text="关于我们" />
                  </h2>
                  <div className="slide-hdr-right full ylw">
                    <div>
                      <strong>FCC — </strong>
                      <em>Boutique Career Agency</em> · 与新世代同肩，
                      <br />
                      掌握我们这一代的{" "}
                      <strong>职业方向 Own Our Career Future.</strong>
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
                    src="images/65f137f19f11078973b6102a_single-star.svg"
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
                        FCC 是一家{" "}
                        <strong>
                          <em className="italic-text">
                            Boutique Career Agency（精品职业中介）
                          </em>
                        </strong>
                        ，始终关注 <strong>亚太、北美及英国</strong>{" "}
                        的高薪与新兴行业，持续研究职场的战略态势 (Career
                        Strategy)。
                      </p>
                      <p>
                        我们吸纳来自全球顶尖{" "}
                        <strong>金融、战略咨询、科技新贵及独角兽企业</strong>{" "}
                        的一线从业者，组成{" "}
                        <strong>FCC 导师顾问团队</strong>，为客户提供{" "}
                        <strong>私人型职业咨询与策略指导 (Private Advisory)</strong>
                        。
                      </p>
                      <p>
                        我们不仅帮助客户踏入 <strong>世界顶级公司</strong>
                        ，更致力于探索职业发展的多元可能，为每一位客户规划职场的{" "}
                        <strong>永续发展路径 (Sustainable Career Path)</strong>。
                      </p>
                    </div>
                    <div className="about-link-wpr">
                      <span className="link-txt">
                        <strong>成都 Chengdu</strong> · IFS T2 28F
                      </span>
                      <span className="link-txt">
                        <strong>新加坡 Singapore</strong> · 30 Raffles Place
                      </span>
                      <a href="tel:4000155158" className="link-txt">
                        400 015 5158
                      </a>
                    </div>
                  </div>
                </div>
                <div className="about-rht-col">
                  <div data-move="" className="about-img-wpr">
                    <img
                      className="about-img"
                      src="images/fcc/blackboard-plan.jpg"
                      alt="FCC 黑板职业规划 · career planning blackboard"
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
