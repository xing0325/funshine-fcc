# FCC 内容接入总纲（各屏改造权威依据）

把 dabbledee 克隆站的内容替换为 **Funshine Career Consulting（FCC / 阳光职业咨询）**，
**保留 dabbledee 的结构/布局/动画/暖色风格**，只换文案与图片。内容源自 FCC 官方品牌手册（用户提供）。

## 品牌
- 名称: Funshine Career Consulting（缩写 FCC）
- 定位: Boutique Career Agency（精品职业咨询），面向新世代 / 留学生的**校招**求职咨询
- 标语: "The world makes way for those with goals and vision."
- 双语主张: 与新世代同肩 We Stand by the Next Generation ／ 掌握我们这一代的职业方向 Own Our Career Future
- 品牌红: `#D11100`（FCC logo 红，比 dabbledee 的 --dd-red 更亮）——**仅用于 FCC logo**；页面其余保留 dabbledee 暖色（--dd-red #C3482D / --dd-cream / --dd-yellow）
- 办公室: 中国·成都 IFS 二号楼 28F ／ 新加坡 30 Raffles Place 048622
- 电话: 400 015 5158　官网: funshinecareerconsulting.com
- 关注领域(赛道): 数字智能(生成式AI/云计算/大数据)、大健康(Biotech)、跨境出海(科技/电商)、半导体(汽车/AI/存储芯片)、双碳(绿色金融/储能)

## 图片资产（public/images/fcc/）
- brand-skyline.jpg — 夕阳天际线 + "We Stand by the Next Generation" 品牌大屏
- office-lobby.jpg — 现代办公大堂（空境）
- team-group-1.jpg / team-group-2.jpg / team-group-3.jpg — 团队合影（黑色 FCC T恤）
- consult-sofa.jpg — 沙发咨询场景（3人）
- meeting-present.jpg — 会议/演示场景
- mentor-1v1.jpg — 一对一带教（暖木书架）
- group-discuss.jpg — 小组讨论（4人站立）
- blackboard-plan.jpg — 黑板写职业规划（手写 + FCC 独到之处面板；最贴 dabbledee 手绘感）

