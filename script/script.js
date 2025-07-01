'use strict';

window.addEventListener('scroll', function() {
    // スクロール位置の取得
    const scrollY = window.scrollY || document.documentElement.scrollTop;

    // 各セクションの位置を取得
    const section1 = document.getElementById('section1').offsetTop;
    const section2 = document.getElementById('section2').offsetTop;
    const section3 = document.getElementById('section3').offsetTop;
    const section4 = document.getElementById('section4').offsetTop;
    const section5 = document.getElementById('section5').offsetTop;

    // 背景色と文字色の変更
    if (scrollY >= section1 && scrollY < section2) {
        document.body.style.backgroundColor = '#fff';
        document.body.style.color = 'gray';
    } else if (scrollY >= section2 && scrollY < section3) {
        document.body.style.backgroundColor = '#F7F3FF';
        document.body.style.color = '#53425a';
    } else if (scrollY >= section3 && scrollY < section4) {
        document.body.style.backgroundColor = '#ccf9ff';
        document.body.style.color = '#184448';
    } else if (scrollY >= section4 && scrollY < section5) {
        document.body.style.backgroundColor = '#ffefd5';
        document.body.style.color = '#8e3b14';
    } else if (scrollY >= section5) {
        document.body.style.backgroundColor = '#F0FFF0';
        document.body.style.color = '#333333';
    }
});


// スライダーメニュー

const track = document.getElementById("sliderTrack");
  const slides = document.querySelectorAll(".slide");
  const dotsContainer = document.getElementById("dotsContainer");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  const realSlideCount = 8;
  let currentIndex = 3; // クローンを含む実際の位置（最初の本物のindex）
  let autoSlideInterval;

  // ドット生成
  const dots = [];
  for (let i = 0; i < realSlideCount; i++) {
    const dot = document.createElement("span");
    dot.classList.add("dot");
    if (i === 0) dot.classList.add("active");
    dot.addEventListener("click", () => {
      currentIndex = i + 3; // クローン3枚分補正
      updateSlider();
      resetAutoSlide();
    });
    dotsContainer.appendChild(dot);
    dots.push(dot);
  }

  function getSlideOffset() {
    let GAP =0;
    if (window.matchMedia("(max-width: 768px)").matches) {
     GAP =20;
    }else{
     GAP = 40;
    }
    return slides[0].offsetWidth + GAP;
  }

  function updateSlider() {
    const offset = getSlideOffset();
    track.style.transition = 'transform 0.5s ease-in-out';
    track.style.transform = `translateX(-${offset * currentIndex}px)`;

    // ドット更新
    let dotIndex = (currentIndex - 3 + realSlideCount) % realSlideCount;
    dots.forEach(dot => dot.classList.remove("active"));
    dots[dotIndex].classList.add("active");
  }

  function nextSlide() {
    currentIndex++;
    updateSlider();

    // クローン1に達したら本物1へジャンプ
    if (currentIndex === slides.length - 3) {
      setTimeout(() => {
        track.style.transition = "none";
        currentIndex = 3;
        track.style.transform = `translateX(-${getSlideOffset() * currentIndex}px)`;
      }, 500);
    }
  }

  function prevSlide() {
    currentIndex--;
    updateSlider();

    // クローン最後に達したら本物最後へジャンプ
    if (currentIndex === 2) {
      setTimeout(() => {
        track.style.transition = "none";
        currentIndex = realSlideCount + 2; // 5 + 2 = 7
        track.style.transform = `translateX(-${getSlideOffset() * currentIndex}px)`;
      }, 500);
    }
  }

  nextBtn.addEventListener("click", () => {
    nextSlide();
    resetAutoSlide();
  });

  prevBtn.addEventListener("click", () => {
    prevSlide();
    resetAutoSlide();
  });

  function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
      nextSlide();
    }, 3000);
  }

  function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
  }

  window.addEventListener("load", () => {
    updateSlider();
    startAutoSlide();
  });

  const btn = document.getElementById('backToTop');
btn.addEventListener('click', () => {
  window.scrollTo({top: 0, behavior: 'smooth'}); // スムーズにスクロール
});
