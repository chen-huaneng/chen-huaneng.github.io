---
date: '2025-03-23 11:21:02'
title: 'Gurobi'
description: ""
tags: [[Python, Gurobi, ]]
categories: [[Python]]
math: true
---

## 申请 `Gurobi` 学术许可和安装 `Gurobi`

申请 `Gurobi` 学术许可和安装可以参考[Gurobi最新安装与学术许可申请教程（2025） - 知乎](https://zhuanlan.zhihu.com/p/24819586963)

## 配置 `Python` 环境

首先打开命令行终端，用 `Conda` 单独创建一个环境：

```powershell
conda create --name name_env
```

激活环境：

```powershell
conda activate name_env
```

用 `Conda` 包管理安装 `Gurobi` 到 `Python` 库中[^1]：

```powershell
conda install -c gurobi gurobi
```

安装完之后，可以用下面的例子测试 `Gurobi` 是否能够正常使用：

```python
import gurobipy as gp
from gurobipy import GRB

def test_gurobi():
    try:
        # 创建一个新的模型
        model = gp.Model("test_model")

        # 添加变量
        x = model.addVar(name="x", vtype=GRB.CONTINUOUS, lb=0)
        y = model.addVar(name="y", vtype=GRB.CONTINUOUS, lb=0)

        # 更新模型以整合新变量
        model.update()

        # 设置目标函数：最大化 3x + 2y
        model.setObjective(3 * x + 2 * y, GRB.MAXIMIZE)

        # 添加约束条件
        # x + y <= 4
        model.addConstr(x + y <= 4, "c0")

        # x <= 2
        model.addConstr(x <= 2, "c1")

        # y <= 3
        model.addConstr(y <= 3, "c2")

        # 优化模型
        model.optimize()

        # 检查优化状态
        if model.status == GRB.OPTIMAL:
            print(f"最优目标值: {model.ObjVal}")
            print(f"x = {x.x}")
            print(f"y = {y.x}")
        else:
            print("没有找到最优解。")
    
    except gp.GurobiError as e:
        print(f"Gurobi错误: {e}")
    
    except Exception as e:
        print(f"其他错误: {e}")

if __name__ == "__main__":
    test_gurobi()
```

如果能够正常使用会输出以下结果：

```txt
Optimize a model with 3 rows, 2 columns and 4 nonzeros
Model fingerprint: 0x5c2931af
Coefficient statistics:
  Matrix range     [1e+00, 1e+00]
  Objective range  [2e+00, 3e+00]
  Bounds range     [0e+00, 0e+00]
  RHS range        [2e+00, 4e+00]
Presolve removed 2 rows and 0 columns
Presolve time: 0.00s
Presolved: 1 rows, 2 columns, 2 nonzeros

Iteration    Objective       Primal Inf.    Dual Inf.      Time
       0    1.2000000e+01   2.000000e+00   0.000000e+00      0s
       1    1.0000000e+01   0.000000e+00   0.000000e+00      0s

Solved in 1 iterations and 0.00 seconds (0.00 work units)
Optimal objective  1.000000000e+01
最优目标值: 10.0
x = 2.0
y = 2.0
```



[^1]: [How do I install Gurobi for Python? – Gurobi Help Center](https://support.gurobi.com/hc/en-us/articles/360044290292-How-do-I-install-Gurobi-for-Python)

