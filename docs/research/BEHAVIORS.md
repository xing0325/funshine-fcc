# dabbledee.com 行为清单（2026-07-10 实测）

## 1. 页面级：滚轮/键盘驱动横向无限翻页 ⭐核心
- **触发**: 鼠标滚轮 ↑↓（Swiper mousewheel）或键盘 ←→（Swiper keyboard）
- **效果**: 横向平移一屏，`speed: 500` ms，Swiper 默认 ease
- **无限循环**: loop:true —— 最后一屏继续往前 = 回到第一屏，反向同理；实测 services(6) 下滚 → artwork(0)
- **联动**:
  - `location.hash` 更新为目标 slide 的锚名（wheel 事件里调 changeUrl()）
  - `body.rose-white` class 切换：目标 slide 无 bg-red → 加 rose-white（奶白）；有 → 移除（红）。header logo 双色跟随
  - 底部导航 active 指示器（蓝色邪眼陀螺 img）跳到对应项
- **实现要点（克隆用）**: Swiper 11 的 loop + mousewheel + keyboard 模块即可原样复刻

## 2. Slide 内容入场动画
- slide 变 active 时，其内部 [data-splitting] 文本（已被 Splitting.js 拆成 span.char）逐字上浮进场；[move-up]/[move-down] 元素带 --data-delay: N 的级联位移
- CSS keyframes 驱动（暂停 CSS 动画会导致内容卡在透明态——实测验证）
- 大标题（如 COACHING）为描边字，入场时同样逐字出现

## 3. 进场 Loader
- 首次访问显示；`.active` class 100ms 后加上 → 图标/文案/按钮 [move-up]/[move-down] 动画进场
- 点 ENTER: loader opacity→0（1s CSS transition）→ display:none → sessionStorage.loader="hide"
- 同会话内刷新不再显示（linkchecking() 读 sessionStorage）

## 4. Fine Art：Fancybox 画廊灯箱
- 点作品图（.fancy_div 包着 .artwork-img）→ Fancybox 5 灯箱：暗背景、1/3 计数、左右箭头、底部缩略图条、工具栏（放大/幻灯/全屏/九宫/关闭）、标题 caption（如 Botanical Babe）
- URL hash 变 #artgallery-N；Esc/X 关闭
- 3 张作品同属一个 gallery 组
- 作品区外壳是 slick 轮播（仅 3 张时左右箭头 slick-hidden）

## 5. Case Studies：视频卡
- 药丸形（大圆角）卡片内是 <video>（muted loop 自动播放的封面视频），此处 4 个视频托管在 deena-e.github.io
- 卡片整体是 <a> 链去 /case-study/* 子页
- 卡下两行文字：左=品牌名+行业，右=职位+年份区间
- （国内无法实测 hover 行为；源码未见 hover 播放逻辑，视频应为常播）

## 6. Coaching：手风琴 + Read More
- .each-faq = .accrd-hdr（标题+下箭头 icon）+ .accrdn-cntnt（内容区）
- 点击 header 切换展开/收起（Webflow ix2 交互，滑动展开动画）；默认第 2 节（WHO BENEFITS MOST?）展开
- 右列 session 卡有 Read More… 展开长文
- 价目表: 3 列表格样式（表头行 Free/$120/$300 + 划线 $360），下缘斜体注释行
- 院校 logo 墙: RISD / Columbia / Parsons / UCLA + 底部斜体注释

## 7. 顶部 CTA 红盒（coaching/services）
- 红底矩形块贴在 header 右下，内嵌白底药丸按钮（SCHEDULE CALL / CONTACT ME）
- SCHEDULE CALL → Calendly；CONTACT ME → mailto（待在 spec 阶段核实 href）

## 8. Hover 态（待 CSS 提取细化）
- 导航项 / 各按钮 / 卡片 hover 规则将从 webflow CSS 文件静态提取（勘察时后台窗口无法实测 hover）
- 已知按钮类: .home-enter-btn、CONTACT ME 黄色实心钮、SERVICES INFO 下划线小链接、SCHEDULE CALL 白药丸

## 9. 响应式（待 768/390 复测）
- 平板断点（~991px, Webflow 默认）: 底部导航隐藏 → 右上汉堡（menu-toggler）+ 全屏 mobile-nav（GSAP 动画：菜单项逐条位移进场）
- 移动端菜单结构已在 DOM（.mobile-nav > .nav-list > li × 7 + .hdr-link-list.mobile）

## 10. 已知裂图（3 处）
- coaching 手风琴的 down caret icon ×2（65f1528d***_down-caret.svg 类似路径，CDN 加载失败）——下载资产时补
- 另 1 处待定位
