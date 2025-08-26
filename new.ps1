<#
.SYNOPSIS
创建带日期的Hugo文章并自动打开相应文件和文件夹

.DESCRIPTION
该脚本提示用户输入文件名，检查文件是否已存在。
如果存在则打开相应文件和文件夹；如果不存在，则使用Hugo创建新文章，
并自动打开创建的文件和所在文件夹。
#>

# 检查Hugo是否可用
if (-not (Get-Command "hugo" -ErrorAction SilentlyContinue)) {
    Write-Error "未找到Hugo命令，请确保Hugo已安装并添加到系统PATH中"
    exit 1
}

# 提示用户输入文件名
$fileName = Read-Host "请输入文章文件名"

# 验证文件名不为空
if ([string]::IsNullOrWhiteSpace($fileName)) {
    Write-Error "文件名不能为空"
    exit 1
}

# 移除文件名中可能存在的非法字符
$sanitizedFileName = $fileName -replace '[\\/*?:"<>|]', ''

if ($sanitizedFileName -ne $fileName) {
    Write-Warning "文件名包含非法字符，已自动清理为: $sanitizedFileName"
}

# 获取当前日期
$today = Get-Date
$year = $today.ToString("yyyy")
$dateFormatted = $today.ToString("yyyy-MM-dd")

# 构建完整的文件名和路径
$fullFileName = "$dateFormatted-$sanitizedFileName"
$fullPath = "content/posts/$year/$fullFileName/index.md"

# 检查文件是否存在
if (Test-Path $fullPath) {
    Write-Host "文件已存在: $fullPath" -ForegroundColor DarkYellow
    
    # 打开包含该文件的文件夹
    $folderPath = Split-Path $fullPath -Parent
    Start-Process explorer.exe $folderPath
    
    # 打开文件
    Start-Process $fullPath
} else {
    Write-Host "创建新文件: $fullPath" -ForegroundColor Green
    
    try {
        # 执行Hugo命令创建新内容
        hugo new content/posts/$year/$fullFileName/index.md -k post
        
        # 检查命令是否成功执行
        if ($LASTEXITCODE -eq 0) {
            Write-Host "文件创建成功" -ForegroundColor Green
            
            # 确认文件已创建
            if (Test-Path $fullPath) {
                # 打开包含该文件的文件夹
                $folderPath = Split-Path $fullPath -Parent
                Start-Process explorer.exe $folderPath
                
                # 打开文件
                Start-Process $fullPath
            } else {
                Write-Error "Hugo命令执行成功，但未找到创建的文件: $fullPath"
            }
        } else {
            Write-Error "Hugo命令执行失败，退出代码: $LASTEXITCODE"
            exit $LASTEXITCODE
        }
    } catch {
        Write-Error "执行Hugo命令时发生错误: $_"
        exit 1
    }
}