// SCRIPT.JS - HỆ THỐNG COMMENT ĐA TRANG

document.addEventListener('DOMContentLoaded', function() {
  // 1. Ẩn splash screen
  setTimeout(function() {
    const splash = document.querySelector('.splash-screen');
    if (splash) {
      splash.classList.add('hidden');
      setTimeout(function() {
        splash.remove();
      }, 500);
    }
  }, 2000);
  
  // 2. TẠO ÂM THANH
  const glitchSound = new Audio('audio/Am_thanh_tieng_Dien_giat_dong_Dien-www_tiengdong_com.mp3');
  glitchSound.volume = 0.3;
  
  // 3. GẮN SỰ KIỆN HOVER CHO CHỮ
  const heroTitle = document.querySelector('.hero-content h1');
  const heroSubtitle = document.querySelector('.hero-content p');
  
  function triggerGlitch(element) {
    // Phát âm thanh
    glitchSound.currentTime = 0;
    glitchSound.play().catch(e => {
      // Bỏ qua lỗi autoplay
    });
    
    // Hiệu ứng glitch
    element.style.animation = 'simpleGlitch 0.3s';
    setTimeout(() => {
      element.style.animation = '';
    }, 300);
  }
  
  if (heroTitle) {
    heroTitle.addEventListener('mouseenter', function() {
      triggerGlitch(this);
    });
  }
  
  if (heroSubtitle) {
    heroSubtitle.addEventListener('mouseenter', function() {
      triggerGlitch(this);
    });
  }
  
  // 4. KÍCH HOẠT KHI USER CLICK
  document.addEventListener('click', function() {
    console.log("✅ Âm thanh đã sẵn sàng");
  });

  // ========== XỬ LÝ ACTIVE MENU ==========
  
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  
  if (currentPage === 'index.html' || currentPage === '') {
    // Xử lý scroll cho trang chủ
    const sections = {
      about: document.getElementById('about'),
      events: document.getElementById('events')
    };
    
    const menuLinks = document.querySelectorAll('.menu-link');
    
    function updateActiveMenuOnScroll() {
      let currentActive = '';
      
      Object.entries(sections).forEach(([sectionId, section]) => {
        if (!section) return;
        
        const rect = section.getBoundingClientRect();
        const sectionTop = rect.top;
        const sectionHeight = rect.height;
        
        if (sectionTop <= window.innerHeight * 0.3 && 
            sectionTop + sectionHeight >= window.innerHeight * 0.3) {
          currentActive = sectionId;
        }
      });
      
      menuLinks.forEach(link => {
        const section = link.getAttribute('data-section');
        link.classList.remove('active');
        
        if (section === currentActive) {
          link.classList.add('active');
        }
      });
    }
    
    window.addEventListener('scroll', updateActiveMenuOnScroll);
    setTimeout(updateActiveMenuOnScroll, 100);
    
  } else {
    // Các trang khác
    const menuLinks = document.querySelectorAll('.menu-link');
    
    menuLinks.forEach(link => link.classList.remove('active'));
    
    if (currentPage === 'ftc.html') {
      const ftcLink = document.querySelector('.menu-link[href="ftc.html"]');
      if (ftcLink) ftcLink.classList.add('active');
      
    } else if (currentPage === 'resources.html' || 
               currentPage === 'mechanical.html' || 
               currentPage === 'programming.html' || 
               currentPage === 'business.html' || 
               currentPage === 'article-example.html' ||
               currentPage === 'm1.html' ||
               currentPage === 'b1.html' ||
               currentPage === 'b2.html' ||
               currentPage === 'b3.html' ||
               currentPage === 'b4.html' ||
               currentPage === 'm2.html' ||
               currentPage === 'm3.html' ||
               currentPage === 'm4.html' ||
               currentPage === 'm5.html' ||
               currentPage === 'm6.html' ||
               currentPage === 'm7.html' ||
               currentPage === 'p2.html' ||
               currentPage === 'p3.html' ||
               currentPage === 'p4.html' ||
               currentPage === 'p1.html') {
      const resourcesLink = document.querySelector('.menu-link[href="resources.html"]');
      if (resourcesLink) resourcesLink.classList.add('active');
    }
  }
  
  // ========== SLIDER ==========
  
  const slides = document.querySelectorAll('.event-slide');
  const indicators = document.querySelectorAll('.indicator');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  
  if (slides.length > 0) {
    let currentSlide = 0;
    let isAnimating = false;
    
    function showSlide(index) {
      if (isAnimating) return;
      isAnimating = true;
      
      const direction = index > currentSlide ? 'next' : 'prev';
      const oldSlide = currentSlide;
      
      currentSlide = (index + slides.length) % slides.length;
      
      slides.forEach(slide => {
        slide.classList.remove('active', 'prev', 'next');
      });
      
      slides[oldSlide].classList.add(direction === 'next' ? 'prev' : 'next');
      slides[currentSlide].classList.add('active', direction === 'next' ? 'next' : 'prev');
      
      indicators.forEach(indicator => indicator.classList.remove('active'));
      indicators[currentSlide].classList.add('active');
      
      setTimeout(() => {
        slides[oldSlide].classList.remove('prev', 'next');
        slides[currentSlide].classList.remove('prev', 'next');
        isAnimating = false;
      }, 600);
    }
    
    function nextSlide() {
      showSlide(currentSlide + 1);
    }
    
    function prevSlide() {
      showSlide(currentSlide - 1);
    }
    
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    
    if (indicators.length > 0) {
      indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
          if (index !== currentSlide && !isAnimating) {
            showSlide(index);
          }
        });
      });
    }
    
    let slideInterval;
    if (slides.length > 1) {
      slideInterval = setInterval(nextSlide, 5000);
    }
    
    const container = document.querySelector('.slides-container');
    if (container) {
      container.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
      });
      
      container.addEventListener('mouseleave', () => {
        if (slides.length > 1) {
          slideInterval = setInterval(nextSlide, 5000);
        }
      });
    }
    
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
    });
    
    // SWIPE SUPPORT
    function initSwipe() {
      const container = document.querySelector('.slides-container');
      if (!container) return;
      
      let startX = 0;
      let endX = 0;
      const minSwipeDistance = 50;
      
      container.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
      });
      
      container.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX;
        const distance = startX - endX;
        
        if (Math.abs(distance) > minSwipeDistance) {
          if (distance > 0) {
            nextSlide();
          } else {
            prevSlide();
          }
        }
      });
    }
    
    initSwipe();
  }
  
  // ========== HIỆU ỨNG TUYẾT RƠI ==========
  
  function createSnowEffect() {
    const container = document.getElementById('snow-container');
    if (!container) return;
    
    const snowflakeCount = 80;
    
    for (let i = 0; i < snowflakeCount; i++) {
      createSnowflake(container);
    }
    
    function createSnowflake(parent) {
      const snowflake = document.createElement('div');
      snowflake.className = 'snowflake';
      
      const size = Math.random() * 5 + 2;
      snowflake.style.width = `${size}px`;
      snowflake.style.height = `${size}px`;
      snowflake.style.left = `${Math.random() * 100}vw`;
      snowflake.style.top = `-10px`;
      
      const fallSpeed = Math.random() * 3 + 1;
      const swayDistance = Math.random() * 50 + 20;
      
      parent.appendChild(snowflake);
      
      const animation = snowflake.animate([
        { 
          transform: 'translate(0, 0) rotate(0deg)',
          opacity: 0.8 
        },
        { 
          transform: `translate(${swayDistance}px, 100vh) rotate(${Math.random() * 360}deg)`,
          opacity: 0 
        }
      ], {
        duration: fallSpeed * 1000,
        easing: 'linear'
      });
      
      animation.onfinish = () => {
        snowflake.style.left = `${Math.random() * 100}vw`;
        snowflake.style.top = `-10px`;
        animation.play();
      };
    }
  }
  
  setTimeout(createSnowEffect, 1000);
  
  window.toggleSnow = function() {
    const container = document.getElementById('snow-container');
    if (container) {
      container.style.display = container.style.display === 'none' ? 'block' : 'none';
    }
  };
  
  // ========== TEAM ANIMATIONS ==========
  
  function initTeamAnimations() {
    const teamSection = document.querySelector('.team-section');
    if (!teamSection) return;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const stats = document.querySelectorAll('.stat-item');
          const cards = document.querySelectorAll('.department-card');
          
          stats.forEach((stat, index) => {
            setTimeout(() => {
              stat.style.opacity = '1';
              stat.style.transform = 'translateY(0)';
            }, index * 100);
          });
          
          cards.forEach((card, index) => {
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, index * 150 + 300);
          });
        }
      });
    }, { threshold: 0.2 });
    
    observer.observe(teamSection);
  }
  
  initTeamAnimations();
  
  // ========== TEAM MEMBERS HOVER ==========
  
  function initTeamMembers() {
    const memberCards = document.querySelectorAll('.member-card');
    
    memberCards.forEach(card => {
      card.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
          const hoverCard = this.querySelector('.member-hover-card');
          if (hoverCard) {
            const isVisible = hoverCard.style.opacity === '1';
            
            document.querySelectorAll('.member-hover-card').forEach(hc => {
              hc.style.opacity = '0';
              hc.style.visibility = 'hidden';
            });
            
            if (!isVisible) {
              hoverCard.style.opacity = '1';
              hoverCard.style.visibility = 'visible';
              hoverCard.style.transform = 'translateX(-50%) scale(1)';
            }
          }
        }
      });
      
      let hoverTimeout;
      card.addEventListener('mouseenter', function() {
        if (window.innerWidth > 768) {
          hoverTimeout = setTimeout(() => {
            const hoverCard = this.querySelector('.member-hover-card');
            if (hoverCard) {
              hoverCard.style.opacity = '1';
              hoverCard.style.visibility = 'visible';
              hoverCard.style.transform = 'translateX(-50%) scale(1)';
            }
          }, 200);
        }
      });
      
      card.addEventListener('mouseleave', function() {
        clearTimeout(hoverTimeout);
        const hoverCard = this.querySelector('.member-hover-card');
        if (hoverCard) {
          hoverCard.style.opacity = '0';
          hoverCard.style.visibility = 'hidden';
          hoverCard.style.transform = 'translateX(-50%) scale(0.95)';
        }
      });
    });
    
    document.addEventListener('click', function(e) {
      if (!e.target.closest('.member-card') && window.innerWidth <= 768) {
        document.querySelectorAll('.member-hover-card').forEach(hc => {
          hc.style.opacity = '0';
          hc.style.visibility = 'hidden';
        });
      }
    });
  }
  
  initTeamMembers();
  
  // ========== KHỞI TẠO HỆ THỐNG COMMENT ==========
  
  initCommentSystem();
});

