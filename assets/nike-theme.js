// Nike Theme JavaScript - Performance optimized and accessible

class NikeTheme {
  constructor() {
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.initMobileMenu();
    this.initScrollEffects();
    this.initProductInteractions();
    this.initLazyLoading();
    this.initAnimations();
  }

  setupEventListeners() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.header-mobile-menu-btn');
    const mobileMenu = document.querySelector('.header-mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
      mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        mobileMenu.classList.toggle('active');
      });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.header-nav') && mobileMenu) {
        mobileMenuBtn?.classList.remove('active');
        mobileMenu.classList.remove('active');
      }
    });

    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
      newsletterForm.addEventListener('submit', this.handleNewsletterSubmit.bind(this));
    }

    // Product quick view
    const quickViewBtns = document.querySelectorAll('.btn-quick-view');
    quickViewBtns.forEach(btn => {
      btn.addEventListener('click', this.handleQuickView.bind(this));
    });

    // Add to cart buttons
    const addToCartBtns = document.querySelectorAll('.btn-add-to-cart');
    addToCartBtns.forEach(btn => {
      btn.addEventListener('click', this.handleAddToCart.bind(this));
    });

    // Cart drawer toggle
    const cartToggle = document.querySelector('.cart-toggle');
    if (cartToggle) {
      cartToggle.addEventListener('click', () => {
        if (window.cartDrawer) {
          window.cartDrawer.open();
        }
      });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', this.handleSmoothScroll.bind(this));
    });
  }

  initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.header-mobile-menu-btn');
    const mobileMenu = document.querySelector('.header-mobile-menu');
    
    if (!mobileMenuBtn || !mobileMenu) return;

    // Close menu when clicking menu links
    const menuLinks = mobileMenu.querySelectorAll('a');
    menuLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenuBtn.classList.remove('active');
        mobileMenu.classList.remove('active');
      });
    });

    // Handle escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
        mobileMenuBtn.classList.remove('active');
        mobileMenu.classList.remove('active');
      }
    });
  }

  initScrollEffects() {
    const header = document.querySelector('.header');
    if (!header) return;

    let lastScrollTop = 0;
    const scrollThreshold = 100;

    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      // Add/remove scrolled class
      if (scrollTop > scrollThreshold) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }

      // Hide/show header on scroll
      if (scrollTop > lastScrollTop && scrollTop > scrollThreshold) {
        header.style.transform = 'translateY(-100%)';
      } else {
        header.style.transform = 'translateY(0)';
      }

      lastScrollTop = scrollTop;
    };

    // Throttle scroll events
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  initProductInteractions() {
    // Product card hover effects
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
      });
    });

    // Color swatch interactions
    const colorSwatches = document.querySelectorAll('.color-swatch');
    colorSwatches.forEach(swatch => {
      swatch.addEventListener('click', (e) => {
        e.preventDefault();
        const productCard = swatch.closest('.product-card');
        const productImage = productCard?.querySelector('.product-image');
        
        if (productImage) {
          // Simulate color change (in real implementation, this would change the image)
          productImage.style.filter = 'hue-rotate(45deg)';
          setTimeout(() => {
            productImage.style.filter = 'none';
          }, 300);
        }
      });
    });
  }

  initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy-loading');
          img.classList.add('loaded');
          observer.unobserve(img);
        }
      });
    });

    images.forEach(img => {
      img.classList.add('lazy-loading');
      imageObserver.observe(img);
    });
  }

  initAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.section-transition, .section-slide-in');
    animateElements.forEach(el => observer.observe(el));

    // Hero text animation
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
      const lines = heroTitle.querySelectorAll('.hero-title-line');
      lines.forEach((line, index) => {
        line.style.animationDelay = `${index * 0.2}s`;
      });
    }
  }

  handleNewsletterSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const email = form.querySelector('input[type="email"]').value;
    const submitBtn = form.querySelector('.form-submit');
    
    if (!email) return;

    // Show loading state
    submitBtn.innerHTML = '<div class="loading-spinner"></div>';
    submitBtn.disabled = true;

    // Simulate API call
    setTimeout(() => {
      // Show success message
      this.showNotification('Thank you for subscribing!', 'success');
      form.reset();
      
      // Reset button
      submitBtn.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M22 2L11 13"></path>
          <path d="M22 2L15 22L11 13L2 9L22 2Z"></path>
        </svg>
      `;
      submitBtn.disabled = false;
    }, 1500);
  }

  handleQuickView(e) {
    e.preventDefault();
    const productId = e.target.dataset.productId;
    
    // In a real implementation, this would open a modal with product details
    this.showNotification('Quick view coming soon!', 'info');
  }

  handleAddToCart(e) {
    e.preventDefault();
    const btn = e.target;
    const originalText = btn.textContent;
    
    // Show loading state
    btn.textContent = 'Adding...';
    btn.disabled = true;
    
    // Simulate add to cart
    setTimeout(() => {
      this.showNotification('Added to cart!', 'success');
      btn.textContent = originalText;
      btn.disabled = false;
      
      // Update cart count
      this.updateCartCount();
    }, 1000);
  }

  handleSmoothScroll(e) {
    e.preventDefault();
    const targetId = e.target.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      const offsetTop = targetElement.offsetTop - 70; // Account for fixed header
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  }

  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    Object.assign(notification.style, {
      position: 'fixed',
      top: '20px',
      right: '20px',
      padding: '15px 25px',
      borderRadius: '8px',
      color: 'white',
      fontWeight: '500',
      zIndex: '9999',
      transform: 'translateX(100%)',
      transition: 'transform 0.3s ease'
    });

    // Set background color based on type
    const colors = {
      success: '#4caf50',
      error: '#f44336',
      info: '#2196f3'
    };
    notification.style.backgroundColor = colors[type] || colors.info;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 100);

    // Remove after 3 seconds
    setTimeout(() => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 3000);
  }

  updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
      const currentCount = parseInt(cartCount.textContent) || 0;
      cartCount.textContent = currentCount + 1;
      
      // Add animation
      cartCount.style.transform = 'scale(1.2)';
      setTimeout(() => {
        cartCount.style.transform = 'scale(1)';
      }, 200);
    }
  }

  // Utility methods
  debounce(func, wait) {
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

  throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }
}

// Initialize theme when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new NikeTheme();
});

// Handle page visibility for performance
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    // Pause animations when tab is not visible
    document.body.style.animationPlayState = 'paused';
  } else {
    // Resume animations when tab is visible
    document.body.style.animationPlayState = 'running';
  }
});

// Service Worker registration for PWA capabilities
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('SW registered: ', registration);
      })
      .catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}