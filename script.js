// SCRIPT.JS - ĐƠN GIẢN
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
});
// Thêm vào script.js, trong phần DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
  // ... phần ẩn splash screen hiện có ...
  
  // Sau khi splash screen ẩn, hiện corner element
  setTimeout(function() {
    const splash = document.querySelector('.splash-screen');
    if (splash) {
      splash.classList.add('hidden');
      
      // Sau khi splash ẩn, hiện corner element
      setTimeout(function() {
        const cornerElement = document.querySelector('.corner-element');
        if (cornerElement) {
          cornerElement.classList.add('visible');
          cornerElement.classList.add('large'); // Thêm class 'large' để to hơn
          // hoặc: cornerElement.classList.add('x-large'); // To nhất
        }
        
        // Xóa splash khỏi DOM
        setTimeout(function() {
          splash.remove();
        }, 500);
      }, 500); // Đợi splash fade out
    }
  }, 2000); // 2 giây splash screen
});
document.addEventListener('DOMContentLoaded', function() {
  const slides = document.querySelectorAll('.event-slide');
  const indicators = document.querySelectorAll('.indicator');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  
  let currentSlide = 0;
  
  function showSlide(index) {
    slides[currentSlide].classList.remove('active');
    indicators[currentSlide].classList.remove('active');
    
    currentSlide = (index + slides.length) % slides.length;
    
    slides[currentSlide].classList.add('active');
    indicators[currentSlide].classList.add('active');
  }
  
  function nextSlide() {
    showSlide(currentSlide + 1);
  }
  
  function prevSlide() {
    showSlide(currentSlide - 1);
  }
  
  prevBtn.addEventListener('click', prevSlide);
  nextBtn.addEventListener('click', nextSlide);
  
  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
      showSlide(index);
    });
  });
  
  // Auto slide mỗi 5 giây
  let slideInterval = setInterval(nextSlide, 5000);
  
  // Dừng khi hover
  const container = document.querySelector('.slides-container');
  container.addEventListener('mouseenter', () => {
    clearInterval(slideInterval);
  });
  
  container.addEventListener('mouseleave', () => {
    slideInterval = setInterval(nextSlide, 5000);
  });
  
  // Keyboard
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') prevSlide();
    if (e.key === 'ArrowRight') nextSlide();
  });
  
  showSlide(0);
});
