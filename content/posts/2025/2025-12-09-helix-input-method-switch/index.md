---
date: '2025-12-09T11:40:22+08:00'
title: 'Helix - 在类 Vim/Emacs/Helix/VSCode/Neovim 模态文本编辑器中使用 Esc 键切换中英输入法'
description: "介绍如何在类 Vim/Emacs/Helix/VSCode/Neovim 模态文本编辑器中使用 Esc 键切换中英输入法。"
tags: ["Helix", "Windows", "Vim", "Neovim"]
categories: ["Helix"]
math: false
---

## 问题来源

在类 Vim/Emacs/Helix/VSCode/Neovim 模态编辑器中经常需要在 normal 模式中输入命令，而在中文输入下无法进行输入，所以经常需要先切换输入法到英文，极其不方便，因此就考虑是否有更简单的方法自动检测当前的模式，自动切换输入法。

## 解决思路

解决的思路就是考虑到每次切换模式都需要按 `Esc` 键，因此就让按下 `Esc` 键后切换输入法，当按下 `i/I/a/A/o/O` 键的时候切换回原本的中文输入法，这样就能够实现在 normal 模式中正常输入命令了。

下面就以 Windows 10 系统下的 Helix 为例，说明如何具体实现，对于其他操作系统和模态编辑器可以通过类似的方法实现。

首先在 Helix 的配置文件（可以在 Helix 中输入 `:config-open` 打开配置文件）中写入：

```toml
[keys.insert]
# Switch to English in normal mode, run im-select via cmd and kill after run with hidden window
"esc" = ["normal_mode", ":pipe-to cmd /c C:/Users/Abel/AppData/Roaming/helix/im-select.exe 1033"]

[keys.normal]
# Input method switch (switch to English)
"esc" = ["normal_mode", ":pipe-to cmd /c C:/Users/Abel/AppData/Roaming/helix/im-select.exe 1033"]
# Enter insert mode and restore input method (return to Chinese)
i = ["insert_mode", ":pipe-to cmd /c C:/Users/Abel/AppData/Roaming/helix/im-select.exe 2052"]
I = ["insert_at_line_start", ":pipe-to cmd /c C:/Users/Abel/AppData/Roaming/helix/im-select.exe 2052"]
# Use `li` or remap `after insert`
a = ["move_char_right", "insert_mode", ":pipe-to cmd /c C:/Users/Abel/AppData/Roaming/helix/im-select.exe 2052"]
A = ["insert_at_line_end", ":pipe-to cmd /c C:/Users/Abel/AppData/Roaming/helix/im-select.exe 2052"]
o = ["open_below", ":pipe-to cmd /c C:/Users/Abel/AppData/Roaming/helix/im-select.exe 2052"]
O = ["open_above", ":pipe-to cmd /c C:/Users/Abel/AppData/Roaming/helix/im-select.exe 2052"]

```

`":pipe-to cmd /c C:/Users/Abel/AppData/Roaming/helix/im-select.exe 1033"` 的意思是在 Helix 中用 `:pipe-to` 把命令传输到管道中并且忽略输出[^1]，`cmd /c` 负责打开一个 cmd 并且执行后面的命令后关闭进程，不使用 PowerShell 是因为 PowerShell 启动的速度太慢，会导致切换输入法的速度太慢，`C:/Users/Abel/AppData/Roaming/helix/im-select.exe` 则是 [im-select](https://github.com/daipeihust/im-select) 下载后存储的位置，`1033` 则是英文输入法 `key`。

[im-select](https://github.com/daipeihust/im-select) 是一个用于切换输入法的小软件，下载后放在想放的位置就行，记得相应地修改上面的地址，中英文输入法的 `key` 可以通过 git-bash 获取，因为在 Windows 中无法通过 PowerShell 和 cmd 来获取输入法的 `key`[^2]：

> The im-select.exe is command line program, but it can't work in cmd or powershell. It's microsoft's bug, the keyboard API doesn't support in cmd and powershell. I recommend you git-bash.
>
> > Note: The git-bash is not required. It's only used to get current input method key, which needed in VSCodeVim's configuration.

在 git-bash 切换到 `im-select.exe` 文件所在的文件夹，输入 `im-select.exe` 运行，会输出当前输入法的 `key`，切换输入法再次运行可以获得另外一个输入法的 `key`，把上面代码中的 `2052` 和 `1033` 换成相应的 `key` 即可，这里的 `2052` 是中文输入法的 `key`，`1033` 是英文输入法的 `key`。

[^1]: https://docs.helix-editor.com/commands.html
[^2]: https://github.com/daipeihust/im-select#windows-1