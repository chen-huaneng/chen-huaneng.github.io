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
    # git push -u origin main
} else {
    Write-Host "没有检测到修改或未推送的提交，跳过 Git 操作。"
}

# 重新生成静态网页
if (Test-Path .\public\) {
    rm -Recurse .\public\
}
hugo server -D