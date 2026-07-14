"use client";

import "./HomeSlide.css";

/**
 * HomeSlide — dabbledee.com #home (.home-sec) 克隆
 * 布局/描边字/逐字动画/星带沿用 dabbledee（结构取自 slide-home.source.html）；
 * 文案+背景图换为 Funshine Career Consulting（FCC，见 docs/research/FCC_CONTENT.md HOME 段）
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

const STAR_SRC = "images/65f137f19f11078973b6102a_single-star.svg";
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

/**
 * 描边巨字 slogan：OWN OUR CAREER FUTURE（FCC 品牌主张 · 掌握我们这一代的职业方向）。
 * 原站是三项服务用圆点分隔；此处是一句连贯标语，故所有词都走 first-child 样式
 * （无圆点、无左内边距），仅末词加 last-child 去右边距。
 * 保留 .home-point-link 的 -webkit-text-stroke 黄描边 + [move-up] 级联入场。
 * （原 data-goto 导航属性无引擎消费，随语义化一并移除）
 */
const POINTS = [
  { label: "Own", last: false },
  { label: "Our", last: false },
  { label: "Career", last: false },
  { label: "Future", last: true },
];

export function HomeSlide({ isActive }: { isActive?: boolean }) {
  return (
    <section className={`home-sec bg-red${isActive ? " is-active" : ""}`}>
      <div className="page-slider-cntnt">
        {/* 背景大图（FCC 办公大堂，干净不抢前景描边字；全断点铺满；视频层已移除）
            备选: brand-skyline.jpg(自带英文大字) / team-group-*.jpg / meeting-present.jpg */}
        <img
          src="images/fcc/office-lobby.jpg"
          loading="eager"
          width={1500}
          alt="Funshine Career Consulting — Own Our Career Future"
          className="home-slide-bg"
        />

        <div className="home-page-cntnt-wpr">
          {/* 背景改用 FCC 品牌天际线静态图（原 dabbledee 背景视频已移除，避免其品牌内容出现，也不再引用旧 poster/视频文件） */}

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
                  <SplitText text="Funshine Career Consulting" />
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
                      {/* 全词 first-child = 无圆点分隔（连贯标语，非分项服务） */}
                      <div className="home-point-link first-child">{p.label}</div>
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
