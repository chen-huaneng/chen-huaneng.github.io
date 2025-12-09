---
date: '2025-08-12 11:04:05'
title: '【Dataset】Amazon最后一公里物流配送数据集'
description: ""
tags: [Dataset, Python, TSP-D, TSP, Haversine formula,]
categories: [Dataset,]
math: true
---

## 数据集来源及介绍

[Amazon Delivery Dataset](https://www.kaggle.com/datasets/sujalsuthar/amazon-delivery-dataset) 是一个 Amazon 公司最后一公里物流运营情况的数据集，包含了超过 43632 次配送的多城市数据，数据字段包括订单详情、配送人员、天气、交通情况、配送仓库和配送地点的经纬度等信息。要将数据集转换为可以用于 TSP-D 的数据集，需要将数据集中的经纬度转换为欧几里得距离，即两点之间的直线距离，当然在此之前需要对原始数据集进行一些数据的预处理工作。

## 数据预处理

关于已知两点经纬度计算两点之间距离的方法，这里使用了 [Haversine formula](https://www.wikiwand.com/en/articles/Haversine_formula) ，但是要注意这个公式只是一个近似值，即假设地球是一个球体，而实际上地球是一个椭球体，不过对于不是精确到亚米级别的应用来说，这个公式的精度是足够的，误差在  $0.5\%$ 以内。如果需要更精确的方法可以参考 [Vincenty's formulae](https://www.wikiwand.com/en/articles/Vincenty%27s_formulae) 和 [Geographical distance](https://www.wikiwand.com/en/articles/Geographical_distance)。根据经纬度判断这个点是否在陆地的方法可以参考 Python 的库 [global-land-mask](https://pypi.org/project/global-land-mask/)。

> 在代码中使用的不是 $\arcsin$ 而是 $\arctan$，这是因为当 $\sin$ 值接近 1 时，直接使用 $\arcsin$ 可能导致精度问题，而 $\arctan$ 通过显式分离分子分母，可以使得计算更加稳定。$\arcsin$ 和 $\arctan$ 之间的转换可以参考[实用反三角函数运算公式](https://zhuanlan.zhihu.com/p/111197233)。

```python
import pandas as pd
from math import radians, sin, cos, sqrt, atan2
from global_land_mask import globe

# Haversine公式计算距离
def haversine(lat1, lon1, lat2, lon2):
    R = 6371.393 # 地球半径近似值
    lat1_rad, lon1_rad = radians(lat1), radians(lon1)
    lat2_rad, lon2_rad = radians(lat2), radians(lon2)
    dlon = lon2_rad - lon1_rad
    dlat = lat2_rad - lat1_rad
    a = sin(dlat/2)**2 + cos(lat1_rad)*cos(lat2_rad)*sin(dlon/2)**2
    return R * 2 * atan2(sqrt(a), sqrt(1-a))

# 读取数据
df = pd.read_csv('amazon_delivery.csv')

# 步骤1: 筛选顾客节点>=10的仓库
valid_warehouses = df.groupby(['Store_Latitude', 'Store_Longitude']).filter(lambda x: len(x) >= 10)

# 步骤2: 剔除顾客-仓库经纬度差>=1的订单
valid_warehouses = valid_warehouses[
    (abs(valid_warehouses['Store_Latitude'] - valid_warehouses['Drop_Latitude']) < 1) &
    (abs(valid_warehouses['Store_Longitude'] - valid_warehouses['Drop_Longitude']) < 1)
]

# 步骤3: 计算距离并筛选<=50公里的订单
valid_warehouses['Distance'] = valid_warehouses.apply(
    lambda row: haversine(row['Store_Latitude'], row['Store_Longitude'],
                          row['Drop_Latitude'], row['Drop_Longitude']),
    axis=1
)
valid_warehouses = valid_warehouses[valid_warehouses['Distance'] <= 50]

# 步骤4: 去重同一仓库下的重复顾客
valid_warehouses = valid_warehouses.drop_duplicates(
    subset=['Store_Latitude', 'Store_Longitude', 'Drop_Latitude', 'Drop_Longitude']
)

# 步骤5: 检查仓库是否在陆地
# 提取唯一仓库坐标
warehouse_coords = valid_warehouses[['Store_Latitude', 'Store_Longitude']].drop_duplicates()

# 使用global_land_mask检查陆地
warehouse_coords['Is_Land'] = warehouse_coords.apply(
    lambda row: globe.is_land(row['Store_Latitude'], row['Store_Longitude']),
    axis=1
)

# 合并陆地标记到原始数据
valid_warehouses = valid_warehouses.merge(
    warehouse_coords[['Store_Latitude', 'Store_Longitude', 'Is_Land']],
    on=['Store_Latitude', 'Store_Longitude'],
    how='left'
)

# 步骤6: 剔除位于海里的仓库数据
final_data = valid_warehouses[valid_warehouses['Is_Land']]

# 输出结果
final_data.to_excel('amazon_delivery_filtered_data.xlsx', index=False)
warehouse_stats = final_data.groupby(['Store_Latitude', 'Store_Longitude']).size().reset_index(name='Count')
warehouse_stats.sort_values(by='Count', ascending=False).to_excel('warehouse_stats.xlsx', index=False)
```

首先删除不需要的数据列。接着通过将前面得到的数据导入到 [Google Maps](https://www.google.com/maps/d/) 中，可以看到仓库数据大致可以聚类成 22 个簇，因此聚类时设置聚类数量为 22。然后将同一聚类的仓库节点和配送节点合并到同一个 Excel 文件中，因此总共会生成 22 个不同聚类的 Excel 文件。

```python
import pandas as pd
import numpy as np
from sklearn.cluster import KMeans
import os

# 1. 读取Excel文件并提取需要的列
df = pd.read_excel("amazon_delivery_filtered_data.xlsx")
filtered_df = df[["Store_Latitude", "Store_Longitude", "Drop_Latitude", "Drop_Longitude"]]

# 2. 提取唯一的仓库坐标用于聚类
store_coords = filtered_df[["Store_Latitude", "Store_Longitude"]].drop_duplicates()

# 3. 使用KMeans进行聚类（已知聚类数=22）
kmeans = KMeans(n_clusters=22, random_state=42, n_init=10)
store_coords["Cluster"] = kmeans.fit_predict(store_coords[["Store_Latitude", "Store_Longitude"]])

# 4. 将聚类标签合并回原始数据
merged_df = filtered_df.merge(
    store_coords,
    how="left",
    on=["Store_Latitude", "Store_Longitude"]
)

# 5. 创建保存结果的文件夹
output_dir = "clustered_nodes"
os.makedirs(output_dir, exist_ok=True)

# 6. 按聚类分组处理数据
for cluster_id in range(22):
    # 提取当前聚类的数据
    cluster_data = merged_df[merged_df["Cluster"] == cluster_id]
    
    # 分离仓库节点和顾客节点
    store_nodes = cluster_data[["Store_Latitude", "Store_Longitude"]].drop_duplicates()
    customer_nodes = cluster_data[["Drop_Latitude", "Drop_Longitude"]].drop_duplicates()
    
    # 生成唯一ID
    store_nodes["ID"] = ["store_" + str(i) for i in range(len(store_nodes))]
    customer_nodes["ID"] = ["customer_" + str(i) for i in range(len(customer_nodes))]
    
    # 重命名列以匹配
    store_nodes.rename(columns={"Store_Latitude": "latitude", "Store_Longitude": "longitude"}, inplace=True)
    customer_nodes.rename(columns={"Drop_Latitude": "latitude", "Drop_Longitude": "longitude"}, inplace=True)
    
    # 合并节点并整理列顺序
    combined_nodes = pd.concat([store_nodes, customer_nodes], ignore_index=True)
    combined_nodes = combined_nodes[["ID", "latitude", "longitude"]]
    
    # 输出每个聚类的节点数量
    total_nodes = len(store_nodes) + len(customer_nodes)
    print(f"聚类 {cluster_id} 有 {total_nodes} 个节点（仓库节点: {len(store_nodes)}，顾客节点: {len(customer_nodes)}）")
    
    # 保存到Excel文件
    output_path = os.path.join(output_dir, f"cluster_{cluster_id}.xlsx")
    combined_nodes.to_excel(output_path, index=False)
```

