---
date: '2024-10-24 15:15:12'
title: 'LaTeX - （三）使用技巧'
description: "记录一些使用 LaTeX 的技巧。"
tags: [LaTeX]
categories: [LaTeX]
math: true
---

## 有“强迫症”的浮动体

- [LaTeX 中的浮动体：基础篇 | 始终 (liam.page)](https://liam.page/2017/03/11/floats-in-LaTeX-basic/)

## 如何查找文档

在命令行中输入 `texdoc <doc name>`，比如想找 $C\TeX$ 宏包的文档：`texdoc ctex`。

## 宏包

### 各种宏包的作用

- todonotes: comments and TODO management 
- pgfplots: create graphs in $\LaTeX$
- [spreadtab](https://www.ctan.org/pkg/spreadtab): create spreadsheets in $\LaTeX$
- gchords, guitar: guitar chords and tabulature 
- cwpuzzle: crossword puzzles
- [AMS-LaTeX](https://www.ams.org/arc/resources/amslatex-about.html): 数学公式amsmath包
  - [LaTeX公式.pdf (reformship.github.io) ](https://reformship.github.io/pages/1capacity/4writing/LaTeX公式.pdf) - 中文版数学公式速查手册

### 有关宏包的文档

- [Examples - Equations, Formatting, TikZ, Packages and More - Overleaf, Online LaTeX Editor](https://www.overleaf.com/latex/examples)
- [The CTAN archive (sustech.edu.cn)](https://mirrors.sustech.edu.cn/CTAN/) 基本上所有的宏包都能在这里和其他镜像站点找到

## 实用技巧

### 只查看出错的代码

使用工具宏包 syntonly，加载这个宏包之后，在导言区使用 `\syntonly` 命令，可以使得 $\LaTeX$ 编译后不生成 DVI 或者 PDF 文档，只排查错误，编译速度会快不少：

```latex
\usepackage{syntonly}
\syntonly
```

如果想生成文档，用 `%` 注释掉 `syntonly` 命令就可以。

### $\LaTeX$ 编译速度优化

```latex
\special{dvipdfmx:config z 0} % 取消PDF压缩，加快速度，最终版本生成的时候最好把这句话注释掉
```

参考：

- [小技巧：加快LaTeX论文的编译 - 知乎](https://zhuanlan.zhihu.com/p/357926809)
- [如何提高LaTeX的编译速度？ - 知乎](https://www.zhihu.com/question/264248150)
- [如何加速 LaTeX 编译 - 知乎](https://zhuanlan.zhihu.com/p/55043560)
- [LaTeX编译速度优化_latex自动编译-CSDN博客](https://blog.csdn.net/weixinhum/article/details/121056868)

### 新增空白页

增加一个没有页脚页眉的空白页，来源于 [double sided - Add unnumbered blank page after cover page, but before title page and book](https://tex.stackexchange.com/questions/508315/add-unnumbered-blank-page-after-cover-page-but-before-title-page-and-book)

```latex
% 新增空白页方便打印
\clearpage
~
\thispagestyle{empty}
\clearpage
```

### 优化代码环境

$\LaTeX$ 原生支持代码环境 verbatim，verbatim 宏包优化了 verbatim 环境的内部命令，并提供了 `\verbatiminput` 命令用来直接读入文件生成代码环境。fancyvrb 宏包提供了可定制格式的 Verbatim 环境；listings 宏包更进一步，可生成关键字高亮的代码环境，支持各种程序设计语言的语法和关键字。

### 在 $\LaTeX$ 中如何输出中文

#### 使用 CTeX 宏集（首选）

以 UTF-8 编码保存，使用 XeLaTeX 编译：

```latex
\documentclass[UTF8]{ctexart}
\begin{document}
	你好，world!
\end{document}
```

#### 使用 xeCJK 宏包

使用XeLaTeX编译：

```latex
\documentclass{article}
\usepackage{xeCJK} %调用 xeCJK 宏包
\setCJKmainfont{SimSun} %设置 CJK 主字体为 SimSun （宋体）
\begin{document}
你好，world!
\end{document}
```

此种方式适用于有特定文档类型的情况，如 beamer。

### 空格

不带花括号的命令后面如果想打印空格，要加上一对内部为空的花括号再键入空格，否则空格会被忽略。例如：

```latex
\LaTeX{} Studio
```

### 引号

英文单引号不是使用两个 ‘ 符号组合，左单引号是重音符 \` （键盘上数字 1 左侧），而右单引号是常用的引号符。英文中，左双引号就是连续两个重音符。英文下的引号嵌套需要借助 `\thinspace` 命令分隔，比如：

```latex
``\thinspace `Max' is here.''
```

中文下的单引号和双引号可以用中文输入法直接输入。

### 破折号、省略号和短横

英文的短横分三种：

- 连字符：输入一个短横 `-`
- 数字起止符：输入两个短横 `–`
- 破折号：输入三个短横 `---`

中文的破折号和省略号可以直接使用日常的输入方式，但是英文的省略号使用 `\ldots` 而不是三个句点。

### 强调

$\LaTeX$ 中专门有个叫做 `\emph{}` 的命令可以强调文本，对于通常的西文文本，上述命令的作用就是斜体，如果对一段已经这样转换成斜体的文本再使用这个命令，就会取消斜体，而成为正体。

西文中一般采用上述的斜体强调方式而不是粗体，例如在说明书名的时候可能就会使用这个命令。

### 下划线与删除线

不推荐 $\LaTeX$ 原生提供的 `\underline` 命令，建议使用 **ulem** 宏包下的 `\uline` 命令代替，它还支持换行文本。**ulem** 宏包还提供了一些实用命令：

- `\uline{}` 下划线
- `\uuline{}` 双下划线
- `\dashuline{}` 虚下划线
- `\dotuline{}` 点下划线
- `\uwave{}` 波浪线
- `\sout{}` 删除线
- `\xout{}` 斜删除线

需要注意的是，**ulem** 宏包重定义了 `\emph` 命令，使得原来的加斜强调变成了下划线，原来的两次强调就取消强调变成了两次强调就双下划线。通过宏包的 normalem 选项可以取消这个更改：`\usepackage[normalem]{ulem}`。

### 智能交叉引用

`hyperref` 宏包中的 `\autoref` 命令可以自动添加类型前缀，再也不用担心全文的哪里格式有误。比如文章中有很多地方有图（表、公式）的引用，那么通过 `\autoref` 显示的引用可以通过下面的接口统一修改引用的前缀。

```latex
\usepackage{hyperref} % 提供 autoref 功能

% 自定义 autoref 的引用格式
\def\figureautorefname{fig.} % 将 "Figure" 改为 "fig."
\def\tableautorefname{tab.}  % 将 "Table" 改为 "tab."
\def\equationautorefname{eq.} % 将 "Equation" 改为 "eq."
```

## 数学环境

### 行间公式和行内公式

首先在导言区导入`amsmath`宏包，使用`$...$`插入行内公式，使用`\[...\]`插入不带编号行间公式，如果需要对行间公式进行编号，可以使用`equation`环境：

```latex
\begin{equation}
...
\end{equation}
```

虽然也有其他的方式实现上述的需求，但是相比之下，上面所使用的实现方式在语法上更为简洁，故采用。

行内公式也可以使用 `\(...\)` 或者 `\begin{math} ... \end{math}` 来插入，但略显麻烦。  无编号的行间公式也可以使用 `\begin{displaymath} ... \end{displaymath}` 或者 `\begin{equation*} ... \end{equation*}` 来插入，但略显麻烦。（`equation*` 中的 `*` 表示环境不编号），也有 plainTeX 风格的 `$$ ... $$` 来插入不编号的行间公式。但是在 LaTeX 中这样做会改变行文的默认行间距，不推荐。

如果需要处理通过等号或者不等号对齐的多行公式，推荐使用 `align` 和不给公式编号的 `align*` 环境。`align` 环境将公式用 `&` 分隔为两部分并在 `&` 处对齐。通常情况下，分隔符 `&` 放在等号 `=` 的左边。如果不想 `align` 环境给某行公式编上序号，可以用 `\notag` 或 `\nonumber` 命令取消这一行公式的编号：

```latex
\begin{align}
      z &= (a+b)^4 \notag\\
 	&= (a+b)^2(a+b)^2 \nonumber\\
 	&= (a^2+2ab+b^2)(a^2+2ab+b^2)\\
 	&= a^4 + 4a^3b + 6a^2b^2 + 4ab^3 + b^4 
 \end{align}
```

$$
\begin{align}
      z &= (a+b)^4 \notag\\
 	&= (a+b)^2(a+b)^2 \nonumber\\
 	&= (a^2+2ab+b^2)(a^2+2ab+b^2)\\
 	&= a^4 + 4a^3b + 6a^2b^2 + 4ab^3 + b^4 
 \end{align}
$$

如果想要整个公式不编号可以选择 `align*` 环境， 和 `align*` 相同的效果也可以通过行间公式里嵌套 `split` 环境完成：

```latex
\[ \begin{split}        
	z &= (a+b)^4 \\
	&= (a+b)^2(a+b)^2 \\
	&= (a^2+2ab+b^2)(a^2+2ab+b^2) \\
	&= a^4 + 4a^3b + 6a^2b^2 + 4ab^3 + b^4
\end{split} \]
```

$$
\begin{split}        
	z &= (a+b)^4 \\
	&= (a+b)^2(a+b)^2 \\
	&= (a^2+2ab+b^2)(a^2+2ab+b^2) \\
	&= a^4 + 4a^3b + 6a^2b^2 + 4ab^3 + b^4
\end{split}
$$

如果希望在多行公式中仅有一个编号，可以在 `equation` 环境中嵌套 `split` 环境实现，或者在 `equation` 环境中嵌套一层 `aligned` 环境：

```latex
\begin{equation}
	\begin{split}        
	      z &= (a+b)^4 \\
		&= (a+b)^2(a+b)^2 \\
		&= (a^2+2ab+b^2)(a^2+2ab+b^2) \\
		&= a^4 + 4a^3b + 6a^2b^2 + 4ab^3 + b^4
	\end{split}
\end{equation}
```

$$
\begin{equation}
	\begin{split}        
	      z &= (a+b)^4 \\
		&= (a+b)^2(a+b)^2 \\
		&= (a^2+2ab+b^2)(a^2+2ab+b^2) \\
		&= a^4 + 4a^3b + 6a^2b^2 + 4ab^3 + b^4
	\end{split}
\end{equation}
$$

### 上下标

```latex
\documentclass{article}
\usepackage{amsmath}
\begin{document}
Einstein 's $E=mc^2$.

\[ E=mc^2. \]

\begin{equation}
E=mc^2.
\end{equation}
\end{document}
```

行内公式和行间公式对标点的要求是不同的：行内公式的标点，应该放在数学模式的限定符之外，而行间公式则应该放在数学模式限定符之内。

在数学模式中，需要表示上标，可以使用 `^` 来实现（下标则是 `_`）。**它默认只作用于之后的一个字符**，如果想对连续的几个字符起作用，请将这些字符用花括号 `{}` 括起来，例如：

```latex
\[ z = r\cdot e^{2\pi i}. \]
```

效果展示：
$$
z = r\cdot e^{2\pi i}
$$

### 根式与分式

根式用 `\sqrt{·}` 来表示，分式用 `\frac{·}{·}` 来表示（第一个参数为分子，第二个为分母）。

```latex
$\sqrt{x}$, $\frac{1}{2}$.  
  
\[ \sqrt{x}, \]  
  
\[ \frac{1}{2}. \]
```

效果展示：
$$
\sqrt{x}, \frac{1}{2}
$$


可以发现，在行间公式和行内公式中，分式的输出效果是有差异的。如果要强制行内模式的分式显示为行间模式的大小，可以使用 `\dfrac`, 反之可以使用 `\tfrac`。

> 在行内写分式，你可能会喜欢 `xfrac` 宏包提供的 `\sfrac` 命令的效果。

> 排版繁分式，你应该使用 `\cfrac` 命令。

### 运算符

一些小的运算符，可以在数学模式下直接输入；另一些需要用控制序列生成，如

```latex
\[ \pm\; \times \; \div\; \cdot\; \cap\; \cup\;
\geq\; \leq\; \neq\; \approx \; \equiv \]
```

效果展示：
$$
\pm\; \times \; \div\; \cdot\; \cap\; \cup\;
\geq\; \leq\; \neq\; \approx \; \equiv
$$


连加、连乘、极限、积分等大型运算符分别用 `\sum`, `\prod`, `\lim`, `\int` 生成。他们的上下标在行内公式中被压缩，以适应行高。我们可以用 `\limits` 和 `\nolimits` 来强制显式地指定是否压缩这些上下标。例如：

```latex
$ \sum_{i=1}^n i\quad \prod_{i=1}^n $
$ \sum\limits _{i=1}^n i\quad \prod\limits _{i=1}^n $
\[ \lim_{x\to0}x^2 \quad \int_a^b x^2 dx \]
\[ \lim\nolimits _{x\to0}x^2\quad \int\nolimits_a^b x^2 dx \]
```

效果展示：
$$
\sum_{i=1}^n i\quad \prod_{i=1}^n
\sum\limits _{i=1}^n i\quad \prod\limits _{i=1}^n
\lim_{x\to0}x^2 \quad \int_a^b x^2 dx
\lim\nolimits _{x\to0}x^2\quad \int\nolimits_a^b x^2 dx
$$


多重积分可以使用 `\iint`, `\iiint`, `\iiiint`, `\idotsint` 等命令输入。

```latex
\[ \iint\quad \iiint\quad \iiiint\quad \idotsint \]
```

效果展示：
$$
\iint\quad \iiint\quad \iiiint\quad \idotsint
$$

### 定界符（括号等）

各种括号用 `()`, `[]`, `\{\}`, `\langle\rangle` 等命令表示；注意花括号通常用来输入命令和环境的参数，所以在数学公式中它们前面要加 `\`。因为 LaTeX 中 `|` 和 `\|` 的应用过于随意，amsmath 宏包推荐用 `\lvert\rvert` 和 `\lVert\rVert` 取而代之。

为了调整这些定界符的大小，amsmath 宏包推荐使用 `\big`, `\Big`, `\bigg`, `\Bigg` 等一系列命令放在上述括号前面调整大小。

> 有时你可能会觉得 amsmath 宏包提供的定界符放大命令不太够用。通常这意味着你的公式太过复杂。此时你应当首先考虑将公式中的部分提出去，以字母符号代替以简化公式。如果你真的想要排版如此复杂的公式，可以参考[这篇博文](https://liam.page/2018/11/09/the-bigger-than-bigger-delimiter-in-LaTeX/)。

```latex
\[ \Biggl(\biggl(\Bigl(\bigl((x)\bigr)\Bigr)\biggr)\Biggr) \]
\[ \Biggl[\biggl[\Bigl[\bigl[[x]\bigr]\Bigr]\biggr]\Biggr] \]
\[ \Biggl \{\biggl \{\Bigl \{\bigl \{\{x\}\bigr \}\Bigr \}\biggr \}\Biggr\} \]
\[ \Biggl\langle\biggl\langle\Bigl\langle\bigl\langle\langle x
\rangle\bigr\rangle\Bigr\rangle\biggr\rangle\Biggr\rangle \]
\[ \Biggl\lvert\biggl\lvert\Bigl\lvert\bigl\lvert\lvert x
\rvert\bigr\rvert\Bigr\rvert\biggr\rvert\Biggr\rvert \]
\[ \Biggl\lVert\biggl\lVert\Bigl\lVert\bigl\lVert\lVert x
\rVert\bigr\rVert\Bigr\rVert\biggr\rVert\Biggr\rVert \]
```

效果展示：
$$
\Biggl(\biggl(\Bigl(\bigl((x)\bigr)\Bigr)\biggr)\Biggr) \\
\Biggl[\biggl[\Bigl[\bigl[[x]\bigr]\Bigr]\biggr]\Biggr] \\
\Biggl \{\biggl \{\Bigl \{\bigl \{\{x\}\bigr \}\Bigr \}\biggr \}\Biggr\} \\
\Biggl\langle\biggl\langle\Bigl\langle\bigl\langle\langle x
\rangle\bigr\rangle\Bigr\rangle\biggr\rangle\Biggr\rangle \\
\Biggl\lvert\biggl\lvert\Bigl\lvert\bigl\lvert\lvert x
\rvert\bigr\rvert\Bigr\rvert\biggr\rvert\Biggr\rvert \\
\Biggl\lVert\biggl\lVert\Bigl\lVert\bigl\lVert\lVert x
\rVert\bigr\rVert\Bigr\rVert\biggr\rVert\Biggr\rVert
$$

当然可能经常遇到的是不知道需要多大的括号，这时候就可以使用自动高度的括号命令 `\left` 和 `\right`，但是它们必须配对使用，可以对比一下下面没有使用自动高度的括号。

```latex
f(x)=\ln\left(1+\frac{1}{x}\right)
f(x)&=\ln(1+\frac{1}{x})
```

$$
\begin{align*}
f(x)&=\ln\left(1+\frac{1}{x}\right) \\
f(x)&=\ln(1+\frac{1}{x})
\end{align*}
$$

如果只想要左边的可以把右边的命令变成 `\right.`，如果只想要右边的类似。

```latex
f(x) = \left\{\begin{align*} 1, & x < 0\\ x, & x \geq 0 \end{align*} \right.
```

$$
f(x) = \left\{\begin{align*} 1, & x < 0\\ x, & x \geq 0 \end{align*} \right.
$$

```latex
\int_{a}^{b}{\frac{f'(x)}{g(x)}\ \mathrm{d}x}=
\left.\frac{f(x)}{g(x)}\ \right|_a^b+
\int_{a}^{b}\frac{f(x)g'(x)}{g^2(x)}\mathrm{d}x\\
```

$$
\int_{a}^{b}{\frac{f'(x)}{g(x)}\ \mathrm{d}x}=
\left.\frac{f(x)}{g(x)}\ \right|_a^b+
\int_{a}^{b}\frac{f(x)g'(x)}{g^2(x)}\mathrm{d}x\\
$$

#### $|$ 分隔符

由于符号 `|` 经常用在不同的地方，导致出现各种滥用，在 $\LaTeX$ 中，`\mid` 符号主要用于表示“给定”或“在…条件下”，尤其在数学表达式中作为分隔符使用，它和直接输入的竖线 `|` 有显著区别，主要体现在间距的处理上。

`\mid` 可以用于集合定义与条件概率：

```latex
\{ x \in \mathbb{R}\mid x > 0\} % 表示实数集中大于 0 的元素
P(A \mid B) % 表示事件 B 发生的条件下，事件 A 的概率
```

$$
\{ x \in \mathbb{R}\mid x > 0\} % 表示实数集中大于 0 的元素
$$

$$
P(A \mid B) % 表示事件 B 发生的条件下，事件 A 的概率
$$

`\mid` 会在两侧的符号中间适当添加空格，而直接输入 `|` 会没有额外空格，导致拥挤：

```latex
\{x \mid x > 0\}
\{x | x > 0\}
```

$$
\begin{align*}
\{x \mid x > 0\} \\
\{x | x > 0\}
\end{align*}
$$

> 在集合定义中的冒号则一般使用 `\colon`，比直接使用 `:` 间距更优：
>
> ```latex
> \{ x : x > 0 \}  % 普通冒号
> \{ x \colon x > 0 \}  % 更佳间距
> ```
>
> $$
> \begin{align*}
> \{ x : x > 0 \} \\  % 普通冒号
> \{ x \colon x > 0 \}  % 更佳间距
> \end{align*}
> $$

绝对值则一般使用 `\lvert` 和 `\rvert`，范数则使用 `\lVert` 和 `\rVert`，在需要使用竖线作为关系符号（如表示 ”$a$ 整除 $b$“）时，应该使用 `\mathrel{|}`。

> 关于 `\mathrel{}` 和 `\mathbin` 之间的关系可以参考这个回答：[math mode - What is the difference between \mathbin vs. \mathrel?](https://tex.stackexchange.com/questions/38982/what-is-the-difference-between-mathbin-vs-mathrel) 
>
> 顾名思义，`\mathbin` 用于调整周围间距以符合二元运算符的规范（binary operator），而 `\mathrel` 则修改间距以表示二元关系（binary relation）。

### 省略号

略号用 `\dots`, `\cdots`, `\vdots`, `\ddots` 等命令表示。`\dots` 和 `\cdots` 的纵向位置不同，前者一般用于有下标的序列。

```latex
\[ x_1,x_2,\dots ,x_n\quad 1,2,\cdots ,n\quad
\vdots\quad \ddots \]
```

效果展示：
$$
x_1,x_2,\dots ,x_n\quad 1,2,\cdots ,n\quad
\vdots\quad \ddots
$$

### 空格

```latex
A\,B
A\ B
A\space B
A\quad B
A\qquad B
```

$$
\begin{align*}
&A\,B \\
&A\ B \\
&A\space B \\
&A\quad B \\
&A\qquad B \\
\end{align*}
$$

### 矩阵

`amsmath` 的 `pmatrix`, `bmatrix`, `Bmatrix`, `vmatrix`, `Vmatrix` 等环境可以在矩阵两边加上各种分隔符。

```latex
\[ \begin{pmatrix} a&b\\c&d \end{pmatrix} \quad
\begin{bmatrix} a&b\\c&d \end{bmatrix} \quad
\begin{Bmatrix} a&b\\c&d \end{Bmatrix} \quad
\begin{vmatrix} a&b\\c&d \end{vmatrix} \quad
\begin{Vmatrix} a&b\\c&d \end{Vmatrix} \]
```

效果展示：
$$
\begin{pmatrix} a&b\\c&d \end{pmatrix} \quad
\begin{bmatrix} a&b\\c&d \end{bmatrix} \quad
\begin{Bmatrix} a&b\\c&d \end{Bmatrix} \quad
\begin{vmatrix} a&b\\c&d \end{vmatrix} \quad
\begin{Vmatrix} a&b\\c&d \end{Vmatrix}
$$



使用 `smallmatrix` 环境，可以生成行内公式的小矩阵。

```latex
Marry has a little matrix $ ( \begin{smallmatrix} a&b\\c&d \end{smallmatrix} ) $.
```

效果展示：
$$
\text{Marry has a little matrix } ( \begin{smallmatrix} a&b\\c&d \end{smallmatrix} ) .
$$

对于矩阵的转置，可以在 $\LaTeX$ 中为转置定义一个宏，方便后续的修改，推荐使用：

```latex
A^{\mathrm{T}}
```

$$
A^{\mathrm{T}}
$$

### 多行公式

有的公式特别长，我们需要手动为他们换行；有几个公式是一组，我们需要将他们放在一起；还有些类似分段函数，我们需要给它加上一个左边的花括号。

#### 长公式

无须对齐的长公式可以使用 `multline` 环境。

```latex
\begin{multline}
x = a+b+c+{} \\
d+e+f+g
\end{multline}
```

效果展示：
$$
\begin{multline}
x = a+b+c+{} \\
d+e+f+g
\end{multline}
$$

如果不需要编号，可以使用 `multline*` 环境代替。

需要对齐的公式，可以使用 `aligned` _次环境_ 来实现，它必须包含在数学环境之内。

```latex
\[\begin{aligned}
x ={}& a+b+c+{} \\
&d+e+f+g
\end{aligned}\]
```

效果展示：
$$
\begin{aligned}
x ={}& a+b+c+{} \\
&d+e+f+g
\end{aligned}
$$

#### 公式组

无需对齐的公式组可以使用 `gather` 环境，需要对齐的公式组可以使用 `align` 环境。他们都带有编号，如果不需要编号可以使用带星号的版本。

```latex
\begin{gather}
a = b+c+d \\
x = y+z
\end{gather}
\begin{align}
a &= b+c+d \\
x &= y+z
\end{align}
```

效果展示：
$$
\begin{gather}
a = b+c+d \\
x = y+z
\end{gather}
$$

$$
\begin{align}
a &= b+c+d \\
x &= y+z
\end{align}
$$

> 请注意，不要使用 `eqnarray` 环境。原因可以参考：
>
> - [`eqnarray` 是糟糕的](http://www.math.uiuc.edu/~hildebr/tex/displays.html)
> - [`eqnarray` 是有害的](http://texblog.net/latex-archive/maths/eqnarray-align-environment/)
> - [`eqnarray` 是恼人的](http://www.tex.ac.uk/cgi-bin/texfaq2html?label=eqnarray)
> - [`eqnarray` 是邪恶的](http://www.tug.org/pracjourn/2006-4/madsen/)

### 分段函数

分段函数可以用`cases`次环境来实现，它必须包含在数学环境之内。

```latex
\[ y= \begin{cases}
-x,\quad x\leq 0 \\
x,\quad x>0
\end{cases} \]
```

效果展示：
$$
y= \begin{cases}
-x,\quad x\leq 0 \\
x,\quad x>0
\end{cases}
$$

### 上下大括号

```latex
\overbrace{a+b+c}^A = \underbrace{a-b-c}_B
```

$$
\overbrace{a+b+c}^A = \underbrace{a-b-c}_B
$$

如果遇到无法对齐的情况，可以通过 `\vphantom{}` 来增加一个虚拟高度对齐。

```latex
J[y]=
\int_0^r
\underbrace{\vphantom{\Bigg|}\pi
    x\left[\\rho gh^2+2\sigma\sqrt{1+\dot y^2}\right]
}_{F(\dot y,y;x)}\mathrm{d}x
+
\underbrace
{
    \vphantom{\Bigg|}2\pi r\Delta\sigma l
}_{\phi(l;r)}
```

无法对齐的情况：
$$
J[y]=
\int_0^r
\underbrace{\pi
    x\left[\\rho gh^2+2\sigma\sqrt{1+\dot y^2}\right]
}_{F(\dot y,y;x)}\mathrm{d}x
+
\underbrace
{
    2\pi r\Delta\sigma l
}_{\phi(l;r)}
$$
加了虚拟高度对齐之后，这里加了一个 `\Bigg|` 的高度：
$$
J[y]=
\int_0^r
\underbrace{\vphantom{\Bigg|}\pi
    x\left[\\rho gh^2+2\sigma\sqrt{1+\dot y^2}\right]
}_{F(\dot y,y;x)}\mathrm{d}x
+
\underbrace
{
    \vphantom{\Bigg|}2\pi r\Delta\sigma l
}_{\phi(l;r)}
$$


### 上下划线

```latex
\overline {z_{1}+z_{2}} = \overline {z_{1}}+\overline {z_{2}}
```

$$
\overline {z_{1}+z_{2}} = \overline {z_{1}}+\overline {z_{2}}
$$

### 积分

```latex
\begin{align*}
\int_a^bx\mathrm{d}x \\
\iint \limits_{\Omega}x^2\mathrm{d}x \\
\iiint \limits_{V} x^3 \mathrm{d} x
\end{align*}
```

$$
\begin{align*}
\int_a^bx\mathrm{d}x \\
\iint \limits_{\Omega}x^2\mathrm{d}x \\
\iiint \limits_{V} x^3\mathrm{d} x
\end{align*}
$$

```latex
\underset{x^2+y^2\le1}{\iint}e^x\cos y\,\mathrm{d}x\mathrm{d}y=
\underset{x^2+y^2=1}{\oint}e^x\cos y\,\mathrm{d}y=
\pi
```

$$
\underset{x^2+y^2\le1}{\iint}e^x\cos y\,\mathrm{d}x\mathrm{d}y=
\underset{x^2+y^2=1}{\oint}e^x\cos y\,\mathrm{d}y=
\pi
$$

### 符号名

如果遇到在 $\LaTeX$ 中尚未存在的数学名称，比如反双曲正切，可以用 `\operatorname` 为该函数名创造正体形式：

```latex
\operatorname{arctanh}x
```

$$
\operatorname{arctanh}x
$$

> 这样会在 `x` 之前自动添加 1 像素的间距。

当然还有 `\mathop` 命令可以将数学符号定义为大型运算符，使其支持 `\limits` 控制上下标位置。

```latex
\mathop{\star}\limits_{i=1}^{n} x_i  \quad \text{vs} \quad \star_{i=1}^{n} x_i
```


$$
\mathop{\star}\limits_{i=1}^{n} x_i  \quad \text{vs} \quad \star_{i=1}^{n} x_i
$$


## FAQ

**book, report 和 article 有什么区别**：[koma script - Regarding the `book`, `report`, and `article` document classes: what are the main differences? - TeX - LaTeX Stack Exchange](https://tex.stackexchange.com/questions/36988/regarding-the-book-report-and-article-document-classes-what-are-the-mai)

