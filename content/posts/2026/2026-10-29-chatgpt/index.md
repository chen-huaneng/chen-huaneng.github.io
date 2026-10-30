---
date: '2026-10-29T10:44:53+08:00'
title: '【AI】ChatGPT的使用技巧'
description: "介绍一些我在使用ChatGPT过程中会用到的小技巧。"
tags: [ChatGPT, Academic, AI，]
categories: [AI]
math: false
---

## 如何使用 ChatGPT 搜索文献

由于大语言模型自身以及训练数据集的缺陷（大语言模型的幻觉问题、学术文献数据集访问受限等），任何 AI 模型都有可能提供虚假的（不存在的）或者是错误的（不符合预期的）参考文献，因此如何正确使用 ChatGPT 去搜索想要的文献显得十分重要，根据我个人的使用经验，以下是一些可供参考的建议：

### 提示词设计

在提问前最重要的就是关于提示词的设计，提示词的设计根据想要搜索内容的不同而不同，但是有一些通用的提示词设计的要求（规则）可供参考：

#### 避免模糊的请求

如果用户使用宽泛或模糊的请求，ChatGPT 可能会编造虚假的参考文献。因此，应尽量使用具体、可验证的要求。

> 错误示例：请提供 5 篇关于免疫疗法的参考文献。

这样的问题会导致 ChatGPT 编造文献，而非提供真实可查的来源。

> 优化示例：请仅提供可在 Google Scholar、Web of Science 或 PubMed 检索到的真实文献，并附 DOI 号。

这个请求更精确，要求 ChatGPT 提供可验证的文献。

#### 使用具体的要求

指定论文的时间范围、期刊、作者等，可以提高 ChatGPT 提供真实文献的概率。例如：

> 请提供 2020 年后发表的关于癌症免疫治疗的论文，并给出 DOI 号。
>
> 请提供 Nature 或 Science 期刊上的真实论文，并附上完整引用格式。

具体要求让 ChatGPT 更倾向于提供已知的真实论文，而非编造信息。

#### 让 ChatGPT 仅提供已知文献

ChatGPT 可能无法直接访问学术数据库，但它可以基于其训练数据提供一些已知的高被引论文，用户可以请求 ChatGPT 只列出已被广泛引用的文献。例如：

> 请列出一些关于癌症免疫疗法的高被引论文，并附上 DOI 号和出处。
>
> 请列出 Google Scholar 上 2023 年后关于 CRISPR 技术的高被引论文，并提供 DOI。

这些问题引导 ChatGPT 提供更具代表性的文献，而不是凭空编造的引用。

### 实操案例

现在的目标是：

> 如何使用ChatGPT查找并总结3年内（2026、2025、2024年）发表在Transportation Research Part B: Methodological、European Journal of Operational Research和Transportation Science期刊上的有关ALNS（Adaptive Large Neighborhood Search）算法在VRP（Vehicle Routing Problems）和TSP（Traveling Salesman Problem）及其相关变体等领域的文献

提示词可以按照下面的模板进行设计，或者通过 AI 根据要求生成相应的提示词后进行修改：

```markdown
你是一名运筹优化（Operations Research）与智能优化算法领域的研究人员，熟悉 Vehicle Routing Problem（VRP）、Traveling Salesman Problem（TSP）、Adaptive Large Neighborhood Search（ALNS）及其相关研究。

我希望对2024—2026年发表在以下三本国际期刊中的 ALNS 相关研究进行尽可能全面、可复核的文献检索。

【一、目标期刊】

1. Transportation Research Part B: Methodological
2. European Journal of Operational Research
3. Transportation Science

【二、时间范围】

2024年1月1日至2026年10月29日。

同时检索正式发表和 Online First / Articles in Advance 论文。

请分别记录首次在线发表年份和正式卷期年份，避免重复统计。

【三、核心研究主题】

重点检索以下问题：

1. Vehicle Routing Problem（VRP）
2. Traveling Salesman Problem（TSP）
3. Vehicle Routing Problem with Time Windows（VRPTW）
4. Pickup and Delivery Problem（PDP）
5. Electric Vehicle Routing Problem（EVRP）
6. Dynamic Vehicle Routing Problem（DVRP）
7. Multi-Depot Vehicle Routing Problem（MDVRP）
8. Traveling Salesman Problem with Time Windows（TSPTW）
9. Orienteering Problem（OP）
10. Prize-Collecting Traveling Salesman Problem（PCTSP）
11. Truck-Drone Routing Problem
12. Vehicle Routing Problem with Drone (VRP-D)
13. Two-Echelon Location Routing Problem (2E-LRP)
14. 其他具有路径规划、节点访问顺序优化、选址及路劲优化或车辆调度特征的组合优化问题。

【四、算法检索范围】

核心检索词：

- Adaptive Large Neighborhood Search
- ALNS
- Adaptive Large Neighbourhood Search
- Large Neighborhood Search
- Large Neighbourhood Search
- Hybrid ALNS
- Learning-based ALNS
- Reinforcement Learning ALNS

其中，普通 LNS 论文需要单独标记，不得直接视为 ALNS 论文。

【五、检索方法】

请使用以下渠道交叉检索：

1. 三本期刊的官方网站
2. Google Scholar
3. Crossref
4. OpenAlex
5. Semantic Scholar
6. 其他可访问的可靠学术数据库

请同时使用关键词检索、期刊限定检索、论文引用追踪和相关论文追踪。

不仅检索标题和摘要，也尽可能检索论文正文中的算法名称。

【六、文献筛选标准】

优先纳入：

A类：明确提出或改进 ALNS 算法的论文。

B类：使用 ALNS 解决 VRP、TSP 或相关变体的论文。

C类：将 ALNS 与其他算法结合的论文。

D类：虽然没有直接使用 ALNS，但提出了具有重要借鉴价值的 LNS 或邻域搜索机制的论文。

请将 A、B、C、D 四类分开。

【七、输出要求】

请首先输出一张完整的文献清单，以Excel文件的形式输出，包含：

1. 论文标题
2. 作者
3. 期刊名称
4. 首次在线发表年份
5. 正式卷期年份
6. DOI
7. 研究问题
8. 使用的算法
9. 是否使用 ALNS
10. 文献分类（A/B/C/D）
11. 是否可以获取全文
12. 信息核实状态

按期刊、年份进行排序。

【八、严格要求】

1. 不允许编造论文。
2. 每篇论文必须提供可核实的 DOI 或期刊官方页面。
3. 不得将其他期刊的论文混入目标期刊。
4. 不得把仅引用 ALNS 的论文当作使用 ALNS 的论文。
5. 不得将普通 LNS 自动归类为 ALNS。
6. 无法确认的信息标记为“待核实”。
7. 明确说明检索日期和检索覆盖范围。
8. 不得声称检索结果完全穷尽，除非有充分的数据库覆盖证据。
```

