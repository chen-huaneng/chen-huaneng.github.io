---
date: '2025-08-03 15:22:17'
title: 'Pdfjs'
description: ""
tags: [[Fluid, Hexo, PDF]]
categories: [[Hexo]]
math: false
---

## 需求来源

由于部分资料来源和某些自己写的笔记都是以 `PDF` 形式存在的，因此就在寻找能够实现将 `PDF` 内嵌入博客中的方法，避免查看 `PDF` 需要下载的麻烦。通过[Yu's Space](https://yuzhang.net/2023/11/07/如何在hexo博客中嵌入PDF/)的博客中了解到可以通过 `PDF.js` 来实现，于是通过一番尝试实现。

## 具体实现

接下来以 Hexo 框架的 Fluid 主题为例来说明实现的步骤：

1. 首先，下载 [PDF.js](https://mozilla.github.io/pdf.js/getting_started/#download) 并将下载的文件解压到 `\source\js\pdfjs` 文件夹下（当然如果不存在这个文件夹可以手动创建）。

2. 在 Hexo 的配置文件 `_config.yml` 中进行修改，跳过渲染 `pdfjs` 相关的配置：

   ```yaml
   skip_render:
     - 'js/pdfjs/**'
   ```

3. 在 `source` 文件夹下新建一个 `pdf` 文件夹用于存放需要嵌入的 `PDF` 文件，尽量不要在 `PDF` 文件命名中加入特殊字符，如 `&` 等，避免渲染失败。

4. 在需要嵌入 `PDF` 的 `markdown` 文件中的嵌入位置添加下面的代码和 `PDF` 的相对路径：

   ```markdown
   <iframe 
     src="/js/pdfjs/web/viewer.html?file=/pdf/Cauchy-Schwarz 不等式之本質與意義-林琦焜.pdf" 
     style='width:100%;height:800px'>
   </iframe>
   ```

如果操作成功的话，显示效果如下所示：

<iframe 
  src="/js/pdfjs/web/viewer.html?file=/pdf/Cauchy-Schwarz不等式之本質與意義-林琦焜.pdf" 
  style='width:100%;height:800px'>
</iframe>

另外，在 [pdf.js](https://github.com/mozilla/pdf.js) 的 Github 仓库中还有使用 `CDN` 引入的方式来实现，由于我对这个方法不是很了解，故没有尝试，如果有成功的小伙伴愿意分享相关的方法可以通过[我的邮件](mailto:huanengchen@foxmail.com)联系我。

