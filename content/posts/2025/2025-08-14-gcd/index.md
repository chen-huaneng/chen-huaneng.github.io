---
date: '2025-08-14 20:10:29'
title: 'Gcd'
description: ""
tags: [[Algorithm, GCD, Math, Binary, Number Theory]]
categories: [[Algorithm, ]]
math: true
---

## 公约数和最大公约数

### 公约数

在这里，我们约定集合 $\mathbb{Z} = \{\dots, -2, -1, 0, 1, 2, \dots\}$ 表示所有的整数，集合 $\mathbb{N} = \{0, 1, 2, \dots\}$ 表示所有的自然数。

对于任意的实数 $x$，将小于等于 $x$ 的最大整数记作 $\lfloor x \rfloor$，读作 “the floor of $x$”。对于任意的整数 $a$ 和任意正整数 $n$，$a \operatorname{mod} n$ 表示 $a / n$ 的余数（remainder or residue），也就是说：
$$
\begin{equation}
a \operatorname{mod} n = a - n \lfloor a/n \rfloor \label{eq:mod}
\end{equation}
$$
因此有 $0 \leq a \operatorname{mod} n < n$。

记号 $d \mathrel{|} a$ 读作 “$d$ divides $a$”，表示存在整数 $k$ 满足 $a = kd$，如果 $d \mathrel{|} a$ 并且 $d \geq 0$，我们说 $d$ 是 $a$ 的一个 divisor，注意到 $d \mathrel{|} a$ 成立当且仅当 $-d \mathrel{|} a$ 成立，因此将 divisor 定义为非负数并不失一般性。对于非零整数 $a$ 来说，它的 divisor 满足大于等于 $1$ 且不大于 $\lvert a \rvert$，比如 $24$ 的 divisor 是 $1, 2, 3, 4, 6, 8, 12, 24$。 



<p class="note note-success">定理一：对于任意整数 $a$ 和任意正整数 $n$，存在唯一的整数 $q$ 和满足 $0 \leq r < n$ 的唯一整数 $r$ 使得 $a = qn + r$</p>

$q = \lfloor a/n\rfloor$ 表示除法的商（quotient），$r = a \operatorname{mod} n$ 表示除法的余数，$n \mathrel{|} a$ 当且仅当 $a \operatorname{mod} n = 0$ 时成立。对于这个定理我们不做证明，感兴趣的读者可自行查阅。

如果 $d$ 是 $a$ 的一个约数（divisor），且 $d$ 也是 $b$ 的一个约数，则 $d$ 是 $a$ 和 $b$ 的公约数（common divisor）。公约数的一个重要性质：
$$
d \mathrel{|} a \text{ and } d \mathrel{|} b \text{ implies }d \mathrel{|} (a + b) \text{ and } d \mathrel{|} (a - b)
$$
通俗地说，就是两个数的公约数也是这两个数的和（差）的约数，比如 $4$ 是 $24$ 和 $12$ 的公约数，$4$ 也是 $24 + 12 = 36$ 和 $12 - 24 = -12$ （$24 - 12 = 12$）的约数。

更一般地，对于任意整数 $x,y$，我们有：
$$
\begin{equation}
d \mathrel{|} a \text{ and } d \mathrel{|} b \text{ implies }d \mathrel{|} (ax + by) \label{eq:ax_by}
\end{equation}
$$
即，两个数的公约数仍然是这两个数的线性组合的约数。

同样，如果 $a \mathrel{|} b$，那么有 $\lvert a\rvert \leq \lvert b \rvert$ 或者 $b = 0$，这样可以推出：
$$
\begin{equation}
a \mathrel{|} b \text{ and } b \mathrel{|} a \text{ implies } a = \pm b \label{eq:equality}
\end{equation}
$$
即，如果两个数互为约数，则它们的绝对值相等。

### 最大公约数

两个不全为零的整数 $a, b$ 的最大公约数（Greatest Common Divisor，GCD）是指 $a, b$ 的公约数中的最大值，$a,b$ 的最大公约数记为 $\operatorname{gcd}(a, b)$。比如 $30$ 的约数有 $1, 2, 3, 5, 6, 10, 15$ 和 $30$，$24$ 的约数有 $1, 2, 3, 4, 6, 8, 12, 24$，它们的公约数就有 $1, 2, 3, 6$，其中 $6$ 是它们的最大公约数，即 $\operatorname{gcd}(30, 24) = 6$。同时可以注意到，$1$ 是任意两个整数的公约数。

