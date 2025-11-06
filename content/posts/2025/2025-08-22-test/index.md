---
title: "Hugo支持的语法测试"
date: 2025-08-22T16:20:18+08:00
math: true
description: "测试 Hugo 静态博客框架支持的语法。"
tags: ["Markdown", "Website", "Hugo", "PaperMod"]
categories: ["Hugo"]
---

# H1

## H2

### H3

#### H4

##### H5

###### H6

## 基本语法测试 {#custom-id}

### 字体

**粗体测试**

*斜体测试*

***粗斜体测试***

### 引用块

> 引用块测试

> 嵌套引用块测试
>> hello world
> - list
> - for
> - test

### 有序列表

1. First item
2. Second item
3. Third item

有序列表嵌套代码块，缩进八个空格。

1.  Open the file.
2.  Find the following code block on line 21:

        &lt;html>
          &lt;head>
            &lt;title>Test&lt;/title>
          &lt;/head>

3.  Update the title to match the name of your website.

### 无序列表

保留列表连续性的同时在列表中添加另一种元素，将该元素缩进四个空格。

- First item

    inner list

- Second item
- Third item

    > hello

- world 

### 列表嵌套图片

1.  Open the file containing the Linux mascot.
2.  Marvel at its beauty.

    ![](test3.jpg)

3.  Close the file.

### 嵌套列表

1. First item
2. Second item
3. Third item
    - Indented item
    - Indented item
4. Fourth item

### 行内代码

`hello world`

