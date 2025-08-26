---
date: '2024-01-04 22:35:00'
title: 'Scoop - A command-line installer for Windows'
description: ""
tags: [Scoop, Windows]
categories: [Scoop]
math: false
---

> 本文部分内容摘抄自 [Scoop - CS自学指南](https://csdiy.wiki/必学工具/Scoop/#python2) ，如有侵权请联系我进行删除。

## 为什么使用Scoop

在 Windows 下，搭建开发环境一直是一个复杂且困难的问题。由于没有一个统一的标准，导致各种开发环境的安装方式差异巨大，需要付出很多不必要的时间成本。而 `Scoop` 可以帮助你统一安装并管理常见的开发软件，省去了手动下载安装，配置环境变量等繁琐步骤。

例如安装 `python` 和 `nodejs` 以及 `VS Code` 只需要执行：

```powershell
scoop install python
scoop install nodejs
scoop install vscode
```

剩下的就完全交给 `Scoop` 去管理，安装依赖、检验哈希值、创建快捷方式……你甚至不需要按照平时安装软件时，用鼠标不断点击下一步的多余操作。因此学习使用 `Scoop` 会给你的生活和软件管理带来极大的便利。

## 安装 Scoop

`Scoop` 需要 [Windows PowerShell 5.1](https://aka.ms/wmf5download) 或者 [PowerShell](https://aka.ms/powershell) 作为运行环境，如果你使用的是 Windows 10 及以上版本，Windows PowerShell 是内置在系统中的。而 Windows 7 内置的 Windows PowerShell 版本过于陈旧，你需要手动安装新版本的 PowerShell。

> 由于发现很多同学在设置 Windows 用户时使用了中文用户名，导致了用户目录也变成了中文名。如果按照 Scoop 的默认方式将软件安装到用户目录下，可能会造成部分软件执行错误。所以这里推荐安装到自定义目录，如果需要其他安装方式请参考： [ScoopInstaller/Install](https://github.com/ScoopInstaller/Install)

```powershell
# 设置 PowerShell 执行策略
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
# 下载安装脚本
irm get.scoop.sh -outfile 'install.ps1'
# 执行安装, --ScoopDir 参数指定 Scoop 安装路径
.\install.ps1 -ScoopDir 'C:\Scoop'
```

## 使用 Scoop

Scoop 的官方文档对于新手非常友好，相对于在此处赘述更推荐阅读 [官方文档](https://github.com/ScoopInstaller/Scoop) 或 [快速入门](https://github.com/ScoopInstaller/Scoop/wiki/Quick-Start) 。

## 一些可能有帮助的文章

- [给 Scoop 加上这些软件仓库，让它变成强大的 Windows 软件管理器 - 少数派 (sspai.com)](https://sspai.com/post/52710#!)
- [你需要掌握的Scoop技巧和知识 - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/135278662)

## Q&A

### Scoop 能配置镜像源吗？

Scoop 社区仅维护安装配置，所有的软件都是从该软件官方提供的下载链接进行下载，所以无法提供镜像源。如果因为你的网络环境导致多次下载失败，那么你需要一点点 [魔法](https://csdiy.wiki/必学工具/翻墙/)。

### 为什么找不到 Java8？

原因同上，官方已不再提供 Java8 的下载链接，推荐使用 [ojdkbuild8](https://github.com/ScoopInstaller/Java/blob/master/bucket/ojdkbuild8.json) 替代。

### 我需要安装 python2 该如何操作？

对于已经过时弃用的软件，Scoop 社区会将其从 [ScoopInstaller/Main](https://github.com/ScoopInstaller/Main) 中移除并将其添加到 [ScoopInstaller/Versions](https://github.com/ScoopInstaller/Versions) 中。如果你需要这些软件的话需要手动添加 bucket：

```powershell
scoop bucket add versions
scoop install python27
```

### 我忘记了 Scoop 的命令怎么办

在命令行中输入 `scoop help` 来查看内置的帮助文档。

