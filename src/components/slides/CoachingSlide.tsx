"use client";

import { useState } from "react";
import "./CoachingSlide.css";

/**
 * CoachingSlide — dabbledee.com .coaching-sec 克隆
 * 结构/文案 1:1 取自 docs/research/components/slide-coaching.source.html
 * （Read More 隐藏段落取自 dabbledee-source.html 的 #coaching-modal）
 * 样式在 CoachingSlide.css（.coaching-sec 作用域，webflow 权威值）
 * 入场: 引擎在根加 .is-active → 标题逐字上浮(--ci) + [move-down]/[move-up] 级联(--data-delay)
 * 交互(React state,无 jQuery):
 *   - 手风琴: 单开 openIndex(默认 1 = WHO BENEFITS MOST?)，点 header 切换，caret 旋转 180°
 *   - Read More: 布尔 readMore，展开 session 卡隐藏的 ul + 收尾段落
 */

/** 把纯文本拆成 .word > .char，--ci 全局连续（对齐 CoachingSlide.css 的 var(--ci)） */
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

/** 三节手风琴（标题 + 富文本内容），文案原样取自 source.html */
const FAQS: { heading: string; body: React.ReactNode }[] = [
  {
    heading: "What is Creative Coaching?",
    body: (
      <p>
        Creative coaching (or more recently coined, &lsquo;Creative
        Doula&rsquo;) is a form of coaching that focuses on helping individuals
        step into their creative potential. It involves working with clients to
        explore their creative goals, overcome obstacles or blockages, and
        develop strategies for bringing their imagination to life.
      </p>
    ),
  },
  {
    heading: "Who benefits most?",
    body: (
      <>
        <p>
          Although creative counseling can traditionally span across any
          discipline of creativity like musicians, authors or performers; my
          expertise would best support visual creatives &amp; entrepreneurs.
        </p>
        <ul role="list">
          <li>
            <strong>Artists: </strong>painter, sculptors, photographers,
            ceramicists, print-makers, etc
          </li>
          <li>
            <strong>Creative Professional:</strong> marketers, designers,
            illustrators, art directors, etc.
          </li>
          <li>
            <strong>Students:</strong> applicants to college/ grad school |
            portfolio/ gallery prep.
          </li>
          <li>
            <strong>Jobseekers:</strong> resume prep, interview training, career
            placement, etc.
          </li>
          <li>
            <strong>Entrepreneurs:</strong> business ideas, organization, time
            management, etc.
          </li>
        </ul>
      </>
    ),
  },
  {
    heading: "My background",
    body: (
      <p>
        I, Deena, am an Egyptian artist and creative director. I split my time
        between freelancing &amp; fine arts. My approach to art and design is all
        about fluidity and growth. Embracing my neurodivergent perspective, I see
        it as a guiding light rather than a limitation; seeking to align with the
        natural rhythm of the mind to nurture a sustainable and authentic
        artistic journey. With over 10 years of experience in art mentoring adult
        students, I&rsquo;ve seen a wide range of artistic styles and approaches
        and can help you carve out your flow.
      </p>
    ),
  },
];

/** 院校 logo（图在 public/images/，宽度取自 source.html 的 width 属性） */
const LOGOS: { src: string; width: number; alt: string }[] = [
  {
    src: "/images/65ef0e28eec7ccce61de6ab4_risd-logo.svg",
    width: 26,
    alt: "risd logo",
  },
  {
    src: "/images/65ef0e8f8be8e1c7a22d7aa5_Columbia_University_logo.png",
    width: 166.5,
    alt: "columbia university logo",
  },
  {
    src: "/images/65ef0e94aad1d172829fa8af_new-school-parsons-logo.png",
    width: 119.5,
    alt: "the new school persons logo",
  },
  {
    src: "/images/65ef0e91293a1aaf85078ca6_ucla-logo.png",
    width: 82.5,
    alt: "ucla logo",
  },
];

