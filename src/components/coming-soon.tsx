import { Telescope } from 'lucide-react'

export function ComingSoon() {
  return (
    <div className='h-svh'>
      <div className='m-auto flex h-full w-full flex-col items-center justify-center gap-2'>
        <Telescope size={72} className='text-foreground dark:text-primary' />
        <h1 className='text-6xl leading-tight font-bold text-foreground'>Coming Soon!</h1>
        <p className='text-muted-foreground text-center'>
          This page has not been created yet. <br />
          Stay tuned though!
        </p>
      </div>
    </div>
  )
}
