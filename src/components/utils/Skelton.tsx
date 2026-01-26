import React from "react";
import './global.css'
type SkeletonProps = {
  width?: number | string;
  height?: number | string;
  count?: number;
  className?: string;
  style?: React.CSSProperties;
  variant?: "rect" | "circle" | "rounded" | "text";
};

/**
 * Reusable loading skeleton component
 *
 * Examples:
 * <Skeleton width={200} height={20} />
 * <Skeleton count={3} />
 * <Skeleton variant="circle" width={40} height={40} />
 * <Skeleton className="h-6 w-full" />
 */
const Skeleton: React.FC<SkeletonProps> = ({
  width = "100%",
  height = 16,
  count = 1,
  className = "",
  style,
  variant = "rect",
}) => {
  const getRadius = () => {
    switch (variant) {
      case "circle":
        return "50%";
      case "rounded":
        return "12px";
      case "text":
        return "6px";
      default:
        return "4px";
    }
  };

  const baseStyle: React.CSSProperties = {
    width,
    height,
    borderRadius: getRadius(),
    ...style,
  };

  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`skeleton-loader ${className}`}
          style={baseStyle}
        />
      ))}
    </>
  );
};

export default Skeleton;
