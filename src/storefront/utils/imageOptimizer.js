/**
 * Image Optimization Utilities
 * Progressive loading, blur-up, WebP support, and responsive images
 */

/**
 * Create blur placeholder from image
 */
export const createBlurPlaceholder = (src, quality = 10) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    img.onload = () => {
      canvas.width = quality;
      canvas.height = quality;
      ctx.drawImage(img, 0, 0, quality, quality);
      const placeholder = canvas.toDataURL('image/jpeg', 0.5);
      resolve(placeholder);
    };
    
    img.onerror = reject;
    img.src = src;
  });
};

/**
 * Progressive image loading with blur-up effect
 */
export class ProgressiveImage {
  constructor(element, options = {}) {
    this.element = element;
    this.options = {
      placeholder: element.dataset.placeholder || null,
      src: element.dataset.src || element.src,
      srcset: element.dataset.srcset || null,
      sizes: element.dataset.sizes || null,
      alt: element.alt || '',
      ...options
    };
    
    this.loaded = false;
    this.init();
  }
  
  init() {
    // Set placeholder with blur
    if (this.options.placeholder) {
      this.element.src = this.options.placeholder;
      this.element.style.filter = 'blur(20px)';
      this.element.style.transition = 'filter 0.3s ease-out';
    }
    
    // Create and load high-res image
    const img = new Image();
    
    img.onload = () => {
      this.element.src = this.options.src;
      
      if (this.options.srcset) {
        this.element.srcset = this.options.srcset;
      }
      
      if (this.options.sizes) {
        this.element.sizes = this.options.sizes;
      }
      
      this.element.style.filter = 'blur(0px)';
      this.loaded = true;
      this.element.classList.add('image-loaded');
    };
    
    img.onerror = () => {
      console.error('Failed to load image:', this.options.src);
      this.element.classList.add('image-error');
    };
    
    img.src = this.options.src;
    
    if (this.options.srcset) {
      img.srcset = this.options.srcset;
    }
  }
}

/**
 * Lazy load images with IntersectionObserver
 */
export const lazyLoadImage = (element, options = {}) => {
  const {
    rootMargin = '50px',
    threshold = 0.01,
    placeholder = null
  } = options;
  
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          const src = img.dataset.src;
          const srcset = img.dataset.srcset;
          
          if (src) {
            new ProgressiveImage(img, { placeholder });
          }
          
          obs.unobserve(img);
        }
      });
    },
    { rootMargin, threshold }
  );
  
  observer.observe(element);
  return observer;
};

/**
 * Lazy load all images on page
 */
export const lazyLoadAllImages = (selector = 'img[data-src]', options = {}) => {
  const images = document.querySelectorAll(selector);
  const observers = [];
  
  images.forEach((img) => {
    observers.push(lazyLoadImage(img, options));
  });
  
  return observers;
};

/**
 * Check WebP support
 */
export const supportsWebP = async () => {
  if (!self.createImageBitmap) return false;
  
  const webpData = 'data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=';
  const blob = await fetch(webpData).then(r => r.blob());
  
  return createImageBitmap(blob).then(() => true, () => false);
};

/**
 * Get WebP URL if supported, fallback to original
 */
export const getOptimizedImageUrl = async (url, format = 'webp') => {
  const isWebPSupported = await supportsWebP();
  
  if (!isWebPSupported || !url) return url;
  
  // If URL already has extension, replace it
  const hasExtension = /\.(jpg|jpeg|png)$/i.test(url);
  if (hasExtension) {
    return url.replace(/\.(jpg|jpeg|png)$/i, `.${format}`);
  }
  
  return url;
};

/**
 * Generate srcset for responsive images
 */
export const generateSrcSet = (baseUrl, widths = [320, 640, 768, 1024, 1280, 1536]) => {
  return widths
    .map((width) => `${baseUrl}?w=${width} ${width}w`)
    .join(', ');
};

/**
 * Generate sizes attribute based on breakpoints
 */
