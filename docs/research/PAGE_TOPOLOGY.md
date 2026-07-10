# dabbledee.com 页面拓扑（2026-07-10 勘察）

## 总体架构：无限横向 Swiper 单页

- **建站工具**: Webflow（cdn.prod.website-files.com 资产域）
- **核心引擎**: Swiper 11 —— `.page-swiper > .swiper-wrapper > .swiper-slide × 7`
  - `loop: true`（无限循环，任意方向永远能继续滑）
  - `direction: 'horizontal'`，`effect: 'slide'`，`speed: 500`
  - `mousewheel: true`（↑↓滚轮 → 横向翻页），`keyboard: true`（←→键）
- **每个 slide = 100vh × 100vw**，整页无纵向滚动（viewport 弹性适配，619~810 高度都能容纳）
- **hash 路由同步**: 滑动/点导航 → `location.hash` 更新（#home / #fine-art / #case-studies / #about / #tldr / #coaching / #services）；带 hash 进站直接落对应 slide；fancybox 灯箱另有 #artgallery-N hash
- **进场 loader**: sessionStorage["loader"] 未设时显示 `.page-loader`（z-index 1000 全屏,深锈红底）
  - 文案宣告无限横向体验 + ENTER 按钮
  - 点 ENTER → opacity 0 (1s) → hide → sessionStorage.loader="hide"（会话内不再出现）
  - loader 内容有 [move-up]/[move-down] + data-splitting 逐字动画,`.active` class 触发

## Slide 清单（DOM 顺序 / realIndex）

| # | class | 导航名 | hash | body 底色 | 内容概要 |
|---|-------|--------|------|-----------|----------|
| 0 | artwork-sec | FINE ART | #fine-art | rose-white 奶白 | 3 张作品卡（图+标题+材质+尺寸+年份），slick 轮播壳（3 张时箭头隐藏），点图开 Fancybox 画廊灯箱 |
| 1 | casestudies-sec | CASE STUDIES | #case-studies | rose-white 奶白 | 2×2 药丸形（超椭圆圆角）案例卡：True Classic / Ettitude / Jordin Sparks / Lauren Jauregui；卡内是自动播放封面视频（deena-e.github.io 托管）；每卡链去 /case-study/* 子页 |
| 2 | about-sec | ABOUT | #about | 橙红 | 左列富文本自述（关键词加粗/斜体）+ Download CV + Privacy Policy 链接；右侧大幅黄色单线插画（卷发女子坐于烟浪纹样上） |
| 3 | home-sec | HOME | #home | 番茄红 | 置景摄影背景图（树壁画+红丝绒帘+玻璃桌道具）+ 隐藏的无缝循环背景视频（website-files 托管）；顶部一排八角星；「dabbledee by Deena」花体 + BRANDING • COACHING • FINE ART 巨型描边字 + SCROLL 提示 |
| 4 | tldr-sec | TL;DR | #tldr | 番茄红 | 4 张竖卡（照片顶 + 黄描边标题 + 简介 + 内链 + 黄色大按钮）：CREATIVE SERVICES / CASE STUDIES / COACHING / FINE ART |
| 5 | coaching-sec | COACHING | #coaching | rose-white 奶白 | 左列 3 节手风琴 FAQ（.each-faq = .accrd-hdr + .accrdn-cntnt，默认第 2 节展开）；右列价目表（Free/$120/$300~~360~~ 三档 + sliding scale 注）+ session 说明卡（Read More 展开）+ 院校 logo 墙（RISD/Columbia/Parsons/UCLA）；顶部红盒 SCHEDULE CALL |
| 6 | service-sec | SERVICES | #services | rose-white 奶白 | 3 张价目卡（HARD WORK $110/h、BRANDING & REBRANDING $10,000+、CREATIVE STRATEGY $150/h），卡=标题带+分组点列+价格底带；顶部红盒 CONTACT ME |

## 固定层（覆盖所有 slide）

1. **顶栏 header**（fixed top）
   - 左: dabbledee 花体 logo 图（双色版本：红 on 奶白 / 黄 on 红，随 body class 切换）
   - 右: 3 个圆形描边图标钮 → Calendly 预约（calendly.com/dabbldee/30min）/ mailto:deena@deenacreative.co / Instagram(dabbledeebydeena)
   - 顶栏下沿 1px 分隔线
2. **底部导航**（fixed bottom, 1px 顶线）
   - 两端各一个无限循环符号（带箭头的 ∞，左右镜像）
   - 7 个导航项：文字 + 下方 ◆ 菱形；**当前项的 ◆ 被 3D 蓝色邪眼陀螺图标替换**（active 指示器随 slide 跳）
   - 点击导航 → slideToLoop 到对应 slide
3. **slide 级顶部 CTA 红盒**（coaching/services 独有,顶栏右下方）: 白底药丸按钮嵌在红色矩形块里

## 子页（本期不做，仅记录）

- /case-study/true-classic、/case-study/ettitude、/case-study/jordin-sparks、/case-study/lauren-jauregui
- 主页脚本对这 4 个路径有特殊处理（带 path 进站会跳去 casestudies slide）

## 中国网络环境坑（勘察期已解决）

- jQuery（CloudFront + code.jquery.com）、swiper CSS（jsdelivr）、splitting CSS（unpkg）、fancybox（jsdelivr）、slick（cdnjs）全被墙 → 原站在国内近乎白屏
- 案例封面视频 deena-e.github.io 也不可达
- 救活方案见 revive-snippet.js（本地 8377 端口代供）
- **克隆版天然免疫：所有依赖打进 npm bundle，资产本地化**
