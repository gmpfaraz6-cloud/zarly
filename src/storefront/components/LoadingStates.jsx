import './LoadingStates.css';

// Skeleton for product card
export const ProductCardSkeleton = () => {
  return (
    <div className="product-card-skeleton">
      <div className="skeleton skeleton-image"></div>
      <div className="skeleton-content">
        <div className="skeleton skeleton-title"></div>
        <div className="skeleton skeleton-price"></div>
        <div className="skeleton skeleton-button"></div>
      </div>
    </div>
  );
};

// Skeleton for product grid
export const ProductGridSkeleton = ({ count = 8 }) => {
  return (
    <div className="product-grid-skeleton">
      {Array.from({ length: count }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
};

// Skeleton for text lines
export const TextSkeleton = ({ lines = 3, width = '100%' }) => {
  return (
    <div className="text-skeleton">
      {Array.from({ length: lines }).map((_, index) => (
        <div
          key={index}
          className="skeleton skeleton-line"
          style={{
            width: index === lines - 1 ? '60%' : width
          }}
        ></div>
      ))}
    </div>
  );
};

// Skeleton for images
export const ImageSkeleton = ({ aspectRatio = '1/1', width = '100%' }) => {
  return (
    <div
      className="skeleton skeleton-image"
      style={{
        aspectRatio,
        width
      }}
    ></div>
  );
};

// Skeleton for hero section
export const HeroSkeleton = () => {
  return (
    <div className="hero-skeleton">
      <div className="skeleton skeleton-hero-content">
        <div className="skeleton skeleton-hero-title"></div>
        <div className="skeleton skeleton-hero-subtitle"></div>
        <div className="skeleton skeleton-hero-button"></div>
      </div>
    </div>
  );
};

// Generic loading spinner
export const Spinner = ({ size = 'medium', color = 'primary' }) => {
  return (
    <div className={`spinner spinner-${size} spinner-${color}`}>
      <div className="spinner-circle"></div>
    </div>
  );
};

// Full page loader
export const PageLoader = ({ message = 'Loading...' }) => {
  return (
    <div className="page-loader">
      <Spinner size="large" />
      {message && <p className="loader-message">{message}</p>}
    </div>
  );
};

// Button loading state
export const ButtonLoader = () => {
  return (
    <div className="button-loader">
      <div className="button-loader-dot"></div>
      <div className="button-loader-dot"></div>
      <div className="button-loader-dot"></div>
    </div>
  );
};

// Shimmer effect container
export const ShimmerWrapper = ({ children }) => {
  return (
    <div className="shimmer-wrapper">
      {children}
      <div className="shimmer"></div>
    </div>
  );
};

export default {
  ProductCardSkeleton,
  ProductGridSkeleton,
  TextSkeleton,
  ImageSkeleton,
  HeroSkeleton,
  Spinner,
  PageLoader,
  ButtonLoader,
  ShimmerWrapper
};

