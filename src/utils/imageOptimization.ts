/**
 * Image utility for WebP support with fallbacks
 * Usage: <picture>
 *   <source srcSet={getImageSrcSet('herobg')} type="image/webp" />
 *   <img src={`/Fixify_images/herobg.png`} loading="lazy" alt="Hero background" />
 * </picture>
 */
import React from "react";

export const getImageSrcSet = (imageName: string): string => {
  return `/Fixify_images/${imageName}.webp`;
};

export const getImageWithFallback = (imageName: string, extension: string = "png"): string => {
  return `/Fixify_images/${imageName}.${extension}`;
};

/**
 * Component helper for WebP with fallback
 */
export const ResponsiveImage = ({
  src,
  alt,
  className = "",
  loading = "lazy" as const,
}: {
  src: string;
  alt: string;
  className?: string;
  loading?: "lazy" | "eager";
}) => {
  const baseName = src.replace(/\.(jpg|jpeg|png|webp)$/, "");

  return React.createElement(
    "picture",
    null,
    React.createElement("source", { srcSet: `${baseName}.webp`, type: "image/webp" }),
    React.createElement("img", {
      src,
      alt,
      className,
      loading,
    })
  );
};
