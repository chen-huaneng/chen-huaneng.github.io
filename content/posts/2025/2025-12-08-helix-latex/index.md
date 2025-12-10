---
date: '2025-12-08T23:03:38+08:00'
title: '【Helix】支持 LaTeX 编译和正反向搜索'
description: "介绍如何在 Helix 中配置 LaTeX 的自动编译以及正反向搜索。"
tags: ["Helix", "LaTeX"]
categories: ["Helix"]
math: false
---

## Helix 配置

在 Helix 的配置文件夹下创建 `languages.toml` 文件，写入如下代码：

```toml
[language-server.texlab.config.texlab.build]
# https://github.com/helix-editor/helix/wiki/Language-Server-Configurations#latex
# https://github.com/latex-lsp/texlab/wiki/Configuration
onSave = true
forwardSearchAfter = true
executable = "latexmk"
args = [
    # "-cd", # Maybe block the powershell after compile a .tex file
    "-xelatex",
    "-halt-on-error",
    "-interaction=nonstopmode",
    "-synctex=1",
    "%f"
]

[language-server.texlab.config.texlab.forwardSearch]
# https://github.com/latex-lsp/texlab/wiki/Previewing#sumatrapdf
executable = "SumatraPDF"
args = [
    "-reuse-instance",
    "-forward-search",
    "%f",
    "%l",
    "%p"
]

[language-server.texlab.config.texlab.chktex]
onOpenAndSave = true
onEdit = true

[[language]]
name = "latex"
language-servers = ["texlab"]
```

## SumatraPDF

这里使用的 PDF 预览器是 SumatraPDF，其他 PDF 预览器也是类似的，在 `设置->选项->设置反向搜索命令行` 中填入 `texlab inverse-search --input "%f" --line %l"`

## 使用

打开一个 `.tex` 文件，然后每次修改后保存就会自动进行编译，自动打开相应的 SumatraPDF 程序就可以预览 PDF 效果了。正向搜索会自动高亮刚更改的 `.tex` 文件的那行，反向搜索则是双击 SumatraPDF 中 PDF 相应想要查看的行，会将 Helix 中的光标自动跳转到点击的行在相应文件中的位置，具体可以参考 [Previewing · latex-lsp/texlab Wiki](https://github.com/latex-lsp/texlab/wiki/Previewing#sumatrapdf)。

关于 `LaTeXMK` 更多的可选参数可以通过在命令行中输入 `texdoc latexmk` 查看相应的文档说明。