document.addEventListener('DOMContentLoaded', () => {
    
    // 1. ALERT BOX CHÀO MỪNG
    if (!sessionStorage.getItem('daChaoHoi')) {
        alert('Cảnh báo! Bạn đã bước vào vùng đất của Sinh viên IT chạy code bằng tâm linh. Nhấn OK để khám phá!');
        sessionStorage.setItem('daChaoHoi', 'true');
    }

    // 2. THANH TÍNH PHẦN TRĂM CUỘN TRANG
    const progressBar = document.getElementById('scroll-progress');
    window.addEventListener('scroll', () => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercentage = (scrollTop / scrollHeight) * 100;
        
        if (progressBar) {
            progressBar.style.width = scrollPercentage + '%';
        }
    });

    // 3. TÍNH NĂNG CHUYỂN SÁNG/TỐI
    const themeToggleBtn = document.getElementById('theme-toggle');
    
    // Kiểm tra cấu hình cũ
    if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', function() {
            if (document.documentElement.classList.contains('dark')) {
                document.documentElement.classList.remove('dark');
                localStorage.setItem('color-theme', 'light');
            } else {
                document.documentElement.classList.add('dark');
                localStorage.setItem('color-theme', 'dark');
            }
        });
    }

    // 4. ANIMATION KHI CUỘN TRANG
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));

    // 5. XỬ LÝ FORM LIÊN HỆ
    const pingForm = document.getElementById('pingForm');
    if (pingForm) {
        pingForm.addEventListener('submit', function(event) {
            event.preventDefault();
            alert("📡 [200 OK] Tín hiệu đã được mã hóa và định tuyến thành công tới Server của Tâm!\n\nTui sẽ check log và phản hồi lại sớm nhất có thể nhé!");
            pingForm.reset();
        });
    }
});