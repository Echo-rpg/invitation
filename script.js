// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 创建漂浮爱心
    createFloatingHearts();
    
    // 添加动画效果
    const card = document.querySelector('.invitation-card');
    if (card) {
        card.classList.add('fade-in');
        
        // 鼠标移动时添加3D视差效果
        card.addEventListener('mousemove', function(e) {
            const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
            card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
        });
        
        // 鼠标离开时恢复
        card.addEventListener('mouseleave', function() {
            card.style.transform = 'rotateY(0deg) rotateX(0deg)';
        });
    }
    
    // 菜单项添加渐入效果
    const menuItems = document.querySelectorAll('.menu-preview li');
    menuItems.forEach((item, index) => {
        setTimeout(() => {
            item.classList.add('appear');
        }, 500 + (index * 200));
    });
    
    // 为装饰元素添加移动效果
    const decorations = document.querySelectorAll('.decoration');
    decorations.forEach(decoration => {
        setInterval(() => {
            const x = Math.random() * 10 - 5;
            const y = Math.random() * 10 - 5;
            decoration.style.transform = `translate(${x}px, ${y}px)`;
        }, 3000);
    });
    
    // 为高亮文本添加特效
    const highlights = document.querySelectorAll('.highlight');
    highlights.forEach(highlight => {
        highlight.addEventListener('mouseover', () => {
            highlight.style.transition = 'all 0.3s ease';
            highlight.style.color = '#ff6b81';
            const before = window.getComputedStyle(highlight, '::before');
            if (before) {
                highlight.style.setProperty('--highlight-color', 'rgba(255, 107, 129, 0.5)');
            }
        });
        
        highlight.addEventListener('mouseout', () => {
            highlight.style.color = '#e23e57';
            highlight.style.setProperty('--highlight-color', 'rgba(255, 154, 158, 0.3)');
        });
    });
});

// 添加页面过渡效果
const links = document.querySelectorAll('a:not([href^="mailto:"])');
links.forEach(link => {
    link.addEventListener('click', function(e) {
        if (this.getAttribute('href').startsWith('#')) return;
        
        e.preventDefault();
        const href = this.getAttribute('href');
        
        document.body.classList.add('fade-out');
        
        setTimeout(() => {
            window.location.href = href;
        }, 500);
    });
});

// 创建漂浮爱心效果
function createFloatingHearts() {
    const container = document.getElementById('heartContainer');
    if (!container) return;
    
    const heartCount = 15;
    
    for (let i = 0; i < heartCount; i++) {
        createHeart(container);
    }
    
    // 每隔几秒创建新的爱心
    setInterval(() => {
        createHeart(container);
    }, 3000);
}

function createHeart(container) {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    
    // 随机位置
    const startPositionX = Math.random() * 100; // %
    heart.style.left = startPositionX + 'vw';
    heart.style.bottom = '-20px';
    
    // 随机大小
    const size = Math.random() * 15 + 10;
    heart.style.width = size + 'px';
    heart.style.height = size + 'px';
    
    // 随机动画时长
    const animationDuration = Math.random() * 10 + 10;
    heart.style.animationDuration = animationDuration + 's';
    
    container.appendChild(heart);
    
    // 动画结束后移除元素
    setTimeout(() => {
        heart.remove();
    }, animationDuration * 1000);
} 