如果 $a, b$ 都是非零整数，那么 $\operatorname{gcd}(a,b)$ 一定是一个介于 $1$ 和 $\min(|a|, |b|)$ 之间的整数。同时我们定义 $\operatorname{gcd}(0,0) = 0$，这个定义是为了让最大公约数的一般性质满足所有的整数组合。以下是一些最大公约数的基本性质：

$$
\begin{align*}
\operatorname{gcd}(a,b) &= \operatorname{gcd}(b, a) \\
\operatorname{gcd}(a,b) &= \operatorname{gcd}(-a,b) \\
\operatorname{gcd}(a,b) &= \operatorname{gcd}(|a|,|b|) \\
\operatorname{gcd}(a,0) &= |a| \\ 
\operatorname{gcd}(a,ka) &= |a|, \text{for any } k \in \mathbb{Z}
\end{align*}
$$

<p class="note note-success">定理二：如果 $a, b$ 为任意整数，且它们不同时为 $0$，那么 $\operatorname{gcd}(a,b)$ 是$a$ 和 $b$ 的线性组合 $\{ax+by \mid x, y \in \mathbb{Z}\}$ 集合中最小的正元素</p>

证明：取 $s$ 为 $a$ 和 $b$ 的线性组合中最小的正数且存在 $x,y \in \mathbb{Z}$ 使得 $s = ax + by$。取 $q = \lfloor a / s \rfloor$，根据公式 $\eqref{eq:mod}$，我们有：

$$
\begin{align*}
a \operatorname{mod} s &= a - qs \\
    &= a - q(ax + by) \\
    &= a(1 - qx) + b(-qy)
\end{align*}
$$

因此 $a \operatorname{mod} s$ 同样也是 $a$ 和 $b$ 的线性组合。由于 $0 \leq a \operatorname{mod} s < s$ 且 $s$ 是线性组合中最小的正数，我们有 $a \operatorname{mod} s = 0$。因此，我们有 $s \mathrel{|} a$，类似地有 $s \mathrel{|} b$。因此 $s$ 是 $a$ 和 $b$ 的公约数且 $\operatorname{gcd}(a,b)\geq s$。因为 $\operatorname{gcd}(a,b)$ 是 $a$ 和 $b$ 的公因子且 $s$ 是 $a$ 和 $b$ 的线性组合，所以由公式 $\eqref{eq:ax_by}$ 可以得到 $\operatorname{gcd}(a,b) \mathrel{|} s$。由 $\operatorname{gcd}(a,b) \mathrel{|} s$ 且 $s > 0$ 可以推出 $\operatorname{gcd}(a,b) \leq s$。结合 $\operatorname{gcd}(a,b) \leq s$ 和 $\operatorname{gcd}(a,b) \geq s$ 推出 $\operatorname{gcd}(a,b) = s$，因此 $s$ 是 $a$ 和 $b$ 的最大公约数。

<p class="note note-success">推论一：对任意整数 $a$ 和 $b$，如果 $d \mathrel{|} a$ 且 $d \mathrel{|} b$，那么有 $d \mathrel{|} \operatorname{gcd}(a,b)$</p>

证明：由定理二我们可以知道 $\operatorname{gcd}(a,b)$ 是 $a$ 和 $b$ 的一个线性组合，因此由公式 $\eqref{eq:ax_by}$ 我们可以证得此推论。

## 求解最大公约数的算法

因为 $\operatorname{gcd}(a,b) = \operatorname{gcd}(|a|,|b|)$，所以接下来将要讨论的求解最大公约数的算法都假设 $a, b$ 是非负整数。

### GCD recursion theorem

<p class="note note-primary">定理三（GCD recursion theorem）：对于任意非负整数 $a$ 和任意正整数 $b$，满足 $\operatorname{gcd}(a,b) = \operatorname{gcd}(b, a \operatorname{mod} b)$</p>

证明：要证明这个定理，我们可以通过证明 $\operatorname{gcd}(a,b)$ 和 $\operatorname{gcd}(b, a \operatorname{mod} b)$ 互相整除，然后通过公式 $\eqref{eq:equality}$ 证明它们相等（因为它们都是非负整数）。

