"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Swiper as SwiperClass } from "swiper";
import { HashNavigation, Keyboard, Mousewheel } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { PageLoader } from "@/components/PageLoader";
import { SiteChrome, type SlideKey } from "@/components/SiteChrome";
import { FineArtSlide } from "@/components/slides/FineArtSlide";
import { CaseStudiesSlide } from "@/components/slides/CaseStudiesSlide";
import { AboutSlide } from "@/components/slides/AboutSlide";
import { HomeSlide } from "@/components/slides/HomeSlide";
import { TldrSlide } from "@/components/slides/TldrSlide";
import { CoachingSlide } from "@/components/slides/CoachingSlide";
import { ServicesSlide } from "@/components/slides/ServicesSlide";

/**
 * 原站引擎复刻（dabbledee-source.html 内联脚本 L678-L768）:
 * - Swiper: loop / speed 500 / mousewheel / keyboard / hashNavigation / allowTouchMove:false / initialSlide 3(home)
 * - 滚轮节流: 切换开始时禁用 mousewheel, 1500ms 后恢复（防连滚跳屏）
 * - body 换色: 目标 slide 标记 bgRed → body 去掉 rose-white,否则加上
 * - hash: 每个 slide data-hash（fine-art/case-studies/about/home/tldr/coaching/services）
 */
const SLIDES: {
  key: SlideKey;
  bgRed: boolean;
  Component: (props: { isActive?: boolean }) => React.ReactNode;
}[] = [
  { key: "fine-art", bgRed: false, Component: FineArtSlide },
  { key: "case-studies", bgRed: false, Component: CaseStudiesSlide },
  { key: "about", bgRed: true, Component: AboutSlide },
  { key: "home", bgRed: true, Component: HomeSlide },
  { key: "tldr", bgRed: true, Component: TldrSlide },
  { key: "coaching", bgRed: false, Component: CoachingSlide },
  { key: "services", bgRed: false, Component: ServicesSlide },
];

const HOME_INDEX = 3;

export function PageShell() {
  const swiperRef = useRef<SwiperClass | null>(null);
  const [activeKey, setActiveKey] = useState<SlideKey>("home");
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    // 与原站一致: 会话内只出现一次(sessionStorage);客户端判断避免 hydration 抖动
    if (sessionStorage.getItem("loader") !== "hide") setShowLoader(true);
  }, []);

  const applyBodyTheme = useCallback((index: number) => {
    const slide = SLIDES[index % SLIDES.length];
    document.body.classList.toggle("rose-white", !slide.bgRed);
  }, []);

  useEffect(() => {
    applyBodyTheme(HOME_INDEX);
  }, [applyBodyTheme]);

  const handleNavigate = useCallback((key: SlideKey) => {
    const idx = SLIDES.findIndex((s) => s.key === key);
    if (idx >= 0) swiperRef.current?.slideToLoop(idx, 500);
  }, []);

  // 显式播放当前 slide 内的视频: muted+autoplay 在被 transform 移出视口的 slide 上常不触发,
  // 切到该 slide 时手动 .play()（Swiper 14 loop 不克隆 DOM，active slide 即真实 React 节点）
  const playActiveVideos = useCallback((sw: SwiperClass) => {
    const el = sw.slides[sw.activeIndex] as HTMLElement | undefined;
    el?.querySelectorAll("video").forEach((v) => {
      v.play().catch(() => {});
    });
  }, []);

  return (
    <main className="main-cntnt-wpr relative h-dvh w-full overflow-hidden">
      {showLoader && (
        <PageLoader
          onEnter={() => {
            sessionStorage.setItem("loader", "hide");
            setShowLoader(false);
          }}
        />
      )}

      <Swiper
        className="page-swiper h-full w-full"
        modules={[Mousewheel, Keyboard, HashNavigation]}
        slidesPerView={1}
        spaceBetween={0}
        speed={500}
        loop
        initialSlide={HOME_INDEX}
        allowTouchMove={false}
        mousewheel
        keyboard={{ enabled: true }}
        hashNavigation={{ watchState: true }}
        preventInteractionOnTransition
        onSwiper={(sw) => {
          swiperRef.current = sw;
          playActiveVideos(sw);
        }}
        onSlideChangeTransitionStart={(sw) => {
          // 原站滚轮节流: 500ms 动画 + 1000ms 冷却
          sw.mousewheel.disable();
          setTimeout(() => sw.mousewheel.enable(), 1500);
        }}
        onBeforeTransitionStart={(sw) => applyBodyTheme(sw.realIndex)}
        onSlideChange={(sw) => {
          const slide = SLIDES[sw.realIndex % SLIDES.length];
          setActiveKey(slide.key);
          applyBodyTheme(sw.realIndex);
        }}
        onSlideChangeTransitionEnd={(sw) => playActiveVideos(sw)}
      >
        {SLIDES.map(({ key, bgRed, Component }) => (
          <SwiperSlide
            key={key}
            data-hash={key}
            className={bgRed ? "bg-red" : ""}
          >
            {({ isActive }: { isActive: boolean }) => (
              <Component isActive={isActive} />
            )}
          </SwiperSlide>
        ))}
      </Swiper>

      <SiteChrome activeKey={activeKey} onNavigate={handleNavigate} />
    </main>
  );
}
