# Header + 底部导航 + 移动菜单 Specification

## Overview
- Target: `src/components/SiteChrome.tsx`（可拆 Header/BottomNav/MobileNav 子组件同文件或同目录）+ SiteChrome.css
- Interaction model: click-driven（导航跳 slide）+ 状态联动（active 指示器/双色 logo）
- 原版结构: header-nav.source.html + mobile-nav.source.html

## 双色主题联动 ⭐
- body 无类（红底）: logo 用黄版 /images/65eea7b93543df2a0cd99c75_logo-yellow.png,图标钮/文字全金黄,分隔线金黄
- body.rose-white（奶白底）: logo 红版 /images/65eeb93ba6602ea7e7cd7f9d_logo-red.png,全红
- 实现建议: 两张 logo 同位叠放按 body 类切 opacity,或 CSS 变量切换; 线/文字色用 currentColor + body 级变量

## Header（fixed top, z 高）
- 左: logo 图(高约 32px)
- 右: 3 个圆形描边图标钮(直径 ~40px,1px 描边,内嵌 svg 图标):
  - 日历 /images/65e832d86357fb7d95537bdd_calendar-icon.svg → href https://calendly.com/dabbldee/30min (target _blank)
  - 邮件 /images/65e832e23db58cff7458f5bd_mail-icon.svg → mailto:deena@deenacreative.co
  - Instagram /images/65e832e61bd6c485189056d9_insta-icon.svg → https://www.instagram.com/dabbledeebydeena/
  - （tiktok-icon.svg 资产存在但原站未挂——不放）
- header 下沿 1px 分隔线(全宽)
- hover: 查 CSS .hdr-link-list / 圆钮类的 :hover 规则

## BottomNav（fixed bottom, z 高）
- 上沿 1px 线;两端 ∞ 符号 /images/…infinite-sign.svg(左右镜像,查 source.html 引用)
- 7 项(等距): FINE ART / CASE STUDIES / ABOUT / HOME / TL;DR / COACHING / SERVICES
  - 每项: 文字(15px 500 uppercase) + 下方指示位
  - 非 active: ◆ 菱形 /images/65f9684075f9015616f3cbb8_new-dot.svg（或 CSS 里 point-icon.png,以 source.html 为准）
  - active: 蓝色邪眼陀螺图(查 source.html 里 nav 区的 img——active 指示器图片文件),带轻微持续动画(查 CSS)
- 点击项 → 调 props.onNavigate(slideKey)；active 项由 props.activeKey 控制
- hover: 查 .nav-link:hover

## MobileNav（<992px）
- header 右侧变汉堡 /images/65f436262685d6ff60ebc088_menu-icon.svg
- 全屏遮罩菜单(mobile-nav.source.html): 关闭钮 menu-cross-btn.svg、7 项大字列表(每项下 1px 线)、底部社交行
- 开合动画: 原站用 GSAP(菜单淡入,项目 x:-50→0 级联,线淡入)——克隆用 CSS transition/animation 等效即可,参数近似原感受(0.3-0.5s, stagger ~60ms)

## Props 接口
```ts
export function SiteChrome({ activeKey, onNavigate }: {
  activeKey: SlideKey;
  onNavigate: (k: SlideKey) => void;
})
export type SlideKey = "fine-art" | "case-studies" | "about" | "home" | "tldr" | "coaching" | "services";
```
（SlideKey 类型就定义在本文件导出,引擎复用）
