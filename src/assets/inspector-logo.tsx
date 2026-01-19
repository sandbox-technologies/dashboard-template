import { type ImgHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

export function InspectorLogo({
  className,
  ...props
}: ImgHTMLAttributes<HTMLImageElement>) {
  return (
    <img
      src='/images/logo.png'
      alt='Inspector'
      className={cn('size-6 object-contain', className)}
      {...props}
    />
  )
}

// SVG version for when an SVG icon component is needed
export function InspectorLogoIcon({
  className,
  ...props
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox='0 0 100 100'
      xmlns='http://www.w3.org/2000/svg'
      className={cn('size-6', className)}
      {...props}
    >
      <title>Inspector</title>
      {/* Black circle (Pac-Man style) */}
      <circle cx='42' cy='42' r='38' fill='currentColor' />
      {/* Cursor pointer overlay */}
      <path
        d='M55 45 L85 75 Q90 80 85 85 Q80 90 75 85 L65 75 L55 85 Q50 90 48 82 L45 55 Q44 48 50 46 Z'
        fill='white'
        stroke='currentColor'
        strokeWidth='3'
      />
    </svg>
  )
}
