// SCRIPT.JS - CẬP NHẬT LẠI

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
  
  function playSoundForHalfSecond() {
    // Phát âm thanh
    glitchSound.currentTime = 0;
    glitchSound.play().catch(e => {
      // Bỏ qua lỗi autoplay
    });
    
    // Dừng sau 0.5 giây
    setTimeout(() => {
      glitchSound.pause();
      glitchSound.currentTime = 0; // Reset về đầu
    }, 300);
  }

  function triggerGlitch(element) {
    // Phát âm thanh
    glitchSound.currentTime = 0;
    glitchSound.play().catch(e => {
      // Bỏ qua lỗi, user sẽ tự click
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
  
  // 4. KÍCH HOẠT KHI USER CLICK (vẫn cần)
  document.addEventListener('click', function() {
    // Chỉ cần click 1 lần là unlock audio
    console.log("✅ Âm thanh đã sẵn sàng");
  });

  // ========== XỬ LÝ ACTIVE MENU ==========
  
  // Lấy trang hiện tại
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  
  // Chỉ xử lý active menu nếu là trang chủ
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
        
        // Nếu section đang ở trong viewport
        if (sectionTop <= window.innerHeight * 0.3 && 
            sectionTop + sectionHeight >= window.innerHeight * 0.3) {
          currentActive = sectionId;
        }
      });
      
      // Cập nhật active class
      menuLinks.forEach(link => {
        const section = link.getAttribute('data-section');
        link.classList.remove('active');
        
        if (section === currentActive) {
          link.classList.add('active');
        }
      });
    }
    
    // Gọi khi scroll
    window.addEventListener('scroll', updateActiveMenuOnScroll);
    // Gọi khi load trang
    setTimeout(updateActiveMenuOnScroll, 100);
    
  } else {
    // Các trang khác - KHÔNG xử lý scroll, chỉ set active dựa trên trang hiện tại
    const menuLinks = document.querySelectorAll('.menu-link');
    
    // Xóa tất cả active class trước
    menuLinks.forEach(link => link.classList.remove('active'));
    
    // Thêm active class dựa trên trang hiện tại
    if (currentPage === 'ftc.html') {
      const ftcLink = document.querySelector('.menu-link[href="ftc.html"]');
      if (ftcLink) ftcLink.classList.add('active');
      
    } else if (currentPage === 'resources.html' || 
               currentPage === 'mechanical.html' || 
               currentPage === 'programming.html' || 
               currentPage === 'article-example.html') {
      // Các trang resources
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
      // Nếu đang trong animation, không làm gì
      if (isAnimating) return;
      isAnimating = true;
      
      const direction = index > currentSlide ? 'next' : 'prev';
      const oldSlide = currentSlide;
      
      // Cập nhật current slide
      currentSlide = (index + slides.length) % slides.length;
      
      // Xóa tất cả class trước
      slides.forEach(slide => {
        slide.classList.remove('active', 'prev', 'next');
      });
      
      // Đặt slide cũ ở vị trí đi ra
      slides[oldSlide].classList.add(direction === 'next' ? 'prev' : 'next');
      
      // Đặt slide mới ở vị trí đi vào
      slides[currentSlide].classList.add('active', direction === 'next' ? 'next' : 'prev');
      
      // Update indicators
      indicators.forEach(indicator => indicator.classList.remove('active'));
      indicators[currentSlide].classList.add('active');
      
      // Reset animation state sau khi transition kết thúc
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
    
    // Event listeners
    if (prevBtn) {
      prevBtn.addEventListener('click', prevSlide);
    }
    
    if (nextBtn) {
      nextBtn.addEventListener('click', nextSlide);
    }
    
    if (indicators.length > 0) {
      indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
          if (index !== currentSlide && !isAnimating) {
            showSlide(index);
          }
        });
      });
    }
    
    // Auto slide mỗi 5 giây
    let slideInterval;
    if (slides.length > 1) {
      slideInterval = setInterval(nextSlide, 5000);
    }
    
    // Dừng khi hover
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
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
    });
    
    // SWIPE SUPPORT CHO MOBILE
    function initSwipe() {
      const container = document.querySelector('.slides-container');
      if (!container) return;
      
      let startX = 0;
      let endX = 0;
      const minSwipeDistance = 50;
      
      // Touch events
      container.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
      });
      
      container.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX;
        const distance = startX - endX;
        
        if (Math.abs(distance) > minSwipeDistance) {
          if (distance > 0) {
            nextSlide(); // Swipe trái -> next
          } else {
            prevSlide(); // Swipe phải -> prev
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
    
    // Số lượng bông tuyết
    const snowflakeCount = 80;
    
    // Tạo bông tuyết
    for (let i = 0; i < snowflakeCount; i++) {
      createSnowflake(container);
    }
    
    function createSnowflake(parent) {
      const snowflake = document.createElement('div');
      snowflake.className = 'snowflake';
      
      // Kích thước ngẫu nhiên
      const size = Math.random() * 5 + 2; // 2px - 7px
      snowflake.style.width = `${size}px`;
      snowflake.style.height = `${size}px`;
      
      // Vị trí bắt đầu ngẫu nhiên
      snowflake.style.left = `${Math.random() * 100}vw`;
      snowflake.style.top = `-10px`;
      
      // Tốc độ rơi
      const fallSpeed = Math.random() * 3 + 1; // 1 - 4 giây
      const swaySpeed = Math.random() * 5 + 2; // 2 - 7 giây
      const swayDistance = Math.random() * 50 + 20; // 20px - 70px
      
      // Thêm vào container
      parent.appendChild(snowflake);
      
      // Animation rơi
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
      
      // Khi animation kết thúc, reset và chạy lại
      animation.onfinish = () => {
        snowflake.style.left = `${Math.random() * 100}vw`;
        snowflake.style.top = `-10px`;
        animation.play();
      };
    }
  }
  
  // Gọi hàm khi trang load xong
  setTimeout(createSnowEffect, 1000);
  
  // Tắt/bật tuyết khi cần
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
          // Add animation classes
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
      // Add click to show details on mobile
      card.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
          const hoverCard = this.querySelector('.member-hover-card');
          if (hoverCard) {
            const isVisible = hoverCard.style.opacity === '1';
            
            // Close all other hover cards
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
      
      // Handle hover delay for better UX
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
    
    // Close hover cards when clicking outside
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
});
// XỬ LÝ ACTIVE MENU - CẬP NHẬT LẠI
document.addEventListener('DOMContentLoaded', function() {
  // ... (giữ các phần khác của script.js) ...
  
  // ========== XỬ LÝ ACTIVE MENU ==========
  
  // Lấy trang hiện tại
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  
  // Lấy tất cả menu links
  const menuLinks = document.querySelectorAll('.menu-link');
  
  // Xóa tất cả active class trước
  menuLinks.forEach(link => link.classList.remove('active'));
  
  // Thêm active class dựa trên trang hiện tại
  if (currentPage === 'index.html' || currentPage === '') {
    // Trang chủ - sẽ xử lý bằng scroll (giữ code cũ)
    // ... (giữ phần xử lý scroll) ...
    
  } else if (currentPage === 'ftc.html') {
    const ftcLink = document.querySelector('.menu-link[href="ftc.html"]');
    if (ftcLink) ftcLink.classList.add('active');
    
  } else if (currentPage === 'resources.html' || 
             currentPage === 'mechanical.html' || 
             currentPage === 'programming.html' || 
             currentPage === 'article-example.html' ||
             currentPage === 'm1.html') { // THÊM m1.html vào đây
    // Các trang resources
    const resourcesLink = document.querySelector('.menu-link[href="resources.html"]');
    if (resourcesLink) resourcesLink.classList.add('active');
  }
  
  // ... (giữ các phần còn lại của script.js) ...
});
