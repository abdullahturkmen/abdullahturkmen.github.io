
// fullpagejs start   
var myFullpage = new fullpage('#fullpage', {
    scrollOverflow: false,
    navigation: true,
    navigationPosition: 'right',
    scrollingSpeed: 600,
    easingcss3: 'ease-in-out',
    normalScrollElements: 'iframe',
    touchSensitivity: 15,
    keyboardScrolling: true,
    animateAnchor: false,
    recordHistory: false,
    afterRender: function(){
        setTimeout(() => {
            addIcons();
            setupIframeMouseHandling();
        }, 100);
    }
});

const addIcons = () => {
    // Çoklu deneme ile nav elementini bul
    let attempts = 0;
    const maxAttempts = 10;
    
    const tryAddIcons = () => {
        const fpNav = document.getElementById('fp-nav');
        
        if (fpNav && fpNav.querySelector('ul')) {
            const navItems = fpNav.querySelectorAll('li a');
            const icons = [
                'fas fa-tablet-alt', 'fas fa-credit-card', 'fas fa-images', 'fas fa-user-plus',
                'fas fa-brain', 'fas fa-rocket', 'fas fa-microphone', 'fas fa-clock',
                'fas fa-mouse-pointer', 'fas fa-circle', 'fas fa-city', 'fas fa-share-alt',
                'fas fa-cube', 'fas fa-exchange-alt', 'fas fa-file-alt', 'fas fa-globe'
            ];
            
            navItems.forEach((navItem, index) => {
                const icon = icons[index] || 'fas fa-circle';
                navItem.innerHTML = `<i class="${icon}"></i>`;
            });
            
            console.log('Icons added successfully!');
        } else if (attempts < maxAttempts) {
            attempts++;
            setTimeout(tryAddIcons, 200);
        }
    };
    
    tryAddIcons();
};


// Basit ve etkili iframe mouse handling
const setupIframeMouseHandling = () => {
    let isMouseOverIframe = false;
    
    // Her section için listener ekle
    document.querySelectorAll('.section').forEach((section, index) => {
        const iframe = section.querySelector('iframe');
        
        if (iframe) {
            // Mouse iframe üzerine geldiğinde
            iframe.addEventListener('mouseenter', () => {
                isMouseOverIframe = true;
                document.body.style.cursor = 'grab';
            });
            
            // Mouse iframe'den çıktığında
            iframe.addEventListener('mouseleave', () => {
                isMouseOverIframe = false;
                document.body.style.cursor = 'default';
            });
            
            // Section üzerinde wheel eventi
            section.addEventListener('wheel', (e) => {
                if (isMouseOverIframe) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    // Throttle ile fazla event'i engelle
                    clearTimeout(section.scrollTimeout);
                    section.scrollTimeout = setTimeout(() => {
                        if (e.deltaY > 0) {
                            myFullpage.moveSectionDown();
                        } else {
                            myFullpage.moveSectionUp();
                        }
                    }, 50);
                }
            }, { passive: false });
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        switch(e.key) {
            case 'ArrowDown':
            case 'PageDown':
                e.preventDefault();
                myFullpage.moveSectionDown();
                break;
            case 'ArrowUp':
            case 'PageUp':
                e.preventDefault();
                myFullpage.moveSectionUp();
                break;
        }
    });
};

// fullpagejs end  

// Floating Sidebar functionality
document.addEventListener('DOMContentLoaded', function() {
    const sidebar = document.getElementById('floating-sidebar');
    const toggle = document.querySelector('.sidebar-toggle');
    
    toggle.addEventListener('click', function() {
        sidebar.classList.toggle('active');
    });
    
    // Close sidebar when clicking outside
    document.addEventListener('click', function(event) {
        if (!sidebar.contains(event.target)) {
            sidebar.classList.remove('active');
        }
    });
    
    // Prevent sidebar from closing when clicking inside it
    sidebar.addEventListener('click', function(event) {
        event.stopPropagation();
    });
});
