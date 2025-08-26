---
date: '2025-08-12 14:45:16'
title: 'Tsp D Instances'
description: ""
tags: [[TSP-D, Dataset,]]
categories: [[Dataset, ]]
math: true
---

Traveling Salesman Problem with Drones (TSP-D) 是经典 TSP 的拓展，它在 TSP 的基础上增加了无人机。无人机可以和车辆一起工作，或者自主起飞服务。根据无人机单次起飞降落过程中服务的顾客点数量的不同可以将问题分为单次起飞服务单个顾客点的和单次起飞服务多个顾客点。同样对无人机和车辆的会合点也有限制，即无人机只能在顾客节点或者仓库节点会合，因此会产生无人机和车辆之间互相等待的时间。TSP-D-Instances 就是用于 TSP-D 的数据集之一。

[TSP-D-Instances](https://github.com/pcbouman-eur/TSP-D-Instances?tab=readme-ov-file) 仓库包含了用于 TSP-D 的二维数据集，即只有仓库和顾客节点的横纵坐标。在数据集中以符号`/*`开始，以符号`*/`结束的行是注释行，在读取数据时需要忽略。该数据集包含了 [Agatz 等（2018）](https://doi.org/10.1287/trsc.2017.0791)和 [Bouman 等（2018）](https://doi.org/10.1002/net.21864)所用的数据集。相关的解决代码（Java 实现）可以在 [Drones-TSP](https://github.com/pcbouman-eur/Drones-TSP?tab=readme-ov-file) 仓库中找到。在这个数据集中，两点之间的距离是欧几里得距离（Euclidean distance），即两点之间的距离是两点之间的直线距离。有关数据集字段说明可以参考数据集的注释和[数据集仓库的说明](https://github.com/pcbouman-eur/TSP-D-Instances?tab=readme-ov-file)。该数据集分类如下（在所有的情况中，生成的第一个节点位置被选作仓库节点）：

-   `uniform`：每个节点的 $x$ 和 $y$ 坐标都是从取值范围为 $\{0,1,\dots,100\}$ 的独立均匀分布中随机生成的。

-   `singlecenter`：对于每个位置，首先均匀地从区间 $[0,2\pi]$ 中抽取一个角度 $\alpha$，然后从一个均值为 0，标准差为 50 的正态分布中抽取一个距离 $r$，坐标 $(x,y)=(r\cdot \cos \alpha,r\cdot \sin\alpha)$，用这种方法生成的节点位置更有可能集中在中心点 $(0,0)$ 附近，比 `uniform` 的数据集更能模拟圆形城市中心的情况。

-   `doublecenter`：生成方式和 `singlecenter` 类似，但在生成每个位置后，有 50% 的概率将其沿 $x$ 轴平移 200 个距离单位，这种方法生成的节点位置更有可能集中在两个中心点 $(0,0)$ 和 $(200,0)$ 附近，模拟了一个具有两个中心的城市的情况。

-   `restricted`：在原有限制的基础上增加了一些额外的限制。
    -   `maxradius`：增加了无人机不能飞行超过一定半径的限制。

    -   `novisit`：增加了无人机不能访问的顾客节点，比如以 `-novisit-20-rep_2.txt` 为后缀的文件表示有 20% 的顾客节点被随机选中用于表示无法被无人机访问的顾客节点，由于对于同一个数据来说，不同次数的随机生成会影响选中的顾客节点，因此 `rep_2` 表示第二次随机生成的数据。具体的不能被无人机访问的顾客节点由字段 `#NOVISIT` 表示，例如数据文件中的 `#NOVISIT 1` 表示第一个顾客节点不能被无人机访问，也即生成的节点数据中的第二行数据（因为默认生成的第一行数据是仓库节点）。

