# dabbledee.com 设计令牌（实测 getComputedStyle @1440 视口）

## 色板

| 令牌 | 值 | 用途 |
|------|-----|------|
| --dd-red | #C3482D rgb(195,72,45) | body 默认底色；奶白底上的全部文字/边框/描边 |
| --dd-cream | #FFF7F0 rgb(255,247,240) | body.rose-white 底色；红底上的反白文字 |
| --dd-yellow | #FFC701 rgb(255,199,1) | 红底上的文字/星星/logo/实心按钮底 |
| --dd-maroon | #4D0E00 (原站 rgba(77,14,0,.8)) | loader 遮罩底色（叠在红底上≈深锈红） |

- body 无类=红底，`.rose-white`=奶白底；slide 自身全透明，靠 body 变色
- bg-red slides: home/tldr/about → body 红；其余 → rose-white

## 字体

| 原站(Adobe Typekit kit lqg7hdn) | 克隆替身(Google) | 用在哪 |
|--------------------------------|------------------|--------|
| arboria（几何无衬线,100-900 全重） | Poppins（300/400/500/700/900） | 全站正文/导航/按钮/描边大标题(900) |
| campaign-serif italic（高对比花体衬线） | Playfair Display Italic（500/700） | "dabbledee by Deena"、Need coaching? 等花体行 |

## 字号体系（1440 视口实测,呈 vw 比例缩放）

| 元素 | 值 | 备注 |
|------|-----|------|
| body 基础 | 15px / 22.5px 行高, arboria 400 | ≈1.042vw |
| 手风琴标题 .accrd-hdr | 15px, 400 | 红色 |
| FAQ 正文 | 14px / 21px | |
| 描边节标题 (COACHING 等) | 40px / 48px, arboria 900, uppercase | color: transparent + -webkit-text-stroke 1px #C3482D（红底上描黄） |
| home 花体 h1 | 44.64px / 60.26px, campaign-serif italic 500, #FFC701 | ≈3.1vw |
| 按钮文字 | 15px, 500 | |

## 关键样式配方

- **描边字**: `color: transparent; -webkit-text-stroke: 1px <红|黄>`（工具类 .text-outline-red / -yellow / -cream 已进 globals.css）
- **黄色实心按钮**: bg #FFC701, 文字 #C3482D, border-radius ~50px 药丸
- **药丸案例卡**: 超大圆角胶囊形, 1px 红描边
- **1px 分隔线**: 顶栏下沿/底栏上沿, 颜色随 body 状态（红底黄线/奶白底红线）

## 资产盘点（public/）

- images/ 85 个（logo 双色版、7 组 slide 图、图标 svg、caret、star、evil-eye 陀螺 gif/png、about 线稿插画、favicon 等,Webflow 哈希文件名原样保留）
- videos/ 10 个（home 无缝循环背景视频 mp4+webm + 4 组案例封面 tc/ettitude/js/lj）
- seo/ favicon.ico + new-favicon.png
- 原站参考: docs/research/dabbledee-webflow.css（全部 hover/断点/keyframes 权威来源）+ dabbledee-source.html（完整 DOM+内联脚本）+ typekit-kit.css

## 断点（Webflow 默认）

- 桌面 ≥992 / 平板 768-991（底导航→汉堡+全屏菜单） / 手机横 480-767 / 手机竖 <480