export const generateSizes = (breakpoints = {
  mobile: '100vw',
  tablet: '50vw',
  desktop: '33vw'
}) => {
  return [
    `(max-width: 768px) ${breakpoints.mobile}`,
    `(max-width: 1024px) ${breakpoints.tablet}`,
    breakpoints.desktop
  ].join(', ');
};

/**
 * Preload critical images
 */
export const preloadCriticalImages = (images = []) => {
  images.forEach(({ src, type = 'image/jpeg', as = 'image' }) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = as;
    link.href = src;
    link.type = type;
    document.head.appendChild(link);
  });
};

/**
 * Image zoom on hover (desktop)
 */
export class ImageZoom {
  constructor(element, options = {}) {
    this.element = element;
    this.options = {
      zoomLevel: 2,
      transition: 'transform 0.3s ease-out',
      ...options
    };
    
    this.init();
  }
  
  init() {
    this.element.style.transition = this.options.transition;
    this.element.style.cursor = 'zoom-in';
    
    this.element.addEventListener('mouseenter', this.handleMouseEnter.bind(this));
    this.element.addEventListener('mousemove', this.handleMouseMove.bind(this));
    this.element.addEventListener('mouseleave', this.handleMouseLeave.bind(this));
  }
  
  handleMouseEnter() {
    this.element.style.transformOrigin = 'center center';
  }
  
  handleMouseMove(e) {
    const rect = this.element.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    this.element.style.transformOrigin = `${x}% ${y}%`;
    this.element.style.transform = `scale(${this.options.zoomLevel})`;
  }
  
  handleMouseLeave() {
    this.element.style.transform = 'scale(1)';
  }
  
  destroy() {
    this.element.removeEventListener('mouseenter', this.handleMouseEnter);
    this.element.removeEventListener('mousemove', this.handleMouseMove);
    this.element.removeEventListener('mouseleave', this.handleMouseLeave);
  }
}

/**
 * Initialize image zoom on elements
 */
export const initImageZoom = (selector = '.product-image img', options = {}) => {
  const elements = document.querySelectorAll(selector);
  const instances = [];
  
  elements.forEach((el) => {
    instances.push(new ImageZoom(el, options));
  });
  
  return instances;
};

/**
 * Image aspect ratio helper
 */
export const maintainAspectRatio = (element, ratio = '16/9') => {
  element.style.aspectRatio = ratio;
  element.style.objectFit = 'cover';
};

/**
 * Convert image to base64
 */
export const imageToBase64 = (url) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      const base64 = canvas.toDataURL('image/png');
      resolve(base64);
    };
    
    img.onerror = reject;
    img.src = url;
  });
};

/**
 * Compress image
 */
export const compressImage = (file, maxWidth = 1920, quality = 0.8) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const img = new Image();
      
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        
        if (width > maxWidth) {
          height = (maxWidth / width) * height;
          width = maxWidth;
        }
        
        canvas.width = width;
        canvas.height = height;
        
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        
        canvas.toBlob((blob) => {
          resolve(blob);
        }, 'image/jpeg', quality);
      };
      
      img.onerror = reject;
      img.src = e.target.result;
    };
    
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

/**
 * Get image dimensions
 */
export const getImageDimensions = (url) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    
    img.onload = () => {
      resolve({
        width: img.width,
        height: img.height,
        aspectRatio: img.width / img.height
      });
    };
    
    img.onerror = reject;
    img.src = url;
  });
};

/**
 * Initialize all image optimizations
 */
export const initImageOptimizations = (options = {}) => {
  // Lazy load images
  const lazyObservers = lazyLoadAllImages();
  
  // Initialize zoom on product images
  const zoomInstances = initImageZoom('.product-image img', {
    zoomLevel: 2.5
  });
  
  // Preload hero image if exists
  const heroImage = document.querySelector('.hero-image img');
  if (heroImage && heroImage.src) {
    preloadCriticalImages([{ src: heroImage.src }]);
  }
  
  return {
    lazyObservers,
    zoomInstances,
    cleanup: () => {
      lazyObservers.forEach(obs => obs.disconnect());
      zoomInstances.forEach(instance => instance.destroy());
    }
  };
};

