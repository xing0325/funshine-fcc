# TL;DR Slide Specification

## Overview
- Target: `src/components/slides/TldrSlide.tsx` + TldrSlide.css
- Interaction model: click-driven（内链跳 slide + CONTACT 按钮）
- 原版结构: slide-tldr.source.html

## 布局（红底 slide）
- 顶部标题区(查 source.html: TL;DR 头部)
- 4 张竖卡横排(等宽,间距 ~12px,卡有 1px 黄描边+上圆角照片区):
  每卡从上到下:
  1. 照片(object-fit cover,查 source.html 各卡图片文件→/images/)
  2. 卡身(红底): 黄色标题(arboria 700-900 uppercase ~24px) + 描述段(#FFC701 14px) + 小链接(uppercase 下划线,如 SERVICES INFO / EXPLORE WORK / COACHING INFO / EXPLORE ART)
  3. 底部大按钮: 金黄实心药丸(bg #FFC701,字 #C3482D 15px 500,radius ~50px,宽撑满): CONTACT ME ×3 / SCHEDULE A CALL(coaching 卡)
- 4 组内容(标题/描述/链接文字)从 source.html 原样取: CREATIVE SERVICES / CASE STUDIES / COACHING / FINE ART

## States & Behaviors
- 小链接点击 → props.onNavigate 对应 slideKey(services/case-studies/coaching/fine-art); CONTACT ME → mailto:deena@deenacreative.co, SCHEDULE A CALL → calendly(查 source.html href)
- 按钮 hover: 查 CSS(黄钮 hover 反色/加深)
- .is-active 入场: 卡片级联上浮

## Props
```ts
export function TldrSlide({ onNavigate }: { onNavigate?: (k: string) => void })
```