首先证明 $\operatorname{gcd}(a,b) \mathrel{|} \operatorname{gcd}(b, a \operatorname{mod} b)$，令 $d = \operatorname{gcd}(a,b)$，那么有 $d \mathrel{|} a$ 和 $d \mathrel{|} b$ 成立，由公式 $\eqref{eq:mod}$ 可以得到 $a \operatorname{mod} b = a - qb$，其中 $q = \lfloor a / b \rfloor$。因此就有 $a \operatorname{mod} b$ 是 $a$ 和 $b$ 的一个线性组合，由公式 $\eqref{eq:ax_by}$ 我们有 $d \mathrel{|} (a \operatorname{mod} b)$。因为 $d \mathrel{|} b$ 和 $d \mathrel{|} (a \operatorname{mod} b)$，由推论一我们可以得到 $d \mathrel{|} \operatorname{gcd}(b, a \operatorname{mod} b)$，即：
$$
\begin{equation}
\operatorname{gcd}(a,b) \mathrel{|} \operatorname{gcd}(b, a \operatorname{mod} b)\label{eq:gcd_1}
\end{equation}
$$
同样，对于 $\operatorname{gcd}(b, a \operatorname{mod} b) \mathrel{|} \operatorname{gcd}(a,b)$ 也是类似的证明方法。令 $d = \operatorname{gcd}(b, a \operatorname{mod} b)$，那么 $d \mathrel{|} b$ 且 $d \mathrel{|} (a \operatorname{mod} b)$。因为 $a = qb + (a \operatorname{mod} b)$，其中 $q = \lfloor a / b \rfloor$，我们有 $a$ 是 $b$ 和 $(a \operatorname{mod} b)$ 的一个线性组合，通过公式 $\eqref{eq:ax_by}$，可以推出 $d \mathrel{|} a$。又因为 $d \mathrel{|} b$ 且 $d \mathrel{|} a$，通过推论一可以得到 $d \mathrel{|} \operatorname{gcd}(a,b)$，即：
$$
\begin{equation}
\operatorname{gcd}(b, a \operatorname{mod} b) \mathrel{|} \operatorname{gcd}(a,b) \label{eq:gcd_2}
\end{equation}
$$
由公式 $\eqref{eq:equality}$ 和公式 $\eqref{eq:gcd_1}$ 及公式 $\eqref{eq:gcd_2}$ 可以证明这个定理。

### 求解算法实现

