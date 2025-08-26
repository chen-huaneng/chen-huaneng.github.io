---
date: '2025-08-12 15:02:24'
title: 'Dataset - TSPDroneLIB by Bogyrbayeva et al. (2023)'
description: ""
tags: [Dataset, TSP-D, FSTSP]
categories: [Dataset, ]
math: true
---

## TSPDroneLIB by Bogyrbayeva et al. (2023)

[TSPDroneLIB](https://github.com/chkwon/TSPDroneLIB) 仓库包含了用于 TSP-D 和 FSTSP 的数据集和相关链接。该仓库提到了 [Dataset - TSP-D Instances by Bouman et al. (2018)](https://chen-huaneng.github.io/2025/08/12/2025-08-12-2025-08-12-tsp-d-instances/) 的数据集，另外包括了 [Bogyrbayeva 等（2023）](https://doi.org/10.1016/j.trc.2022.103981)使用的数据集。相关的算法可以在 [TSPDrone.jl](https://github.com/chkwon/TSPDrone.jl) 仓库中找到。有关数据集的字段说明可以在 [TSPDroneLIB/data/Bogyrbayeva/description.md](https://github.com/chkwon/TSPDroneLIB/blob/main/data/Bogyrbayeva/description.md) 中找到。该数据集分类如下：

-   `Random：`包含了三个不同节点数量大小的数据集，分别为 $n = 20, 50, 100$，每个数据集包含了 100 个算例，每行表示包含横纵坐标的一个算例，遵循格式 $x_1,y_1,x_2,y_2,\dots,x_n,y_n$，即每行的每两个数一组组成一个节点的横纵坐标，同时 $x_1,y_1$ 表示仓库节点的横纵坐标。该数据集的生成方法为：在 $[1100]\times[1100]$ 的范围内，从均匀分布中随机抽取每个节点的横纵坐标，唯一的例外是仓库节点，其位置分布在 $[0,1]\times[0,1]$ 范围内，这意味着仓库总是位于角落。这种数据集的生成方法和 [Agatz 等（2018）](https://doi.org/10.1287/trsc.2017.0791)使用的数据集生成方法是一致的。

-   `Amsterdam：`该数据集的数据格式和 `Random` 数据集相同，共有四种不同大小的算例，分别为 $n = 10, 20, 50, 100$。该数据集基于 [Haider 等（2019）](https://doi.org/10.2139/ssrn.3480725)研究中使用的电动汽车（electric vehicle, EV）停车位置数据集。这些位置反映了潜在顾客的位置，因为电动汽车通常停放在城市街道的路边充电器旁。为了适 [Bogyrbayeva 等（2023）](https://doi.org/10.1016/j.trc.2022.103981)的研究，该文章从整个 `Amsterdam` 数据集中随机选取仓库和客户节点来创建不同的问题算例。

### `TSPDrone.jl` 仓库中实现的 DPS 算法和 DRL 算法

[TSPDrone.jl](https://github.com/chkwon/TSPDrone.jl) 仓库如前所述，解决了单车辆配备单架无人机的 TSP-D，实现了 [Bogyrbayeva 等（2023）](https://doi.org/10.1016/j.trc.2022.103981)提出的 Divide-Partition-and-Search (DPS) 算法和 Deep Reinforcement Learning (DRL) 算法，其中 DPS 算法是基于  [Agatz 等（2018）](https://doi.org/10.1287/trsc.2017.0791)的 TSP-ep-all 算法和 [Poikonen 等（2019）](https://doi.org/10.1287/ijoc.2018.0826)的 divide-and-conquer 启发式算法开发的。

DPS 算法是 [Bogyrbayeva 等（2023）](https://doi.org/10.1016/j.trc.2022.103981)提出的一种基于分治策略的启发式算法，用于解决 TSP-D。其核心思想是将大规模问题分解为较小的子问题，并通过组合子问题的解来获得全局解。DPS 算法的主要步骤如下：

1.  Divide：将全部节点划分为多个子组，每个子组包含固定数量（由参数 $g$ 控制）的节点。例如，$g = 10$ 表示每个子组有 10 个节点。

2.  Partition & Search：在每个子组内，采用 [TSP-ep-all 算法](https://doi.org/10.1287/trsc.2017.0791)进行分区。TSP-ep-all 算法通过如下步骤优化子组内的路径：

    1.  生成初始 TSP 路径：使用 Concorde TSP Solver 得到卡车单独服务的初始路径。

    2.  动态规划分区：将路径中的节点划分为由卡车和无人机协同服务的子集，以最小化总时间。

    3.  局部搜索优化：进一步调整分区以提升解的质量。

3.  合并与全局优化：将所有子组的解合并为完整的路径，并进行全局优化（如调整子组边界或路径顺序）以消除局部最优的局限性。

在 DPS 算法中，较大的子组 $g$（如 $g = 25$）会提升解的质量，但增加计算时间；较小的子组 $g$（如 $g = 10$）则相反。当 $g = N$（总节点数）时，DPS 退化为直接应用 TSP-ep-all 算法，不再划分子组。

`TSPDrone.jl` 用 Julia 实现，初始 TSP 路径由 Concorde TSP Solver 生成，分区过程基于动态规划和局部搜索，使用该仓库 DPS 算法的步骤如下：

> 学习 Julia 的课程参考 MIT 的 [Introduction to Computational Thinking](https://computationalthinking.mit.edu/)

1.  安装 [Julia](https://julialang.org/)，在命令行中输入 `julia` 进入 `Julia` 环境，输入命令安装必要的依赖：

    ```julia
    ] add https://github.com/chkwon/TSPDrone.jl
    ```

2.  使用 DPS 算法需要提供顾客节点的 $x$ 和 $y$ 坐标，仓库的 $(x, y)$ 坐标需要是第一个元素，参数 `truck_cost_factor` 和参数 `drone_cost_factor` 分别代表卡车和无人机的成本因子，会乘以从横纵坐标中计算出来的欧氏距离来得到卡车和无人机的行驶成本。

    ```julia
    using TSPDrone
    n = 10 
    x = rand(n); y = rand(n);
    truck_cost_factor = 1.0 
    drone_cost_factor = 0.5
    result = solve_tspd(x, y, truck_cost_factor, drone_cost_factor)
    @show result.total_cost;
    @show result.truck_route;
    @show result.drone_route;
    ```

    如果正常运行，会输出如下结果（根据随机数生成的结果可能会有所不同），其中节点 11 作为终止节点表示仓库节点（即终止节点的代号会在总的节点数量上 +1）：

    ``` txt
    result.total_cost = 1.6022013835206805
    result.truck_route = [1, 4, 5, 2, 8, 6, 11]
    result.drone_route = [1, 9, 4, 10, 5, 7, 8, 3, 11]
    ```

3.  或者也可以直接提供卡车和无人机的成本矩阵（即原本根据欧氏距离矩阵乘以成本因子得到的矩阵），同样，仓库节点被标记为节点 1：

    ```julia
    using TSPDrone
    n = 10 
    dist_mtx = rand(n, n)
    dist_mtx = dist_mtx + dist_mtx' # symmetric distance only
    truck_cost_mtx = dist_mtx .* 1.0
    drone_cost_mtx = truck_cost_mtx .* 0.5 
    result = solve_tspd(truck_cost_mtx, drone_cost_mtx)
    @assert size(truck_cost_mtx) == size(drone_cost_mtx) == (n, n)
    ```

4.  使用命令 `print_summary(result)` 可以输出结果总结：

    ``` txt
    julia> print_summary(result)
    Operation #1:
      - Truck        = 0.17988883875173492 : [1, 3]
      - Drone        = 0.11900891950265155 : [1, 4, 3]
      - Length       = 0.17988883875173492
    Operation #2:
      - Truck        = 0.4784476248243221 : [3, 9]
      - Drone        = 0.27587675362585756 : [3, 7, 9]
      - Length       = 0.4784476248243221
    Operation #3:
      - Truck        = 0.445749847855226 : [9, 6]
      - Drone        = 0.48831605249544785 : [9, 10, 6]
      - Length       = 0.48831605249544785
    Operation #4:
      - Truck        = 0.9269158918021541 : [6, 5, 8, 11]
      - Drone        = 0.8714473929102112 : [6, 2, 11]
      - Length       = 0.9269158918021541
    Total Cost = 2.073568407873659
    ```

5.  函数 `solve_tspd` 的可选参数包括：

    ```julia
    n_groups::Int = 1, 
    method::String = "TSP-ep-all", 
    flying_range::Float64 = MAX_DRONE_RANGE, 
    time_limit::Float64 = MAX_TIME_LIMIT
    ```

    -   `n_groups`：用于分治法的子组数量。例如，如果 $n = 100$ 且 `n_groups = 4`，则每组将有 25 个节点，然后将方法 `method` 应用于每个组。

    -   `method`：可以是以下的几种方法之一，`TSP-ep` 及其衍生方法（`TSP-ep-1p`、`TSP-ep-2p`、`TSP-ep-2opt` 和 `TSP-ep-all`）是基于 route-first，cluster-second 框架的启发式算法，由 [Agatz 等（2018）](https://doi.org/10.1287/trsc.2017.0791)提出，用于解决 TSP-D：
        -   `TSP-ep` (Exact Partition)：使用 TSP 求解器（如 Concorde）生成最优 TSP 路径，然后以初始 TSP 路径为基础，通过精确划分算法（动态规划，时间复杂度为 $O(n^3)$）将 TSP 路径分割为卡车和无人机的协同路径。

        -   `TSP-ep-1p`：在 `TSP-ep` 的基础上，引入单点移动邻域搜索（One-Point Move），通过调整单个节点的位置优化路径。即先对初始路径进行 Exact Partition，然后遍历每个节点，尝试将其移动到路径中的其他位置，计算目标函数改进，然后接受最大的移动，迭代直至无法进一步优化。

        -   `TSP-ep-2p`：在 `TSP-ep` 的基础上，引入两点交换邻域搜索（Two-Point Swap），通过交换两个节点的位置优化路径。即先对初始路径进行 Exact Partition，然后遍历所有节点对，尝试交换两者的位置，计算目标函数改进，然后接受最大的交换，迭代直至无法进一步优化。

        -   `TSP-ep-2opt`：在 `TSP-ep` 的基础上，引入 2-opt 邻域搜索，通过反转路径中的子段优化路径。即先对初始路径进行 Exact Partition，然后遍历所有可能的路径子段，尝试反转子段并重新计算总时间，接受改进最大的反转操作，迭代直至无法进一步优化。

        -   `TSP-ep-all`：在 `TSP-ep` 的基础上，综合应用所有邻域搜索策略（`1p`、`2p`、`2opt`），通过多策略组合优化路径。即先对初始路径进行 Exact Partition，然后在每轮迭代中，尝试所有邻域操作（One-Point Move, Two-Point Swap, 2-opt），选择改进最大的操作，迭代直至无法进一步优化（表现最佳，但运行时间较长 $O(n^5)$）。

    -   `flying_range`：无人机的飞行范围，默认值为 `Inf`。飞行范围与无人机成本矩阵中的值进行比较，即 `drone_cost_mtx` 或欧氏距离乘以 `drone_cost_factor`。

    -   `time_limit`：算法运行的总时间限制，以秒为单位。对于每个组，时间限制平均分配。例如，如果 `time_limit = 3600.0` 且 `n_groups = 5`，则每组的时间限制为 $3600/5=720$ 秒。

