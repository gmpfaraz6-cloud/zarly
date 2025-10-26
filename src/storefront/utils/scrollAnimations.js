/**
 * Scroll Animation Utilities
 * Powered by Intersection Observer for butter-smooth performance
 */

/**
 * Initialize scroll animations on elements
 * Usage: <div data-animate="fade-up" data-delay="100">Content</div>
 */
export const initScrollAnimations = () => {
  const animatedElements = document.querySelectorAll('[data-animate]');
  
  if (!animatedElements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const element = entry.target;
          const animation = element.dataset.animate;
          const delay = element.dataset.delay || 0;
          
          setTimeout(() => {
            element.classList.add('is-visible', `animate-${animation}`);
          }, parseInt(delay));
          
          // Unobserve after animation
          if (!element.dataset.repeat) {
            observer.unobserve(element);
          }
        } else if (entry.target.dataset.repeat) {
          entry.target.classList.remove('is-visible');
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }
  );

  animatedElements.forEach((el) => {
    el.style.opacity = '0';
    observer.observe(el);
  });

  return observer;
};

/**
 * Parallax effect on scroll
 * Usage: parallaxScroll(element, speed)
 */
export const parallaxScroll = (element, speed = 0.5) => {
  if (!element) return;
  
  const handleScroll = () => {
    const scrolled = window.pageYOffset;
    const elementOffset = element.offsetTop;
    const distance = scrolled - elementOffset;
    const translate = distance * speed;
    
    element.style.transform = `translateY(${translate}px)`;
  };
  
  window.addEventListener('scroll', handleScroll, { passive: true });
  
  return () => window.removeEventListener('scroll', handleScroll);
};

/**
 * Counter animation - counts up to a number
 */
export const animateCounter = (element, target, duration = 2000, start = 0) => {
  if (!element) return;
  
  const startTime = performance.now();
  const targetNum = parseInt(target);
  const startNum = parseInt(start);
  
  const updateCounter = (currentTime) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Easing function (ease-out)
    const easeOut = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(startNum + (targetNum - startNum) * easeOut);
    
    element.textContent = current.toLocaleString();
    
    if (progress < 1) {
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = targetNum.toLocaleString();
    }
  };
  
  requestAnimationFrame(updateCounter);
};

/**
 * Initialize all counters on page
 */
export const initCounters = () => {
  const counters = document.querySelectorAll('[data-counter]');
  
  if (!counters.length) return;
  
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const element = entry.target;
          const target = element.dataset.counter;
          const duration = element.dataset.duration || 2000;
          
          animateCounter(element, target, parseInt(duration));
          observer.unobserve(element);
        }
      });
    },
    { threshold: 0.5 }
  );
  
  counters.forEach((counter) => observer.observe(counter));
  
  return observer;
};

/**
 * Stagger animation for children elements
 */
export const staggerChildren = (parent, animation = 'fade-up', delayIncrement = 100) => {
  if (!parent) return;
  
  const children = parent.children;
  
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          Array.from(children).forEach((child, index) => {
            setTimeout(() => {
              child.classList.add('is-visible', `animate-${animation}`);
            }, index * delayIncrement);
          });
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );
  
  Array.from(children).forEach((child) => {
    child.style.opacity = '0';
  });
  
  observer.observe(parent);
  
  return observer;
};

/**
 * Reveal on scroll with custom threshold
 */
export const revealOnScroll = (elements, options = {}) => {
  const {
    threshold = 0.1,
    rootMargin = '0px',
    animationClass = 'is-visible',
    once = true
  } = options;
  
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(animationClass);
          if (once) {
            observer.unobserve(entry.target);
          }
        } else if (!once) {
          entry.target.classList.remove(animationClass);
        }
      });
    },
    { threshold, rootMargin }
  );
  
  const elementList = typeof elements === 'string' 
    ? document.querySelectorAll(elements)
    : elements;
  
  elementList.forEach((el) => observer.observe(el));
  
  return observer;
};

/**
 * Smooth reveal with blur effect
 */
export const blurReveal = (element) => {
  if (!element) return;
  
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.filter = 'blur(0px)';
          entry.target.style.opacity = '1';
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );
  
  element.style.filter = 'blur(10px)';
  element.style.opacity = '0';
  element.style.transition = 'filter 0.6s ease-out, opacity 0.6s ease-out';
  
  observer.observe(element);
  
  return observer;
};

/**
 * Create scroll progress indicator
 */
export const createScrollProgress = (element) => {
  if (!element) return;
  
  const updateProgress = () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight - windowHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const progress = (scrollTop / documentHeight) * 100;
    
    element.style.width = `${progress}%`;
  };
  
  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();
  
  return () => window.removeEventListener('scroll', updateProgress);
};

/**
 * Image lazy loading with blur-up effect
 */
export const lazyLoadImages = () => {
  const images = document.querySelectorAll('img[data-src]');
  
  if (!images.length) return;
  
  const imageObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          const src = img.dataset.src;
          
          // Add blur effect
          img.style.filter = 'blur(10px)';
          img.style.transition = 'filter 0.3s ease-out';
          
          // Load image
          img.src = src;
          
          img.onload = () => {
            img.style.filter = 'blur(0px)';
            img.removeAttribute('data-src');
          };
          
          imageObserver.unobserve(img);
        }
      });
    },
    { rootMargin: '50px' }
  );
  
  images.forEach((img) => imageObserver.observe(img));
  
  return imageObserver;
};

/**
 * Initialize all scroll animations
 */
export const initAllScrollAnimations = () => {
  initScrollAnimations();
  initCounters();
  lazyLoadImages();
  
  // Add smooth reveal to sections
  const sections = document.querySelectorAll('section');
  revealOnScroll(sections, {
    threshold: 0.1,
    animationClass: 'section-visible'
  });
};

/**
 * Cleanup function to disconnect all observers
 */
export const cleanupScrollAnimations = (...observers) => {
  observers.forEach((observer) => {
    if (observer && typeof observer.disconnect === 'function') {
      observer.disconnect();
    }
  });
};

