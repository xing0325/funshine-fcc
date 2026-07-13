"use client";

import { useEffect } from "react";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import "./FineArtSlide.css";

/**
 * FineArtSlide — dabbledee.com #art / .artwork-sec 克隆
 * 结构/布局 1:1 取自 docs/research/components/slide-fine-art.source.html；
 * 文案/图片改造为 FCC「团队介绍 Team」（docs/research/FCC_CONTENT.md「FINE ART」段）。
 * 样式在 FineArtSlide.css（.artwork-sec 作用域，webflow 权威值）
 * 交互: 点团队图（覆盖层 a.fancy_img）→ @fancyapps/ui v6 灯箱画廊
 * 入场: 引擎在根元素加 .is-active → 标题逐字上浮(--ci) + [move-up] 卡片级联(--data-delay)
 *
 * slick 轮播：原站 3 张作品、箭头隐藏（slidesToShow=3）→ 克隆用 flex 三列平铺，
 * 左右箭头结构保留于 DOM 但 CSS 默认隐藏（见 .artwork-arrow-wpr{display:none}）。
 */

/** 纯文本拆成 .word > .char，--ci 全局连续（对齐 FineArtSlide.css 的 var(--ci)） */
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

type TeamCard = {
  /** FCC 团队图，public/images/fcc/ 下的原生 jpg（无外链、无 %20 编码）。 */
  img: string;
  alt: string;
  caption: string;
  lines: string[];
};

/** FCC 团队介绍三卡（依据 docs/research/FCC_CONTENT.md「FINE ART — 团队介绍 Team」段）。 */
const TEAM_CARDS: TeamCard[] = [
  {
    img: "images/fcc/team-group-2.jpg",
    alt: "Partnership Committee",
    caption: "Partnership Committee",
    lines: ["合伙人委员会", "赫子 & Rebecca 联合创始人", "腾讯云前副总裁等"],
  },
  {
    img: "images/fcc/mentor-1v1.jpg",
    alt: "Core Team",
    caption: "Core Team",
    lines: ["核心团队", "10年+ 国际职业规划经验", "Career Consultants"],
  },
  {
    img: "images/fcc/meeting-present.jpg",
    alt: "Mentor Network",
    caption: "Mentor Network",
    lines: ["导师网络", "金融·科技·咨询一线高管", "经合伙人委员会筛选"],
  },
];

export function FineArtSlide({ isActive }: { isActive?: boolean }) {
  useEffect(() => {
    // 三张团队图同组（data-fancybox="artgallery"），caption 用 data-caption（卡标题）。
    // Hash:false —— 克隆版滑动引擎自管 hash 路由，避免灯箱 #artgallery-N 干扰。
    Fancybox.bind('[data-fancybox="artgallery"]', { Hash: false });
    return () => {
      Fancybox.destroy();
    };
  }, []);

  return (
    <section className={`artwork-sec${isActive ? " is-active" : ""}`}>
      <div className="page-slider-cntnt">
        <div className="page-slider-cntnt-in">
          {/* ---- 头部带: FINE ART 描边标题 + 右侧花体副文 ---- */}
          <div className="slide-hdr">
            <div className="container w-container">
              <div className="slide-hdr-in">
                <h2 className="slide-hdr-hdng" data-splitting="">
                  <SplitText text="Team" />
                </h2>
                <div className="slide-hdr-right align-right artwork">
                  <div>
                    多元化背景，全球化视野
                    <br />
                    {"‍"}
                    <strong>
                      <em>Global Vision, </em>
                    </strong>
                    Diverse Background
                  </div>
                </div>
              </div>
            </div>
            <div className="sldr-hdr-btm-line" />
          </div>

          {/* ---- 作品区: 3 张卡横排 ---- */}
          <div className="artwork-cntnt-wpr">
            <div className="container w-container">
              <div data-move="" className="artwork-slider-wpr-outer">
                <div className="artwork-slider-wpr w-dyn-list">
                  <div role="list" className="artwork-row artwork-slider w-dyn-items">
                    {TEAM_CARDS.map((card, i) => (
                      <div role="listitem" className="artwork-col w-dyn-item" key={i}>
                        <div
                          {...{ "move-up": "" }}
                          className="artwork-card"
                          style={{ "--data-delay": i } as React.CSSProperties}
                        >
                          <div className="artwork-img-wpr">
                            <div className="fancy_div">
                              <img
                                src={card.img}
                                loading="eager"
                                alt={card.alt}
                                className="artwork-img"
                              />
                              <div className="w-embed">
                                <a
                                  href={card.img}
                                  className="fancy_img"
                                  data-fancybox="artgallery"
                                  data-caption={card.caption}
                                  aria-label={card.caption}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="artwork-card-btm">
                            <h3 className="artwork-card-title">{card.caption}</h3>
                            <div className="artwork-reach-txt w-richtext">
                              {card.lines.map((ln, li) => (
                                <p key={li}>{ln}</p>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 左右箭头：结构保留，CSS 默认隐藏（3 张时不分页） */}
                <div className="artwork-arrow-wpr">
                  <div className="slider-arrow left">
                    <img
                      src="images/65f92cf76f05058a393f68a7_left-caret.svg"
                      loading="lazy"
                      alt="left caret icon"
                      className="alider-arrow-img"
                    />
                  </div>
                  <div className="slider-arrow right">
                    <img
                      src="images/65f92cf9dc04cb6fb9bbded8_right-caret.svg"
                      loading="eager"
                      alt="right caret icon"
                      className="alider-arrow-img"
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
