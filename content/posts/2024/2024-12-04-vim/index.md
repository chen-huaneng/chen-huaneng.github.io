---
date: '2024-12-04 11:54:58'
title: 'Neovim - 编辑器的使用技巧'
description: "简要介绍了一些经常使用到的 Neovim 编辑技巧。"
tags: [Vim, Neovim]
categories: [Neovim]
math: true
---

### 在 `Neovim` 中执行命令行命令

在普通模式（normal mode）下，输入 `:!` 后面跟上想要执行的 shell 命令，比如打开 $\LaTeX$ 的 `geometry` 文档：

```neovim
:! texdoc geometry
```

### 在 `Neovim` 中创建新文件

在普通模式（normal mode）下，输入以下命令创建一个 `example.txt` 文件：

```neovim
:e example.txt
```

或者使用如下命令：

```neovim
:new example.txt
```

如果需要在当前目录的子目录下创建，则使用命令：

```neovim
:e .\sub_folder\example.txt
```

如果子目录不存在，应该先创建子目录：

```neovim
:!mkdir sub_folder
```



