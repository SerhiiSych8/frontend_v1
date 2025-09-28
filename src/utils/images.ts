// Image utility functions for handling images from various sources

export interface ImageConfig {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  fallback?: string;
}

/**
 * Get optimized image URL with fallback
 */
export const getImageUrl = (src: string, fallback?: string): string => {
  if (!src) return fallback || '/images/placeholder.png';
  
  // If it's already a full URL, return as is
  if (src.startsWith('http')) {
    return src;
  }
  
  // If it's a relative path, prepend the base URL
  const baseUrl = process.env.NEXT_PUBLIC_IMAGE_BASE_URL || '';
  return `${baseUrl}${src.startsWith('/') ? src : `/${src}`}`;
};

/**
 * Generate responsive image srcset
 */
export const generateSrcSet = (baseUrl: string, sizes: number[] = [320, 640, 1024, 1280]): string => {
  return sizes
    .map(size => `${getImageUrl(baseUrl)}?w=${size} ${size}w`)
    .join(', ');
};

/**
 * Get placeholder image for loading states
 */
export const getPlaceholderImage = (width: number = 300, height: number = 200): string => {
  return `data:image/svg+xml;base64,${btoa(`
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#1a1a1a"/>
      <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="14" fill="#666" text-anchor="middle" dy=".3em">
        Loading...
      </text>
    </svg>
  `)}`;
};

/**
 * Image loading hook for lazy loading
 */
export const useImageLoader = (src: string) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!src) {
      setIsLoading(false);
      setHasError(true);
      return;
    }

    const img = new Image();
    img.onload = () => {
      setIsLoading(false);
      setHasError(false);
    };
    img.onerror = () => {
      setIsLoading(false);
      setHasError(true);
    };
    img.src = getImageUrl(src);
  }, [src]);

  return { isLoading, hasError };
};

// Import React hooks
import { useState, useEffect } from 'react';
