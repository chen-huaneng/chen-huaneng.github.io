---
date: '2025-08-04 13:49:14'
title: '【Neovim】重构编辑器配置'
description: ""
tags: [Neovim, Vim]
categories: [Neovim]
math: true
---

## 需求来源

在使用 Neovim 一年多以后，发现之前配置的 Neovim 中的很多功能用不上，显得 Neovim 中的配置十分地臃肿，因此打算重新写一份 Neovim 的配置指南，便于后面重新构建 Neovim，也给需要从零开始构建的朋友们一个参考。

现在配置的 Neovim 具有以下功能：

- 能够运行 $\LaTeX$ 并且支持实时预览，一键清理 $\LaTeX$ 的附属文件，支持正向搜索和反向搜索
- 能够方便地切换文件夹中和文件进行编辑，提供类似 VS Code 的文件浏览侧边栏
- 能够支持 $\LaTeX$，C++/C 和 Python 代码的高亮和自动补全
- 支持 C++/C 和 Python 代码的编译和运行
- 好看的主题和类 VS Code 的界面 UI
- 支持 Git 查看新增和修改的代码段，优化 Git 提交显示
- 支持彩虹配对括号和特殊注释高亮
- 自动高亮和当前光标下相对应的单词
- 显示不同缩进参考线
- 支持快速查询快捷键和 Git 记录查询
- 自动切换中英输入法
- 美观的状态栏以及丰富的图标支持
- 支持模糊搜索
- 支持给指定文本快速添加配对符号如括号、引号等
- 集成 Copilot AI 辅助代码和文本写作
- 支持快捷注释和取消注释代码块
- 提供缓冲区标签栏，支持快速切换缓冲区和鼠标操作
- 支持插件管理界面和懒加载
- 支持自定义代码片段替换和插入

