/**
 * PaperMod 目录（TOC）交互 —— 移植自 SuzuBlog 的 useTOCLogic / tocUtils
 *
 * 复刻的行为：
 *   1. 滚动时按「视口顶部 + 阈值」判定当前章节，高亮条目并让它保持在面板中央
 *   2. 页面顶部（< 150px）与底部（< 50px）附近淡出面板和悬浮按钮
 *   3. 移动端抽屉：按钮开合，点击外部 / 按 Esc / 点击目录条目后自动收起
 *   4. 平滑滚动交给 PaperMod 原有的锚点脚本，这里不重复接管，避免双层滚动
 *
 * 可调参数见下方常量；逻辑与 SuzuBlog 的 findClosestSlug / centerActiveLink 一致。
 */
(function () {
  'use strict'

  var panel = document.getElementById('toc-panel')
  var fab = document.getElementById('toc-fab')
  if (!panel || !fab) {
    return
  }

  // 把目录里的每个链接与正文中的标题对应起来
  var links = Array.prototype.slice.call(panel.querySelectorAll('a[href^="#"]'))
  var entries = []

  for (var i = 0; i < links.length; i++) {
    var link = links[i]
    var href = link.getAttribute('href') || ''
    if (href.length < 2) {
      continue
    }

    var id = href.slice(1)
    var target = document.getElementById(id)

    if (!target) {
      try {
        target = document.getElementById(decodeURIComponent(id))
      } catch (error) {
        target = null
      }
    }

    if (target) {
      entries.push({ link: link, target: target })
    }
  }

  if (!entries.length) {
    return
  }

  var OFFSET = 20 // 视口顶部保留的空白，与 CSS 的 scroll-margin-top 保持一致
  var TRIGGER = 150 // 章节进入「激活区」的距离，越大高亮切换越早
  var HIDE_TOP = 150 // 距页面顶部小于该值时隐藏目录，设为 -1 则常显
  var HIDE_BOTTOM = 50 // 距页面底部小于该值时隐藏目录，设为 -1 则常显

  var desktopQuery = window.matchMedia('(min-width: 1320px)')
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

  var activeLink = null
  var ticking = false

  function scrollBehavior() {
    return reducedMotion.matches ? 'auto' : 'smooth'
  }

  /** 让当前条目在目录面板内垂直居中（对应 SuzuBlog 的 centerActiveLink） */
  function centerActiveLink(link) {
    if (panel.scrollHeight <= panel.clientHeight) {
      return
    }

    var top = link.offsetTop - panel.clientHeight / 2 + link.offsetHeight / 2
    // 偏差太小时不做动画，避免来回抖动
    if (Math.abs(panel.scrollTop - top) < 10) {
      return
    }

    panel.scrollTo({ top: Math.max(top, 0), behavior: scrollBehavior() })
  }

  function setActive(link) {
    if (link === activeLink) {
      return
    }

    if (activeLink) {
      activeLink.classList.remove('is-active')
      activeLink.removeAttribute('aria-current')
    }

    activeLink = link
    if (!activeLink) {
      return
    }

    activeLink.classList.add('is-active')
    activeLink.setAttribute('aria-current', 'location')
    centerActiveLink(activeLink)
  }

  /** 找出最后一个已滚过激活线的标题（对应 SuzuBlog 的 findClosestSlug） */
  function updateActive() {
    var threshold = OFFSET + TRIGGER
    var current = null

    for (var i = 0; i < entries.length; i++) {
      if (entries[i].target.getBoundingClientRect().top <= threshold) {
        current = entries[i].link
      } else {
        break
      }
    }

    if (current) {
      setActive(current)
    }
  }

  function isDrawerOpen() {
    return panel.classList.contains('is-open')
  }

  function openDrawer() {
    panel.classList.add('is-open')
    fab.classList.add('is-open')
    fab.setAttribute('aria-expanded', 'true')
  }

  function closeDrawer() {
    if (!isDrawerOpen()) {
      return
    }

    panel.classList.remove('is-open')
    fab.classList.remove('is-open')
    fab.setAttribute('aria-expanded', 'false')
  }

  /** 顶部 / 底部附近淡出，复刻 SuzuBlog 的 isVisible = !isTop && !isBottom */
  function updateVisibility() {
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop
    var rest = document.documentElement.scrollHeight - window.innerHeight - scrollTop
    var visible = scrollTop > HIDE_TOP && rest > HIDE_BOTTOM

    panel.classList.toggle('is-visible', visible)
    fab.classList.toggle('is-visible', visible)

    if (!visible) {
      closeDrawer()
    }
  }

  function update() {
    updateVisibility()
    updateActive()
  }

  function onScroll() {
    if (ticking) {
      return
    }

    ticking = true
    window.requestAnimationFrame(function () {
      ticking = false
      update()
    })
  }

  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('load', onScroll)
  window.addEventListener('hashchange', onScroll)
  window.addEventListener('resize', function () {
    onScroll()
    if (desktopQuery.matches) {
      closeDrawer()
    }
  })

  // 悬浮按钮开合抽屉
  fab.addEventListener('click', function () {
    if (isDrawerOpen()) {
      closeDrawer()
    } else {
      openDrawer()
    }
  })

  // 点击面板外部收起抽屉
  document.addEventListener('click', function (event) {
    if (!isDrawerOpen()) {
      return
    }

    if (panel.contains(event.target) || fab.contains(event.target)) {
      return
    }

    closeDrawer()
  })

  // Esc 收起抽屉
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' || event.key === 'Esc') {
      closeDrawer()
    }
  })

  // 点击目录条目后收起抽屉（滚动本身由 PaperMod 的锚点脚本处理）
  panel.addEventListener('click', function (event) {
    var anchor = event.target.closest ? event.target.closest('a[href^="#"]') : null
    if (anchor && !desktopQuery.matches) {
      closeDrawer()
    }
  })

  update()
})()