// ========== HỆ THỐNG COMMENT ĐA TRANG ==========

function initCommentSystem() {
  const commentForm = document.getElementById('commentForm');
  const commentsList = document.getElementById('commentsList');
  
  if (!commentForm || !commentsList) return;
  
  // Lấy ID trang hiện tại
  function getPageId() {
    const path = window.location.pathname;
    const pageName = path.split('/').pop().replace('.html', '') || 'index';
    return pageName; // Trả về tên trang: b1, m1, p1, etc.
  }
  
  const pageId = getPageId();
  console.log('📝 Comment System - Trang:', pageId);
  
  // Hàm tính thời gian
  function getTimeAgo(timestamp) {
    const now = Date.now();
    const diff = now - timestamp;
    
    const minutes = Math.floor(diff / (1000 * 60));
    if (minutes < 1) return 'Vừa xong';
    if (minutes < 60) return `${minutes} phút trước`;
    
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} giờ trước`;
    
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days} ngày trước`;
    
    const weeks = Math.floor(days / 7);
    if (weeks < 4) return `${weeks} tuần trước`;
    
    const months = Math.floor(days / 30);
    if (months < 12) return `${months} tháng trước`;
    
    return `${Math.floor(days / 365)} năm trước`;
  }
  
  // Tạo avatar
  function createAvatar(name) {
    if (!name) return '??';
    const words = name.split(' ');
    if (words.length >= 2) {
      return (words[0][0] + words[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  }
  
  // Màu avatar theo loại bài
  function getAvatarColor(pageType) {
    const colors = {
      b: 'linear-gradient(135deg, #ff66aa, #ff99cc)',      // Business - Hồng
      m: 'linear-gradient(135deg, #FF6B35, #FF8E53)',      // Mechanical - Cam
      p: 'linear-gradient(135deg, #4CAF50, #2196F3)',      // Programming - Xanh
      default: 'linear-gradient(135deg, #9C27B0, #673AB7)' // Mặc định - Tím
    };
    
    const firstChar = pageType.charAt(0).toLowerCase();
    return colors[firstChar] || colors.default;
  }
  
  // Tạo element comment
  function createCommentElement(comment) {
    const commentDiv = document.createElement('div');
    commentDiv.className = 'comment-item';
    commentDiv.dataset.id = comment.id;
    
    const avatarColor = getAvatarColor(comment.pageId);
    
    commentDiv.innerHTML = `
  <div class="comment-header">
    <div class="comment-avatar" style="background: ${avatarColor}">
      ${createAvatar(comment.name)}
    </div>
    <div class="comment-info">
      <span class="comment-author">${comment.name}</span>
      <span class="comment-time">${getTimeAgo(comment.timestamp)}</span>
    </div>
  </div>
  <div class="comment-content">${comment.text}</div>
`;
    
    return commentDiv;
  }
  
  // Tên loại bài
  function getPageTypeName(pageId) {
    const types = {
      'b': 'Business',
      'm': 'Mechanical', 
      'p': 'Programming',
      'b1': 'Business',
      'm1': 'Mechanical',
      'm2': 'Mechanical',
      'm3': 'Mechanical',
      'm4': 'Mechanical',
      'm5': 'Mechanical',
      'm6': 'Mechanical',
      'p1': 'Programming'
    };
    
    return types[pageId] || 'Bài viết';
  }
  
  // Lấy comments từ localStorage
  function getPageComments() {
    try {
      const allComments = JSON.parse(localStorage.getItem('ftc_comments')) || {};
      return allComments[pageId] || [];
    } catch (error) {
      console.error('Lỗi khi đọc comments:', error);
      return [];
    }
  }
  
  // Lưu comments
  function savePageComments(comments) {
    try {
      const allComments = JSON.parse(localStorage.getItem('ftc_comments')) || {};
      allComments[pageId] = comments;
      localStorage.setItem('ftc_comments', JSON.stringify(allComments));
      return true;
    } catch (error) {
      console.error('Lỗi khi lưu comments:', error);
      return false;
    }
  }
  
  // Hiển thị comments
  function displayComments() {
    const comments = getPageComments();
    const commentCount = document.querySelector('.comment-count');
    
    // Xóa comments cũ
    const existingComments = commentsList.querySelectorAll('.comment-item');
    existingComments.forEach(comment => comment.remove());
    
    // Sắp xếp mới nhất trước
    const sortedComments = [...comments].sort((a, b) => b.timestamp - a.timestamp);
    
    // Hiển thị comments
    if (sortedComments.length > 0) {
      sortedComments.forEach(comment => {
        const commentElement = createCommentElement(comment);
        commentsList.appendChild(commentElement);
      });
    }
    
    // Cập nhật số lượng
    if (commentCount) {
      commentCount.textContent = sortedComments.length;
    }
  }
  
  // Hiển thị thông báo
  function showToast(message, type = 'success') {
    const oldToast = document.querySelector('.toast-notification');
    if (oldToast) oldToast.remove();
    
    const toast = document.createElement('div');
    toast.className = `toast-notification toast-${type}`;
    toast.textContent = message;
    
    // Style cho toast
    Object.assign(toast.style, {
      position: 'fixed',
      top: '20px',
      right: '20px',
      padding: '12px 20px',
      borderRadius: '8px',
      background: type === 'success' ? '#4CAF50' : '#f44336',
      color: 'white',
      boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
      zIndex: '10000',
      animation: 'slideIn 0.3s ease',
      maxWidth: '300px',
      wordWrap: 'break-word'
    });
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.style.animation = 'slideOut 0.3s ease';
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 300);
    }, 3000);
  }
  
  // Thêm styles CSS
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideIn {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
      from { transform: translateX(0); opacity: 1; }
      to { transform: translateX(100%); opacity: 0; }
    }
    
    .comment-item {
      background: rgba(255, 255, 255, 0.05);
      border-radius: 10px;
      padding: 20px;
      margin-bottom: 20px;
      border: 1px solid rgba(255, 150, 200, 0.1);
      animation: fadeIn 0.3s ease;
    }
    
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    .comment-header {
      display: flex;
      align-items: center;
      margin-bottom: 15px;
    }
    
    .comment-avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: bold;
      margin-right: 12px;
      flex-shrink: 0;
    }
    
    .comment-info {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
    }
    
    .comment-author {
      font-weight: 600;
      color: #ff99cc;
      font-size: 1rem;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 10px;
    }
    
    .comment-time {
      color: #99e6ff;
      font-size: 0.85rem;
      opacity: 0.8;
    }
    
    .comment-page {
      font-size: 0.75rem;
      background: rgba(255, 255, 255, 0.1);
      padding: 2px 8px;
      border-radius: 10px;
      color: #ffccdd !important;
    }
    
    .comment-content {
      color: #ccf5ff;
      line-height: 1.6;
      white-space: pre-wrap;
      word-wrap: break-word;
    }
    
    .form-group {
      margin-bottom: 20px;
    }
    
    .form-group input,
    .form-group textarea {
      width: 100%;
      padding: 12px 15px;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 150, 200, 0.3);
      border-radius: 8px;
      color: white;
      font-size: 1rem;
      transition: border-color 0.3s ease;
    }
    
    .form-group input:focus,
    .form-group textarea:focus {
      outline: none;
      border-color: #ff66aa;
    }
    
    .form-group input::placeholder,
    .form-group textarea::placeholder {
      color: rgba(255, 255, 255, 0.5);
    }
    
    .submit-btn {
      background: linear-gradient(135deg, #ff66aa, #ff99cc);
      color: white;
      border: none;
      padding: 12px 30px;
      border-radius: 25px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    
    .submit-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(255, 102, 170, 0.3);
    }
  `;
  
  document.head.appendChild(style);
  
  // Xử lý submit form
  commentForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const nameInput = document.getElementById('commentName');
    const textInput = document.getElementById('commentText');
    
    if (!nameInput || !textInput) {
      console.error('Không tìm thấy input fields!');
      return;
    }
    
    const name = nameInput.value.trim();
    const text = textInput.value.trim();
    
    // Validation
    if (!name) {
      showToast('Vui lòng nhập tên của bạn!', 'error');
      nameInput.focus();
      return;
    }
    
    if (!text) {
      showToast('Vui lòng nhập nội dung bình luận!', 'error');
      textInput.focus();
      return;
    }
    
    if (name.length > 50) {
      showToast('Tên không được quá 50 ký tự!', 'error');
      nameInput.focus();
      return;
    }
    
    if (text.length > 500) {
      showToast('Nội dung không được quá 500 ký tự!', 'error');
      textInput.focus();
      return;
    }
    
    // Tạo comment mới
    const newComment = {
      id: 'comment_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
      name: name,
      text: text,
      timestamp: Date.now(),
      pageId: pageId,
      pageTitle: document.title
    };
    
    // Lấy comments hiện tại
    let comments = getPageComments();
    
    // Thêm vào đầu mảng
    comments.unshift(newComment);
    
    // Lưu vào localStorage
    const saved = savePageComments(comments);
    
    if (saved) {
      // Hiển thị ngay lập tức
      displayComments();
      
      // Reset form
      this.reset();
      
      // Hiển thị thông báo thành công
      showToast(' Đã đăng bình luận thành công!');
      
      // Auto-focus lại ô tên
      setTimeout(() => {
        nameInput.focus();
      }, 100);
    } else {
      showToast(' Có lỗi xảy ra khi gửi bình luận!', 'error');
    }
  });
  
  // Hiển thị comments khi load trang
  displayComments();
  
  // Nút xóa tất cả comments (chỉ trong dev)
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    const clearBtn = document.createElement('button');
    clearBtn.textContent = 'Xóa tất cả bình luận (DEV)';
    clearBtn.style.cssText = `
      position: fixed;
      bottom: 10px;
      right: 10px;
      background: #ff4444;
      color: white;
      border: none;
      padding: 8px 12px;
      border-radius: 5px;
      font-size: 12px;
      cursor: pointer;
      z-index: 9999;
      opacity: 0.5;
    `;
    
    clearBtn.addEventListener('click', function() {
      if (confirm('Xóa tất cả bình luận trên trang này?')) {
        localStorage.removeItem('ftc_comments');
        displayComments();
        showToast('Đã xóa tất cả bình luận!', 'success');
      }
    });
    
    document.body.appendChild(clearBtn);
  }
}
function getCommentTheme() {
  const currentPage = window.location.pathname.split('/').pop();
  if (currentPage.includes('b') || currentPage === 'business.html') {
    return 'business';
  } else if (currentPage.includes('m') || currentPage.includes('mechanical')) {
    return 'mechanical';
  } else if (currentPage.includes('p') || currentPage.includes('programming')) {
    return 'programming';
  } else if (currentPage.includes('e') || currentPage.includes('electronics')) {
    return 'electronics';
  }
  return 'business'; // default
}

// Trong hàm initCommentSystem, thêm:
const theme = getCommentTheme();
const commentSection = document.querySelector('.comment-section');
if (commentSection) {
  commentSection.classList.add(`comment-theme-${theme}`);
}