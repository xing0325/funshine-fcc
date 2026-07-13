"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { CSSProperties, KeyboardEvent, ReactNode } from "react";

import "./PageLoader.css";

/* ------------------------------------------------------------------
 * 逐字拆分 — 复刻 Splitting.js (by: "chars") 的运行时 DOM:
 *   容器加 `words chars splitting` class + --word-total/--char-total
 *   每词 <span class="word" data-word style="--word-index">
 *   每字 <span class="char" data-char style="--char-index">
 *   词间保留 " " 文本节点;索引跨整个 [data-splitting] 容器连续累加
 * ------------------------------------------------------------------ */

const cssVars = (vars: Record<string, string | number>) =>
  vars as CSSProperties;

/** React 19 允许未知属性透传到 DOM;经变量 spread 绕开 TSX 属性检查 */
const MOVE_UP_ATTR = { "move-up": "" };
const MOVE_DOWN_ATTR = { "move-down": "" };

let wordCounter = 0;
let charCounter = 0;

function splitChars(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  for (const part of text.split(/(\s+)/)) {
    if (!part) continue;
    if (/^\s+$/.test(part)) {
      nodes.push(" ");
      continue;
    }
    const wordIndex = wordCounter;
    wordCounter += 1;
    nodes.push(
      <span
        key={`w${wordIndex}`}
        className="word"
        data-word={part}
        style={cssVars({ "--word-index": wordIndex })}
      >
        {Array.from(part).map((ch) => {
          const charIndex = charCounter;
          charCounter += 1;
          return (
            <span
              key={`c${charIndex}`}
              className="char"
              data-char={ch}
              style={cssVars({ "--char-index": charIndex })}
            >
              {ch}
            </span>
          );
        })}
      </span>,
    );
  }
  return nodes;
}

/* 文案照抄原站(含 "return to back to" 原文与 em 的奇怪切分点) */
const LINE_1 = splitChars(
  "The site is an infinite horizontal experience—",
);
const LINE_2_EM_1 = splitChars("start anywhere");
const LINE_2_EM_2 = splitChars(
  ", you’ll always return to back to the starting po",
);
const LINE_2_EM_3 = splitChars("int.");
const WORD_TOTAL = wordCounter;
const CHAR_TOTAL = charCounter;

/* ------------------------------------------------------------------
 * 状态机:
 *   init    — 已挂载,遮罩可见,内容处于动画前隐藏态
 *   active  — 挂载 100ms 后: 图标下滑入 / 文字逐字上浮 / 按钮上滑入
 *   closing — 点了 ENTER: opacity→0(1.4s transition,1s 时截断卸载)
 * sessionStorage.loader === "hide" → 组件自检直接不渲染(同会话刷新不再出现)
 * ------------------------------------------------------------------ */
type Phase = "init" | "active" | "closing";

export function PageLoader({ onEnter }: { onEnter?: () => void }) {
  const [phase, setPhase] = useState<Phase>("init");
  const [hidden, setHidden] = useState(false);
  const closingRef = useRef(false);

  useEffect(() => {
    if (sessionStorage.getItem("loader") === "hide") {
      setHidden(true);
      return;
    }
    // 原站: linkchecking() 里 setTimeout 100ms 后加 .active
    // (仅从 init 前进,防极端情况下 100ms 内点了 ENTER 被回写覆盖)
    const timer = setTimeout(
      () => setPhase((p) => (p === "init" ? "active" : p)),
      100,
    );
    return () => clearTimeout(timer);
  }, []);

  const handleEnter = useCallback(() => {
    if (closingRef.current) return;
    closingRef.current = true;
    setPhase("closing");
    // 原站: opacity→0 后 1000ms 才 hide + 写 sessionStorage + 恢复 slide 动画
    setTimeout(() => {
      sessionStorage.setItem("loader", "hide");
      setHidden(true);
      onEnter?.();
    }, 1000);
  }, [onEnter]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        handleEnter();
      }
    },
    [handleEnter],
  );

  if (hidden) return null;

  const rootClass = [
    "page-loader",
    phase !== "init" ? "active" : "",
    phase === "closing" ? "closing" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div data-move="" className={rootClass}>
      <div className="w-layout-blockcontainer container w-container">
        <div className="loader-cntnt">
          <div style={{ opacity: 1 }} className="loader-icon-wpr">
            <img
              src="images/65eff50be1bfcfdbe6c4a25d_loader-icon.png"
              loading="lazy"
              alt="loader icon"
              className="loader-icon"
              {...MOVE_DOWN_ATTR}
              style={cssVars({ "--data-delay": 0 })}
            />
          </div>
          <div
            data-splitting=""
            className="loader-rich-txt w-richtext words chars splitting"
            style={cssVars({
              "--word-total": WORD_TOTAL,
              "--char-total": CHAR_TOTAL,
            })}
          >
            <p>{LINE_1}</p>
            <p>
              <strong>
                <em>{LINE_2_EM_1}</em>
                <em>{LINE_2_EM_2}</em>
                <em>{LINE_2_EM_3}</em>
              </strong>
            </p>
          </div>
          <div
            {...MOVE_UP_ATTR}
            className="enter-btn-wpr"
            style={cssVars({ "--data-delay": 0 })}
          >
            <div
              className="home-enter-btn"
              role="button"
              tabIndex={0}
              onClick={handleEnter}
              onKeyDown={handleKeyDown}
            >
              <div>ENTER</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