如果要表示为代码的单词或短语中包含一个或多个反引号，则可以通过将单词或短语包裹在双反引号(\`\`)中。

```markdown
``Use `code` in your Markdown file.``
```

``Use `code` in your Markdown file.``

### 代码

要创建代码块，请将代码块的每一行缩进至少四个空格或一个制表符。

    &lt;html>
      &lt;head>
      &lt;/head>
    &lt;/html>

要创建不用缩进的代码块，请使用围栏式代码块（fenced code blocks）。

```python {hl_Lines=[2,"10-11"]}
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

### 分隔线测试

---

### 超链接

[链接测试](https://chen-huaneng.github.io/)

#### 网址和 Email 地址

使用尖括号可以很方便地把URL或者email地址变成可点击的链接。

<https://chen-huaneng.github.io/>

<huanengchen@foxmail.com>

#### 带格式化的链接

强调链接，在链接语法前后增加星号。要将链接表示为代码，请在方括号中添加反引号。

```markdown
I love supporting the **[EFF](https://eff.org)**.
This is the *[Markdown Guide](https://www.markdownguide.org)*.
See the section on [`基本语法测试`](#custom-id).
```

I love supporting the **[EFF](https://eff.org)**.

This is the *[Markdown Guide](https://www.markdownguide.org)*.

See the section on [`基本语法测试`](#custom-id).

#### 引用类型链接

引用样式链接是一种特殊的链接，它使 URL 在 Markdown 中更易于显示和阅读。参考样式链接分为两部分：与文本保持内联的部分以及存储在文件中其他位置的部分，以使文本易于阅读。

引用类型的链接的第一部分使用两组括号进行格式设置。第一组方括号包围应显示为链接的文本。第二组括号显示了一个标签，该标签用于指向您存储在文档其他位置的链接。

尽管不是必需的，可以在第一组和第二组括号之间包含一个空格。第二组括号中的标签不区分大小写，可以包含字母，数字，空格或标点符号。

以下示例格式对于链接的第一部分效果相同：

```markdown
[hobbit-hole][1]
[hobbit-hole] [1]
```

引用类型链接的第二部分使用以下属性设置格式：

1. 放在括号中的标签，其后紧跟一个冒号和至少一个空格（例如`[label]:`）。
2. 链接的URL，可以选择将其括在尖括号中。
3. 链接的可选标题，可以将其括在双引号，单引号或括号中。
4. 以下示例格式对于链接的第二部分效果相同：

```markdown
[1]: https://en.wikipedia.org/wiki/Hobbit#Lifestyle
[1]: https://en.wikipedia.org/wiki/Hobbit#Lifestyle "Hobbit lifestyles"
[1]: https://en.wikipedia.org/wiki/Hobbit#Lifestyle 'Hobbit lifestyles'
[1]: https://en.wikipedia.org/wiki/Hobbit#Lifestyle (Hobbit lifestyles)
[1]: <https://en.wikipedia.org/wiki/Hobbit#Lifestyle> "Hobbit lifestyles"
[1]: <https://en.wikipedia.org/wiki/Hobbit#Lifestyle> 'Hobbit lifestyles'
[1]: <https://en.wikipedia.org/wiki/Hobbit#Lifestyle> (Hobbit lifestyles)
```

可以将链接的第二部分放在 Markdown 文档中的任何位置。有些人将它们放在出现的段落之后，有些人则将它们放在文档的末尾（例如尾注或脚注）。

[hobbit-hole][1]

[1]: <https://en.wikipedia.org/wiki/Hobbit#Lifestyle> (Hobbit lifestyles)

#### 链接最佳实践

不同的 Markdown 应用程序处理URL中间的空格方式不一样。为了兼容性，请尽量使用%20代替空格。

```markdown
[link](https://www.example.com/my%20great%20page)
```

### 图片

要添加图像，请使用感叹号 `!`，然后在方括号增加替代文本，图片链接放在圆括号里，括号里的链接后可以增加一个可选的图片标题文本。

```markdown
![](test4.jpg "Test")
```

![](test4.jpg "Test")

Hugo 支持的图片引用方式：

{{< figure
  align=center
  src="test.jpg"
  caption="鬼刀的海琴烟"
>}}

#### 链接图片

给图片增加链接，请将图像的 Markdown 括在方括号中，然后将链接添加在圆括号中。

```markdown
[![鬼刀的海琴烟](test.jpg "海琴烟")](https:chen-huaneng.github.io/)
```

[![鬼刀的海琴烟](test.jpg "海琴烟")](https:chen-huaneng.github.io/)

### Markdown 转义字符语法

要显示原本用于格式化 Markdown 文档的字符，请在字符前面添加反斜杠字符 `\`。

```markdown
\* Without the backslash, this would be a bullet in an unordered list.
```

\* Without the backslash, this would be a bullet in an unordered list.

### 表格

| Syntax      | Description |
| ----------- | ----------- |
| Header      | Title       |
| Paragraph   | Text        |

### 脚注

Here's a sentence with a footnote. [^1]
[^1]: This is the footnote.

### 标题编号

[基本语法测试](#custom-id)

### 定义列表

一些 Markdown 处理器允许创建术语及其对应定义的定义列表。要创建定义列表，请在第一行上键入术语。在下一行，键入一个冒号，后跟一个空格和定义。

```markdown
First Term
: This is the definition of the first term.

Second Term
: This is one definition of the second term.
: This is another definition of the second term.
```

First Term
: This is the definition of the first term.

Second Term
: This is one definition of the second term.
: This is another definition of the second term.

### 删除线

~~The world is flat.~~

### 任务列表

- [x] Write the press release
- [ ] Update the website
- [ ] Contact the media

## 数学公式测试

行内公式 $x + y = z$

行间公式：


$$
\begin{align*}
h(t) &= \int_a^b\left[f(x)t+g(x)\right]^2\mathrm{d}x \\
&= t^2\underbrace{\int_a^b[f(x)]^2\mathrm{d}x}_A + t \cdot \underbrace{2\int_a^bf(x)g(x)\mathrm{d}x}_B + \underbrace{\int_a^b[g(x)]^2\mathrm{d}x}_C \\
&= At^2 + Bt + C
\end{align*}
$$

This is an inline $a^*=x-b^*$ equation.

These are block equations:

$$a^*=x-b^*$$

$$ a^*=x-b^* $$

These are also block equations:

$$
a^*=x-b^*
$$

$$
y = \begin{cases}-x & x<0 \\ x & x\geq 0 \end{cases}
$$

建议在写矩阵的时候，等号不要单独放一行，而是和其他环境同行，否则可能出现渲染失败的情况：

```latex {hl_Lines=9}
\begin{bmatrix}
	1 & x_0 & x_0^2 & \cdots & x_0^n \\
	1 & x_1 & x_1^2 & \cdots & x_1^n \\
	\vdots & \vdots & \vdots & \ddots & \vdots \\
    1 & x_n & x_n^2 & \cdots & x_n^n  
\end{bmatrix}
\begin{bmatrix}
	a_0 \\ a_1 \\ \vdots \\ a_n
\end{bmatrix} =
\begin{bmatrix}
	y_0 \\ y_1 \\ \vdots \\ y_n
\end{bmatrix}
```

$$
\begin{bmatrix}
	1 & x_0 & x_0^2 & \cdots & x_0^n \\
	1 & x_1 & x_1^2 & \cdots & x_1^n \\
	\vdots & \vdots & \vdots & \ddots & \vdots \\
    1 & x_n & x_n^2 & \cdots & x_n^n  
\end{bmatrix}
\begin{bmatrix}
	a_0 \\ a_1 \\ \vdots \\ a_n
\end{bmatrix} =
\begin{bmatrix}
	y_0 \\ y_1 \\ \vdots \\ y_n
\end{bmatrix}
$$

$$
\begin{matrix}
1 & x & x^2 \\
1 & y & y^2 \\
1 & z & z^2 \\
\end{matrix}
$$

### 重复的分数

$$
\frac{1}{\Bigl(\sqrt{\phi \sqrt{5}}-\phi\Bigr) e^{\frac25 \pi}} \equiv 1+\frac{e^{-2\pi}} {1+\frac{e^{-4\pi}} {1+\frac{e^{-6\pi}} {1+\frac{e^{-8\pi}} {1+\cdots} } } }
$$

### 总和记号

$$
\left( \sum_{k=1}^n a_k b_k \right)^2 \leq \left( \sum_{k=1}^n a_k^2 \right) \left( \sum_{k=1}^n b_k^2 \right)
$$

### 几何级数之和

$$
\begin{align*}
\displaystyle\sum_{i=1}^{k+1}i \displaystyle&= \left(\sum_{i=1}^{k}i\right) +(k+1) \\
\displaystyle &= \frac{k(k+1)}{2}+k+1 \\
\displaystyle &= \frac{k(k+1)+2(k+1)}{2} \\
\displaystyle &= \frac{(k+1)(k+2)}{2} \\
\displaystyle &= \frac{(k+1)((k+1)+1)}{2}
\end{align*}
$$

### 乘记号

$$
\displaystyle 1 + \frac{q^2}{(1-q)}+\frac{q^6}{(1-q)(1-q^2)}+\cdots =\displaystyle \prod_{j=0}^{\infty}\frac{1}{(1-q^{5j+2})(1-q^{5j+3})},
\displaystyle\text{ for }\lvert q\rvert < 1.
$$

### 随文数式

这是一些线性数学：$k_{n+1} = n^2 + k_n^2 - k_{n-1}$，然后是更多的文本。

### 希腊字母

$$
\displaylines{\Gamma\ \Delta\ \Theta\ \Lambda\ \Xi\ \Pi\ \Sigma\ \Upsilon\ \Phi\ \Psi\ \Omega
\alpha\ \beta\ \gamma\ \delta\ \epsilon\ \zeta\ \\ \eta\ \theta\ \iota\ \kappa\ \lambda\ \mu\ \nu\ \xi \ \omicron\ \pi\ \rho\ \sigma\ \tau\ \upsilon\ \phi\ \chi\ \psi\ \omega\ \varepsilon\ \vartheta\ \varpi\ \varrho\ \varsigma\ \varphi}
$$

### 箭头

$$
\begin{equation*}
\begin{aligned}
\gets\ \to\ \leftarrow\ \rightarrow\ \uparrow\ \Uparrow\ \downarrow\ \Downarrow\ \updownarrow\ \Updownarrow \\
\displaylines{\Leftarrow\ \Rightarrow\ \leftrightarrow\ \Leftrightarrow\ \mapsto\ \hookleftarrow 
\leftharpoonup\ \leftharpoondown\ \\\ \rightleftharpoons\ \longleftarrow\ \Longleftarrow\ \longrightarrow} \\
\Longrightarrow\ \longleftrightarrow\ \Longleftrightarrow\ \longmapsto\ \hookrightarrow\ \rightharpoonup \\
\rightharpoondown\ \leadsto\ \nearrow\ \searrow\ \swarrow\ \nwarrow
\end{aligned}
\end{equation*}
$$

### 符号

$$
\surd\ \barwedge\ \veebar\ \odot\ \oplus\ \otimes\ \oslash\ \circledcirc\ \boxdot\ \bigtriangleup
$$

$$
\bigtriangledown\ \dagger\ \diamond\ \star\ \triangleleft\ \triangleright\ \angle\ \infty\ \prime\ \triangle
$$

### 微积分学

$$
\int u \frac{dv}{dx},dx=uv-\int \frac{du}{dx}v,dx
$$

$$
f(x) = \int_{-\infty}^\infty \hat f(\xi),e^{2 \pi i \xi x}
$$

$$
\oint \vec{F} \cdot d\vec{s}=0
$$

### 洛伦茨方程

$$
\begin{aligned} 
\dot{x} & = \sigma(y-x) \\ 
\dot{y} & = \rho x - y - xz \\ 
\dot{z} & = -\beta z + xy 
\end{aligned}
$$

### 交叉乘积

$$
\mathbf{V}_1 \times \mathbf{V}_2 = \begin{vmatrix} \mathbf{i} & \mathbf{j} & \mathbf{k} \\ \frac{\partial X}{\partial u} & \frac{\partial Y}{\partial u} & 0 \\ \frac{\partial X}{\partial v} & \frac{\partial Y}{\partial v} & 0 \end{vmatrix}
$$

### 强调

$$
\hat{x}\ \vec{x}\ \ddot{x}
$$

### 有弹性的括号

$$
\left(\frac{x^2}{y^3}\right)
$$

### 评估范围

$$
\left.\frac{x^3}{3}\right|_0^1
$$

### 判断标准

$$
f(n) = \begin{cases} 
\frac{n}{2}, & \text{if } n\text{ is even} \\
3n+1, & \text{if } n\text{ is odd} 
\end{cases}
$$

### 麦克斯韦方程组

$$
\begin{aligned} 
\nabla \times \vec{\mathbf{B}} -, \frac1c, \frac{\partial\vec{\mathbf{E}}}{\partial t} & = \frac{4\pi}{c}\vec{\mathbf{j}} \\ 
\nabla \cdot \vec{\mathbf{E}} & = 4 \pi \rho \\ 
\nabla \times \vec{\mathbf{E}}, +, \frac1c, \frac{\partial\vec{\mathbf{B}}}{\partial t} & = \vec{\mathbf{0}} \\ 
\nabla \cdot \vec{\mathbf{B}} & = 0 
\end{aligned}
$$

### 统计学

$$
\frac{n!}{k!(n-k)!} = {^n}C_k{n \choose k}
$$

### 分数再分数

$$
\frac{\frac{1}{x}+\frac{1}{y}}{y-z}
$$

### ｎ次方根

$$
\sqrt[n]{1+x+x^2+x^3+\ldots}
$$

### 矩阵

$$
\begin{pmatrix}
a_{11} & a_{12} & a_{13}\\
a_{21} & a_{22} & a_{23}\\ 
a_{31} & a_{32} & a_{33} 
\end{pmatrix}
\begin{bmatrix} 
0 & \cdots & 0 \\
\vdots & \ddots & \vdots \\
0 & \cdots & 0 
\end{bmatrix}
$$

### 标点符号

$$
f(x) = \sqrt{1+x} \quad (x \ge -1)
f(x) \sim x^2 \quad (x\to\infty)
$$

$$
f(x) = \sqrt{1+x}, \quad x \ge -1
f(x) \sim x^2, \quad x\to\infty
$$

### 编号引用

$$
\begin{equation}
\overline{X} = \frac{1}{n}\sum_{i = 1}^nX_i\label{eq:test}
\end{equation}
$$

公式 $\eqref{eq:test}$ 是样本平均值的计算公式。

## Hugo Rich Content and Shortcodes

### Figure Shortcode

{{< figure 
  src="https://images.unsplash.com/photo-1702382930514-9759f4ca5469" 
  attr="Photo by [Aditya Telange](https://unsplash.com/@adityatelange?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash) on [Unsplash](https://unsplash.com/photos/Z0lL0okYjy0?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash)" 
  align=center
>}}

### Bilibili Shortcode

{{< bilibili src="//player.bilibili.com/player.html?isOutside=true&aid=115021304561914&bvid=BV1LsbhzBEfJ&cid=31665424057&p=1" >}}

### YouTube

{{< youtube hjD9jTi_DQ4 >}}

### Vimeo

{{< vimeo 152985022 >}}

###  代码高亮

{{< highlight html >}}

<div class="shortcode">
    <p>shortcode test</p>
</div>
{{< /highlight >}}

## 自定义功能

### fancybox

{{< figure src="test2.webp" title="绘梨衣" caption="Sakura & 绘梨衣 の Rilakkuma" >}}

### 嵌入 PDF

PDF 是根据相对于 Hugo 根目录解析的，比如放在 `/static/pdf/` 文件夹则 `src="/pdf/test.pdf"`，如果是放在 `/content/posts/2025/2025-08-22-test/` 文件夹则 `src="/posts/2025/2025-08-22-test/test.pdf"`

{{< pdf-embed src="/pdf/Cauchy-Schwarz不等式之本質與意義-林琦焜.pdf" >}}

### 图片轮播

{{< imgloop "test2.webp,test.jpg,test3.jpg,test4.jpg,https://images.unsplash.com/photo-1702382930514-9759f4ca5469" >}}

### 摘录引用

{{< blockquote author="钱钟书" link="https://book.douban.com/subject/11524204/" title="《围城》重印前记" >}}
“年复一年，创作的冲动随年衰减，创作的能力逐渐消失——也许两者根本上是一回事，我们常把自己的写作冲动误认为自己的写作才能，自以为要写就意味着会写。”
{{< /blockquote >}}

### 图片瀑布流

可以引入外链图片，也可以引入本地图片，默认路径为 `/static/`。

<gallery>
    <img src="/images/showcase/test.jpg">
    <img src="/images/showcase/test2.webp">
    <img src="/images/showcase/test3.jpg">
    <img src="/images/showcase/test4.jpg">
    <img src="https://images.unsplash.com/photo-1702382930514-9759f4ca5469">
</gallery>

### 图片橱窗

图片地址默认仍然是博客根目录下 `static` 文件夹，或者引入外链图片也可以。

{{< image-showcase "/images/showcase/test.jpg" "/images/showcase/test2.webp" "/images/showcase/test3.jpg" "/images/showcase/test4.jpg">}}

### 边注

这是一段正文{{< sidenote >}}这是侧边注释内容，可以包含**Markdown格式**{{< /sidenote >}}，继续正文内容。

这是一段正文{{< sidenote >}}这是侧边注释内容，可以包含**Markdown格式**{{< /sidenote >}}，继续正文内容。

这是一段正文{{< sidenote >}}这是侧边注释内容，可以包含**Markdown格式**{{< /sidenote >}}，继续正文内容。

这是一段正文{{< sidenote >}}这是侧边注释内容，可以包含**Markdown格式**{{< /sidenote >}}，继续正文内容。

这是一段正文{{< sidenote >}}这是侧边注释内容，可以包含**Markdown格式**{{< /sidenote >}}，继续正文内容。

这是一段正文{{< sidenote >}}这是侧边注释内容，可以包含**Markdown格式**{{< /sidenote >}}，继续正文内容。


这是一段正文{{< sidenote >}}这是侧边注释内容，可以包含**Markdown格式**{{< /sidenote >}}，继续正文内容。

这是一段正文{{< sidenote >}}这是侧边注释内容，可以包含**Markdown格式**{{< /sidenote >}}，继续正文内容。

这是一段正文{{< sidenote >}}这是侧边注释内容，可以包含**Markdown格式**{{< /sidenote >}}，继续正文内容。

这是一段正文{{< sidenote >}}这是侧边注释内容，可以包含**Markdown格式**{{< /sidenote >}}，继续正文内容。

这是一段正文{{< sidenote >}}这是侧边注释内容，可以包含**Markdown格式**{{< /sidenote >}}，继续正文内容。

这是一段正文{{< sidenote >}}这是侧边注释内容，可以包含**Markdown格式**{{< /sidenote >}}，继续正文内容。

这是一段正文，继续正文内容。

### 嵌入谷歌地图

{{< google-map width="800" height="500" >}}

## 参考

- [Hugo配置 | Coolzr's Blog](https://blog.rzlnb.top/posts/blog/hugo-blog-setup/)

- [折腾 Hugo & PaperMod 主题 - Dvel's Blog](https://dvel.me/posts/hugo-papermod-config/)

- [Hugo PaperMod 安装与配置 | Mortal](https://mortal.blog/hugo-papermod-installation-and-configuration/)

- [Hugo以及PaperMod主题的配置 | 似水](https://blog.lordash.de/post/guide/ff377f87efdbc8bc)

- [Hugo | Tofuwine's Blog](https://www.tofuwine.cn/tags/hugo/)

- [Hugo：添加图片点击放大功能 | 小怪兽的博客](https://sakuracedia.cn/topics/blog/hugo-添加图片点击放大功能/)

- [Hugo-PaperMod主题自定义 | Tom's Blog](https://blog.grew.cc/posts/papermod-modify/)

- [使用Hugo实现响应式和优化的图片 | 流动](https://liudon.com/posts/responsive-and-optimized-images-with-hugo/)

- [Hugo 食用之 Render Image](https://ilunp.com/posts/hugo/hugo-render-image/)

- [调整 PaperMod 的页面结构以及新增功能 | aiken's blog](https://aikenh.cn/posts/调整papermod的页面结构以及新增功能/)

- [Hugo PaperMod 主题定制修改 | Xiaofei Ge](https://xiaofei.ge/posts/modify-hugo-papermod-theme-and-templates/)

- [Hugo+Papermod博客优化 | 白](https://www.imbai.xin/posts/hugo-papermod博客优化/)

- [Hugo-stackの美化](https://me.iftcblog.me/post/hugo-stackの美化/)

- [Hugo Shortcodes 示例 | Memory](https://blog.yandaojiang.com/posts/others/hugo_shortcodes示例/)

- [一些 Hugo 短代码 | Naive Koala](https://www.xalaok.top/post/hugo-shortcodes/)

- [hugo stack 主题美化](https://yelleis.top/p/61fdb627/)

- [Hugo|在Stack主题上可行的短代码们](https://www.sleepymoon.cyou/2023/hugo-shortcodes/)

- [来写一些好玩的 Hugo 短代码吧](https://irithys.com/hugo-shortcode-list/)

- [短代码测试 | INNERSO](https://innerso.prvcy.page/posts/shortcode-test/)

- [自定义 Hugo Shortcodes 简码 | 一路向北](https://ztygcs.github.io/posts/博客/自定义-hugo-shortcodes-简码/)

- [Hugo | 在文章中插入轮播图片 | 小球飞鱼](https://mantyke.icu/posts/2021/cf2cf0fb/)