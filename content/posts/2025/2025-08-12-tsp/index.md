---
date: '2025-08-12 09:39:29'
title: 'Tsp'
description: ""
tags: [[TSP, Algorithm, Heuristic, Concorde, LKH]]
categories: [[TSP,]]
math: false
---

## 精确算法

[Concorde](https://www.math.uwaterloo.ca/tsp/concorde/index.html) 是一个求解TSP的精确算法，由 [ANSI C](https://www.wikiwand.com/en/articles/ANSI_C) 编写。在 [Concorde Downloads](https://www.math.uwaterloo.ca/tsp/concorde/downloads/downloads.htm) 页面可以下载到最新版本的Concorde。下载后通过在命令行输入下面的命令进行解压，解压后会得到一个名为 `concorde` 的文件夹，编译的过程参考[Ubuntu（Linux）安装concorde过程](https://www.freesion.com/article/5581560004/)或者参考[Installing Solvers · perrygeo/pytsp Wiki](https://github.com/perrygeo/pytsp/wiki/Installing-Solvers)。

```powershell
gunzip co031219.tgz
tar xvf co031219.tar
```

Concorde 需要 linear programming solver，常用的有 [QSOpt](https://www.math.uwaterloo.ca/~bico/qsopt/index.html) 和 IBM 的 [CPLEX]([Mathematical program solvers - IBM CPLEX](https://www.ibm.com/products/ilog-cplex-optimization-studio/cplex-optimizer))，由于 Concorde 自从2003年之后就没有更新过，因此当前 CPLEX 的版本已经不再合适，因此选用 QSOpt。QSOpt 的路径假设为 `path=/home/kaiyouhu/qsopt`，用下面的命令下载 QSOpt 的头文件：

```bash
mkdir qsopt
cd qsopt
wget -O qsopt.a http://www.math.uwaterloo.ca/~bico/qsopt/beta/codes/PIC/qsopt.PIC.a # WSL上的Ubuntu测试有效
wget http://www.math.uwaterloo.ca/~bico/qsopt/beta/codes/linux64/qsopt.h
wget http://www.math.uwaterloo.ca/~bico/qsopt/beta/codes/linux64/qsopt
```

然后在 `concorde` 文件夹下使用下面的命令编译 Concorde，编译完成后会在当前目录下生成一个名为 `TSP` 的文件。

```bash
CFLAGS="-fPIC -O2 -g" configure --with-qsopt=/home/kaiyouhu/qsopt # 如果 QSOpt 的路径不同记得修改
# continue
make
cd TSP
concorde -s 99 -k 100 # -s 99 表示使用随机种子 99，-k 100 表示使用 100 个城市的 TSP 实例进行测试
```

在 Python 中使用 Concorde 可以参考 [pyconcorde](https://github.com/jvkersch/pyconcorde)，该项目是 Concorde 的 Python 接口，需要注意的是这个 Python 接口不支持 Windows 系统，但是支持 WSL，具体的安装细节[参考文档说明](https://github.com/jvkersch/pyconcorde)。

## 启发式算法

[LKH](http://akira.ruc.dk/~keld/research/LKH/) 是解决 TSP 的 [Lin-Kernighan](https://www.wikiwand.com/en/articles/Lin%E2%80%93Kernighan_heuristic) 启发式算法的有效实现，基于ANSI C编写。在此之外，LKH 还有一个改进的 [LKH-3](http://akira.ruc.dk/~keld/research/LKH-3/) 版本，支持多种约束条件（Asymmetric capacitated vehicle routing problem, Multiple traveling salesmen problem, Sequential ordering problem…）的 TSP 求解。在 [LKH](http://akira.ruc.dk/~keld/research/LKH/) 页面可以下载到最新版本的 LKH 实现代码。下载后通过在命令行输入下面的命令进行解压，解压后会得到一个名为 `LKH-2.0.10` 的文件夹，然后在 Linux 或者 WSL 下输入命令 `make` 编译 LKH 代码，编译完成后会在当前目录下生成一个名为 `LKH` 的文件。

```powershell
tar xvfz LKH-2.0.10.tgz
cd LKH-2.0.10
make
```

在 Python 中使用 LKH 可以参考 [LKH\_TSP](https://github.com/ntnu-arl/LKH_TSP)，该项目是 LKH 的 Python 接口，需要注意的是这个 Python 接口不支持 Windows 系统，但是可以在 WSL 中运行。