export function CoachingSlide({ isActive }: { isActive?: boolean }) {
  // 手风琴单开：默认第 2 节（index 1 = WHO BENEFITS MOST?）
  const [openIndex, setOpenIndex] = useState<number | null>(1);
  // Read More：展开 session 卡隐藏内容
  const [readMore, setReadMore] = useState(false);

  return (
    <section className={`coaching-sec${isActive ? " is-active" : ""}`}>
      <div className="page-slider-cntnt">
        <div className="page-slider-cntnt-in">
          {/* ---- 头部带: COACHING + (Need coaching? 隐藏) + SCHEDULE CALL ---- */}
          <div className="slide-hdr">
            <div className="container">
              <div className="slide-hdr-in">
                <h2 className="slide-hdr-hdng" data-splitting="">
                  <SplitText text="COACHING" />
                </h2>
                <div className="slide-hdr-right hide">
                  <div>
                    <strong>
                      <em>Need coaching?</em>
                    </strong>
                  </div>
                </div>
                <div className="slide-hdr-btn-wpr">
                  <a
                    href="https://calendly.com/dabbldee/30min"
                    target="_blank"
                    rel="noreferrer"
                    className="cmn-btn white"
                  >
                    <div>SCHEDULE CALL</div>
                  </a>
                </div>
              </div>
            </div>
            <div className="sldr-hdr-btm-line" />
          </div>

          {/* ---- 正文: 左手风琴 / 右价目+说明+院校 ---- */}
          <div className="coaching-cntnt-wpr">
            <div className="container h-full">
              <div className="coaching-row">
                {/* 左列: 3 节手风琴（≤991 隐藏） */}
                <div data-move="" className="coaching-lft-col">
                  <div className="coaching-lft-cntnt">
                    <div className="cmn-accrdn-wpr">
                      {FAQS.map((faq, i) => {
                        const open = openIndex === i;
                        return (
                          <div
                            {...{ "move-down": "" }}
                            className="each-faq"
                            style={{ "--data-delay": i } as React.CSSProperties}
                            key={i}
                          >
                            <div
                              className={`accrd-hdr${open ? " active" : ""}`}
                              onClick={() =>
                                setOpenIndex(open ? null : i)
                              }
                            >
                              <h3 className="accrdng-hdng">{faq.heading}</h3>
                              <img
                                src="/images/65eed3c17f9e65ef374d2c18_down-caret.svg"
                                loading="lazy"
                                alt="down caret icon"
                                className="accrd-hdr-icon"
                              />
                            </div>
                            <div
                              className={`accrdn-cntnt${open ? " is-open" : ""}`}
                            >
                              <div className="cmn-rich-txt accrdn-rich w-richtext">
                                {faq.body}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* 右列: 价目 / session 说明 / 院校 logo */}
                <div data-move="" className="coaching-rht-col">
                  {/* 1) 价目表 */}
                  <div {...{ "move-down": "" }} className="coaching-sliding-top">
                    <div className="coaching-session-row">
                      <div className="coaching-session-col">
                        <div className="coaching-session-blck">
                          <h4 className="coaching-session-hdng">Free</h4>
                          <div className="cmn-rich-txt coaching-top w-richtext">
                            <p>20 min intro call.</p>
                          </div>
                        </div>
                      </div>
                      <div className="coaching-session-col">
                        <div className="coaching-session-blck">
                          <h4 className="coaching-session-hdng">$120</h4>
                          <div className="cmn-rich-txt coaching-top w-richtext">
                            <p>Individual Sessions</p>
                          </div>
                        </div>
                      </div>
                      <div className="coaching-session-col br-0">
                        <div className="coaching-session-blck">
                          <h4 className="coaching-session-hdng">
                            $300 <span className="strick-through">$360</span>
                          </h4>
                          <div className="cmn-rich-txt coaching-top w-richtext">
                            <p>3 Sessions</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="coaching-session-btm">
                      <div className="cmn-rich-txt sliding-sacle w-richtext">
                        <p>
                          <strong>*Sliding scale available.</strong>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* 2) WHAT WOULD A SESSION LOOK LIKE? + Read More */}
                  <div
                    {...{ "move-down": "" }}
                    className="coaching-session-para-wpr"
                    style={{ "--data-delay": 1 } as React.CSSProperties}
                  >
                    <div className="cmn-rich-txt coaching-session-para w-richtext">
                      <h3>What would a session look like?</h3>
                      <p>
                        Together, we&rsquo;ll create frameworks to enhance your
                        creativity. Emotions are central to creativity, so
                        we&rsquo;ll learn to integrate them into your work and
                        career. Our sessions provide a safe space for reflection
                        and planning, starting with understanding where you are
                        now, setting goals, and building structures that suit
                        your unique mindset.
                      </p>
                      <p>
                        Our 1 hour sessions will be virtual and tailored for your
                        individual needs and goals, but can include the
                        following:
                      </p>
                      <div className={`coaching-more${readMore ? " is-open" : ""}`}>
                        <ul role="list">
                          <li>Understanding your artistic history and timeline</li>
                          <li>Mind mapping where you are now in your journey</li>
                          <li>Vision boarding where you see yourself going</li>
                          <li>
                            Exploring your emotional journey with your practice
                          </li>
                          <li>Set goals, timelines and address concerns</li>
                          <li>Workshop a container for accountability</li>
                          <li>
                            Regular touch bases and hands on support within the
                            practice if needed.
                          </li>
                        </ul>
                        <p>
                          After each session you will receive an email summary of
                          our conversation with any supportive links or helpful
                          resources. I will also be available to you via text,
                          call or email for anything that arises between sessions.
                        </p>
                      </div>
                    </div>
                    <div className="read-more-link-wpr">
                      <a
                        href="#"
                        className="read-more-link cmn-modal-btn"
                        onClick={(e) => {
                          e.preventDefault();
                          setReadMore((v) => !v);
                        }}
                      >
                        {readMore ? "Read Less" : "Read More..."}
                      </a>
                    </div>
                  </div>

                  {/* 3) 院校 logo 墙 */}
                  <div
                    {...{ "move-up": "" }}
                    className="portfolio-btm-sec"
                    style={{ "--data-delay": 2 } as React.CSSProperties}
                  >
                    <div className="portfolio-logo-row">
                      {LOGOS.map((logo, i) => (
                        <div className="portfolio-logo-col" key={i}>
                          <img
                            src={logo.src}
                            loading="eager"
                            width={logo.width}
                            alt={logo.alt}
                            className="portfolio-logo"
                          />
                        </div>
                      ))}
                    </div>
                    <div className="portfolio-btm-txt">
                      <div className="cmn-rich-txt sliding-sacle btm w-richtext">
                        <p>
                          *Assisting student portfolios, securing their admission
                          into these schools.
                        </p>
                      </div>
                    </div>
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
