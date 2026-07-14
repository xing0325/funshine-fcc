"use client";

import { useState } from "react";
import "./CoachingSlide.css";

/**
 * CoachingSlide — .coaching-sec，文案改造为 FCC / Funshine Career Consulting
 * 结构/布局/动画/交互 1:1 保留 dabbledee 原件，文案依据 docs/research/FCC_CONTENT.md（COACHING 段）
 * 入场: 引擎在根加 .is-active → 标题逐字上浮(--ci) + [move-down]/[move-up] 级联(--data-delay)
 * 交互(React state,无 jQuery):
 *   - 手风琴: 单开 openIndex(默认 1 = FCC 最与众不同的点)，点 header 切换，caret 旋转 180°
 *   - Read More: 布尔 readMore，展开辅导流程 6 阶段明细
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

/** 常见疑问 FQA（中英对照标题 + 富文本答案），文案取自 FCC 品牌手册 */
const FAQS: { heading: string; body: React.ReactNode }[] = [
  {
    heading: "报名后要立刻确定方向吗？",
    body: (
      <p>
        不需要。我们更关注学员<strong>探索自己热爱的行业与方向</strong>
        ，而非盲目从众；FCC 希望与学员共同探索，去找到一份理想的职业机会。
        <br />
        <em>
          No — we help you explore industries you&rsquo;re passionate about
          rather than follow trends blindly.
        </em>
      </p>
    ),
  },
  {
    heading: "FCC 最与众不同的点是？",
    body: (
      <>
        <p>
          我们保持<strong>年轻视角</strong>
          ，始终关注学员的核心职业发展需求（而非简单拿到高薪 Offer）。
        </p>
        <p>
          管理团队均有外资、金融<strong>百万年薪</strong>
          的工作履历，从传统高薪行业出发，更关注
          <strong>新兴行业与新赛道</strong>的求职机会。
        </p>
        <p>
          <em>
            A youth-oriented team from million-RMB finance backgrounds,
            betting on emerging sectors.
          </em>
        </p>
      </>
    ),
  },
  {
    heading: "一般多久能拿到 Offer？",
    body: (
      <p>
        每个人情况不同，成果也不同。建议咨询 FCC 顾问，
        我们会根据你的情况给出<strong>专业建议与合适方案</strong>。
        <br />
        <em>
          （目前仅提供校招咨询，暂未开放社招服务。）Timelines vary — book an
          FCC advisor for a tailored plan.
        </em>
      </p>
    ),
  },
];

/** 服务模式 3 列（原价目表位）：角色 + 说明 */
const SERVICE_MODEL: { role: string; en: string; note: string }[] = [
  { role: "求职导师", en: "Career Coach", note: "锁定心仪岗位" },
  { role: "核心顾问", en: "Core Consultant", note: "1 对 4 梳理方向" },
  { role: "专属顾问群", en: "Dedicated Team", note: "全程陪伴答疑" },
];

/** 辅导流程 6 阶段（Read More 展开） */
const PHASES: { zh: string; en: string; desc: string }[] = [
  { zh: "背景诊断", en: "Background Assessment", desc: "科学测评背景与职业兴趣，定制个性化求职方案。" },
  { zh: "顾问匹配", en: "Consultant Matching", desc: "精准匹配行业导师，优化申请材料与人脉网络。" },
  { zh: "导师指导", en: "Mentorship Program", desc: "多位资深导师 1v1 因材施教，搭建知识体系。" },
  { zh: "实战模拟", en: "Simulation Training", desc: "Mock 导师轮番高强度模拟面试，提升行为/技术/案例能力。" },
  { zh: "职场分析", en: "Career Analytics", desc: "Offer 选择策略与职业发展建议，覆盖入职到转正。" },
  { zh: "最终申请", en: "Final Push", desc: "全职 Offer 全程支持，终身共享独家校友人脉网络。" },
];

/** 学员斩获的目标公司（原院校 logo 墙位，改纯文字标签） */
const COMPANIES = ["Nomura", "Unilever", "ByteDance", "Capital One", "Bloomberg"];

