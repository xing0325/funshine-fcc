"use client";

import "./HomeSlide.css";

/**
 * HomeSlide — dabbledee.com #home (.home-sec) 克隆
 * 结构/文案 1:1 取自 docs/research/components/slide-home.source.html
 * 样式在 HomeSlide.css（.home-sec 作用域，webflow 权威值）
 * 入场: 引擎在根加 .is-active → h1 逐字上浮(--char-index) + [move-up] 级联(--data-delay)
 */

/** 纯文本拆成 .word > .char，--char-index 全局连续（对齐 HomeSlide.css） */
function SplitText({ text }: { text: string }) {
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

const STAR_SRC = "/images/65f137f19f11078973b6102a_single-star.svg";
/** 顶部星带：一组 32 颗，渲染两组以实现 translateX(-50%) 无缝跑马灯 */
const STARS_PER_GROUP = 32;

function StarGroup() {
  return (
    <>
      {Array.from({ length: STARS_PER_GROUP }).map((_, i) => (
        <div className="splide__slide star-slider-item" key={i}>
          <img
            src={STAR_SRC}
            loading="lazy"
            alt="star icon"
            className="star-icon"
          />
        </div>
      ))}
    </>
  );
}

/** 三个描边大词（首词无圆点分隔符，末词去右边距）——文案/顺序取自 source.html */
const POINTS = [
  { label: "Branding", goto: "casestudy", first: true, last: false },
  { label: "Coaching", goto: "coaching", first: false, last: false },
  { label: "Fine Art", goto: "art", first: false, last: true },
];

export function HomeSlide({ isActive }: { isActive?: boolean }) {
  return (
    <section className={`home-sec bg-red${isActive ? " is-active" : ""}`}>
      <div className="page-slider-cntnt">
        {/* 背景摄影图（移动/兜底层，桌面被视频覆盖） */}
        <img
          src="/images/65f96cc262e4ac5d8f996954_home-page.jpeg"
          loading="eager"
          width={1500}
          alt="art image"
          className="home-slide-bg"
        />

        <div className="home-page-cntnt-wpr">
          {/* 背景无缝循环视频（桌面显示覆盖照片；≤991 隐藏，回落照片） */}
          <div className="home-slide-bg hide w-background-video">
            <video
              autoPlay
              loop
              muted
              playsInline
              poster="/images/65fd24b60bdf4944200a935f_Home_Video_high_seamless-poster-00001.jpg"
              data-object-fit="cover"
            >
              <source
                src="/videos/65fd24b60bdf4944200a935f_Home_Video_high_seamless-transcode.mp4"
                type="video/mp4"
              />
              <source
                src="/videos/65fd24b60bdf4944200a935f_Home_Video_high_seamless-transcode.webm"
                type="video/webm"
              />
            </video>
          </div>

          {/* 顶部星带跑马灯 */}
          <div className="star-serise-wpr">
            <div className="star-slider">
              <div className="star-slider-list">
                <StarGroup />
                <StarGroup />
              </div>
            </div>
          </div>

          {/* 居中内容 */}
          <div className="container">
            <div className="home-slide-cntnt">
              <div className="main-hdng-wpr">
                <h1 className="main-hdng" data-splitting="">
                  <SplitText text="dabbledee by Deena" />
                </h1>
              </div>
              <div data-move="">
                <ul role="list" className="home-point-list">
                  {POINTS.map((p, i) => (
                    <li
                      key={p.label}
                      {...{ "move-up": "" }}
                      className={`home-point-list-item${p.last ? " last-child" : ""}`}
                      style={{ "--data-delay": i } as React.CSSProperties}
                    >
                      <div
                        data-goto={p.goto}
                        className={`home-point-link${p.first ? " first-child" : ""}`}
                      >
                        {p.label}
                      </div>
                    </li>
                  ))}
                </ul>
                <div
                  {...{ "move-up": "" }}
                  className="banner-btm-txt"
                  style={{ "--data-delay": POINTS.length } as React.CSSProperties}
                >
                  <div className="text-block-2">SCROLL↑↓ OR USE ←→ KEYS</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
