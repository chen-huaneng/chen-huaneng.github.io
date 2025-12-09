---
date: '2025-08-07 22:06:48'
title: '【Hexo】使用WebP格式的图片加速Hexo网页访问速度'
description: ""
tags: [Hexo, Website, Picture]
categories: [Hexo]
math: false
---

## 需求来源

我在写博客的时候经常需要引用很多种格式的图片，比如 `jpg`、`jpeg`、`png`、`gif`，这时候就出现一个问题，各种图片不仅格式不统一，而且很多图片非常大（因为有些图片是自己拍的，传输的时候是原图），但是放在博客上的图片这么大是没有意义的。网络在上传和分发图片的时候并不会按照原图来呈现，而且这样的清晰度对于网页浏览同样也资源过剩，反而造成了流量的浪费和用户的等待时间过长（除了一些摄影网站之类的可能需要原图）。

因此我必须解决图片格式不统一和图片过大的问题，这时候我就想能不能先在本地将图片压缩（最好是无损的），然后上传的时候直接上传压缩过后的图片就可以了，这样就能解决图片过大的问题。然后接下来的问题就是解决选择压缩到什么格式，经过一番探索，我选择压缩成[WebP格式](https://developers.google.cn/speed/webp?hl=zh-cn)：

> WebP 是一种新型图片格式，可为网络上的图片提供品质卓越的无损和有损压缩。使用 WebP，网站站长和网络开发者可以创建体积更小但细节更丰富的图片，从而提高网络访问速度。
>
> WebP 无损图片比 PNG 图片小 [26%](https://developers.google.cn/speed/webp/docs/webp_lossless_alpha_study?hl=zh-cn#results)。WebP 有损图片比采用等效 [SSIM](https://en.wikipedia.org/wiki/Structural_similarity) 质量指标的同等 JPEG 图片[缩小 25-34%](https://developers.google.cn/speed/webp/docs/webp_study?hl=zh-cn)。
>
> 无损 WebP 支持透明度（也称为 Alpha 通道），只需[增加 22% 的字节](https://developers.google.cn/speed/webp/docs/webp_lossless_alpha_study?hl=zh-cn#results)。对于可以接受有损 RGB 压缩的情况，有损 WebP 也支持透明度，生成的文件大小通常比 PNG 小 3 倍。
>
> 动画 WebP 图片支持有损、无损和透明，与 GIF 和 APNG 相比，可以缩减文件大小。

选择WebP格式的原因除了支持很多格式图片的转换外，还因为它支持很多浏览器（IE浏览器用户就不管了，没有办法适配所有用户）：

> Google Chrome、Safari、Firefox、Edge、Opera 浏览器以及[许多其他](https://developers.google.com/speed/webp/faq?hl=zh-cn#which_web_browsers_natively_support_webp)工具和软件库都原生支持 WebP。开发者还添加了对各种图片编辑工具的支持。
>
> WebP 包括轻量级编码和解码库 [`libwebp`](https://developers.google.com/speed/webp/docs/api?hl=zh-cn)，以及用于将图片转换为 WebP 格式和从 WebP 格式转换为其他格式的命令行工具 [`cwebp`](https://developers.google.com/speed/webp/docs/cwebp?hl=zh-cn) 和 [`dwebp`](https://developers.google.com/speed/webp/docs/dwebp?hl=zh-cn)，以及用于查看、混合和为 WebP 图片添加动画效果的工具。完整的源代码可在[下载](https://developers.google.com/speed/webp/download?hl=zh-cn)页面上找到。

因此最终我打算将Hexo博客上的图片都转换为WebP格式。接下来将需求拆解：

- 在本地安装WebP转换所需要的库 `libwebp`
- 编写 `PowerShell` 脚本（我所使用的系统是 Windows 10）自动将其他格式的图片转换成 `.webp` 格式的图片
- 编写新的 `PowerShell` 脚本修改 `.md` 的 Markdown 文件中引用图片的地方，将各种格式的图片后缀改成 `.webp`（因为我使用 Typora 来直接拖拽引入原图，所以需要在写完保存 `.md` 文件后再批量修改 `.md` 文件中引用图片的地方）
- 将前面两个脚本整合到本地预览和远程部署的脚本当中

## 需求实现

### 安装WebP库

安装WebP转换相应的库，我采用 [Scoop](https://chen-huaneng.github.io/2024/01/04/2024-01-04-2024-01-04-Scoop/) 进行安装：

```powershell
scoop install main/libwebp
```

安装完成之后通过下面的命令来验证是否安装成功：

```powershell
cwebp -version
```

### 编写自动化脚本

在Hexo博客目录下创建四个脚本分别用于执行不同的任务：

- `local.ps1` 用于在本地预览最终的修改效果
- `deploy.ps1` 用于部署到远程托管仓库
- `convert-to-webp.ps1` 用于将本地的其他图片格式转换为 `.webp` 图片格式
- `update-markdown-images.ps1` 用于更新 `.md` 文件中引用图片的地方

下面脚本的内容可以根据个人存放位置和需求的不同进行更改。

`local.ps1`：

```powershell
cd E:\ChenHuaneng\Article\Academic\academic-homepage
bundle exec jekyll build
robocopy "_site" "E:\ChenHuaneng\Article\Blogs\source\academic" /E /NFL /NDL /NP /XO
cd E:\ChenHuaneng\Article\Blogs
Write-Host "运行WebP转换..."
& .\convert-to-webp.ps1
Write-Host "更新Markdown图片引用..."
& .\update-markdown-images.ps1
npx hexo clean
npx hexo g
npx hexo s -p 8080
```

`deploy.ps1`：

```powershell
# 修改学术主页
Write-Host "修改学术主页..."
cd E:\ChenHuaneng\Article\Academic\academic-homepage
bundle exec jekyll build
robocopy "_site" "E:\ChenHuaneng\Article\Blogs\source\academic" /E /NFL /NDL /NP /XO
cd E:\ChenHuaneng\Article\Blogs
# 查看当前修改的文件
$gitStatus = git status --porcelain
$gitAhead = git status -b --porcelain | Select-String "ahead"

# 判断是否有修改或者未推送的提交
if ($gitStatus -or $gitAhead) {
    Write-Host "检测到修改或未推送的提交，开始处理..."
    
    if ($gitStatus) {
        # 添加所有修改的文件
        git add .

        # 提交修改，自动生成提交信息
        $currentTime = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
        $commitMessage = "Auto commit at $currentTime"
        git commit -m $commitMessage
    } else {
        Write-Host "没有检测到新的修改，但有未推送的提交。"
    }

    # 推送到远程仓库
    git push -u origin main
} else {
    Write-Host "没有检测到修改或未推送的提交，跳过 Git 操作。"
}

Write-Host "开始图片WebP转换..."
Set-Location "E:\ChenHuaneng\Article\Blogs"
& .\convert-to-webp.ps1
Write-Host "WebP转换完成！"

Write-Host "更新Markdown中的图片引用..."
& .\update-markdown-images.ps1
Write-Host "图片引用更新完成！"

# 重新生成静态网页
npx hexo clean
npx hexo g

# 部署更新后的网页文件
hexo deploy
```

`convert-to-webp.ps1`：

```powershell
param(
    [string]$basePath = "E:\ChenHuaneng\Article\Blogs\source"
)

# 支持的图片扩展名
$imageExtensions = @('.png','.jpg','.jpeg','.gif','.avif')

# 需要处理的目录
$directories = @('imgs', '_posts', 'academic')

# 获取cwebp完整路径 (避免环境变量问题)
$cwebpPath = (Get-Command cwebp).Source

foreach ($dir in $directories) {
    $fullPath = Join-Path $basePath $dir
    if (Test-Path $fullPath) {
        Write-Host "Processing directory: $fullPath"
        # 递归处理子目录中的图片
        $files = Get-ChildItem -Path $fullPath -Recurse -File | Where-Object { $imageExtensions -contains $_.Extension.ToLower() }
        
        foreach ($file in $files) {
            $webpPath = [System.IO.Path]::ChangeExtension($file.FullName, 'webp')
            
            # 仅当WebP文件不存在或比原图新时转换
            if (-not (Test-Path $webpPath) -or $file.LastWriteTime -gt (Get-Item $webpPath).LastWriteTime) {
                try {
                    # 修复参数传递问题
                    $qualityArg = "-q", "75"
                    
                    # 处理GIF的特殊情况
                    if ($file.Extension -eq '.gif') {
                        # GIF使用gif2webp工具处理
                        $gif2webpPath = (Get-Command gif2webp).Source
                        & $gif2webpPath "-q" "75" "-mixed" "$($file.FullName)" "-o" "$webpPath"
                    }
                    else {
                        # 其他图片使用cwebp
                        & $cwebpPath "-q" "75" "$($file.FullName)" "-o" "$webpPath"
                    }
                    
                    if ($LASTEXITCODE -eq 0) {
                        Write-Host "✅ Converted: $($file.Name) → $([System.IO.Path]::GetFileName($webpPath))"
                    } else {
                        Write-Host "⚠️ Failed to convert: $($file.FullName) (Exit code: $LASTEXITCODE)"
                    }
                } catch {
                    Write-Host "🛑 Error processing $($file.FullName): $_"
                }
            } else {
                Write-Host "⏩ Skipped (up-to-date): $($file.Name)"
            }
        }
    }
}

Write-Host "🎉 WebP conversion complete!"
```

`update-markdown-images.ps1`：

```powershell
# 参数定义：基础目录路径（可运行时指定）
param([string]$basePath = "E:\ChenHuaneng\Article\Blogs\source")

# 定义目标子目录和支持的图片扩展名
$directories = @('_posts', 'image', 'about')
$imageExtensions = @('.png','.jpg','.jpeg','.gif','.avif')

# 获取待处理的 Markdown 文件（3天内修改）
$markdownFiles = Get-ChildItem -Path $basePath -Recurse -Include "*.md" | 
    Where-Object { 
        $_.DirectoryName -match "($($directories -join '|'))" -and
        $_.LastWriteTime -gt (Get-Date).AddDays(-3) 
    }

# 遍历每个文件进行替换
foreach ($file in $markdownFiles) {
    $content = Get-Content -Path $file.FullName -Raw
    
    # 正则表达式：匹配 Markdown 图片语法
    $typoraPattern = '\!\[(.*?)\]\((.*?)(' + 
        ($imageExtensions + $imageExtensions.ToUpper() | Join-String -Separator "|") + 
        ')\)'
    
    # 执行替换（保留描述和路径，仅修改扩展名为 .webp）
    $newContent = $content -replace $typoraPattern, '![$1]($2.webp)'
    
    # 保存修改后的文件
    if ($newContent -ne $content) {
        Set-Content -Path $file.FullName -Value $newContent -NoNewline
        Write-Host "✅ Updated $($file.Name)"
    } else {
        Write-Host "⏩ No images to update in $($file.Name)"
    }
}
Write-Host "🎉 All Markdown files updated to reference WebP images"
```
