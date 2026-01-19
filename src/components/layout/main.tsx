import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

type MainProps = React.HTMLAttributes<HTMLElement> & {
  fixed?: boolean
  fluid?: boolean
  ref?: React.Ref<HTMLElement>
  variant?: 'default' | 'glassmorphism' | 'gradient' | 'particles' | 'neon'
}

export function Main({ 
  fixed, 
  className, 
  fluid, 
  variant = 'glassmorphism',
  children,
  ...props 
}: MainProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const mainRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (mainRef.current) {
        const rect = mainRef.current.getBoundingClientRect()
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        })
      }
    }

    const mainElement = mainRef.current
    if (mainElement && variant === 'particles') {
      mainElement.addEventListener('mousemove', handleMouseMove)
      return () => mainElement.removeEventListener('mousemove', handleMouseMove)
    }
  }, [variant])

  return (
    <main
      ref={mainRef}
      data-layout={fixed ? 'fixed' : 'auto'}
      data-variant={variant}
      className={cn(
        'relative px-4 py-6 transition-all duration-500 ease-out',
        
        // Base styles
        fixed && 'flex grow flex-col overflow-hidden',
        
        // Variant-specific styles
        variant === 'glassmorphism' && [
          'before:absolute before:inset-0 before:-z-10',
          'before:bg-gradient-to-br before:from-primary/5 before:via-background before:to-accent/5',
          'before:backdrop-blur-xl before:rounded-md',
          'before:border before:border-border/50',
          'before:shadow-2xl before:shadow-primary/5',
          'backdrop-blur-sm',
        ],
        
        variant === 'gradient' && [
          'before:absolute before:inset-0 before:-z-10',
          'before:bg-gradient-to-br before:from-purple-500/20 before:via-blue-500/20 before:to-pink-500/20',
          'dark:before:from-purple-600/30 dark:before:via-blue-600/30 dark:before:to-pink-600/30',
          'before:animate-gradient-shift before:rounded-md',
          'before:blur-3xl',
          'after:absolute after:inset-0 after:-z-10',
          'after:bg-gradient-to-tr after:from-cyan-500/10 after:via-emerald-500/10 after:to-teal-500/10',
          'dark:after:from-cyan-600/20 dark:after:via-emerald-600/20 dark:after:to-teal-600/20',
          'after:animate-gradient-shift-reverse after:rounded-md',
          'after:blur-2xl',
        ],
        
        variant === 'particles' && [
          'before:absolute before:inset-0 before:-z-10',
          'before:bg-[radial-gradient(circle_at_var(--mouse-x)_var(--mouse-y),rgba(99,102,241,0.15),transparent_50%)]',
          'dark:before:bg-[radial-gradient(circle_at_var(--mouse-x)_var(--mouse-y),rgba(139,92,246,0.25),transparent_50%)]',
          'before:rounded-md before:transition-opacity before:duration-300',
          'after:absolute after:inset-0 after:-z-10',
          'after:bg-[linear-gradient(135deg,rgba(139,92,246,0.1)_0%,rgba(59,130,246,0.1)_50%,rgba(236,72,153,0.1)_100%)]',
          'dark:after:bg-[linear-gradient(135deg,rgba(139,92,246,0.2)_0%,rgba(59,130,246,0.2)_50%,rgba(236,72,153,0.2)_100%)]',
          'after:rounded-md',
          'bg-gradient-to-br from-background/80 to-background/60',
          'backdrop-blur-md',
        ],
        
        variant === 'neon' && [
          'before:absolute before:inset-0 before:-z-10',
          'before:bg-gradient-to-br before:from-cyan-500/20 before:via-purple-500/20 before:to-pink-500/20',
          'dark:before:from-cyan-500/30 dark:before:via-purple-500/30 dark:before:to-pink-500/30',
          'before:rounded-md before:blur-xl',
          'after:absolute after:inset-0 after:-z-10',
          'after:border-2 after:border-transparent',
          'after:bg-gradient-to-r after:from-cyan-500 after:via-purple-500 after:to-pink-500',
          'after:rounded-md after:opacity-20 dark:after:opacity-30',
          'after:[mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)]',
          'after:[mask-composite:xor]',
          'shadow-[0_0_50px_rgba(139,92,246,0.3)] dark:shadow-[0_0_60px_rgba(139,92,246,0.4)]',
        ],

        // If layout is not fluid, set the max-width
        !fluid &&
          '@7xl/content:mx-auto @7xl/content:w-full @7xl/content:max-w-7xl',
        className
      )}
      style={
        variant === 'particles'
          ? {
              '--mouse-x': `${mousePosition.x}px`,
              '--mouse-y': `${mousePosition.y}px`,
            } as React.CSSProperties
          : undefined
      }
      {...props}
    >
      {/* Animated grid pattern overlay for some variants */}
      {(variant === 'glassmorphism' || variant === 'neon') && (
        <div
          className={cn(
            'absolute inset-0 -z-10 rounded-md opacity-[0.03] dark:opacity-[0.05]',
            'bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)]',
            'bg-[size:24px_24px]',
            'animate-grid-pulse'
          )}
        />
      )}
      
      {/* Floating orbs for gradient variant */}
      {variant === 'gradient' && (
        <>
          <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-purple-500/30 dark:bg-purple-500/40 blur-3xl animate-float" />
          <div className="absolute -bottom-20 -right-20 h-96 w-96 rounded-full bg-blue-500/30 dark:bg-blue-500/40 blur-3xl animate-float-delayed" />
          <div className="absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink-500/20 dark:bg-pink-500/30 blur-3xl animate-float-slow" />
        </>
      )}

      {/* Content wrapper with proper z-index */}
      <div className="relative z-10">{children}</div>
    </main>
  )
}
