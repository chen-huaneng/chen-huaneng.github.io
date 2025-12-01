---
date: '2025-12-01T10:31:36+08:00'
title: 'Math - 变限积分函数的求导'
description: "详细讲解了如何对变限积分函数进行求导。"
tags: ['Math', 'Leibniz', 'Limits', 'Integral', 'Differentiation']
categories: ['Math']
math: true
---

##  一重积分的变限积分函数求导

对一重积分的变限积分函数进行求导一般使用莱布尼茨积分法则（Leibniz integral rule），用于计算积分上下限都是 $t$ 的函数且被积函数也依赖于 $t$ 的积分的导数。下面来详细证明这个公式：
$$
\frac{d}{dt}\int_{a(t)}^{b(t)} f(x,t) \, dx = f(b(t),t)b'(t) - f(a(t),t)a'(t) + \int_{a(t)}^{b(t)} \frac{\partial f}{\partial t}(x,t) \, dx
$$

### 证明过程

我们考虑函数：

$$
F(t) = \int_{a(t)}^{b(t)} f(x,t) \, dx
$$

根据导数的定义：

$$
\begin{align*}
F'(t) &= \lim_{h \to 0} \frac{F(t+h) - F(t)}{h} \\
&= \lim_{h \to 0} \frac{1}{h} \left[ \int_{a(t+h)}^{b(t+h)} f(x,t+h) \, dx - \int_{a(t)}^{b(t)} f(x,t) \, dx \right]
\end{align*}
$$

将第一个积分拆分为三部分：

$$
\int_{a(t+h)}^{b(t+h)} f(x,t+h) \, dx = \int_{a(t+h)}^{a(t)} f(x,t+h) \, dx + \int_{a(t)}^{b(t)} f(x,t+h) \, dx + \int_{b(t)}^{b(t+h)} f(x,t+h) \, dx
$$

代入原式：

$$
\begin{align*}
F'(t) &= \lim_{h \to 0} \frac{1}{h} \left[ \int_{a(t+h)}^{a(t)} f(x,t+h) \, dx + \int_{a(t)}^{b(t)} [f(x,t+h) - f(x,t)] \, dx + \int_{b(t)}^{b(t+h)} f(x,t+h) \, dx \right] \\
&= \lim_{h \to 0} \frac{1}{h} \int_{a(t+h)}^{a(t)} f(x,t+h) \, dx + \lim_{h \to 0} \frac{1}{h} \int_{a(t)}^{b(t)} [f(x,t+h) - f(x,t)] \, dx + \lim_{h \to 0} \frac{1}{h} \int_{b(t)}^{b(t+h)} f(x,t+h) \, dx
\end{align*}
$$

现在分别计算这三个极限：

第一项：

$$
\lim_{h \to 0} \frac{1}{h} \int_{a(t+h)}^{a(t)} f(x,t+h) \, dx = -\lim_{h \to 0} \frac{1}{h} \int_{a(t)}^{a(t+h)} f(x,t+h) \, dx
$$

根据[积分中值定理](https://zhuanlan.zhihu.com/p/132668736)，存在 $\xi$ 在 $a(t)$ 和 $a(t+h)$ 之间，使得：

$$
\int_{a(t)}^{a(t+h)} f(x,t+h) \, dx = f(\xi,t+h)(a(t+h)-a(t))
$$

所以：

$$
\begin{align*}
-\lim_{h \to 0} \frac{1}{h} \int_{a(t)}^{a(t+h)} f(x,t+h) \, dx &= \underbrace{-\lim_{h \to 0} f(\xi,t+h) \frac{a(t+h)-a(t)}{h} = -\lim_{h \to 0} f(\xi,t+h) \cdot \lim_{h \to 0} \frac{a(t+h)-a(t)}{h}}_{\text{Since the limits exist, we can use the rules of limit arithmetic.}} \\
&= -f(a(t),t)a'(t)
\end{align*}
$$

当 $h \to 0$ 时不难得到 $\xi \to a(t)$。

第二项：

$$
\begin{align*}
\lim_{h \to 0} \frac{1}{h} \int_{a(t)}^{b(t)} [f(x,t+h) - f(x,t)] \, dx &= \int_{a(t)}^{b(t)} \lim_{h \to 0} \frac{f(x,t+h) - f(x,t)}{h} \, dx \\
&= \int_{a(t)}^{b(t)} \frac{\partial f}{\partial t}(x,t) \, dx
\end{align*}
$$

第三项同样可以类似于第一项：

$$
\lim_{h \to 0} \frac{1}{h} \int_{b(t)}^{b(t+h)} f(x,t+h) \, dx
$$

根据积分中值定理，存在 $\eta$ 在 $b(t)$ 和 $b(t+h)$ 之间，使得：

$$
\int_{b(t)}^{b(t+h)} f(x,t+h) \, dx = f(\eta,t+h)(b(t+h)-b(t))
$$

所以：

$$
\lim_{h \to 0} \frac{1}{h} \int_{b(t)}^{b(t+h)} f(x,t+h) \, dx = \lim_{h \to 0} f(\eta,t+h) \frac{b(t+h)-b(t)}{h} = f(b(t),t)b'(t)
$$

当 $h \to 0$ 时不难得到 $\eta \to b(t)$。

将三部分结果相加：

$$
\begin{align*}
F'(t) &= -f(a(t),t)a'(t) + \int_{a(t)}^{b(t)} \frac{\partial f}{\partial t}(x,t) \, dx + f(b(t),t)b'(t) \\
&= f(b(t),t)b'(t) - f(a(t),t)a'(t) + \int_{a(t)}^{b(t)} \frac{\partial f}{\partial t}(x,t) \, dx
\end{align*}
$$

这就证明了莱布尼茨积分法则。

### 直观理解

这个公式可以理解为：当积分上下限随 $t$ 变化时，导数包含三部分：

1. 上限 $b(t)$ 变化带来的影响：$f(b(t),t)b'(t)$
2. 下限 $a(t)$ 变化带来的影响：$-f(a(t),t)a'(t)$
3. 被积函数 $f(x,t)$ 随 $t$ 变化带来的影响：$\int_{a(t)}^{b(t)} \frac{\partial f}{\partial t}(x,t) \, dx$

这就像在计算一个动态变化的面积，面积的变化来自三个因素：上边界移动、下边界移动和内部「高度」的变化。