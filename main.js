// 倪海厦网站 - 主要JavaScript功能

document.addEventListener('DOMContentLoaded', function() {
    // 初始化所有功能
    initNavigation();
    initAnimations();
    initScrollEffects();
    initSearchFunctionality();
    initCookieConsent();
    initAdBlockerDetection();
});

// 导航功能
function initNavigation() {
    const navLinks = document.querySelectorAll('nav a');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // 设置当前页面的导航高亮
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
        
        // 添加点击效果
        link.addEventListener('click', function(e) {
            // 移除所有active类
            navLinks.forEach(l => l.classList.remove('active'));
            // 添加当前active类
            this.classList.add('active');
        });
    });
    
    // 移动端菜单切换
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('nav ul');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            nav.classList.toggle('show');
            this.classList.toggle('active');
        });
    }
}

// 动画效果
function initAnimations() {
    // 页面加载动画
    const elements = document.querySelectorAll('.fade-in-up');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });
    
    // 卡片悬停效果
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// 滚动效果
function initScrollEffects() {
    let lastScrollTop = 0;
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // 头部透明度变化
        if (scrollTop > 100) {
            header.style.background = 'rgba(139, 69, 19, 0.95)';
        } else {
            header.style.background = 'linear-gradient(90deg, #8b4513 0%, #a0522d 50%, #8b4513 100%)';
        }
        
        // 滚动方向检测
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            // 向下滚动
            header.style.transform = 'translateY(-100%)';
        } else {
            // 向上滚动
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
}

// 搜索功能
function initSearchFunctionality() {
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const query = this.value.trim();
            
            if (query.length > 2) {
                performSearch(query);
            } else {
                hideSearchResults();
            }
        });
        
        // 点击外部关闭搜索结果
        document.addEventListener('click', function(e) {
            if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
                hideSearchResults();
            }
        });
    }
}

// 执行搜索
function performSearch(query) {
    // 这里可以添加实际的搜索逻辑
    // 目前只是示例
    const results = [
        { title: '倪海厦中医基础理论', type: '课程', url: 'courses.html#basic' },
        { title: '伤寒论讲解', type: '课程', url: 'courses.html#shanghan' },
        { title: '金匮要略', type: '资料', url: 'resources.html#jingui' }
    ].filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase())
    );
    
    displaySearchResults(results);
}

// 显示搜索结果
function displaySearchResults(results) {
    const searchResults = document.getElementById('search-results');
    
    if (!searchResults) return;
    
    if (results.length === 0) {
        searchResults.innerHTML = '<div class="no-results">未找到相关结果</div>';
    } else {
        const html = results.map(result => `
            <div class="search-result-item">
                <a href="${result.url}">
                    <span class="result-title">${result.title}</span>
                    <span class="result-type">${result.type}</span>
                </a>
            </div>
        `).join('');
        
        searchResults.innerHTML = html;
    }
    
    searchResults.style.display = 'block';
}

// 隐藏搜索结果
function hideSearchResults() {
    const searchResults = document.getElementById('search-results');
    if (searchResults) {
        searchResults.style.display = 'none';
    }
}

