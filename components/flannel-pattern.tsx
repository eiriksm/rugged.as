"use client"

export function FlannelPattern({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="100%"
      height="100%"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      <defs>
        <pattern
          id="flannel"
          x="0"
          y="0"
          width="40"
          height="40"
          patternUnits="userSpaceOnUse"
        >
          {/* Base color */}
          <rect width="40" height="40" fill="rgba(30, 30, 30, 1)" />
          
          {/* Horizontal stripes */}
          <rect x="0" y="0" width="40" height="4" fill="rgba(180, 90, 60, 0.8)" />
          <rect x="0" y="8" width="40" height="2" fill="rgba(180, 90, 60, 0.4)" />
          <rect x="0" y="18" width="40" height="4" fill="rgba(180, 90, 60, 0.6)" />
          <rect x="0" y="28" width="40" height="2" fill="rgba(180, 90, 60, 0.3)" />
          <rect x="0" y="36" width="40" height="4" fill="rgba(180, 90, 60, 0.8)" />
          
          {/* Vertical stripes */}
          <rect x="0" y="0" width="4" height="40" fill="rgba(180, 90, 60, 0.7)" />
          <rect x="8" y="0" width="2" height="40" fill="rgba(180, 90, 60, 0.35)" />
          <rect x="18" y="0" width="4" height="40" fill="rgba(180, 90, 60, 0.5)" />
          <rect x="28" y="0" width="2" height="40" fill="rgba(180, 90, 60, 0.25)" />
          <rect x="36" y="0" width="4" height="40" fill="rgba(180, 90, 60, 0.7)" />
          
          {/* Intersection highlights */}
          <rect x="0" y="0" width="4" height="4" fill="rgba(200, 100, 70, 0.9)" />
          <rect x="18" y="0" width="4" height="4" fill="rgba(200, 100, 70, 0.7)" />
          <rect x="36" y="0" width="4" height="4" fill="rgba(200, 100, 70, 0.9)" />
          <rect x="0" y="18" width="4" height="4" fill="rgba(200, 100, 70, 0.7)" />
          <rect x="18" y="18" width="4" height="4" fill="rgba(200, 100, 70, 0.6)" />
          <rect x="36" y="18" width="4" height="4" fill="rgba(200, 100, 70, 0.7)" />
          <rect x="0" y="36" width="4" height="4" fill="rgba(200, 100, 70, 0.9)" />
          <rect x="18" y="36" width="4" height="4" fill="rgba(200, 100, 70, 0.7)" />
          <rect x="36" y="36" width="4" height="4" fill="rgba(200, 100, 70, 0.9)" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#flannel)" />
    </svg>
  )
}

export function FlannelStrip({ className = "" }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <FlannelPattern className="absolute inset-0" />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background" />
    </div>
  )
}
