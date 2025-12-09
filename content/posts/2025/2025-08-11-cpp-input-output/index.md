---
date: '2025-08-11 18:52:27'
title: '【C++】（一）输入和输出'
description: ""
tags: [C++, ]
categories: [C++,]
math: false
---

## 标准输入和输出流

常用的输入输出的库是 `iostream`，流（stream）是 C++ 中处理输入输出的基本概念，流是从输入输出设备中读取或写入数据的一连串字节，术语“流”源于字节是随着时间的推移而顺序流动产生或消耗的。

写入数据到流中称为输出（output），从流中读取数据称为输入（input）。对于输出来说，操作符 `<<` 称为输出操作符（output operator），用于将数据写入流中；对于输入来说，操作符 `>>` 称为输入操作符（input operator），用于从流中读取数据。输出操作符的左边必须是一个输出流对象（`ostream` object），右边必须是一个要输出的值或表达式，输出操作符会将右边的值写入左边的输出流中，输出操作符的返回值是左边的输出流对象，这样可以实现连续的输出操作，输入操作符则类似。比如下面的代码片段中，输出操作符 `<<` 将字符串 `"Hello world!"` 写入到标准输出流 `std::cout` 中，并且返回了 `std::cout`，这和第二行的代码是等价的，同样和第三行和第四行的代码也是等价的。

```cpp
std::cout << "Hello world!" << std::endl;
(std::cout << "Hello world!") << std::endl;
std::cout << "Hello world!";
std::cout << std::endl;
```

`endl` 是一个叫做“流操纵符”（stream manipulator）的特殊值，它会终止当前行并刷新（flush）与当前输出设备相关的缓冲区（buffer）。刷新缓冲区的目的是确保所有输出都被写入到输出设备中，特别是在输出设备是终端或文件时。刷新缓冲区可以确保输出的内容立即可见或可用。

> 输出经常在进行调试时使用，在这种情况下，刷新缓冲区是必要的，否则当程序出现错误时，输出仍旧停留在缓冲区中，导致调试信息出现在错误发生之后，导致调试信息指向了错误发生之后的代码。

当使用 `istream` 或 `ostream` 作为条件时，效果是测试流的状态。如果流的状态是有效的（valid），也即流没有发生错误（例如，读取或写入失败）或到达流的末尾（end-of-file, EOF），则条件为真（true）。例如下面代码中的 `std::cin >> value` 会从标准输入流 `std::cin` 中读取一个整数值并将其存储在变量 `value` 中，如果读取成功，则 `std::cin` 的状态是有效的，因此条件为真，循环继续执行；如果读取失败（例如输入不是一个整数），则 `std::cin` 的状态变为无效，循环结束。

```cpp
#include <iostream>
int main() {
    int sum = 0, value = 0;
    while (std::cin >> value) {
        sum += value;
    }
    std::cout << "Sum is: " << sum << std::endl;
    return 0;
}
```

