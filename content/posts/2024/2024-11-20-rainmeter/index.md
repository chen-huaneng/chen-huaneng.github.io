---
date: '2024-11-20 21:27:20'
title: 'Rainmeter - 美化你的桌面'
description: ""
tags: [Rainmeter, GUI, Windows]
categories: [Rainmeter]
math: false
---

> 前排提醒：该软件只适用于 Windows 系统，如果你是 Mac OS 或者 Linux 用户，可以参考其他的软件。

## Rainmeter 是什么

简单来说，[Rainmeter](https://www.rainmeter.net/) 就是给想要对 Windows 桌面进行美化的用户一个方便的修改软件。效果图可以参考我修改前后的界面对比（当然壁纸也换了，可以忽略）：

![修改前的电脑桌面](origin.png)

![原壁纸](before.png)

![修改后的电脑桌面](after.png)

你可能会觉得奇怪，第一张怎么只有壁纸，因为我一般把软件放在 Windows 10 的磁贴上，所以桌面一般不放图标，再加上把任务栏隐藏后，看起来就只有壁纸了。从增加 Rainmeter 前后的桌面对比还是能比较明显看出来增加了不少功能：

1. 流浪地球样式的倒计时（可以改成其他的倒计时，比如高考前多少天这种）[^1]
2. 一个学位帽的图标（我主要用来放毕业论文文件夹的快捷方式，问我论文写了多少？就是新建了一个文件夹的程度）[^2]
3. 一个声音可视化的栏（电脑发出的声音都可以，如果没有声音则默认隐藏）
4. 日期（艺术字表示月份，下面的七个字母代表了周一到周日的英文首字母，到哪一天方框就会切换到哪一个格子，方框下的数字代表日）和时间（可以修改成24小时制的），上面的时间就是2024年11月20日（周三）下午五点[^3]
5. 显示硬盘容量（点击相应的硬盘可以打开相对应的文件夹），系统的状态（CPU、RAM、SWAP使用情况），网络情况（上传、下载的速度，IP地址）
6. 一个风铃（鼠标移动到风铃的附近会发出类似风铃被风吹动的声音）[^4]

[^1]: [流浪地球 桌面倒计时插件 - 城子的小屋](https://xcz.me/archives/67/)
[^2]: [Boxwello - 软件皮肤 - 致美化](https://zhutix.com/skins/boxwello/)
[^3]: [Laro - 软件皮肤 - 致美化](https://zhutix.com/skins/laro/)
[^4]: [四月的风铃 - 软件皮肤 - 致美化](https://zhutix.com/skins/fengzhiling/)

## 安装 Rainmeter

可以选择在 [Rainmeter 官网](https://www.rainmeter.net/)下载，也可以选择使用 [Scoop](https://chen-huaneng.github.io/2024/01/04/2024-1-4-2024-01-04-Scoop/) 下载：

```bash
scoop install extras/rainmeter
```

下载完了就可以愉快地开始找适合自己的皮肤了。如果你懂一点编程和 AI，那么就可以愉快地根据别人做好的皮肤进行稍微的调整，变成你自己的皮肤啦。

## 一些可能用得到的链接

如何入门 Rainmeter：

- [Rainmeter Documentation](https://docs.rainmeter.net/) - 官方的文档当然最重要
- [雨滴美化社区|Rainmeter - 中国最具影响力的美化论坛 - Powered by Discuz!](https://bbs.rainmeter.cn/forum.php) - 中文社区也不错
- [rainmeter吧-百度贴吧--Rainmeter技术与资源共享平台--欢迎加入rainmeter吧大家庭。立志摆脱一成不变乏味单调的电脑桌面，美观、实用是我们的追求，同时欢迎讨论各类与Rainmete](https://tieba.baidu.com/f?kw=rainmeter)
- [PKMer_Rainmeter 入门教程（一）：介绍、安装和基本使用](https://pkmer.cn/Pkmer-Docs/13-其他工具/rainmeter/rainmeter入门教程-安装和基本使用/)

找皮肤的地方：

- [Rainmeter皮肤 - 雨滴皮肤 - 致美化 - 漫锋网](https://zhutix.com/tag/rainmeter/)
- [雨滴美化社区|Rainmeter - 中国最具影响力的美化论坛 - Powered by Discuz!](https://bbs.rainmeter.cn/forum.php)
- [rainmeter吧-百度贴吧--Rainmeter技术与资源共享平台--欢迎加入rainmeter吧大家庭。立志摆脱一成不变乏味单调的电脑桌面，美观、实用是我们的追求，同时欢迎讨论各类与Rainmete](https://tieba.baidu.com/f?kw=rainmeter)

我的皮肤可以在[我的 GitHub 仓库](https://github.com/chen-huaneng/Rainmeter)找到，把下载的Layouts, Plugins, Skins三个文件夹替换 Rainmeter 原本的这三个文件夹就可以了（如果之前有皮肤记得先备份这三个文件夹）。

为什么我不打包成 `.rmskin` 文件？因为我的皮肤是用别人多个皮肤组装起来的，所以再重新组织代码会比较麻烦（就是有点懒）。

