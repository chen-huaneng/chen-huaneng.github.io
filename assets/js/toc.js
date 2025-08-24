document.addEventListener('DOMContentLoaded', function() {
  // 获取所有带ID的标题元素和对应的目录项
  const headings = document.querySelectorAll('h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]');
  const tocItems = document.querySelectorAll('.toc-item');
  const tocLists = document.querySelectorAll('.toc-list');
  
  // 防抖函数：优化滚动性能，避免频繁触发
  function debounce(func, wait = 100) {
    let timeout;
    return function(...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  }
  
  // 更新目录状态：高亮当前章节并展开对应层级
  function updateToc() {
    const scrollPosition = window.scrollY + 100; // 偏移量，提前触发高亮
    let currentId = '';
    
    // 找到当前可见区域内的标题（最靠上的可见标题）
    headings.forEach(heading => {
      const headingTop = heading.offsetTop;
      if (scrollPosition >= headingTop) {
        currentId = heading.getAttribute('id');
      }
    });
    
    // 重置所有目录项状态
    tocItems.forEach(item => {
      item.classList.remove('active');
      // 隐藏所有子列表（准备按需展开）
      const subList = item.querySelector('.toc-list');
      if (subList) {
        subList.style.display = 'none';
      }
    });
    
    // 高亮当前章节并展开父级目录
    if (currentId) {
      const activeItem = document.querySelector(`.toc-item[data-target="${currentId}"]`);
      if (activeItem) {
        activeItem.classList.add('active');
        
        // 展开所有父级列表
        let parent = activeItem.parentElement;
        while (parent && parent.classList.contains('toc-list')) {
          parent.style.display = 'block';
          parent = parent.parentElement.parentElement; // 上两级（li -> ul）
        }
        
        // 展开当前项的直接子列表
        const subList = activeItem.querySelector('.toc-list');
        if (subList) {
          subList.style.display = 'block';
        }
      }
    }
  }
  
  // 初始加载时更新一次目录
  updateToc();
  
  // 监听滚动事件，更新目录状态（用防抖优化）
  window.addEventListener('scroll', debounce(updateToc));
  
  // 点击目录项时平滑滚动到对应标题
  document.querySelectorAll('.toc-link').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80, // 偏移量（避免被导航栏遮挡）
          behavior: 'smooth'
        });
      }
    });
  });
});