// 平滑滚动到锚点
function smoothScrollTo(target) {
    const element = document.querySelector(target);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// 返回顶部功能
function initBackToTop() {
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '↑';
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #8b4513, #a0522d);
        color: #f4e4bc;
        border: none;
        border-radius: 50%;
        font-size: 20px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 15px rgba(139, 69, 19, 0.3);
    `;
    
    document.body.appendChild(backToTopBtn);
    
    // 显示/隐藏按钮
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.visibility = 'visible';
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.visibility = 'hidden';
        }
    });
    
    // 点击返回顶部
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // 悬停效果
    backToTopBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
        this.style.boxShadow = '0 6px 20px rgba(139, 69, 19, 0.4)';
    });
    
    backToTopBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.boxShadow = '0 4px 15px rgba(139, 69, 19, 0.3)';
    });
}

// 页面加载完成后初始化返回顶部按钮
document.addEventListener('DOMContentLoaded', function() {
    initBackToTop();
});

// 工具函数：格式化日期
function formatDate(date) {
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    return new Date(date).toLocaleDateString('zh-CN', options);
}

// 工具函数：防抖
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Cookie同意功能
function initCookieConsent() {
    const cookieConsent = localStorage.getItem('cookieConsent');
    
    if (!cookieConsent) {
        const consentBanner = document.createElement('div');
        consentBanner.className = 'cookie-consent';
        consentBanner.innerHTML = `
            <div class="cookie-content">
                <p>本网站使用Cookie来改善用户体验和显示相关广告。继续使用网站即表示您同意我们的Cookie政策。</p>
                <div class="cookie-buttons">
                    <button class="btn btn-accept">同意</button>
                    <button class="btn btn-decline">拒绝</button>
                    <a href="privacy.html" class="btn btn-outline">了解更多</a>
                </div>
            </div>
        `;
        
        document.body.appendChild(consentBanner);
        
        // 添加样式
        const style = document.createElement('style');
        style.textContent = `
            .cookie-consent {
                position: fixed;
                bottom: 0;
                left: 0;
                right: 0;
                background: rgba(44, 24, 16, 0.95);
                color: #f4e4bc;
                padding: 20px;
                z-index: 10000;
                backdrop-filter: blur(10px);
            }
            .cookie-content {
                max-width: 1200px;
                margin: 0 auto;
                display: flex;
                justify-content: space-between;
                align-items: center;
                flex-wrap: wrap;
                gap: 20px;
            }
            .cookie-content p {
                margin: 0;
                flex: 1;
                min-width: 300px;
            }
            .cookie-buttons {
                display: flex;
                gap: 10px;
                flex-wrap: wrap;
            }
            .btn-accept {
                background: #4caf50;
                border-color: #4caf50;
            }
            .btn-decline {
                background: #f44336;
                border-color: #f44336;
            }
        `;
        document.head.appendChild(style);
        
        // 事件监听
        consentBanner.querySelector('.btn-accept').addEventListener('click', function() {
            localStorage.setItem('cookieConsent', 'accepted');
            consentBanner.remove();
        });
        
        consentBanner.querySelector('.btn-decline').addEventListener('click', function() {
            localStorage.setItem('cookieConsent', 'declined');
            consentBanner.remove();
        });
    }
}

// 广告拦截器检测
function initAdBlockerDetection() {
    setTimeout(function() {
        const testAd = document.createElement('div');
        testAd.className = 'adsbox';
        testAd.style.cssText = 'position: absolute; left: -10000px; top: -1000px; width: 1px; height: 1px;';
        document.body.appendChild(testAd);
        
        setTimeout(function() {
            const isAdBlockerActive = testAd.offsetHeight === 0;
            testAd.remove();
            
            if (isAdBlockerActive) {
                showAdBlockerMessage();
            }
        }, 100);
    }, 2000);
}

// 显示广告拦截器消息
function showAdBlockerMessage() {
    const message = document.createElement('div');
    message.className = 'ad-blocker-message';
    message.innerHTML = `
        <div class="message-content">
            <p>检测到您可能使用了广告拦截器。本网站通过广告收入来维持运营，如果您愿意，请考虑禁用广告拦截器以支持我们。</p>
            <button class="btn btn-outline" onclick="this.parentElement.parentElement.remove()">我知道了</button>
        </div>
    `;
    
    // 添加样式
    const style = document.createElement('style');
    style.textContent = `
        .ad-blocker-message {
            position: fixed;
            top: 20px;
            right: 20px;
            background: #fff;
            border: 2px solid #8b4513;
            border-radius: 10px;
            padding: 20px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
            z-index: 10000;
            max-width: 300px;
        }
        .message-content p {
            margin-bottom: 15px;
            color: #5d4037;
            font-size: 14px;
            line-height: 1.5;
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(message);
    
    // 5秒后自动消失
    setTimeout(function() {
        if (message.parentElement) {
            message.remove();
        }
    }, 5000);
}

// 导出函数供其他页面使用
window.NiHaiXiaWebsite = {
    smoothScrollTo,
    formatDate,
    debounce,
    initCookieConsent,
    initAdBlockerDetection
}; 