export function CoachingSlide({ isActive }: { isActive?: boolean }) {
  // 手风琴单开：默认第 2 节（index 1 = FCC 最与众不同的点）
  const [openIndex, setOpenIndex] = useState<number | null>(1);
  // Read More：展开辅导流程 6 阶段明细
  const [readMore, setReadMore] = useState(false);

  return (
    <section className={`coaching-sec${isActive ? " is-active" : ""}`}>
      <div className="page-slider-cntnt">
        <div className="page-slider-cntnt-in">
          {/* ---- 头部带: FAQ + (隐藏中缝) + 预约咨询 ---- */}
          <div className="slide-hdr">
            <div className="container">
              <div className="slide-hdr-in">
                <h2 className="slide-hdr-hdng" data-splitting="">
                  <SplitText text="常见问题" />
                </h2>
                <div className="slide-hdr-right hide">
                  <div>
                    <strong>
                      <em>常见疑问</em>
                    </strong>
                  </div>
                </div>
                <div className="slide-hdr-btn-wpr">
                  <a href="tel:4000155158" className="cmn-btn white">
                    <div>预约咨询</div>
                  </a>
                </div>
              </div>
            </div>
            <div className="sldr-hdr-btm-line" />
          </div>

          {/* ---- 正文: 左手风琴 FAQ / 右服务模式+辅导流程+公司墙 ---- */}
          <div className="coaching-cntnt-wpr">
            <div className="container h-full">
              <div className="coaching-row">
                {/* 左列: 3 节 FAQ 手风琴（≤991 隐藏） */}
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
                              onClick={() => setOpenIndex(open ? null : i)}
                            >
                              <h3 className="accrdng-hdng">{faq.heading}</h3>
                              <img
                                src="images/65eed3c17f9e65ef374d2c18_down-caret.svg"
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

                {/* 右列: 服务模式 / 辅导流程 / 目标公司墙 */}
                <div data-move="" className="coaching-rht-col">
                  {/* 1) 服务模式（原价目表位） */}
                  <div {...{ "move-down": "" }} className="coaching-sliding-top">
                    <div className="coaching-session-row">
                      {SERVICE_MODEL.map((m, i) => (
                        <div
                          className={`coaching-session-col${
                            i === SERVICE_MODEL.length - 1 ? " br-0" : ""
                          }`}
                          key={i}
                        >
                          <div className="coaching-session-blck">
                            <h4 className="coaching-session-hdng">{m.role}</h4>
                            <div className="cmn-rich-txt coaching-top w-richtext">
                              <p>
                                {m.en}
                                <br />
                                {m.note}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="coaching-session-btm">
                      <div className="cmn-rich-txt sliding-sacle w-richtext">
                        <p>
                          <strong>*1 对 4 专属顾问群全程陪跑。</strong>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* 2) 辅导流程 6 阶段 + Read More */}
                  <div
                    {...{ "move-down": "" }}
                    className="coaching-session-para-wpr"
                    style={{ "--data-delay": 1 } as React.CSSProperties}
                  >
                    <div className="cmn-rich-txt coaching-session-para w-richtext">
                      <h3>辅导流程 · 6-Phase Tutoring</h3>
                      <p>
                        从背景诊断到最终申请，六阶段系统陪跑，多位资深导师
                        1v1 因材施教，带你从方向迷茫到稳稳上岸。
                      </p>
                      <p>我们的辅导覆盖以下每一个环节：</p>
                      <div
                        className={`coaching-more${
                          readMore ? " is-open" : ""
                        }`}
                      >
                        <ul role="list">
                          {PHASES.map((p, i) => (
                            <li key={i}>
                              <strong>
                                Phase {i + 1} · {p.zh} {p.en}
                              </strong>
                              ：{p.desc}
                            </li>
                          ))}
                        </ul>
                        <p>
                          全流程 1v1 陪伴，终身共享独家校友人脉网络，
                          转行晋升都不慌。
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

                  {/* 3) 目标公司墙（原院校 logo 墙位，改文字标签） */}
                  <div
                    {...{ "move-up": "" }}
                    className="portfolio-btm-sec"
                    style={{ "--data-delay": 2 } as React.CSSProperties}
                  >
                    <div className="portfolio-logo-row">
                      {COMPANIES.map((name, i) => (
                        <div className="portfolio-logo-col" key={i}>
                          <span className="portfolio-company">{name}</span>
                        </div>
                      ))}
                    </div>
                    <div className="portfolio-btm-txt">
                      <div className="cmn-rich-txt sliding-sacle btm w-richtext">
                        <p>*学员斩获的部分 Offer。</p>
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
