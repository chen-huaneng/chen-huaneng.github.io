---
date: '2024-10-29 20:17:07'
title: 'Zotero'
description: ""
tags: [[Zotero, Academic]]
categories: [[Academic]]
math: true
---

## Zotero 是什么

简单来说，Zotero 就是一款免费、可拓展的 PDF （主要是学术文献）管理工具。更多的介绍在网上有很多，可以看看[官网的介绍](https://www.zotero.org/)。

> 注意甄别网上的教程，因为 Zotero 更新到 Zotero 7 之后增加了很多功能和特性，有很多插件已经不再维护，很多教程也已经过期了。

## 如何安装

使用 Scoop 安装只需要一行代码：
```shell
scoop install extras/zotero
```

如果你不知道什么是 Scoop [请点我](https://chen-huaneng.github.io/2024/01/04/2024-1-4-2024-01-04-Scoop/)。

其他安装方法请自行搜索。

## 如何使用

- [Web of Science 手动导出文献到 Zotero，简单又高效！ (qq.com)](https://mp.weixin.qq.com/s?__biz=MzAxNzgyMDg0MQ==&mid=2650476690&idx=2&sn=a6fabd4a5f6a985fb07627a76024c697&chksm=83d00d54b4a784426a54bfe2bfe3935d22ee2822b46b68573540024fdfac19f69ac5f81c1f36&scene=178&cur_album_id=1319074508795641857#rd) - 自动导出出问题的时候参考
- [Zotero 7 重命名，如何将 “等” 改为 “et al.”？ (qq.com)](https://mp.weixin.qq.com/s?__biz=MzAxNzgyMDg0MQ==&mid=2650476977&idx=1&sn=9e9991fa02c8fc532e69d65b264136b6&chksm=83d00c77b4a785614277926dc82e419d44bc443a50846725d13225fbd647e86161934af41a2e&scene=178&cur_album_id=1319074508795641857#rd) - 如题

### 如何移动文献而不是复制文献到另一个分类

把要移动的文献在按住 `Shift` 的情况下拖拽到相应的分类中。

## 插件介绍

> 提醒：切勿本末倒置，这一切都是为了更好地阅读文献而不是强行将一个软件加入你的工作流中，建议先从尝试使用 Zotero 开始，等遇到需求之后再去安装插件，而不是一开始就捣鼓插件。

**比较推荐的社区**：

- [plugins | Zotero Documentation](https://www.zotero.org/support/plugins) - 官方的插件列表
- [Zotero 插件商店 | Zotero 中文社区 (zotero-chinese.com)](https://zotero-chinese.com/plugins/) - 中文社区，但是非官方

**第三方博客**：

- [Zotero！还有多少惊喜我不知道！ - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/630691757) - 可以参考插件推荐列表，注意是否支持最新版的 Zotero
- [Zotero 7 使用入门教程：安装与配置 - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/681536174) - 整体还是比较清晰的，可以看看插件推荐
- [有哪些好用的zotero插件? - 知乎 (zhihu.com)](https://www.zhihu.com/question/402589277/answer/3196530555) - 根据插件列表查看是否需要即可，文章比较水
- [Zotero安装教程+插件安装（获取SCI-Hub和知网数据）+坚果云同步配置 - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/647756683) - 同样是插件列表参考一下即可
- [适配 Zotero 7，最新40个兼容插件合集（2024年7月8日更新） - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/707668416) - 快速浏览插件，按需自取部分即可
- [如何高效管理文献？ - 知乎 (zhihu.com)](https://www.zhihu.com/question/26857521/answer/2662236762) - 毕导写的回答，很有趣，虽然可能有点过时了

### 我使用的插件介绍

- [Zotero | Your personal research assistant](https://www.zotero.org/download/) - Edge 浏览器插件，官方开发，用来一键导入文献
- [windingwind/zotero-pdf-translate: Translate PDF, EPub, webpage, metadata, annotations, notes to the target language. Support 20+ translate services. (github.com)](https://github.com/windingwind/zotero-pdf-translate) - 翻译插件
- [syt2/zotero-scipdf: Download PDF from Sci-Hub automatically For Zotero7 (github.com)](https://github.com/syt2/zotero-scipdf) - 用来下载 PDF，向 Sci-hub 学术女神致敬
- [l0o0/jasminum: A Zotero add-on to retrive CNKI meta data. 一个简单的Zotero 插件，用于识别中文元数据 (github.com)](https://github.com/l0o0/jasminum) - 知名的茉莉花插件，用于支持中文文献元数据
- [ChenglongMa/zoplicate: A plugin that does one thing only: Detect and manage duplicate items in Zotero. (github.com)](https://github.com/ChenglongMa/zoplicate?tab=readme-ov-file#readme) - 管理（批量合并、删除、手动标记非重复）重复的条目
- [volatile-static/Chartero: Chart in Zotero (github.com)](https://github.com/volatile-static/Chartero) - 统计阅读时长、查看文献中的所有图片快速导航
- [MuiseDestiny/zotero-figure: 一个基于 PDFFigure2 的 PDF 图表解析插件 (github.com)](https://github.com/MuiseDestiny/zotero-figure?tab=readme-ov-file#readme) - 更好的图片体验（单击复制、双击独立窗口预览……）
- [windingwind/zotero-better-notes: Everything about note management. All in Zotero. (github.com)](https://github.com/windingwind/zotero-better-notes#readme) - 更好的笔记、笔记管理
- [MuiseDestiny/zotero-gpt: GPT Meet Zotero. (github.com)](https://github.com/MuiseDestiny/zotero-gpt?tab=readme-ov-file) - 结合GPT
  - [chatanywhere/GPT_API_free: Free ChatGPT API Key，免费ChatGPT API，支持GPT4 API（免费），ChatGPT国内可用免费转发API，直连无需代理。可以搭配ChatBox等软件/插件使用，极大降低接口使用成本。国内即可无限制畅快聊天。 (github.com)](https://github.com/chatanywhere/GPT_API_free?tab=readme-ov-file#免费使用) - 免费 ChatGPT API
  - [Zotero GPT - 使用教程，配置免费密钥！！！_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV17N4y1o7vx/?vd_source=8f6ac8ba344f8ea3b071481f41e2ce0d) - 视频教程
  - [【Zotero7插件】Awesome GPT_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1zBpUeDEzM/?vd_source=8f6ac8ba344f8ea3b071481f41e2ce0d) - 视频教程
- [MuiseDestiny/zotero-reference: PDF references add-on for Zotero. (github.com)](https://github.com/MuiseDestiny/zotero-reference#readme) - 增强参考文献的查找
- [windingwind/zotero-actions-tags: Customize your Zotero workflow. (github.com)](https://github.com/windingwind/zotero-actions-tags?tab=readme-ov-file) - 标签管理
- [MuiseDestiny/zotero-style: Ethereal Style for Zotero (github.com)](https://github.com/MuiseDestiny/zotero-style#readme) - 显示文献的影响因子、分区、文献阅读时间、快速标签设置等等内容，上手难度稍大
  - [Ethereal Style for Zotero | Zotero 中文社区 (zotero-chinese.github.io)](https://zotero-chinese.github.io/user-guide/plugins/style.html) - 比较好的参考文档
- [retorquere/zotero-better-bibtex: Make Zotero effective for us LaTeX holdouts](https://github.com/retorquere/zotero-better-bibtex?tab=readme-ov-file) - 更好地导出参考文献用于 $\LaTeX$


