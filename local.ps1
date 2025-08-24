# 生成并启动Hugo
if (Test-Path .\public\) {
    rm -Recurse .\public\
}
hugo server -D