定理三就是求解最大公约数中经常用到的 [Euclidean algorithm](https://www.wikiwand.com/en/articles/Euclidean_algorithm)（欧几里得算法，又名辗转相除法）的原理，在利用这个定理实现欧几里得算法之前，我们先来看看朴素的暴力求解算法：

```cpp
int gcd_naive (int a, int b) {
    if (a == b) {
        return a;
    }
    if (a == 0) {
        return b;
    }
    if (b == 0) {
        return a;
    }
    int res = 1, temp = std::min(a, b);
    for (int i = 2; i <= temp; ++i) {
        if (a % i == 0 && b % i == 0) {
            res = i;
        }
    }
    return res;
}
```

很显然，遍历算法的时间复杂度是线性级的，遍历算法不适合快速求解，运行速度太慢了。因此我们尝试基于定理三来改进一下这个算法：

```cpp
int gcd_euclidean (int a, int b) {
    if (a == b) {
        return a;
    }
    if (a == 0) {
        return b;
    }
    if (b == 0) {
        return a;
    }
    while (b != 0) {
        int temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}
```

> 欧几里得算法的最坏情况输入（即导致总步数最多的输入）是连续的斐波那契数，由于斐波那契数呈指数级增长，因此欧几里得算法的最坏情况时间复杂度是对数级的。

也许你会觉得这个算法就是求解两个数的最大公约数的最优算法了，但是很遗憾地说，这个算法并不是最快的，如果你了解通用整数除法在计算机内部的实现原理，那么你会发现上面的取余运算会使得整个算法的速度变得十分地慢。

那么有没有什么办法可以不进行除法，或者把除法换成计算机更擅长的对 $2$ 的幂次进行除法（只需要进行位操作）的算法。

首先来讲不进行除法的操作，《九章算术》中有一种叫做“[更相减损术](https://baike.baidu.com/item/%E6%9B%B4%E7%9B%B8%E5%87%8F%E6%8D%9F%E6%9C%AF/449183)”的算法，其原理为若两数为偶数，则先用 $2$ 约简，随后循环以大数减去小数，直至差与减数相等，最终结果与约简掉的 $2$ 的乘积即为最大公约数。其原理基于最大公约数的传递性 $\operatorname{gcd}(a,b) = \operatorname{gcd}(b, a - b)$。

> 证明：设 $a = k_1 \operatorname{gcd}(a,b)$，$b = k_2\operatorname{gcd}(a,b)$ 且 $k_1,k_2$ 互质，即 $\operatorname{gcd}(k_1,k_2) = 1$，$a - b = (k_1 - k_2)\operatorname{gcd}(a,b)$，$b = k_2\operatorname{gcd}(a,b)$，那么有 $\operatorname{gcd}(a - b,b) = \operatorname{gcd}(k_1 - k_2,k_2)\cdot \operatorname{gcd}(a,b)$，即证 $\operatorname{gcd}(k_1 - k_2,k_2) = 1$
>
> 考虑反证法，假设 $\operatorname{gcd}(k_1 - k_2,k_2) = m$，其中 $m \in \mathbb{N}^*, m > 1$，再设 $k_1 - k_2 = t_1 m, k_2 = t_2 m$
>
> 就有 $k_1 = (t_1 + t_2)m$，那么 $\operatorname{gcd}(k_1,k_2) = m \cdot \operatorname{gcd}(t_1 + t_2,t_2) > 1$ 与 $k_1, k_2$ 互质矛盾，因此 $\operatorname{gcd}(k_1 - k_2,k_2) = 1$
>
> 综上有 $\operatorname{gcd}(a,b) = \operatorname{gcd}(b, a - b)$

但是我们很容易发现一个问题，如果 $a$ 和 $b$ 之间的差值过大，减法所需要进行的步数就会显著增加，那么有没有办法能够再次优化这个算法，结合欧几里得算法和更相减损术的优点。显然是有这种算法的，这个算法叫做 [Binary GCD algorithm](https://www.wikiwand.com/en/articles/Binary_GCD_algorithm)，也叫 Binary Euclidean algorithm 或者 Stein’s algorithm。现在假设 $a,b \geq 0$，我们分情况讨论：

1. $a = b$，显然 $\operatorname{gcd}(a,b) = a = b$
2. $a = 0$ 或 $b = 0$，此时 $\operatorname{gcd}(a,b) = a$（当 $b = 0$时），或者 $\operatorname{gcd}(a,b) = b$（当 $a = 0$ 时）
3. $a,b$ 均为偶数，此时显然 $2$ 是公约数之一，将两个数都除以 $2$，再递归求 $\operatorname{gcd}(\frac{a}{2},\frac{b}{2})$，$\operatorname{gcd}(a,b) = 2 \cdot \operatorname{gcd}(\frac{a}{2},\frac{b}{2})$
4. $a, b$ 中有且仅有一个偶数，不妨设 $a$ 为偶数，显然 $2$ 不是公约数，我们可以得到 $\operatorname{gcd}(\frac{a}{2},b) = \operatorname{gcd}(a,b)$
5. $a, b$ 均为奇数，不妨设 $a > b$，那么根据更相减损术和情况四得到 $\operatorname{gcd}(a,b) = \operatorname{gcd}(\frac{a - b}{2},b)$

这个算法能够快速求解的原理在于避免了除法运算，而只用到了二进制移位、比较和减法，这些操作通常都只需要一个时钟周期。现在我们来实现这个算法：

```cpp
int gcd_binary (int a, int b) {
    if (a == b) { // condition 1
        return a;
    }
    if (a == 0) { // condition 2
        return b;
    }
    if (b == 0) { // condition 2
        return a;
    }
    if (a & 1) {
        if (b & 1) { // a, b are odd, condition 5
            if (a > b) {
                return gcd_binary((a - b) >> 1, b);
            }
            return gcd_binary((b - a) >> 1, a);
        }
        return gcd_binary(a, b >> 1); // a is odd, b is even, condition 4
    } else {
        if (b & 1) { // a is even, b is odd, condition 4
            return gcd_binary(a >> 1, b);
        }
        return gcd_binary(a >> 1, b >> 1) << 1;
    }
}
```

但是当我们实际运行这个代码的时候却发现这个算法比欧几里得算法慢很多，这主要是因为用于区分不同情况所需要的分支操作造成的，让我们优化一下代码。

首先，让我们用除以尽可能高的 $2$ 的幂来代替所有除以 $2$ 的操作，我们可以使用 `__builtin_ctz` （现代 CPU 上可用的“计数尾随零”指令，编译器内置函数，Count Trailing Zeros，这个指令直接告诉你在一个数的二进制表示中，最低有效位（LSB）开始连续有多少个 $0$）高效地做到这一点。在原始计算中需要除以 $2$ 的地方，我们都调用这个函数，它会告诉我们该数字可以右移的确切位数。假设我们处理的是非常大的随机数，那么可以预计减少迭代次数近一半，因为 $1 + \frac{1}{2} + \frac{1}{4} + \dots = \sum_{n = 0}^\infty\frac{1}{2^n} = \lim_{n \to \infty} \frac{1 \cdot \left(1 - \frac{1}{2^n}\right)}{1 - \frac{1}{2}} = \lim_{n \to \infty} 2 \cdot \left(1 - \frac{1}{2^n}\right) = 2$。

其次，我们可以注意到，情况三（同时除以 $2$）现在只可能在最开始出现一次，这是因为在其他的情况中最终都会使得两个数中至少一个是奇数。因此，我们可以在开始时只处理这种情况一次，然后在主循环中不再考虑它。

第三，我们可以注意到，当遇到情况五的时候，因为我们使用 `__builtin_ctz` 函数来去掉所有的尾随 $0$，所以最终得到的仍然是两个奇数，也就是回到了情况五（或者情况二，即终止状态），因此情况四就可以在这个过程中被略去，这意味着我们只会处于情况五和终止状态，因此可以消除分支判断。

结合这些优化，我们可以得到以下的实现：

```cpp
int gcd_binary_optimize (int a, int b) {
    if (a == 0) {
        return b;
    }
    if (b == 0) {
        return a;
    }
    // count trailing zeros
    int az = __builtin_ctz(a);
    int bz = __builtin_ctz(b);
    // extract the power of the common divisor 2
    int shift = std::min(az, bz);
    // drop the trailing zeros, now a, b are all odd
    a >>= az;
    b >>= bz;
    while (a != 0) {
        int diff = a - b; // a, b are all odd, and diff is even
        b = std::min(a, b); // b is odd
        a = std::abs(diff); // now a is even
        a >>= __builtin_ctz(a); // now a is odd or 0
    }
    return b << shift; // after loop, a == 0, and gcd(0, b) = b, multiple the common divisor power of 2
}
```

同时，由于现代处理器能够并行处理指令，所以上面给出的算法的运算速度取决于其关键路径上运算时间的总和，在这个算法中，关键路径是计算 `diff -> abs -> ctz -> shift` 的总时间，并行执行的是 `min`。

我们可以利用 `diff = a - b` 来计算 `ctz`，因为一个能被 $2^k$ 整除的负数在其二进制表示的末尾仍然有 $k$ 个零（这是因为二进制的符号位在最高位），因此尾随零的个数是一样的。这样我们就不需要等待 `max(diff, -diff)` 即 `abs(diff)` 计算完毕，从而能够并行执行 `min`，`diff -> ctz -> shift` 和 `abs`，从而进一步优化算法：

```cpp
int gcd_binary_optimize_critical_path (int a, int b) {
    if (a == 0) {
        return b;
    }
    if (b == 0) {
        return a;
    }
    // count trailing zeros
    int az = __builtin_ctz(a), bz = __builtin_ctz(b);
    int shift = az > bz ? bz : az; // extract the power of the common divisor 2
    b >>= bz; // now b is odd
    while (a) {
        a >>= az; // now a is odd
        int diff = b - a;
        az = __builtin_ctz(diff);
        if (a < b) { // if b is less than a, then is not require to change b
            b = a;
        }
        a = diff < 0 ? -diff : diff; // replace the abs function
    }
    return b << shift;
}
```

这就是目前我找到的求解两个整数的最大公约数的最优算法了，如果还有更快的算法可以告诉我。

总结一下，我们通过逐步深入欧几里得算法和算法设计的缺陷，对欧几里得算法进行了改进，但是我在实际运行的测试过程中发现其实欧几里得算法比优化后的算法要快，我认为这是因为在测试中所使用的都是整数类型，而对于 $32$ 位的整数类型来说，取余算法在硬件实现中也已经可以做到在一个时钟周期内完成，另外在优化后的算法中，由于需要进行移位操作而增加的额外比较和判断相比于直接取模运算并没有增益太多，反而增加了时钟周期，导致优化后的算法没有欧几里得算法快。

关于这个优化是否有必要，我认为这是一个取舍的问题，如果是平常使用，欧几里得算法已经足够了，如果是进行一些特殊的运算（比如斐波那契数列的数据），可以考虑用优化的算法。对算法的具体时间复杂度表达式感兴趣的可以参考 [Binary GCD algorithm](https://www.wikiwand.com/en/articles/Binary_GCD_algorithm)。更多关于这个算法的取舍问题可以参考 Stack Overflow 上的讨论：[Why is the binary GCD algorithm so much slower for me?](https://stackoverflow.com/questions/7814571/why-is-the-binary-gcd-algorithm-so-much-slower-for-me)

测试用的完整代码：

```cpp
#include <iostream>
#include <vector>
#include <chrono>
#include <cmath>
#include <climits>
#include <cstdlib>
#include <tuple>
#include <utility>
#include <functional>

// ====================== 不同GCD算法实现 ======================

// 欧几里得算法（辗转相除法）
int gcd_euclidean (int a, int b) {
    if (a == b) {
        return a;
    }
    if (a == 0) {
        return b;
    }
    if (b == 0) {
        return a;
    }
    while (b != 0) {
        int temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

// Binary GCD
int gcd_binary (int a, int b) {
    if (a == b) { // condition 1
        return a;
    }
    if (a == 0) { // condition 2
        return b;
    }
    if (b == 0) { // condition 2
        return a;
    }
    if (a & 1) {
        if (b & 1) { // a, b are odd, condition 5
            if (a > b) {
                return gcd_binary((a - b) >> 1, b);
            }
            return gcd_binary((b - a) >> 1, a);
        }
        return gcd_binary(a, b >> 1); // a is odd, b is even, condition 4
    } else {
        if (b & 1) { // a is even, b is odd, condition 4
            return gcd_binary(a >> 1, b);
        }
        return gcd_binary(a >> 1, b >> 1) << 1;
    }
}

int gcd_binary_optimize (int a, int b) {
    if (a == 0) {
        return b;
    }
    if (b == 0) {
        return a;
    }
    // count trailing zeros
    int az = __builtin_ctz(a);
    int bz = __builtin_ctz(b);
    // extract the power of the common divisor 2
    int shift = std::min(az, bz);
    // drop the trailing zeros, now a, b are all odd
    a >>= az;
    b >>= bz;
    while (a != 0) {
        int diff = a - b; // a, b are all odd, and diff is even
        b = std::min(a, b); // b is odd
        a = std::abs(diff); // now a is even
        a >>= __builtin_ctz(a); // now a is odd or 0
    }
    return b << shift; // after loop, a == 0, and gcd(0, b) = b, multiple the common divisor power of 2
}

int gcd_binary_optimize_critical_path (int a, int b) {
    if (a == 0) {
        return b;
    }
    if (b == 0) {
        return a;
    }
    // count trailing zeros
    int az = __builtin_ctz(a), bz = __builtin_ctz(b);
    int shift = az > bz ? bz : az; // extract the power of the common divisor 2
    b >>= bz; // now b is odd
    while (a) {
        a >>= az; // now a is odd
        int diff = b - a;
        az = __builtin_ctz(diff);
        if (a < b) { // if b is less than a, then is not require to change b
            b = a;
        }
        a = diff < 0 ? -diff : diff; // replace the abs function
    }
    return b << shift;
}

// ====================== 测试框架 ======================

// 测试函数，返回测试结果和运行时间（纳秒）
std::pair<bool, long long> test_algorithm (
    std::function<int(int, int)> gcd_func, // 算法函数
    int a, int b, int expected, 
    int iterations = 1000000) {
    // 验证结果正确性
    int result = gcd_func(a, b);
    bool passed = (result == expected);
    
    // 测量运行时间
    auto start = std::chrono::high_resolution_clock::now();
    for (int i = 0; i < iterations; ++i) {
        volatile int temp = gcd_func(a, b);
        (void)temp;
    }
    auto end = std::chrono::high_resolution_clock::now();
    
    long long duration = std::chrono::duration_cast<std::chrono::nanoseconds>(end - start).count();
    return std::make_pair(passed, duration / iterations);
}

// 完整测试一个算法
void run_full_test (
    const std::string& algorithm_name,
    std::function<int(int, int)> gcd_func,
    const std::vector<std::tuple<int, int, int>>& test_cases,
    int iterations = 1000000) {
    int passed_count = 0;
    int total_tests = test_cases.size();
    long long total_time = 0;
    long long min_time = LLONG_MAX;
    long long max_time = 0;

    std::cout << "\n开始测试算法: " << algorithm_name << "\n";
    
    for (const auto& test_case : test_cases) {
        int a = std::get<0>(test_case);
        int b = std::get<1>(test_case);
        int expected = std::get<2>(test_case);
        
        auto [passed, avg_time] = test_algorithm(gcd_func, a, b, expected, iterations);
        
        if (passed) {
            ++passed_count;
        }
        
        // 更新时间统计
        total_time += avg_time;
        min_time = std::min(min_time, avg_time);
        max_time = std::max(max_time, avg_time);
    }

    std::cout << "========================================\n";
    std::cout << "测试结果: " << passed_count << "/" << total_tests << " 通过\n";
    std::cout << "通过率: " << (passed_count * 100.0 / total_tests) << "%\n";
    std::cout << "时间统计: \n";
    std::cout << "  最小时间: " << min_time << " 纳秒\n";
    std::cout << "  最大时间: " << max_time << " 纳秒\n";
    std::cout << "  平均时间: " << (total_time / total_tests) << " 纳秒\n";
    std::cout << "  总时间: " << total_time << " 纳秒\n";
    std::cout << "========================================\n";
}

int main() {
    // 定义测试用例：{a, b, 期望结果}
    std::vector<std::tuple<int, int, int>> test_cases = {
        // 基本功能测试
        {32000, 32000, 32000},
        {48, 18, 6},
        {18, 48, 6},
        {0, 5, 5},
        {5, 0, 5},
        {0, 0, 0},
        
        // 质数相关测试
        {17, 5, 1},
        {5, 17, 1},
        {5, 9, 1},
        {9, 5, 1},
        {17, 1, 1},
        {1, 17, 1},
        {1, 1, 1},
        {1, 0, 1},
        {13, 13, 13},
        
        // 边界值测试
        {INT_MAX, INT_MAX, INT_MAX},
        {INT_MAX, 1, 1},
        {INT_MAX, 2, 1},
        
        // 大数测试
        {123456789, 987654321, 9},
        {987654321, 123456789, 9},
        {123456789, 98765432, 1},
        {98765432, 123456789, 1},
        {999999997, 999999996, 1},
        {999999996, 999999997, 1},
        
        // 倍数关系
        {100, 50, 50},
        {50, 100, 50},
        {100, 100, 100},
        {999, 333, 333},
        {333, 999, 333}
    };

    // 测试不同的GCD算法
    const int iterations = 10000000;
    run_full_test("欧几里得算法", gcd_euclidean, test_cases, iterations);
    run_full_test("Binary GCD", gcd_binary, test_cases, iterations);
    run_full_test("Binary GCD Optimizated", gcd_binary_optimize, test_cases, iterations);
    run_full_test("Binary GCD Optimizated parallel", gcd_binary_optimize_critical_path, test_cases, iterations);

    return 0;
}
```

编译命令：

```bash
g++ -std=c++17 temp.cpp -o temp
.\temp.exe
```

## 参考资料

- [实数范围内的求模（求余）运算：负数求余究竟怎么求](https://ceeji.net/blog/mod-in-real/) 关于负数和实数的求模运算可以参考这篇博客
- [Introduction to Algorithms (4/e)](https://book.douban.com/subject/35591269/) 大名鼎鼎的《算法导论》
- [Binary GCD - Algorithmica](https://en.algorithmica.org/hpc/algorithms/gcd/) 一个很好的算法参考网站


