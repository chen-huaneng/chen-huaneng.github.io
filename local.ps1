# 生成并启动Hugo
if (Test-Path .\public\) {
    # 获取public目录下所有内容，排除shortcode-gallery
    $itemsToDelete = Get-ChildItem -Path .\public\ -Exclude "shortcode-gallery"
    
    if ($itemsToDelete) {
        # 强制删除筛选后的内容（包括子目录和只读文件）
        $itemsToDelete | Remove-Item -Recurse
    }
}

hugo server --buildDrafts --disableFastRender