<p class="note note-primary">如果想要开箱即用，我个人的 Neovim 配置的仓库地址：[neovim-config](https://github.com/chen-huaneng/neovim-config)</p>

## 版本信息

我使用的系统是 Windows 10 22H2，我的 Neovim 版本信息如下：

```text
NVIM v0.11.3
Build type: Release
LuaJIT 2.1.1741730670

   system vimrc file: "$VIM/sysinit.vim"
  fall-back for $VIM: "C:/Program Files (x86)/nvim/share/nvim"

Run :checkhealth for more info
```

## Neovim 配置基础知识

### Lua 语言

在配置 Neovim 的时候，尽量使用 Lua，因为这是 Neovim 而不是 Vim，如果对 Lua 不了解，可以快速了解一下基本的语法和语义：[Learn Lua in Y Minutes](https://learnxinyminutes.com/lua/)。

### 配置文件路径

在 Windows 10 系统中，Neovim 的配置文件路径一般在 `C:\Users\<UserName>\AppData\Local\nvim\`。默认会读取该文件夹下的 `init.lua` 或者 `init.vim` 文件，这也是配置文件的主入口，**理论上**来说可以将所有的配置都写到这个文件里面，但是这不是一个好做法，因此划分成不同的文件和目录来管理不同功能的配置会更好。

本篇教程配置 Neovim 之后的目录结构应该是下面的样子：

```text
.
│   im-select.exe
│   init.lua
│   lazy-lock.json
│   
├───lua
│   │   bootstrap.lua
│   │   
│   ├───core
│   │       autocmds.lua
│   │       functions.lua
│   │       init.lua
│   │       keymaps.lua
│   │       options.lua
│   │       
│   └───plugins
│       │   autopairs.lua
│       │   bufferline.lua
│       │   colorscheme.lua
│       │   comment.lua
│       │   copilot.lua
│       │   gitsigns.lua
│       │   im-select.lua
│       │   indent-blankline.lua
│       │   local-highlight.lua
│       │   lualine.lua
│       │   luasnip.lua
│       │   nvim-tree.lua
│       │   nvim-web-devicons.lua
│       │   rainbow-delimiters.lua
│       │   surround.lua
│       │   telescope.lua
│       │   todo-comments.lua
│       │   treesitter.lua
│       │   vimtex.lua
│       │   which-key.lua
│       │   
│       └───lsp
│               lspconfig.lua
│               mason.lua
│               nvim-cmp.lua
│               vimtex-cmp.lua
│               
└───snippets
        tex.lua
```

解释如下：

- `init.lua` 为 Neovim 配置的主入口，用于导入其他 `*.lua` 文件。
- `lua` 目录，当我们在 Lua 中调用 `require` 加载模块（文件）的时候，它会自动在 `lua` 文件夹里进行搜索
  - 将路径分隔符从 `/` 替换为 `.`，然后去掉 `.lua` 后缀就得到了 `require` 的参数格式
- `core` 目录，用于管理核心配置和 Neovim 自带的配置
- `plugins` 目录，用于管理插件
- `snippets` 目录，用于管理自定义代码片段

### 选项配置

主要用到的就是 `vim.g`、`vim.opt`、`vim.cmd`

### 按键配置

在 Neovim 中进行按键绑定的语法如下：

```lua
vim.keymap.set(<mode>, <key>, <action>, <opts>)
```

## 从零开始配置 Neovim

在配置 Neovim 的时候弄清楚每一个选项的意思是很有必要的，因此会尽量在本文中说明每个选项的含义，同时在配置中会有相应的注释，如果没有说明则该选项的意义在注释中可以找到，尽量让配置文件是 **self-contained** 而且可读性强。

### 安装 Neovim

我使用的是 [Scoop](https://chen-huaneng.github.io/2024/01/04/2024-01-04-2024-01-04-Scoop/)，因此安装 Neovim 只需要在命令行中运行下面的指令就可以：

```powershell
scoop install main/neovim
```

安装完成之后如果不存在前面说的配置文件夹和相应的 `init.lua` 文件，直接创建目录并新建 `init.lua` 文件即可。每次修改配置文件后，将配置文件编辑保存，重启 Neovim 就能看到相应的效果。接下来会按照 Neovim 启动执行文件的顺序介绍各个模块。

### `init.lua` 入口文件

Neovim 启动时首先加载的就是 `init.lua` 文件：

- `require("core")` 加载 `lua/core/init.lua`，初始化所有核心编辑器设置
- `require("bootstrap")` 加载 `lua/boostrap.lua`，启动并配置 `lazy.nvim` 插件管理器

`init.lua` 文件配置：

```lua
require("core")
require("bootstrap")
```

<p class="note note-info">`lazy-lock.json` 文件由 `lazy.nvim` 自动生成和管理，用于锁定所有插件的 commit hash，确保在不同设备上或重装时能恢复到完全相同的插件版本，保证了配置的稳定性。</p>

### `lua/core` 核心配置

#### `core/init.lua` 核心模块的入口

作为 `core` 模块的入口，按顺序加载所有核心配置文件：

```lua
require("core.keymaps")
require("core.options")
require("core.autocmds")
require("core.functions")
```

#### `core/keymaps.lua` 定义全局快捷键

定义全局的快捷键和一些插件的快捷键：

```lua
---------------------
-- Basic name norm --
---------------------

--[[
----------------------keymap---------------------------
  <C-z> which means Ctrl-z, <C-p> for Ctrl-p, and so on
  <CR> which means <Enter>
  <S-m> which means Shift-m
  <A-Left> which means Alt-Left arrow key
  <BS> which means Backspace key
------------------------mode---------------------------
  'n': normal mode
  'x': visual mode
the difference between 'x', 'v' and 's' see: https://vi.stackexchange.com/questions/38859/what-does-mode-x-mean-in-neovim
--]]

---------------------------
-- Define common options --
---------------------------

local opts = {
  noremap = true, -- non-recursive
  silent = true, -- do not show message
}

-- Shorten function name
local keymap = vim.api.nvim_set_keymap

--Remap space as leader key
vim.g.mapleader = " "

----------------------
-- Built-in mapping --
----------------------

-- Unmappings <C-z> and set to no actions (<nop>) which used to disable these shortcut keys
keymap("n", "<C-z>", "<nop>", opts)

-- Press <Enter> to clear search highlights results
keymap("n", "<CR>", "<cmd>noh<CR>", opts)

-- Press <Shift-m> to open the help documentation for the word at the cursor
keymap("n", "<S-m>", ':execute "help " . expand("<cword>")<cr>', opts)

-- The 'Y' key is remapped to copy to the end of the line, and the 'E' key is mapped to jump to the end of the previous word
keymap("n", "Y", "y$", opts)
keymap("n", "E", "ge", opts)
keymap("v", "Y", "y$", opts)
keymap("v", "E", "ge", opts) -- causes errors with luasnip autocmp

-- <S-h> and <S-l> are used to jump to the beginning and end of a row respectively
keymap("v", "<S-h>", "g^", opts)
keymap("v", "<S-l>", "g$", opts)
keymap("n", "<S-h>", "g^", opts)
keymap("n", "<S-l>", "g$", opts)

-- Use <C-h>, <C-j>, <C-k>, and <C-l> to navigate quickly between windows
keymap("n", "<C-h>", "<C-w>h", opts)
keymap("n", "<C-j>", "<C-w>j", opts)
keymap("n", "<C-k>", "<C-w>k", opts)
keymap("n", "<C-l>", "<C-w>l", opts)

-- Resize windows width and height with arrows
-- delta: 2 lines
keymap("n", "<C-Up>", ":resize -2<CR>", opts)
keymap("n", "<C-Down>", ":resize +2<CR>", opts)
keymap("n", "<C-Left>", ":vertical resize -2<CR>", opts)
keymap("n", "<C-Right>", ":vertical resize +2<CR>", opts)

-- Navigate between buffers through <TAB> and <S-TAB>
keymap("n", "<TAB>", ":bnext<CR>", opts)
keymap("n", "<S-TAB>", ":bprevious<CR>", opts)

-- Can continuously use <Tab> or <S-Tab> to change the indentation in selection mode
keymap("v", ">", ">gv", opts)
keymap("v", "<", "<gv", opts)

--------------------
-- Telescope.nvim --
--------------------

-- Start the find_files function in the Telescope plugin to search for project files
vim.keymap.set("n", "<C-p>", "<cmd>Telescope find_files<CR>", { remap = true })

------------------
-- Comment.nvim --
------------------

-- Toggle comments <Ctrl-/> line comments used to switch between the current line and the selected area
keymap('n', '<C-_>', '<Plug>(comment_toggle_linewise_current)', opts)
keymap('x', '<C-_>', '<Plug>(comment_toggle_linewise_visual)', opts)

-----------------
-- Copilot.vim --
-----------------

-- Change the shortcut key for accepting Copilot suggestions
vim.keymap.set('i', '<C-R>', 'copilot#Accept("\\<CR>")', {
  expr = true,
  replace_keycodes = false
})
vim.g.copilot_no_tab_map = true

```

### `core/options.lua` 全局选项配置

定义 Neovim 的全局选项配置：

```lua
local options = {

  -- GENERAL
  timeoutlen = 500,               -- time to wait for a mapped sequence to complete (in milliseconds), keyboard shortcut waiting time
  updatetime = 300,               -- faster completion (4000ms default), update the inspection interval time
  swapfile = false,               -- creates a swap file
  undofile = true,                -- enable persistent undo
  writebackup = false,            -- if a file is being edited by another program, it is not allowed to be edited
  backup = false,           -- backup file creation
  confirm = true,           -- a confirmation pops up when there is no save or the file is read-only

  -- APPEARANCE
  fileencoding = "UTF-8",         -- the encoding written to a file
  encoding = "UTF-8",             -- UTF-8 encoding is used when processing text
  guifont = "monospace:h17",      -- the font used in graphical neovim applications
  background = "dark",            -- colorschemes that can be light or dark will be made dark
  termguicolors = true,           -- set term gui colors (most terminals support this)
  conceallevel = 0,               -- so that `` is visible in markdown files
  number = true,                  -- show numbered lines
  relativenumber = true,          -- set relative numbered lines
  numberwidth = 2,                -- set number column width to 2 {default 4}
  signcolumn = "yes",             -- always show the sign column, otherwise it would shift the text each time
  cursorline = true,              -- highlight the current line
  wrap = true,                    -- display lines as one long line, enable line breaks
  showbreak = "↪ ",               -- set indent of wrapped lines
  cmdheight = 1,                  -- space in the neovim command line for displaying messages, command line height
  pumheight = 10,                 -- pop up menu height, the height of the completed menu
  wildmenu = true,                -- display the completion menu
  splitbelow = true,              -- force all horizontal splits to go below current window
  splitright = true,              -- force all vertical splits to go to the right of current window
  scrolloff = 999,                  -- minimal number of screen lines to keep above and below the cursor, achieve an effect similar to that of a Typora typewriter

  -- INDENT
  tabstop = 4,                    -- show 4 spaces for a tab
  shiftwidth = 4,                 -- the number of spaces inserted for each indentation
  softtabstop = 4,                -- insert 4 spaces for a tab
  expandtab = true,               -- convert tabs to spaces
  breakindent = true,             -- tab wrapped lines
  linebreak = true,               -- companion to wrap, don't split words
  backspace = "indent,eol,start", -- allow backspace on indent, end of line or insert mode start position
  smarttab = true,                -- automatically adjust the indentation length of the new line based on the indentation of the current line
  shiftround = true,              -- align to multiples of shiftwidth when moving with >> and <<
  autoindent = true,              -- indentation of the new line is aligned to the current line
  smartindent = true,             -- enable universal intelligent indentation

  -- EDIT
  spell = false,                   -- turns on spellchecker
  clipboard = "unnamedplus",      -- allows neovim to access the system clipboard
  mouse = "a",                    -- allow the mouse to be used in neovim
  ignorecase = true,              -- ignore case in search patterns
  smartcase = true,               -- when searching for capital letters, it automatically distinguishes between upper and lower case
  hlsearch = true,                -- search highlighting
  incsearch = true,               -- when entering the search mode, each character input automatically jumps to the first matching result
  showmatch = true,               -- highlight the matching parentheses
  virtualedit = "block",          -- vitualblock mode doesn't get stuck at the end of line
  inccommand = "split",           -- shows all inline replacements in split
  autoread = true,                -- external file modifications are automatically loaded
  whichwrap = "<,>,[,]",          -- when the cursor is moved to the beginning or end of a line, it can be moved across lines
  list = false,                   -- do not display invisible characters
  listchars = "space:·,tab:>-",   -- display methods of spaces and tabs
}

-- turns on all values in options table above
for k, v in pairs(options) do
  vim.opt[k] = v
end
```

### `core/autocmds.lua` 自动命令配置

设置自动命令，用于在特定事件发生时执行操作：

```lua
local api = vim.api

-- close help, man, qf, lspinfo with 'q'
api.nvim_create_autocmd(
  "FileType",
  {
    pattern = { "man", "help", "qf", "lspinfo" }, -- "startuptime",
    command = "nnoremap <buffer><silent> q :close<CR>",
  }
)

-- Terminal mappings 
--[[
  The set_terminal_keymaps function is defined. In terminal mode, the shortcut key <esc> is mapped to <C-c>, which can be used to quickly exit terminal mode.
  Navigate between different Windows with <C-h>, <C-j>, <C-k>, and <C-l>. When the terminal is opened (TermOpen), set_terminal_keymaps() is automatically called.
  Press <C-w> to exit from Terminal mode to Normal mode.
--]]
function _G.set_terminal_keymaps()
  local opts = { buffer = 0 }
  vim.keymap.set('t', '<esc>', [[<C-c>]], opts)
  vim.keymap.set('t', '<C-h>', [[<Cmd>wincmd h<CR>]], opts)
  vim.keymap.set('t', '<C-j>', [[<Cmd>wincmd j<CR>]], opts)
  vim.keymap.set('t', '<C-k>', [[<Cmd>wincmd k<CR>]], opts)
  vim.keymap.set('t', '<C-l>', [[<Cmd>wincmd l<CR>]], opts)
  vim.keymap.set('t', '<C-w>', [[<C-\><C-n><C-w>]], opts)
end

vim.api.nvim_create_autocmd({ "TermOpen" }, {
  pattern = { "term://*" }, -- use term://*toggleterm#* for only ToggleTerm
  command = "lua set_terminal_keymaps()",
})
```

### `core/functions.lus` 自定义函数

存放可被复用的自定义 Lua 函数：

```lua
-- Used to find the word under the cursor
function SearchWordUnderCursor()
    local word = vim.fn.expand('<cword>') -- get the word under the cursor
    require('telescope.builtin').live_grep({ default_text = word }) -- invoke the live_grep function of the Telescope plugin
end
```

## `lua/bootstrap.lua` 插件管理器

负责 `lazy.nvim` 插件管理器的安装和配置，主要功能：

- 自动检查 `lazy.nvim` 是否安装，如果未安装则从 Github 下载
- 调用 `require("lazy").setup()`，并从 `lua/plugins` 和 `lua/plugins/lsp` 目录导入所有插件配置
- 自定义 `lazy.nvim` 的界面图标

文件配置：

```lua
-- Bootstrap lazy.nvim
local lazypath = vim.fn.stdpath("data") .. "/lazy/lazy.nvim"
-- Check if lazy.nvim is installed (check if the path exists)
if not (vim.uv or vim.loop).fs_stat(lazypath) then
  -- Define the remote repository address of lazy.nvim
  local lazyrepo = "https://github.com/folke/lazy.nvim.git"
  -- Clone the path from the repository to the local area
  local out = vim.fn.system({
    "git", 
    "clone", 
    "--filter=blob:none",  -- Optimize cloning speed and only download necessary files
    "--branch=stable",     -- Use the stable branch
    lazyrepo, 
    lazypath
  })
  -- If the clone fails (git returns a non-zero error code)
  if vim.v.shell_error ~= 0 then
    -- Display error messages and debug output
    vim.api.nvim_echo({
      { "Failed to clone lazy.nvim:\n", "ErrorMsg" },
      { out, "WarningMsg" },
      { "\nPress any key to exit..." },
    }, true, {})
    -- Wait for the user to press the button and exit
    vim.fn.getchar()
    os.exit(1)
  end
end

-- Add the path of the lazy.nvim plugin manager to the runtime path (rtp) of Neovim
vim.opt.rtp:prepend(lazypath)

-- Initialize the lazy.nvim plugin manager
require("lazy").setup({
  -- Plugin configuration module
  { import = "plugins" },       -- main plugin directory (lua/plugins directory)
  { import = "plugins.lsp" }    -- LSP plugin directory (lua/plugins/lsp directory)
}, {
  -- Configuration options of the plugin manager
  install = {
    colorscheme = { "gruvbox" },  -- Automatically install the gruvbox color theme during installation
  },
  checker = {
    enabled = true,               -- Enables plugins version checking (check for updates)
    notify = false,               -- Does not pop up notifications when an update is detected
  },
  change_detection = {
    notify = false,               -- No notification pops up when the plugin file is changed
  },
  ui = {
    icons = {
      -- Custom UI icons
      cmd = "⌘",            -- command
      config = "🛠",        -- configuration
      event = "📅",         -- event
      ft = "📂",            -- file type
      init = "⚙",          -- initialization shell
      keys = "🗝",          -- keys binding
      plugin = "🔌",        -- plugins
      runtime = "💻",       -- running
      require = "🌙",       -- require invocation
      source = "📄",        -- source file
      start = "🚀",         -- start plugins
      task = "📌",          -- task
      lazy = "💤 ",         -- lazy plugins
    },
  },
})
```

## `lua/plugins` 插件配置

### `plugins/lsp` 代码分析与补全

`lsp/` 目录用于存放所有与 LSP（Language Server Protocol）、代码补全和语法分析相关的插件。

#### `lspconfig.lua` 主配置文件

用于连接 `mason` 安装的 LSP 服务器到 Neovim 的 LSP 客户端。

```lua
return {
  "neovim/nvim-lspconfig",
  event = { "BufReadPre", "BufNewFile" }, -- Load when opening/creating a new file
  dependencies = {
    { "hrsh7th/cmp-nvim-lsp" }, -- Provide LSP completion capability for auto-completion plugins (such as nvim-cmp)
    { "antosha417/nvim-lsp-file-operations", config = true }, -- Automatically handle file operations (such as synchronizing file structures when renaming)
  },
  config = function()
    -- import lspconfig plugin
    local lspconfig = require("lspconfig")

    -- import cmp-nvim-lsp plugin
    local cmp_nvim_lsp = require("cmp_nvim_lsp")

    -- used to enable autocompletion (assign to every lsp server config)
    local default = cmp_nvim_lsp.default_capabilities()

    -- change the diagnostic symbols in the sign column (gutter)
    vim.diagnostic.config({
      signs = {
        text = {
          [vim.diagnostic.severity.ERROR] = "", -- error
          [vim.diagnostic.severity.WARN] = "",  -- warning
          [vim.diagnostic.severity.INFO] = "",  -- information
          [vim.diagnostic.severity.HINT] = "󰠠",  -- hint
        }
      },
      update_in_insert = true,  -- real-time update diagnosis in insertion mode
      underline = true,  -- display error line
    })

    -- configure python server
    lspconfig["pyright"].setup({
      capabilities = default, -- enable default capabilities (including completion)
      filetypes = { "python" },  -- only useful to .py file type
    })

    -- configure cpp server
    lspconfig["clangd"].setup({
      capabilities = default, -- enable default capabilities (including completion)
      filetypes = { "h", "c", "cpp", "cc", "objc", "objcpp"}, -- supported file type
      single_file_support = true, -- enable single-file mode (applicable to large-scale projects)
    })
  end,
}
```

#### `mason.lua` LSP 管理

核心的 LSP 管理工具，用于安装和管理 LSP 服务器、代码格式化工具（Formatter）和代码检查工具（Linter）。

```lua
return {
  "williamboman/mason.nvim",
  ft ={ "py", "cpp", "c", "tex", "bib", "h", "cc", "objc", "objcpp" }, -- Specify the supported file types
  dependencies = {
    "williamboman/mason-lspconfig.nvim", -- Used for managing the installation and configuration of LSP servers
    "WhoIsSethDaniel/mason-tool-installer.nvim", -- Used for managing the installation of development tools (such as formatters, linters)
  },

  config = function()
    -- import mason
    local mason = require("mason")

    -- import mason-lspconfig
    local mason_lspconfig = require("mason-lspconfig")

    -- import mason-tool-installer
    local mason_tool_installer = require("mason-tool-installer")

    -- enable mason and configure icons
    mason.setup({
      ui = {
        icons = {
          package_installed = "✓",   -- installed packages
          package_pending = "➜",     -- the package being installed
          package_uninstalled = "✗", -- uninstalled package
        },
      },
    })

    mason_lspconfig.setup({
      -- list of servers for mason to install
      ensure_installed = {
        "pyright", -- python LSP
        "clangd",  -- cpp LSP
      },
      -- auto-install configured servers (with lspconfig)
      automatic_installation = true, -- not the same as ensure_installed
    })

    mason_tool_installer.setup({
      ensure_installed = {
        "clang-format", -- cpp formatter
        "black",    -- python formatter
        "pylint",   -- python linter
        "flake8",     -- Python static analysis
        "bandit",     -- Python security check
        "cpplint",    -- cpp linter
      },
    })
  end,
}
```

#### `nvim-cmp.lua` 自动补全

核心的自动补全引擎插件：

```lua
return {
  "hrsh7th/nvim-cmp",
  event = { "InsertEnter", "CmdlineEnter" }, -- Load the plugin when entering in insert mode or command-line mode
  dependencies = {
    "hrsh7th/cmp-buffer", -- source for text in buffer
    "hrsh7th/cmp-path", -- source for file system paths
    "L3MON4D3/LuaSnip", -- snippet engine
    "saadparwaiz1/cmp_luasnip", -- for autocompletion
    -- "onsails/lspkind.nvim", -- vs-code like pictograms
    "hrsh7th/cmp-cmdline", -- command-line mode completion
    "petertriho/cmp-git", -- git command completion
    "f3fora/cmp-spell", -- spelling check completion
    "micangl/cmp-vimtex", -- LaTeX completion (VimTeX Plugin)
  },
  config = function()

    local cmp = require("cmp")

    local luasnip = require("luasnip")

------------------------
-- Icon configuration --
------------------------

    local kind_icons = {
      article = "󰧮", -- article type (LaTeX)
      book = "", -- book type (LaTeX)
      incollection = "󱓷", -- collection type (LaTeX)
      Function = "󰊕", -- function
      Constructor = "", -- constructor
      Text = "󰦨", -- plain text
      Method = "", -- method
      Field = "󰅪", -- field/attribute
      Variable = "󱃮", -- variable
      Class = "", -- class
      Interface = "", -- interface
      Module = "", -- module
      Property = "", -- property
      Unit = "", -- unit 
      Value = "󰚯", -- value
      Enum = "", -- enumeration
      Keyword = "", -- keyword
      Snippet = "", -- code snippet
      -- Color = "󰌁", -- color
      Color = "", -- color
      File = "", -- file
      Reference = "", -- reference
      Folder = "", -- folder
      EnumMember = "", --enumeration member
      spell = "",
      -- EnumMember = "",
      Constant = "󰀫", -- constant
      Struct = "",
      -- Struct = "",
      Event = "", -- event
      Operator = "󰘧", -- operator
      TypeParameter = "", -- type parameter
    }
    -- find more here: https://www.nerdfonts.com/cheat-sheet

----------------------
-- Completion logic --
----------------------

    cmp.setup({
      completion = {
        completeopt = "menu,noselect", -- Complete menu behavior (not automatically selected)
        keyword_length = 1, -- At least one character is entered to trigger completion
      },
      snippet = { -- configure how nvim-cmp interacts with snippet engine
        expand = function(args)
          luasnip.lsp_expand(args.body) -- Extend the snippet using LuaSnip
        end,
      },

-----------------
-- Key mapping --
-----------------

      mapping = cmp.mapping.preset.insert({
        ["<CR>"] = cmp.mapping.confirm({ select = true }), -- Press Enter to confirm completion (no forced selection)

        -- supertab
        ["<Tab>"] = cmp.mapping(function(fallback)
          if cmp.visible() then
            cmp.select_next_item()
          elseif luasnip.locally_jumpable(1) then
            luasnip.jump(1)
          elseif luasnip.expandable() then
            luasnip.expand()
          else
            fallback()
          end
        end, { "i", "s" }),
        ["<S-Tab>"] = cmp.mapping(function()
          if cmp.visible() then
            cmp.select_prev_item()
          elseif luasnip.locally_jumpable(-1) then
            luasnip.jump(-1)
          else
            -- fallback()
          end
        end, { "i", "s" }),
      }),

-----------------------------------
-- Formatting for autocompletion --
-----------------------------------

      formatting = {
        fields = { "kind", "abbr", "menu" }, -- Completed item display fields (type, abbreviation, source)
        format = function(entry, vim_item)
          vim_item.kind = string.format("%s", kind_icons[vim_item.kind]) -- Kind icons
          vim_item.menu = ({
            vimtex = vim_item.menu,
            luasnip = "[Snippet]",
            nvim_lsp = "[LSP]",
            buffer = "[Buffer]",
            spell = "[Spell]",
            cmdline = "[CMD]",
            path = "[Path]",
          })[entry.source.name]
          return vim_item
        end,
      },

--------------------------------
-- Sources for autocompletion --
--------------------------------

      sources = cmp.config.sources({
        { name = "nvim_lsp" },
        { name = "luasnip" }, -- snippets
        { name = "vimtex" },
        { name = "buffer", keyword_length = 3 }, -- text within current buffer
        { name = "spell",
          keyword_length = 4,
          option = {
              keep_all_entries = false,
              enable_in_context = function()
                  return true -- Always enable spell check
              end
          },
        },
        { name = "path" },
      }),

-------------------------
-- Other configuration --
-------------------------

      confirm_opts = {
        behavior = cmp.ConfirmBehavior.Replace, -- Replace the current cursor content
        select = false,
      },
      view = {
        entries = 'custom', -- Customize the display method of completion items
      },
      window = {
        completion = cmp.config.window.bordered(), -- Complete the window with a border
        documentation = cmp.config.window.bordered(), -- Documentation window with a border
      },
      performance = {
         trigger_debounce_time = 500,
         throttle = 550,
         fetching_timeout = 80,
      },
    })

    -- `/` cmdline setup.
    cmp.setup.cmdline('/', {
      mapping = cmp.mapping.preset.cmdline(),
      sources = {
        {name = 'buffer'}
      }
    })

    -- `:` cmdline setup.
    cmp.setup.cmdline(':', {
      mapping = cmp.mapping.preset.cmdline(),
      sources = {
        {name = 'path'},
        {name = 'cmdline'}
      }
    })

  end,
}
```

#### `vimtex-cmp.lua` $\LaTeX$ 支持

通过显示额外信息、符号和 BibTeX 解析，提升 LaTeX 编辑效率：

```lua
return {
  "micangl/cmp-vimtex",
  ft = { "tex", "bib", "cls" }, -- Only loaded when .tex .bib .cls files are opened
  config = function()
    require('cmp_vimtex').setup({
      additional_information = {
        info_in_menu = true,
        info_in_window = true,
        info_max_length = 60,
        match_against_info = true,
        symbols_in_menu = true,
      },
      bibtex_parser = {
        enabled = true,
      },
    })
  end,
}
```

### `plugins/autopairs.lua` 自动补全括号

自动补全括号、引号等成对符号：

```lua
return {
  "windwp/nvim-autopairs",
  event = { "InsertEnter" },
  dependencies = {
    "hrsh7th/nvim-cmp",
  },
  config = function()
    -- import nvim-autopairs
    local autopairs = require("nvim-autopairs")

    -- configure autopairs
    autopairs.setup({
      check_ts = true,                      -- enable treesitter
      disable_filetype = { "TelescopePrompt", "spectre_panel" },
      disable_in_macro = true,
      disable_in_replace_mode = true,
      enable_moveright = true,
      ignored_next_char = "",
      enable_check_bracket_line = true, --- check bracket in same line
    })

    local Rule = require 'nvim-autopairs.rule'

    local cond = require 'nvim-autopairs.conds'

    autopairs.add_rules({
      Rule("`", "'", "tex"),
      Rule("$", "$", "tex"),
      Rule(' ', ' ')
          :with_pair(function(opts)
            local pair = opts.line:sub(opts.col, opts.col + 1)
            return vim.tbl_contains({ '$$', '()', '{}', '[]', '<>' }, pair)
          end)
          :with_move(cond.none())
          :with_cr(cond.none())
          :with_del(function(opts)
            local col = vim.api.nvim_win_get_cursor(0)[2]
            local context = opts.line:sub(col - 1, col + 2)
            return vim.tbl_contains({ '$  $', '(  )', '{  }', '[  ]', '<  >' }, context)
          end),
      Rule("$ ", " ", "tex")
          :with_pair(cond.not_after_regex(" "))
          :with_del(cond.none()),
      Rule("[ ", " ", "tex")
          :with_pair(cond.not_after_regex(" "))
          :with_del(cond.none()),
      Rule("{ ", " ", "tex")
          :with_pair(cond.not_after_regex(" "))
          :with_del(cond.none()),
      Rule("( ", " ", "tex")
          :with_pair(cond.not_after_regex(" "))
          :with_del(cond.none()),
      Rule("< ", " ", "tex")
          :with_pair(cond.not_after_regex(" "))
          :with_del(cond.none()),
    })

    autopairs.get_rule('$'):with_move(function(opts)
      return opts.char == opts.next_char:sub(1, 1)
    end)

    -- import nvim-cmp plugin (completions plugin)
    local cmp = require("cmp")

    -- import nvim-autopairs completion functionality
    local cmp_autopairs = require("nvim-autopairs.completion.cmp")

    -- make autopairs and completion work together
    cmp.event:on(
      'confirm_done',
      cmp_autopairs.on_confirm_done({
        filetypes = {
          tex = false -- Disable for tex
        }
      })
    )
  end,
}
```

### `bufferline.lua` 缓冲区标签栏

在顶部显示一个类似 VSCode 的标签栏，用于展示和切换打开的缓冲区：

```lua
return {
  "akinsho/bufferline.nvim",
  dependencies = { "nvim-tree/nvim-web-devicons" },
  version = "*",
  config = function()
    local bufferline = require('bufferline')
    bufferline.setup({
      options = {
        mode = "buffers",
        separator_style = "slant",
        close_command = "bdelete! %d", -- Use the Lua API to close the buffer
        diagnostics = false,           -- OR: | "nvim_lsp" 
        diagnostics_update_in_insert = false,
        show_tab_indicators = false,
        show_close_icon = false,
        -- numbers = "ordinal", -- Display buffer numbers as ordinal numbers
        sort_by = 'insert_after_current', -- OR: 'insert_at_end' | 'tabs' | 'extension' | 'relative_directory' | 'directory' | 'id' |
        offsets = {
          {
            filetype = "NvimTree",
            -- text = "Explorer",
            text = function()
              return vim.fn.getcwd()
            end,
            highlight = "Directory",
            separator = "", -- use a "true" to enable the default, or set your own character
            -- padding = 1
          }
        },
        hover = {
          enabled = true,
          delay = 30,
          reveal = { 'close' }
        },
        vim.api.nvim_create_autocmd("User", {
          pattern = "AlphaReady",
          desc = "disable tabline for alpha",
          callback = function()
            vim.opt.showtabline = 0
          end,
        }),
        vim.api.nvim_create_autocmd("BufUnload", {
          buffer = 0,
          desc = "enable tabline after alpha",
          callback = function()
            vim.opt.showtabline = 2
          end,
        })
      },
    })
  end,
}
```

### `colorscheme.lua` 颜色主题

设置 `gruvbox` 为主颜色主题，并覆盖了一些高亮组以优化显示效果：

```lua
-- GRUVBOX
return {
  "ellisonleao/gruvbox.nvim",
  priority = 1000, -- make sure to load this before all the other start plugins
  config = function()
    require("gruvbox").setup({
      overrides = {
        SignColumn = { bg = "#282828" },
        NvimTreeCutHL = { fg = "#fb4934", bg = "#282828" },
        NvimTreeCopiedHL = { fg = "#b8bb26", bg = "#282828" },
        DiagnosticSignError = { fg = "#fb4934", bg = "#282828" },
        DiagnosticSignWarn = { fg = "#fabd2f", bg = "#282828" },
        DiagnosticSignHint = { fg = "#8ec07c", bg = "#282828" },
        DiagnosticSignInfo = { fg = "#d3869b", bg = "#282828" },
      }
    })
    vim.cmd("colorscheme gruvbox")
  end,
}
```

### `comment.lua` 注释插件

强大的注释插件，通过 `<C-/>` 智能切换注释：

```lua
return {
  "numToStr/Comment.nvim",
  event = { "BufReadPre", "BufNewFile" },
  dependencies = {
    "JoosepAlviste/nvim-ts-context-commentstring",
  },
  config = function()
    -- import comment plugin safely
    local comment = require("Comment")

    local ts_context_commentstring = require("ts_context_commentstring.integrations.comment_nvim")

    -- enable comment
    comment.setup({
      --Add a space b/w comment and the line
      padding = true,
      ---Whether the cursor should stay at its position
      sticky = true,
      ---Lines to be ignored while (un)comment
      ignore = nil,
      ---Function to call before (un)comment
      pre_hook = ts_context_commentstring.create_pre_hook(), -- for commenting tsx and jsx files
      mappings = {
        ---Operator-pending mapping; `gcc` `gbc` `gc[count]{motion}` `gb[count]{motion}`
        basic = false,
        ---Extra mapping; `gco`, `gcO`, `gcA`
        extra = false,
      },
    })
  end,
}
```

### `copilot.lua` 集成 AI

集成 GitHub Copilot，提供 AI 代码建议：

```lua
return {
  "github/copilot.vim",
  init = function()
    vim.g.copilot_enabled = false -- Set Copilot to be disabled by default
  end,
}
```

### `gitsigns.lua` Git 状态集成

在行号列显示 Git 状态（新增、修改、删除）：

```lua
return {
  "lewis6991/gitsigns.nvim",
  event = { "BufReadPre", "BufNewFile" },
  config = function()
    require("gitsigns").setup({
      signs = {
        add = { text = "▎" },
        change = { text = "▎" },
        delete = { text = "▎" },
        topdelete = { text = "▎" },
        changedelete = { text = "▎" },
        untracked    = { text = "┆" },
      },
      signcolumn = true, -- Toggle with `:Gitsigns toggle_signs`
      numhl = false, -- Toggle with `:Gitsigns toggle_numhl`
      linehl = false, -- Toggle with `:Gitsigns toggle_linehl`
      word_diff = false, -- Toggle with `:Gitsigns toggle_word_diff`
      watch_gitdir = {
        interval = 1000,
        follow_files = true,
      },
      attach_to_untracked = true,
      current_line_blame = false, -- Toggle with `:Gitsigns toggle_current_line_blame`
      current_line_blame_opts = {
        virt_text = true,
        virt_text_pos = "eol", -- 'eol' | 'overlay' | 'right_align'
        delay = 1000,
        ignore_whitespace = false,
      },
      sign_priority = 6,
      update_debounce = 100,
      status_formatter = nil, -- Use default
      max_file_length = 40000,
      preview_config = {
        -- Options passed to nvim_open_win
        border = "single",
        style = "minimal",
        relative = "cursor",
        row = 0,
        col = 1,
      },
    })
  end
}
```

### `im-select.lua` 自动切换输入法

 自动切换中英输入法：

```lua
return {
    "keaising/im-select.nvim",
    config = function()
        require("im_select").setup({})
    end,
}
```

### `indent-blankline.lua` 显示缩进参考线

显示缩进参考线，使代码结构更清晰：

```lua
return {
  "lukas-reineke/indent-blankline.nvim",
  version = "*",
  event = { "BufReadPre", "BufNewFile" },
  config = function()
    require("ibl").setup({
      indent = {
        char = "│",
        tab_char = "│",
        highlight = "IblIndent",
        smart_indent_cap = true,
        priority = 1,
        repeat_linebreak = true,
      },
      scope = {
        enabled = true,
        char = nil,
        show_start = false,
        show_end = false,
        show_exact_scope = false,
        injected_languages = true,
        highlight = "IblScope",
        priority = 1024,
        include = {
          node_type = { ["*"] = { "*" } }, -- makes lines show on all blocks
        },
      },
      exclude = {
        filetypes = {
          "help",
          "alpha",
          "dashboard",
          "NvimTree",
          "Trouble",
          "trouble",
          "lazy",
          "mason",
          "notify",
          "toggleterm",
          "lspinfo",
          "checkhealth",
          "man",
          "gitcommit",
          "TelescopePrompt",
          "TelescopeResults",
          "",
        },
        buftypes = {
          "terminal",
          "nofile",
          "quickfix",
          "prompt",
        },
      },
    })
  end
```

### `local-highlight.lua` 自动高亮

自动高亮光标下的所有相同单词：

```lua
return {
  'tzachar/local-highlight.nvim',
  config = function()
    require('local-highlight').setup({
      -- file_types = {'python', 'cpp'}, -- If this is given only attach to this
      -- OR attach to every filetype except:
      disable_file_types = {},
      hlgroup = 'Pmenu', -- change highlight color to value given in table found by running :highlight
      cw_hlgroup = nil,
      insert_mode = false,
      animate = {
        enabled = false,
      },
    })
  end
}
```

### `lualine.lua` 丰富状态栏

配置一个功能丰富的状态栏，显示模式、Git 分支、诊断信息、文件名等：

```lua
return {
  "nvim-lualine/lualine.nvim",
  dependencies = { "nvim-tree/nvim-web-devicons" },
  config = function()
    require('lualine').setup({
      options = {
        icons_enabled = true,
        theme = 'gruvbox',
        component_separators = { left = '', right = ''},
        section_separators = { left = '', right = ''},
        disabled_filetypes = {
          statusline = {},
          winbar = {},
        },
        ignore_focus = {},
        always_divide_middle = true,
        globalstatus = false,
        refresh = {
          statusline = 1000,
          tabline = 1000,
          winbar = 1000,
        }
      },
      sections = {
        lualine_a = {'mode'},
        lualine_b = {'branch', 'diff', 'diagnostics'},
        lualine_c = {'filename'},
        lualine_x = {'encoding', 'fileformat', 'filetype'},
        lualine_y = {'progress'},
        lualine_z = {'location'}
      },
      inactive_sections = {
        lualine_a = {},
        lualine_b = {},
        lualine_c = {'filename'},
        lualine_x = {'location'},
        lualine_y = {},
      lualine_z = {}
      },
      tabline = {},
      winbar = {},
      inactive_winbar = {},
      extensions = {}
    })
  end,
}
```

### `luasnip.lua` 代码段引擎

一个支持自定义代码段和引入网络代码段的引擎：

```lua
return {
  "L3MON4D3/LuaSnip",
  -- follow latest release
  version = "v2.*", -- Replace <CurrentMajor> by the latest released major (first number of latest release)
  config = function()
    local ls = require("luasnip")

    ls.config.set_config({ -- Setting LuaSnip config
      enable_autosnippets = true, -- Enable autotriggered snippets
      store_selection_keys = "<Tab>", -- Use Tab (or some other key if you prefer) to trigger visual selection
      update_events = "TextChanged, TextChangedI", -- Update text when type
    })

    local nvim_config_path = vim.fn.stdpath("config") -- get neovim configuration path
    -- Lazy-load snippets, i.e. only load when required, e.g. for a given filetype
    require("luasnip.loaders.from_lua").lazy_load({
      paths = nvim_config_path .. "/snippets"
    })

    -- vim.keymap.set({"i"}, "<C-E>", function() ls.expand() end, {silent = true})
    vim.keymap.set({"i", "s"}, "<Tab>", function() ls.jump( 1) end, {silent = true})
    vim.keymap.set({"i", "s"}, "<S-Tab>", function() ls.jump(-1) end, {silent = true})

    -- vim.keymap.set({"i", "s"}, "<C-W>", function()
    --   if ls.choice_active() then
    --     ls.change_choice(1)
    --   end
    -- end, {silent = true})
  end,
}
```

### `nvim-tree.lua` 文件浏览侧边栏

一个高性能的文件浏览器侧边栏，替代了默认的 `netrw`：

```lua
return {
  "nvim-tree/nvim-tree.lua",
  cmd = {"NvimTreeToggle", "NvimTreeFocus"},
  dependencies = { "nvim-tree/nvim-web-devicons" },
  config = function()
    local nvimtree = require("nvim-tree")

    -- recommended settings from nvim-tree documentation
    vim.g.loaded_netrw = 1
    vim.g.loaded_netrwPlugin = 1

    local function on_attach(bufnr)
      local api = require('nvim-tree.api')

      local function opts(desc)
        return { desc = 'nvim-tree: ' .. desc, buffer = bufnr, noremap = true, silent = true, nowait = true }
      end

      -- custom mappings
      local keymap = vim.keymap -- for conciseness
      keymap.set('n', '<CR>', api.node.open.tab, opts('Open'))
      keymap.set('n', '<S-M>', api.node.show_info_popup, opts('Info'))
      keymap.set('n', 'h', api.node.navigate.parent_close, opts('Close Directory'))
      keymap.set('n', 'l', api.node.open.edit, opts('Open'))
      keymap.set('n', 'J', api.node.navigate.sibling.last, opts('Last Sibling'))
      keymap.set('n', 'K', api.node.navigate.sibling.first, opts('First Sibling'))
      keymap.set('n', '-', api.tree.change_root_to_parent, opts('Up'))
      keymap.set('n', 'a', api.fs.create, opts('Create'))
      keymap.set('n', 'y', api.fs.copy.node, opts('Copy'))
      keymap.set('n', 'd', api.fs.remove, opts('Delete'))
      keymap.set('n', 'D', api.fs.trash, opts('Trash'))
      keymap.set('n', '?', api.tree.toggle_help, opts('Help'))
      keymap.set('n', 'H', api.tree.toggle_hidden_filter, opts('Toggle Dotfiles'))
      keymap.set('n', 'p', api.fs.paste, opts('Paste'))
      keymap.set('n', 'O', api.node.navigate.parent, opts('Parent Directory'))
      keymap.set('n', 'q', api.tree.close, opts('Close'))
      keymap.set('n', 'r', api.fs.rename, opts('Rename'))
      keymap.set('n', 'R', api.tree.reload, opts('Refresh'))
      keymap.set('n', 'o', api.node.run.system, opts('System Open'))
      keymap.set('n', 's', api.tree.search_node, opts('Search'))
      keymap.set('n', 'v', api.node.open.vertical, opts('Vertical Split'))
      keymap.set('n', 'x', api.fs.cut, opts('Cut'))
      keymap.set('n', '<2-LeftMouse>', api.node.open.edit, opts('Open'))
    end

    -- configure nvim-tree
    nvimtree.setup({
      on_attach = on_attach,
      actions = {
        open_file = {
          quit_on_open = true,
          eject = true,
          resize_window = true,
          window_picker = {
            enable = true,
            picker = "default",
            chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890",
            exclude = {
              filetype = { "notify", "packer", "qf", "diff", "fugitive", "fugitiveblame" },
              buftype = { "nofile", "terminal", "help" },
            },
          },
        },
        change_dir = {
          enable = false,
          global = false,
          restrict_above_cwd = false,
        },
        use_system_clipboard = true,
        expand_all = {
          max_folder_discovery = 300,
          exclude = {},
        },
        file_popup = {
          open_win_config = {
            col = 1,
            row = 1,
            relative = "cursor",
            border = "shadow",
            style = "minimal",
          },
        },
        remove_file = {
          close_window = true,
        },
      },
      git = {
        enable = true,
        show_on_dirs = true,
        -- show_on_open_dirs = true,
        disable_for_dirs = {},
        timeout = 500,
        cygwin_support = false,
      },
      filters = {
        git_ignored = false,
        dotfiles = false,
        git_clean = false,
        no_buffer = false,
        no_bookmark = false,
        -- custom = { ".git" },
        -- custom = { ".DS_Store" },
        exclude = {},
      },
      update_focused_file = {
        enable = true,
        update_root = true,
        ignore_list = {},
        update_cwd = true,
      },
      renderer = {
        add_trailing = false,
        group_empty = false,
        full_name = false,
        root_folder_label = ":t",
        indent_width = 2,
        special_files = {},
        symlink_destination = true,
        highlight_git = false,
        highlight_diagnostics = false,
        highlight_opened_files = "none",
        highlight_modified = "none",
        highlight_bookmarks = "none",
        highlight_clipboard = "name",
        indent_markers = {
          enable = false,
          inline_arrows = true,
          icons = {
            corner = "└",
            edge = "│",
            item = "│",
            bottom = "─",
            none = " ",
          },
        },
        icons = {
          web_devicons = {
            file = {
              enable = true,
              color = true,
            },
            folder = {
              enable = false,
              color = true,
            },
          },
          git_placement = "before",
          modified_placement = "after",
          diagnostics_placement = "signcolumn",
          bookmarks_placement = "signcolumn",
          padding = " ",
          symlink_arrow = " ➛ ",
          show = {
            file = true,
            folder = true,
            folder_arrow = true,
            git = true,
            modified = true,
            diagnostics = true,
            bookmarks = false,
          },
          glyphs = {
            default = "",
            -- toml = "󰰤", -- Change this to the desired icon for TOML files
            symlink = "",
            bookmark = "󰆤",
            modified = "●",
            folder = {
              arrow_closed = "",
              arrow_open = "",
              default = "",
              open = "",
              empty = "",
              empty_open = "",
              symlink = "",
              symlink_open = "",
            },
            git = {
              unstaged = "➜",
              staged = "✓",
              unmerged = "",
              renamed = "➜",
              untracked = "★",
              deleted = "✗",
              -- deleted = "",
              ignored = "◌",
            },
          },
        },
      },
      diagnostics = {
        enable = true,
        show_on_dirs = true,
        show_on_open_dirs = true,
        debounce_delay = 50,
        severity = {
          min = vim.diagnostic.severity.HINT,
          max = vim.diagnostic.severity.ERROR,
        },
        icons = {
          hint = "",
          info = "",
          warning = "",
          error = "",
        },
      },
      hijack_cursor = false,
      auto_reload_on_write = true,
      disable_netrw = false,
      hijack_netrw = true,
      hijack_unnamed_buffer_when_opening = false,
      root_dirs = {},
      prefer_startup_root = false,
      sync_root_with_cwd = false,
      reload_on_bufenter = false,
      respect_buf_cwd = false,
      select_prompts = false,
      sort = {
        sorter = "name",
        folders_first = true,
        files_first = false,
      },
      view = {
        centralize_selection = false,
        cursorline = true,
        debounce_delay = 15,
        side = "left",
        preserve_window_proportions = false,
        number = false,
        relativenumber = false,
        signcolumn = "yes",
        width = 30,
        float = {
          enable = false,
          quit_on_focus_loss = true,
          open_win_config = {
            relative = "editor",
            border = "rounded",
            width = 30,
            height = 30,
            row = 1,
            col = 1,
          },
        },
      },
      hijack_directories = {
        enable = true,
        auto_open = true,
      },
      system_open = {
        cmd = "",
        args = {},
      },
      modified = {
        enable = false,
        show_on_dirs = true,
        show_on_open_dirs = true,
      },
      live_filter = {
        prefix = "[FILTER]: ",
        always_show_folders = true,
      },
      filesystem_watchers = {
        enable = true,
        debounce_delay = 50,
        ignore_dirs = {},
      },
      trash = {
        cmd = "gio trash",
      },
      tab = {
        sync = {
          open = false,
          close = false,
          ignore = {},
        },
      },
      notify = {
        threshold = vim.log.levels.ERROR,
        absolute_path = true,
      },
      help = {
        sort_by = "key",
      },
      ui = {
        confirm = {
          remove = true,
          trash = true,
          default_yes = true,
        },
      },
      experimental = {},
      log = {
        enable = false,
        truncate = false,
        types = {
          all = false,
          config = false,
          copy_paste = false,
          dev = false,
          diagnostics = false,
          git = false,
          profile = false,
          watcher = false,
        },
      },
    })
  end
}
```

### `nvim-web-devicons.lua` UI 组件

为各种 UI 组件（如 nvim-tree, lualine）提供文件类型图标：

```lua
return {
  "nvim-tree/nvim-web-devicons",
  config = function()
    require("nvim-web-devicons").set_icon({
      gql = {
        icon = "",
        color = "#e535ab",
        cterm_color = "199",
        name = "GraphQL",
      },
    })
  end,
}
```

### `rainbow-delimiters.lua` 彩虹符号

为配对的符号（比如 `()`，`[]`，`{}`）的不同层级添加不同的颜色，方便区分：

```lua
return {
    "hiphish/rainbow-delimiters.nvim",
}
```

### `surround.lua` 环绕符号增强

方便地添加、修改和删除环绕符号，例如将 `hello` 变为 `"hello"`：

```lua
return {
  "kylechui/nvim-surround",
  event = { "BufReadPre", "BufNewFile" },
  version = "*", -- Use for stability; omit to use `main` branch for the latest features
  config = function()
    require("nvim-surround").setup({
      keymaps = {
        insert = false,
        insert_line = false,
        normal = false,
        normal_cur = false,
        normal_line = false,
        normal_cur_line = false,
        visual = "<S-s>", -- Press <S-s> and surround sign, like ( < " ' { [
        visual_line = false,
        delete = false,
        change = false,
      },
      aliases = {
        ["a"] = false,
        ["b"] = false,
        ["B"] = false,
        ["r"] = false,
        ["q"] = false,
        ["s"] = false,
      },
    })
  end
}
```

### `telescope.lua` 模糊搜索

一个高度可扩展的模糊搜索工具，用于快速查找文件、缓冲区、Git 提交、帮助文档等：

```lua
return {
  "nvim-telescope/telescope.nvim",
  branch = "0.1.x",
  dependencies = {
    "nvim-lua/plenary.nvim",
    "debugloop/telescope-undo.nvim",
    {
      "nvim-telescope/telescope-fzf-native.nvim",
      build = "make",
    },
    "nvim-tree/nvim-web-devicons",
  },
  config = function()
    local telescope = require("telescope")
    local actions = require("telescope.actions")

    telescope.setup({
      defaults = {
        path_display = { "truncate " },
        mappings = {
          i = {
            -- ["<C-n>"] = actions.cycle_history_next,
            -- ["<C-p>"] = actions.cycle_history_prev,

            ["<C-j>"] = actions.move_selection_next,
            ["<C-k>"] = actions.move_selection_previous,

            ["<C-c>"] = actions.close,

            ["<Down>"] = actions.move_selection_next,
            ["<Up>"] = actions.move_selection_previous,

            ["<CR>"] = actions.select_default,
            -- ["<C-x>"] = actions.select_horizontal,
            -- ["<C-v>"] = actions.select_vertical,
            -- ["<C-t>"] = actions.select_tab,

            ["<C-u>"] = actions.preview_scrolling_up,
            ["<C-d>"] = actions.preview_scrolling_down,

            ["<PageUp>"] = actions.results_scrolling_up,
            ["<PageDown>"] = actions.results_scrolling_down,

            ["<Tab>"] = actions.toggle_selection + actions.move_selection_worse,
            ["<S-Tab>"] = actions.toggle_selection + actions.move_selection_better,
            ["<C-q>"] = actions.send_to_qflist + actions.open_qflist,
            ["<M-q>"] = actions.send_selected_to_qflist + actions.open_qflist,
            -- ["<C-l>"] = actions.complete_tag,
            -- ["<C-_>"] = actions.which_key, -- keys from pressing <C-/>
          },
          n = {
            ["<esc>"] = actions.close,
            ["<CR>"] = actions.select_default,
            -- ["<C-x>"] = actions.select_horizontal,
            -- ["<C-v>"] = actions.select_vertical,
            -- ["<C-t>"] = actions.select_tab,

            ["<Tab>"] = actions.toggle_selection + actions.move_selection_worse,
            ["<S-Tab>"] = actions.toggle_selection + actions.move_selection_better,
            ["<C-q>"] = actions.send_to_qflist + actions.open_qflist,
            ["<M-q>"] = actions.send_selected_to_qflist + actions.open_qflist,

            ["j"] = actions.move_selection_next,
            ["k"] = actions.move_selection_previous,
            ["K"] = actions.move_to_top,
            -- ["M"] = actions.move_to_middle,
            ["J"] = actions.move_to_bottom,

            ["<Down>"] = actions.move_selection_next,
            ["<Up>"] = actions.move_selection_previous,
            ["gg"] = actions.move_to_top,
            ["G"] = actions.move_to_bottom,

            ["<C-u>"] = actions.preview_scrolling_up,
            ["<C-d>"] = actions.preview_scrolling_down,

            ["<PageUp>"] = actions.results_scrolling_up,
            ["<PageDown>"] = actions.results_scrolling_down,

            ["?"] = actions.which_key,
          },
        },
      },
      load_extension = {
        "fzf",
        "yank_history",
      },
      extensions = {
        undo = {
          mappings = {
            i = {
              ["<C-a>"] = require("telescope-undo.actions").yank_additions,
              ["<C-d>"] = require("telescope-undo.actions").yank_deletions,
              ["<C-u>"] = require("telescope-undo.actions").restore,
              -- ["<C-Y>"] = require("telescope-undo.actions").yank_deletions,
              -- ["<C-cr>"] = require("telescope-undo.actions").restore,
              -- alternative defaults, for users whose terminals do questionable things with modified <cr>
            },
            n = {
              ["y"] = require("telescope-undo.actions").yank_additions,
              ["Y"] = require("telescope-undo.actions").yank_deletions,
              ["u"] = require("telescope-undo.actions").restore,
            },
          },
        },
      },
    })
  end,
}
```

### `todo-comments.lua` 高亮代码注释

高亮代码中的 `TODO`，`WARNING`，`NOTE`，`HACK`，`PERF`，`FIX` 等特殊注释：

```lua
return {
    "folke/todo-comments.nvim",
    dependencies = { "nvim-lua/plenary.nvim" },
    opts = {
    }
}
```

### `treesitter.lua` 语法高亮

提供更快速、更精确的语法高亮和代码结构分析：

```lua
return {
  "nvim-treesitter/nvim-treesitter",
  event = { "BufReadPre", "BufNewFile" },
  build = ":TSUpdate",
  dependencies = {
    "JoosepAlviste/nvim-ts-context-commentstring",
    "windwp/nvim-ts-autotag",
  },
  config = function()
    require("nvim-treesitter.configs").setup({
      -- enable syntax highlighting
      highlight = {
        enable = true,
        disable = { "css", "latex", "markdown", "cls" }, -- list of language that will be disabled
      },
      -- enable indentation
      indent = { enable = true },
      -- enable autotagging (w/ nvim-ts-autotag plugin)
      autotag = {
        enable = false,
      },
      -- ensure these language parsers are installed
      ensure_installed = {
        "bash",
        "lua",
        "vim",
        "gitignore",
        "python",
        "c",
        "cpp",
        "bibtex",
        "vimdoc",
        -- "latex",
      },
      auto_install = true,
      ignore_install = { "latex" }, -- List of parsers to ignore installing
      autopairs = {
        enable = true,
      },
      -- indent = { enable = false, disable = { "latex", "python", "css" } },
      incremental_selection = {
        enable = true,
        keymaps = {
          init_selection = "<C-n>",
          node_incremental = "<C-n>",
          scope_incremental = false,
          node_decremental = "<C-p>",
        },
      },
    })

    -- enable nvim-ts-context-commentstring plugin for commenting tsx and jsx
    require("ts_context_commentstring").setup({})
  end,
}
```

### `vimtex.lua` $\LaTeX$ 集成

 为 LaTeX 提供了强大的支持，包括编译、预览、目录、语法高亮等：

```lua
return {
  "lervag/vimtex",
  ft = { "tex", "bib", "cls" }, -- 只在打开 .tex, .bib, .cls 文件时加载
  init = function()
    -- Indentation settings
    vim.g.vimtex_indent_enabled = false            -- Disable auto-indent from Vimtex
    vim.g.tex_indent_items = false                 -- Disable indent for enumerate
    vim.g.tex_indent_brace = false                 -- Disable brace indent

    -- Suppression settings
    vim.g.vimtex_quickfix_mode = 0                 -- Suppress quickfix on save/build

    -- Other settings
    vim.g.vimtex_mappings_enabled = false          -- Disable default mappings
    vim.g.tex_flavor = 'latex'                     -- Set file type for TeX files
  end,
}
```

### `which-key.lua` 编辑体验增强

当按下 `<leader>` 键后，弹窗提示所有可用的后续快捷键，同时定义了大量围绕文件、编译、Git 和 Telescope 的快捷键：

```lua
return {
  "folke/which-key.nvim",
  commit = '*',
  event = "VeryLazy",
  init = function()
    vim.o.timeout = true
    vim.o.timeoutlen = 200
  end,
  opts = {
    setup = {
      show_help = true,
      plugins = {
        presets = {
          operators = false,    -- adds help for operators like d, y, ... and registers them for motion / text object completion
          motions = false,      -- adds help for motions
          text_objects = false, -- help for text objects triggered after entering an operator
          windows = false,      -- default bindings on <c-w>
          nav = false,          -- misc bindings to work with windows
          z = false,            -- bindings for folds, spelling and others prefixed with z
          g = false,            -- bindings for prefixed with g
          marks = false,        -- shows a list of your marks on ' and `
          registers = false,    -- shows your registers on " in NORMAL or <C-r> in INSERT mode
          spelling = {
            enabled = false,    -- enabling this will show WhichKey when pressing z= to select spelling suggestions
            suggestions = 10,   -- how many suggestions should be shown in the list?
          },
          -- the presets plugin, adds help for a bunch of default keybindings in Neovim
          -- No actual key bindings are created
        },
      },
      key_labels = {
        -- override the label used to display some keys. It doesn't effect WK in any other way.
        -- For example:
        -- ["<space>"] = "SPC",
        -- ["<CR>"] = "RET",
        -- ["<tab>"] = "TAB",
      },
      -- triggers = "auto", -- automatically setup triggers
      triggers = { "<leader>" }, -- or specify a list manually
      -- add operators that will trigger motion and text object completion
      -- to enable native operators, set the preset / operators plugin above
      -- operators = { gc = "Comments" },
      icons = {
        breadcrumb = "»", -- symbol used in the command line area that shows your active key combo
        separator = "➜", -- symbol used between a key and it's label
        group = "+",      -- symbol prepended to a group
      },
      popup_mappings = {
        scroll_down = "<c-d>", -- binding to scroll down inside the popup
        scroll_up = "<c-u>",   -- binding to scroll up inside the popup
      },
      window = {
        border = "rounded",       -- none, single, double, shadow
        position = "bottom",      -- bottom, top
        margin = { 1, 0, 1, 0 },  -- extra window margin [top, right, bottom, left]
        padding = { 2, 2, 2, 2 }, -- extra window padding [top, right, bottom, left]
        winblend = 0,
        zindex = 1000,            -- positive value to position WhichKey above other floating windows.
      },
      layout = {
        height = { min = 4, max = 25 },                                             -- min and max height of the columns
        width = { min = 20, max = 50 },                                             -- min and max width of the columns
        spacing = 3,                                                                -- spacing between columns
        align = "left",                                                             -- align columns left, center or right
      },
      ignore_missing = true,                                                        -- enable this to hide mappings for which you didn't specify a label
      hidden = { "<silent>", "<cmd>", "<Cmd>", "<CR>", "call", "lua", "^:", "^ " }, -- hide mapping boilerplate
      triggers_nowait = {
      },
      triggers_blacklist = {
        -- list of mode / prefixes that should never be hooked by WhichKey
        -- this is mostly relevant for key maps that start with a native binding
        -- most people should not need to change this
        i = { "j", "k" },
        v = { "j", "k" },
      },
      -- disable the WhichKey popup for certain buf types and file types.
      -- Disabled by default for Telescope
      disable = {
        buftypes = {},
        filetypes = {},
      },
    },
    defaults = {
      buffer = nil,   -- Global mappings. Specify a buffer number for buffer local mappings
      silent = true,  -- use `silent` when creating keymaps
      noremap = true, -- use `noremap` when creating keymaps
      nowait = true,  -- use `nowait` when creating keymaps
      prefix = "<leader>",
      mode = { "n", "v" },
      d = { "<cmd>update! | bdelete!<CR>", "delete buffer" },
      e = { "<cmd>NvimTreeToggle<CR>", "explorer" },
      i = { "<cmd>VimtexTocOpen<CR>", "index" },
      k = {
        function()
          -- Initialize variables
          local filename = vim.fn.expand("%:p")       -- Complete file path
          local basename = vim.fn.expand("%:t:r")     -- File names without extensions
          local filetype = vim.bo.filetype            -- Current file type
          local deleted_files = {}
          local messages = {}

          -- Clean up the compiled products (c/cpp)
          if filetype == "c" or filetype == "cpp" then
            local targets = { ".exe", ".o" }
            for _, ext in ipairs(targets) do
              local file = basename .. ext
              local full_path = vim.fn.fnamemodify(filename, ":h") .. "\\" .. file
              if vim.fn.filereadable(full_path) == 1 then
                os.remove(full_path)
                table.insert(deleted_files, file)
              end
            end
          end

          -- Conditional execution of VimtexClean (LaTeX files only)
          if filetype == "tex" then
            vim.cmd("VimtexClean")  -- Clean up LaTeX auxiliary files
            table.insert(messages, "[LaTeX] already clean auxiliary files.")
          end

          -- Generate feedback information
          if #deleted_files > 0 then
            table.insert(messages, 1, "[Code] already clean compile files:\n" .. table.concat(deleted_files, "\n"))
          end
          if #messages == 0 then
            table.insert(messages, "[Code] no auxiliary file need to clean.")
          end

          -- Show notification
          vim.notify(table.concat(messages, "\n\n"), "info", {
            title = "Clean Auxiliary",
            timeout = 3000
          })
        end,
        "kill aux"
      },
      q = { "<cmd>wa! | qa!<CR>", "quit" },
      r = {
        function()
          local filename = vim.fn.expand("%:p")
          local basename = vim.fn.expand("%:t:r")
          local filetype = vim.bo.filetype
          local cmd = ""
          local quoted_filename = string.format('"%s"', filename) -- Handle paths containing Spaces

          -- Dynamically select operations based on file types
          if filetype == "tex" then
            -- LaTeX file: Triggers VimtexCompile compilation
            vim.cmd("VimtexCompile")
            return
          elseif filetype == "python" then
            cmd = "python " .. quoted_filename
          elseif filetype == "cpp" then
            local exe_name = basename .. ".exe"
            cmd = string.format("g++ %s -o %s && .\\%s", quoted_filename, exe_name, exe_name)
          elseif filetype == "c" then
            local exe_name = basename .. ".exe"
            cmd = string.format("gcc %s -o %s && .\\%s", quoted_filename, exe_name, exe_name)
          else
            vim.notify("unsupported file type: " .. filetype, "error", { title = "Run/Compile" })
            return
          end

          -- Execute the command and display the output
          local output = vim.fn.system(cmd)
          vim.api.nvim_echo({{output, "Normal"}}, false, {})
        end,
        "run code"
      },
      u = { "<cmd>Telescope undo<CR>", "undo history" },
      v = { "<cmd>VimtexView<CR>", "view" },
      w = { "<cmd>wa!<CR>", "write" },
      a = {
        name = "ACTIONS",
        c = { "<cmd>vert sb<CR>", "create split" },
        h = { "<cmd>LocalHighlightToggle<CR>", "local highlight toggle" },
        j = { "<cmd>clo<CR>", "drop split" },
        k = { "<cmd>clo<CR>", "kill split" },
        m = { "<cmd>on<CR>", "max split" },
        r = { "<cmd>VimtexErrors<CR>", "report errors" },
        w = { "<cmd>VimtexCountWords!<CR>", "word count" },
      },
      c = {
        name = "Copilot",
        d = {
          function()
            vim.cmd("Copilot disable")
            vim.notify("[Copilot] Copilot disabled", vim.log.levels.INFO, { title = "Copilot Status" })
          end,
          "disable Copilot"
        },
        e = {
          function()
            vim.cmd("Copilot enable")
            vim.notify("[Copilot] Copilot enabled", vim.log.levels.INFO, { title = "Copilot Status" })
          end,
          "enable Copilot"
        },
      },
      f = {
        name = "FIND",
        b = {
          "<cmd>lua require('telescope.builtin').buffers(require('telescope.themes').get_dropdown{previewer = false})<CR>",
          "buffers",
        },
        f = { "<cmd>Telescope live_grep theme=ivy<CR>", "project" },
        g = { "<cmd>Telescope git_commits<CR>", "git history" },
        h = { "<cmd>Telescope help_tags<CR>", "help" },
        k = { "<cmd>Telescope keymaps<CR>", "keymaps" },
        r = { "<cmd>Telescope registers<CR>", "registers" },
        w = { "<cmd>lua SearchWordUnderCursor()<CR>", "word" },
        r = { "<cmd>Telescope oldfiles<CR>", "recent" },
      },
      g = {
        name = "GIT",
        b = { "<cmd>Telescope git_branches<CR>", "checkout branch" },
        c = { "<cmd>Telescope git_commits<CR>", "commits" },
        d = { "<cmd>Gitsigns diffthis HEAD<CR>", "diff" },
        k = { "<cmd>Gitsigns prev_hunk<CR>", "prev hunk" },
        j = { "<cmd>Gitsigns next_hunk<CR>", "next hunk" },
        l = { "<cmd>Gitsigns blame_line<CR>", "line blame" },
        p = { "<cmd>Gitsigns preview_hunk<CR>", "preview hunk" },
        t = { "<cmd>Gitsigns toggle_current_line_blame<CR>", "toggle blame" },
      },
    },
  },
  config = function(_, opts)
    local wk = require("which-key")
    wk.setup(opts.setup)
    wk.register(opts.defaults)
  end,
}
```

## `snippets` 文件夹

文件夹中的每一个文件对应于一种文件后缀相应的代码段，比如要配置 `.tex` 文件相应的 Neovim 加载的代码段，就创建一个 `tex.lua` 文件，这个文件中相应的代码段只会在 Neovim 打开对应于 `.tex` 文件时起作用。如果要配置对应于所有的文件类型的文件，就是说如果要配置代码段对所有的文件都生效，则要把相应的代码段放在 `all.lua` 文件中（如果没有这个文件可以创建一个）。

> 对应的教程可以参考：
>
> - [Supercharged LaTeX using Vim/Neovim, VimTeX, and snippets | ejmastnak](https://ejmastnak.com/tutorials/vim-latex/intro/)
> - [How I'm able to take notes in mathematics lectures using LaTeX and Vim | Gilles Castel](https://castel.dev/post/lecture-notes-1/)

### `tex.lua` $LaTeX$ 配置文件

```lua
-- Summary: When `LS_SELECT_RAW` is populated with a visual selection, the function
-- returns an insert node whose initial text is set to the visual selection.
-- When `LS_SELECT_RAW` is empty, the function simply returns an empty insert node.
local get_visual = function(args, parent)
  if (#parent.snippet.env.LS_SELECT_RAW > 0) then
    return sn(nil, i(1, parent.snippet.env.LS_SELECT_RAW))
  else  -- If LS_SELECT_RAW is empty, return a blank insert node
    return sn(nil, i(1))
  end
end

-- Example: expanding a snippet on a new line only.
-- In a snippet file, first require the line_begin condition...
-- ...then add `condition=line_begin` to any snippet's context table:
local line_begin = require("luasnip.extras.expand_conditions").line_begin

-- Include this `in_mathzone` function at the start of a snippets file...
-- Then include `condition = in_mathzone` to any snippet you want to
-- expand only in math contexts.
local in_mathzone = function()
  -- The `in_mathzone` function requires the VimTeX plugin
  return vim.fn['vimtex#syntax#in_mathzone']() == 1
end

return {
--------------------------------------------------
-- Example: use of insert node placeholder text --
--------------------------------------------------
	s({ trig="hr", dscr="The hyperref package's href{}{} command (for url links)" },
	  fmta(
	    [[\href{<>}{<>}]],
	    {
	      i(1, "url"),
	      i(2, "display name"),
	    }
	  )
	),
--------------------------------------------------------
-- Example: italic font implementing visual selection --
--------------------------------------------------------
	s({ trig="tii", dscr="Expands 'tii' into LaTeX's textit{} command." },
	  fmta("\\textit{<>}",
	    {
	      d(1, get_visual),
	    }
	  )
	),
----------------------------------
-- A fun zero subscript snippet --
----------------------------------
	s({ trig='([%a%)%]%}])00', regTrig=true, wordTrig=false, snippetType="autosnippet" },
	  fmta(
	    "<>_{<>}",
	    {
	      f( function(_, snip) return snip.captures[1] end ),
	      t("0")
	    }
	  )
	),
-----------------------------------
-- Snippets for only in new line --
-----------------------------------
	-- HTML-like to insert directory hierarchy
	s({ trig="h1", snippetType="autosnippet", condition=line_begin },
	  fmta(
	    [[\section{<>}]],
	    { d(1, get_visual) }
	  )
	),

	s({ trig="h2", snippetType="autosnippet", condition=line_begin },
	  fmta(
	    [[\subsection{<>}]],
	    { d(1, get_visual) }
	  )
	),

	s({ trig="h3", snippetType="autosnippet", condition=line_begin },
	  fmta(
	    [[\section{<>}]],
	    { d(1, get_visual) }
	  )
	),

	-- Begin new environment
	s({ trig="env", dscr="A generic new environmennt", condition=line_begin },
	  fmta(
	    [[
	      \begin{<>}
	          <>
	      \end{<>}
	    ]],
	    {
	      i(1),
	      i(2),
	      rep(1),
	    }
	  )
	),
------------------------------------
-- Snippets for only in math mode --
------------------------------------
	-- Fraction
	s({ trig = "ff", snippetType="autosnippet", condition=in_mathzone },
	  fmta(
	    "\\frac{<>}{<>}",
	    {
	      i(1),
	      i(2),
	    }
	  )
	),

	-- Greek letter
	s({ trig=";a", snippetType="autosnippet", condition=in_mathzone },
	  {
	    t("\\alpha"),
	  }
	),
	s({ trig=";b", snippetType="autosnippet", condition=in_mathzone },
	  {
	    t("\\beta"),
	  }
	),
	s({ trig=";g", snippetType="autosnippet", condition=in_mathzone },
	  {
	    t("\\gamma"),
	  }
	),
}
```

