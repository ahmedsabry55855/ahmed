// تأثير التمرير
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// قائمة الموبايل
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');

menuToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
});

// إغلاق القائمة عند النقر على أي رابط
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
    });
});

// إغلاق القائمة عند النقر خارجها
document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && !menuToggle.contains(e.target)) {
        nav.classList.remove('active');
    }
});

// تأثير الظهور عند التمرير
const observerOptions = {
    threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}, observerOptions);

document.querySelector('.about-section').classList.add('scroll-reveal');
observer.observe(document.querySelector('.about-section'));

// تهيئة EmailJS
emailjs.init("nHUEhlDfO53l85hN9");

// استماع لحدث تقديم النموذج
document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault();

    // إظهار حالة التحميل
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'جاري الإرسال...';
    submitBtn.disabled = true;

    // إرسال البريد الإلكتروني
    emailjs.sendForm(
        'service_h4c0src',
        'template_1ubeg9n',
        this
    )
        .then(() => {
            // نجاح الإرسال
            submitBtn.textContent = 'تم الإرسال بنجاح!';
            submitBtn.style.backgroundColor = '#27ae60';
            
            // إعادة تعيين النموذج
            this.reset();
            
            // إعادة زر الإرسال إلى حالته الأصلية بعد 3 ثواني
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.style.backgroundColor = '';
                submitBtn.disabled = false;
            }, 3000);
        })
        .catch((error) => {
            // فشل الإرسال
            console.error('خطأ:', error);
            submitBtn.textContent = 'حدث خطأ!';
            submitBtn.style.backgroundColor = '#e74c3c';
            
            // إعادة زر الإرسال إلى حالته الأصلية بعد 3 ثواني
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.style.backgroundColor = '';
                submitBtn.disabled = false;
            }, 3000);
        });
}); 