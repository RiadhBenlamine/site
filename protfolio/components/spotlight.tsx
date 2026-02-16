"use client";
import React from "react";

type SpotlightEffectProps = {
  direction?: "left" | "right" | "both";
  size?: string; // Tailwind size class, e.g., "w-64 h-64"
  color?: string; // hex or Tailwind color
  className?: string;
};

export const SpotlightEffect: React.FC<SpotlightEffectProps> = ({
  direction = "both",
  size = "w-72 h-72",
  color = "white",
  className,
}) => {
  const spotlightStyle = {
    background: color,
    opacity: 0.2,
    filter: "blur(120px)",
  };

  return (
    <>
      {(direction === "left" || direction === "both") && (
        <div
          className={`absolute -top-40 left-0 md:-top-20 md:left-60 ${size} rounded-full pointer-events-none ${className}`}
          style={spotlightStyle}
        />
      )}
      {(direction === "right" || direction === "both") && (
        <div
          className={`absolute -top-40 right-0 md:-top-20 md:right-60 ${size} rounded-full pointer-events-none ${className}`}
          style={spotlightStyle}
        />
      )}
    </>
  );
};
