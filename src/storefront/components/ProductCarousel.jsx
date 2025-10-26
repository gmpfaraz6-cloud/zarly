import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useToast } from './Toast';
import './ProductCarousel.css';

function ProductCarousel({ products = [], autoPlay = true, interval = 5000 }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(autoPlay);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const carouselRef = useRef(null);
  const autoPlayRef = useRef(null);
  const { success } = useToast();

  const visibleCount = 4; // Show 4 products at a time on desktop

  useEffect(() => {
    if (isAutoPlaying && products.length > visibleCount) {
      autoPlayRef.current = setInterval(() => {
        handleNext();
      }, interval);
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, currentIndex, products.length]);

  const handlePrevious = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? Math.max(0, products.length - visibleCount) : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) => 
      prev >= products.length - visibleCount ? 0 : prev + 1
    );
  };

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      handleNext();
    }

    if (touchStart - touchEnd < -75) {
      handlePrevious();
    }
  };

  const handleMouseEnter = () => {
    setIsAutoPlaying(false);
  };

  const handleMouseLeave = () => {
    setIsAutoPlaying(autoPlay);
  };

  const handleQuickAdd = (product, e) => {
    e.preventDefault();
    e.stopPropagation();
    success(`${product.title} added to cart!`, {
      action: {
        label: 'View Cart',
        onClick: () => window.location.href = '/cart'
      }
    });
  };

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div 
      className="product-carousel"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={carouselRef}
    >
      <div className="carousel-header">
        <h2 className="carousel-title">Featured Products</h2>
        <div className="carousel-controls">
          <button
            className="carousel-btn prev"
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            aria-label="Previous"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M12 16l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button
            className="carousel-btn next"
            onClick={handleNext}
            disabled={currentIndex >= products.length - visibleCount}
            aria-label="Next"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M8 16l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

      <div 
        className="carousel-track-container"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div 
          className="carousel-track"
          style={{
            transform: `translateX(-${currentIndex * (100 / visibleCount)}%)`
          }}
        >
          {products.map((product) => (
            <Link
              key={product.id}
              to={`/products/${product.handle}`}
              className="carousel-card"
            >
              <div className="carousel-card-image">
                {product.product_images?.[0]?.url ? (
                  <img 
                    src={product.product_images[0].url} 
                    alt={product.title}
                    loading="lazy"
                  />
                ) : (
                  <div className="no-image">📦</div>
                )}
                <button
                  className="quick-add-btn"
                  onClick={(e) => handleQuickAdd(product, e)}
                  aria-label="Quick add to cart"
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M2 2h2l1.6 9.6c.1.6.6 1 1.2 1h8.4c.6 0 1.1-.4 1.2-1L18 6H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="8" cy="18" r="1" fill="currentColor"/>
                    <circle cx="16" cy="18" r="1" fill="currentColor"/>
                  </svg>
                </button>
              </div>
              <div className="carousel-card-content">
                <h3 className="carousel-card-title">{product.title}</h3>
                <div className="carousel-card-price">
                  ${parseFloat(product.price).toFixed(2)}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="carousel-dots">
        {Array.from({ length: Math.ceil(products.length / visibleCount) }).map((_, index) => (
          <button
            key={index}
            className={`carousel-dot ${index === Math.floor(currentIndex / visibleCount) ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index * visibleCount)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default ProductCarousel;