## Logo（替换 dabbledee 花体 logo）
FCC logo = 红底(#D11100)白字加粗 "FCC" 方块 + 右侧三行小字 "FUNSHINE / CAREER / CONSULTING"。
做成内联结构（非图片），随主题变色：奶白底=红块红字，红底=保持红块但外框/文字转奶白/黄。保持紧凑（高≤30px 同现状）。

## 导航显示标签（改 SiteChrome 显示文字，slide key 不动）
FINE ART→TEAM ／ CASE STUDIES→CASES ／ ABOUT→ABOUT ／ HOME→HOME ／ TL;DR→WHY FCC ／ COACHING→FAQ ／ SERVICES→SERVICES

---

## HOME（home-sec）— 品牌 hero
- 花体行(campaign, 原 "dabbledee by Deena"): **Funshine Career Consulting**
- 描边巨字(原 BRANDING • COACHING • FINE ART): **OWN OUR CAREER FUTURE**（或 EXPLORE • BUILD • WIN 三词点分隔，二选一以排版更佳者）
- 提示行(原 SCROLL↑↓): 保留 **SCROLL ↑↓ OR USE ←→ KEYS**
- 背景图: /images/fcc/brand-skyline.jpg（替换原 home-page.jpeg；背景视频移除或保留静态图即可）
- 顶部星带保留（风格元素）

## FINE ART（artwork-sec）— 团队介绍 Team（3 张画廊卡 + Fancybox）
标题(原 FINE ART): **TEAM** ／ 副行(原 '24 Explorations): "多元化背景，全球化视野 · Global Vision, Diverse Background"
3 卡（原作品卡：图 + 标题 + 3 行说明）:
1. img team-group-2.jpg｜标题 **Partnership Committee**｜行: 合伙人委员会 / 赫子 & Rebecca 联合创始人 / 腾讯云前副总裁等
2. img mentor-1v1.jpg｜标题 **Core Team**｜行: 核心团队 / 10年+ 国际职业规划经验 / Career Consultants
3. img meeting-present.jpg｜标题 **Mentor Network**｜行: 导师网络 / 金融·科技·咨询一线高管 / 经合伙人委员会筛选
Fancybox 三图同组，caption 用标题。

## CASE STUDIES（casestudies-sec）— 学员案例（2×2 卡）
标题(原 CASE STUDIES): **CASES** ／ 副行: "我们已成功辅导上百位同学拿到理想 offer · 100+ Offers Landed"
4 卡（原：药丸视频卡 + 左名/行业 右职位/年份）——把视频换成对应场景图或纯色，文字改为:
1. **Vicky**｜香港大学 HKU｜右: 野村证券 Nomura · IBD（香港）
2. **Cecilia**｜约翰霍普金斯 JHU｜右: 联合利华 Unilever · FMCG（国内）
3. **NaNa**｜墨尔本大学 Melbourne｜右: 字节跳动 ByteDance（国内）
4. **Sunny**｜波士顿大学 BU｜右: Capital One 第一资本（美国）
（卡内视频位可用 consult-sofa/group-discuss/mentor-1v1/office-lobby 做静态封面，或保留药丸空壳描边）

## ABOUT（about-sec）— 关于我们
标题(原 ABOUT): **ABOUT** ／ 顶部定义行(原 Dabbledee:(noun)…): "FCC — Boutique Career Agency · 与新世代同肩，掌握我们这一代的职业方向"
左列富文本(原自述 3 段，改为 FCC About，中英混排、关键词加粗):
- 段1: FCC 作为 Boutique Career Agency，始终关注亚太、北美及英国的高薪与新兴行业，持续研究职场战略态势。
- 段2: 我们吸纳来自全球顶尖金融、战略咨询、科技新贵及独角兽企业的一线从业者，形成 FCC 导师顾问团队，提供**私人型职业咨询与策略指导**。
- 段3: 不仅帮助客户踏入世界顶级公司，更致力于探索职业发展的多元可能，为客户规划职场的**永续发展路径**。
- 底部链接(原 Download CV / Privacy): **成都 Chengdu IFS T2 28F** ｜ **新加坡 Singapore · 30 Raffles Place** ｜ 400 015 5158
右侧插画(原 about-img 线稿): 换 /images/fcc/blackboard-plan.jpg（黑板职业规划，最贴原线稿手绘调）

## TL;DR（tldr-sec）— 独到之处 Special（4 张竖卡）
标题(原 TL;DR): **WHY FCC** ／ 副行: "在不确定世界中探索更确定的结果"
4 卡（原：照片 + 黄标题 + 描述 + 链接 + 按钮）:
1. img consult-sofa.jpg｜**Light Your Path 探索精神**｜发掘全球高潜力赛道，看清亚太/北美/英国真正有潜力的机会｜链接 WHY FCC→#coaching｜按钮 咨询 Contact
2. img mentor-1v1.jpg｜**Build Real Skills 实践精神**｜顶尖导师 1v1，从金融建模、AI 应用到职场表达，求职稳得住打得赢｜链接 SERVICES→#services｜按钮 咨询 Contact
3. img blackboard-plan.jpg｜**Play Long Game 长期主义**｜短期站上头部平台，长期搭建可持续增值的成长路线，转行晋升都不慌｜链接 CASES→#case-studies｜按钮 咨询 Contact
4. img meeting-present.jpg｜**Focus Sectors 关注赛道**｜数字智能 · 大健康 · 半导体 · 双碳 · 跨境出海——押注驱动人类进步的新赛道｜链接 ABOUT→#about｜按钮 咨询 Contact
按钮统一 mailto/tel 或 #home；Contact 用 tel:400 015 5158 或 mailto 皆可。

## COACHING（coaching-sec）— 常见疑问 FAQ + 服务模式 + 目标公司墙
标题(原 COACHING): **FAQ** ／ 中间花体(原 Need coaching?, 保持 .hide 隐藏或改 "常见疑问")
左列手风琴(原 3 节，改 FCC FAQ；默认展开第 2 节):
1. **报名后要立刻确定方向吗？** Must I confirm my direction upon registration?
   不需要。我们更关注学员探索自己热爱的行业与方向，而非盲目从众；与学员共同探索，找到理想的职业机会。
2. **FCC 最与众不同的点是？** What makes FCC unique?（默认展开）
   我们保持年轻视角，始终关注学员核心职业发展需求（而非只拿高薪 offer）。管理团队均有外资、金融百万年薪履历，从传统高薪行业出发，更关注新兴行业与新赛道。
3. **一般多久能拿到 offer？** How long to receive an offer?
   因人而异，成果不同。建议咨询 FCC 顾问，我们据你的情况给出专业建议与合适方案。（另: 目前仅校招咨询，暂不含社招）
右列(原 价目表/session卡/院校墙):
- 价目表 3 列(原 Free/$120/$300) → **服务模式**: 求职导师 Career Coach（锁定心仪岗位）／ 核心顾问 Core Consultant（1对4 梳理方向）／ 专属顾问群 Dedicated Team（全程陪伴）；底部注 "*1对4 专属顾问群全程陪跑"
- session 卡(What would a session look like) → **辅导流程 6 阶段**: 背景诊断 Background Assessment → 顾问匹配 Consultant Matching → 导师指导 Mentorship → 实战模拟 Simulation → 职场分析 Career Analytics → 最终申请 Final Push；Read More 展开各阶段一句话说明
- 院校 logo 墙(RISD/Columbia/Parsons/UCLA) → 改文字标签墙(无 logo 图，用文字): **Nomura · Unilever · ByteDance · Capital One · Bloomberg**；底部注 "*学员斩获的部分 offer"

## SERVICES（service-sec）— 服务内容（3 张价目卡）
标题(原 CREATIVE SERVICES): **SERVICES** ／ 右上红盒钮(原 CONTACT ME): 保留 **CONTACT ME**（tel:4000155158）
3 卡（原 HARD WORK / BRANDING / CREATIVE STRATEGY，标题带 + 分组点列 + 价格底带）:
1. 标题 **Career Navigator™**｜组1 专属职业规划: 行业定位/简历精修/面试辅导/职业测评MBTI｜组2 独家职训系统: 历年真题/内享直播/行业匹配/求职通识课｜底带 **精英求职陪跑 · 6–36 个月**
2. 标题 **Global Career Pro™**｜组1 海外求职: 无限内推/直达招聘决策者/技能提升包｜组2 全程无忧: 赫子·学管·教研全程陪伴/Networking 策略/实战模拟｜底带 **海外求职精英 · 6–48 个月**
3. 标题 **6-Phase Coaching**｜组1 诊断→匹配: 背景诊断/顾问匹配｜组2 带教→落地: 导师指导/实战模拟/职场分析/最终申请｜底带 **全流程 1v1 · 终身校友网络**

---

## 通用要求（所有 agent）
- 只改**文案与图片引用**，保留原组件的类名/结构/布局/CSS/入场动画/交互逻辑。
- 逐字动画标题(SplitText)照旧用，只换 text 内容（英文标题效果最好）。
- 图片用 `/images/fcc/<name>.jpg`，原生 <img>，无外链。
- 中英混排：大标题用英文，正文中英皆可（参考手册双语调性）。
- 完成前 `npx tsc --noEmit` 自查；只动分配给你的那个组件文件。
