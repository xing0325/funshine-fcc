// dabbledee.com 救活脚本（完整版）— 中国网络环境下被墙依赖的本地替换
// 病根: jQuery(CloudFront + code.jquery.com)、swiper CSS(jsdelivr)、splitting CSS(unpkg)、
//       fancybox(jsdelivr)、slick(cdnjs) 全部加载失败 → 整站 JS 瘫痪 + slide 叠层。
// 前置: 本地起服务 py -3.12 -m http.server 8377
//       目录 scratchpad/cdn-rescue: jquery.min.js / slick.min.js / slick.min.css /
//       swiper-bundle.min.css / splitting.css / splitting-cells.css / fancybox.css / fancybox.umd.js
// 用法: 每次页面加载(含刷新/换视口)后执行一次。
async function reviveDabbledee() {
  const base = 'http://127.0.0.1:8377/';
  const loadScript = src => new Promise((res, rej) => { const s = document.createElement('script'); s.src = src; s.onload = () => res(); s.onerror = () => rej(new Error(src)); document.head.appendChild(s); });
  const loadCSS = href => new Promise((res, rej) => { const l = document.createElement('link'); l.rel = 'stylesheet'; l.href = href; l.onload = () => res(); l.onerror = () => rej(new Error(href)); document.head.appendChild(l); });

  // 1) 被墙的 CSS → 本地
  await Promise.all(['swiper-bundle.min.css', 'splitting.css', 'splitting-cells.css', 'fancybox.css', 'slick.min.css'].map(f => loadCSS(base + f)));
  // 2) jQuery + slick → 本地
  await loadScript(base + 'jquery.min.js');
  await loadScript(base + 'slick.min.js');
  if (typeof Fancybox === 'undefined') { try { await loadScript(base + 'fancybox.umd.js'); } catch (e) {} }
  // 3) webflow runtime chunks(website-files.com 可达,偶发失败重试 3 次)
  const wfSrcs = [...document.querySelectorAll('script[src*="webflow.schunk"], script[src*="webflow.a7"]')].map(s => s.src);
  for (const src of wfSrcs) {
    for (let i = 0; i < 3; i++) { try { await loadScript(src); break; } catch (e) { if (i === 2) console.warn('chunk dead:', src); } }
  }
  // 4) 重跑所有用到 jQuery 的内联脚本(首次全在第一行 $() 崩)
  const results = [];
  [...document.querySelectorAll('script:not([src])')].forEach((s, i) => {
    const t = s.textContent;
    if (!/\$\(|jQuery\(/.test(t) || t.length < 50) return;
    try { (0, eval)(t); results.push(i + ':ok'); } catch (e) { results.push(i + ':' + (e.message || '').slice(0, 70)); }
  });
  // 5) swiper 重新测量布局
  document.querySelector('.page-swiper')?.swiper?.update();
  return results;
}
await reviveDabbledee();

// ---- 截图防卡死(371 个动画 + GSAP ticker 会让 CDP 截图超时) ----
// 冻结: gsap.globalTimeline.pause(); document.querySelectorAll('video').forEach(v => { v.pause(); v.preload = 'none'; });
// 恢复: gsap.globalTimeline.play();
// 跳 slide: document.querySelector('.page-swiper').swiper.slideTo(i, 0, false)  // DOM序: 0 artwork / 1 casestudies / 2 about / 3 home / 4 tldr / 5 coaching / 6 service
