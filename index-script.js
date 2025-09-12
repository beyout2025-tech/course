AOS.init({ 
  duration: 1200, 
  easing: "ease-in-out", 
  once: true 
});

let slideIndex = 0;
const testimonials = document.querySelectorAll('.testimonial');
const dotsContainer = document.querySelector('.slider-dots');

dotsContainer.innerHTML = '';
const maxDots = 10;
for (let i = 0; i < Math.min(testimonials.length, maxDots); i++) {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    dot.addEventListener('click', () => showSlide(i));
    dotsContainer.appendChild(dot);
}

const dots = document.querySelectorAll('.dot');

function showSlide(index) {
  if (index >= testimonials.length) {
    slideIndex = 0;
  } else if (index < 0) {
    slideIndex = testimonials.length - 1;
  } else {
    slideIndex = index;
  }
  
  testimonials.forEach(testimonial => testimonial.classList.remove('active'));
  dots.forEach(dot => dot.classList.remove('active'));
  
  testimonials[slideIndex].classList.add('active');
  
  dots[slideIndex % maxDots].classList.add('active');
}

function nextSlide() {
  showSlide(slideIndex + 1);
}

setInterval(nextSlide, 4000);

showSlide(0);

/* -------------------- إعدادات سلايدر الدورات (Swiper Course Slider) -------------------- */
var swiper = new Swiper(".mySwiper", {
  /* حل جذري: تم تغيير القيمة إلى 'auto' لعرض شريحة واحدة فقط وتجاهل أجزاء الشرائح الأخرى على الجوال */
  slidesPerView: 'auto',            
  spaceBetween: 10,             
  /* حل جذري: تم إزالة خاصية centeredSlides لمنع ظهور الشرائح جزئياً على الجوال */
  // centeredSlides: true,          
  loop: true,                    
  autoplay: {
    delay: 4000,                 
    disableOnInteraction: false, 
  },
  pagination: {
    el: ".swiper-pagination",    
    clickable: true,             
  },
  navigation: {
    nextEl: ".swiper-button-next", 
    prevEl: ".swiper-button-prev", 
  },
});
