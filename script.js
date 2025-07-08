// モバイルメニューのトグル
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.querySelector('.nav-menu');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// スムーズスクロール
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // モバイルメニューを閉じる
            navMenu.classList.remove('active');
        }
    });
});

// 商品カードのアニメーション
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '0';
            entry.target.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                entry.target.style.transition = 'all 0.6s ease';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, 100);
            
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// 商品カードを監視
document.querySelectorAll('.product-card').forEach(card => {
    observer.observe(card);
});

// サービスアイテムも監視
document.querySelectorAll('.service-item').forEach(item => {
    observer.observe(item);
});

// フォーム送信処理
const contactForm = document.querySelector('.contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // フォームデータを取得
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    // 簡単なバリデーション
    if (name && email && message) {
        // 送信成功のメッセージ（実際の送信処理はここに実装）
        alert(`お問い合わせありがとうございます！\n\nお名前: ${name}\nメール: ${email}\n\n折り返しご連絡させていただきます。`);
        
        // フォームをリセット
        contactForm.reset();
    }
});

// ヘッダーのスクロール効果
let lastScroll = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(255, 107, 107, 0.3)';
    }
    
    lastScroll = currentScroll;
});

// 花びらのアニメーション効果を追加
function createPetal() {
    const petal = document.createElement('div');
    petal.innerHTML = '🌸';
    petal.style.position = 'fixed';
    petal.style.left = Math.random() * window.innerWidth + 'px';
    petal.style.top = '-50px';
    petal.style.fontSize = Math.random() * 20 + 20 + 'px';
    petal.style.opacity = '0.7';
    petal.style.pointerEvents = 'none';
    petal.style.zIndex = '999';
    
    document.body.appendChild(petal);
    
    // 落下アニメーション
    let position = -50;
    let rotation = 0;
    const speed = Math.random() * 2 + 1;
    const rotationSpeed = Math.random() * 4 - 2;
    
    const fall = setInterval(() => {
        position += speed;
        rotation += rotationSpeed;
        petal.style.top = position + 'px';
        petal.style.transform = `rotate(${rotation}deg)`;
        
        if (position > window.innerHeight) {
            clearInterval(fall);
            petal.remove();
        }
    }, 20);
}

// 5秒ごとに花びらを生成
setInterval(createPetal, 5000);

// ページ読み込み時にも花びらを生成
window.addEventListener('load', () => {
    setTimeout(createPetal, 1000);
});