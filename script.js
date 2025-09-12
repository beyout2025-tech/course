AOS.init({ duration: 1000, easing: "ease-in-out", once: true });

// FIXED FAQ toggle
document.querySelectorAll('.faq-question').forEach(q => {
  q.addEventListener('click', () => {
    const answer = q.nextElementSibling;
    const isActive = q.classList.contains('active');

    // Close all other open answers
    document.querySelectorAll('.faq-question.active').forEach(openQ => {
      if (openQ !== q) {
        openQ.classList.remove('active');
        openQ.nextElementSibling.classList.remove('show');
      }
    });

    // Toggle current answer
    q.classList.toggle('active', !isActive);
    answer.classList.toggle('show', !isActive);
  });
});

// Sticky register button
const stickyBtn = document.querySelector('.sticky-register-btn');
window.addEventListener('scroll', ()=>{ stickyBtn.style.display = window.scrollY > 300 ? 'block' : 'none'; });

// Testimonials slider
const testimonials = document.querySelectorAll('.testimonial');
const dotsContainer = document.querySelector('.slider-dots');
let current = 0;
let interval = setInterval(nextSlide,4000);
function nextSlide(){
  testimonials[current].classList.remove('active');
  current = (current+1) % testimonials.length;
  testimonials[current].classList.add('active');
  updateDots();
}
function updateDots(){
  dotsContainer.innerHTML='';
  testimonials.forEach((_,i)=>{
    const dot = document.createElement('span');
    dot.classList.add('dot');
    if(i===current) dot.classList.add('active');
    dot.addEventListener('click',()=>{
      clearInterval(interval);
      testimonials[current].classList.remove('active');
      current=i;
      testimonials[current].classList.add('active');
      updateDots();
      interval=setInterval(nextSlide,4000);
    });
    dotsContainer.appendChild(dot);
  });
}
updateDots();

// Form submission to Google Sheets
const scriptURL = 'https://script.google.com/macros/s/AKfycbztWgyn56xZxcgj3S9TVLnR47CfEFluzCX8q-VDL3THa-NCZCBsyEm9Hk2UyjyV39DMuw/exec';
const form = document.forms['form'];
const submitButton = form.querySelector('button[type="submit"]');
const contactModal = document.getElementById('contactModal');
let formDataStored = {}; // Variable to store form data

function submitForm(e){
  e.preventDefault();
  
  // Create FormData object to collect data before processing
  const formData = new FormData(form);

  // Remove spaces from phone number input
  const phoneInput = form.querySelector('input[name="phone"]');
  formData.set('phone', phoneInput.value.replace(/\s/g, ''));

  // Store form data in the global variable before resetting the form
  for (let [key, value] of formData.entries()) {
      formDataStored[key] = value;
  }

  submitButton.disabled = true;
  submitButton.textContent = 'جاري الإرسال...';
  
  fetch(scriptURL, { method: 'POST', body: formData})
    .then(response => {
      // Show contact options after successful submission
      showContactOptions();
    })
    .catch(error => alert('حدث خطأ أثناء الإرسال. حاول مرة أخرى.'))
    .finally(() => {
      submitButton.disabled = false;
      submitButton.textContent = 'إرسال البيانات';
    });
}

function showContactOptions() {
  contactModal.style.display = 'flex';
  form.reset();
}

function generateWhatsAppMessage(data) {
  const course = document.title.replace(' - مؤسسة كن أنت', '').trim();

  return `السلام عليكم، تم التسجيل في دورة "${course}".
الاسم: ${data.name}
الجنس: ${data.gender}
العمر: ${data.age}
البلد: ${data.country}
رقم الهاتف: ${data.phone}
رابط التيليجرام: ${data.Telegram}
أرجو إتمام التسجيل في الدورة.`;
}

// Generate pre-filled WhatsApp message for normal WhatsApp
document.getElementById('whatsapp-btn').addEventListener('click', () => {
  const message = generateWhatsAppMessage(formDataStored);
  const encodedMessage = encodeURIComponent(message);
  const whatsappLink = `https://wa.me/967778185189?text=${encodedMessage}`;
  window.open(whatsappLink, '_blank');
});

// Generate pre-filled WhatsApp message for WhatsApp Business
document.getElementById('whatsapp-business-btn').addEventListener('click', () => {
  const message = generateWhatsAppMessage(formDataStored);
  const encodedMessage = encodeURIComponent(message);
  const whatsappLink = `https://wa.me/967778185189?text=${encodedMessage}`;
  window.open(whatsappLink, '_blank');
});

// تعبئة حقل اسم الدورة المخفي من عنوان الصفحة
document.addEventListener('DOMContentLoaded', () => {
    const pageTitle = document.title.replace(' - مؤسسة كن أنت', '').trim();
    document.getElementById('course-name-input').value = pageTitle;
});
