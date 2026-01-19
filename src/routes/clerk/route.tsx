import { createFileRoute, Outlet } from '@tanstack/react-router'
import { ClerkProvider } from '@clerk/clerk-react'
import { ExternalLink, Key } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { ConfigDrawer } from '@/components/config-drawer'
import { AuthenticatedLayout } from '@/components/layout/authenticated-layout'
import { Main } from '@/components/layout/main'
import { ThemeSwitch } from '@/components/theme-switch'

export const Route = createFileRoute('/clerk')({
  component: RouteComponent,
})

// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

function RouteComponent() {
  if (!PUBLISHABLE_KEY) {
    return <MissingClerkPubKey />
  }

  return (
    <ClerkProvider
      publishableKey={PUBLISHABLE_KEY}
      afterSignOutUrl='/clerk/sign-in'
      signInUrl='/clerk/sign-in'
      signUpUrl='/clerk/sign-up'
      signInFallbackRedirectUrl='/clerk/user-management'
      signUpFallbackRedirectUrl='/clerk/user-management'
    >
      <Outlet />
    </ClerkProvider>
  )
}

function MissingClerkPubKey() {
  const codeBlock =
    'bg-muted rounded-sm py-0.5 px-1.5 text-xs font-mono font-medium'
  return (
    <AuthenticatedLayout>
      <div className='bg-background flex h-16 justify-between p-4'>
        <SidebarTrigger variant='outline' className='scale-125 sm:scale-100' />
        <div className='space-x-4'>
          <ThemeSwitch />
          <ConfigDrawer />
        </div>
      </div>
      <Main variant='default' className='flex flex-col items-center justify-start'>
        <div className='max-w-2xl'>
          <Alert>
            <Key className='size-4' />
            <AlertTitle>No Publishable Key Found!</AlertTitle>
            <AlertDescription>
              <p className='text-balance'>
                You need to generate a publishable key from Clerk and put it
                inside the <code className={codeBlock}>.env</code> file.
              </p>
            </AlertDescription>
          </Alert>

          <h1 className='mt-4 text-2xl font-bold'>Set your Clerk API key</h1>
          <div className='text-muted-foreground mt-4 flex flex-col gap-y-4'>
            <ol className='list-inside list-decimal space-y-1.5'>
              <li>
                In the{' '}
                <a
                  href='https://go.clerk.com/GttUAaK'
                  target='_blank'
                  className='text-foreground underline decoration-dashed underline-offset-4 hover:decoration-solid'
                >
                  Clerk
                  <sup>
                    <ExternalLink className='inline-block size-3' />
                  </sup>
                </a>{' '}
                Dashboard, navigate to the API keys page.
              </li>
              <li>
                In the <strong className='text-foreground'>Quick Copy</strong>{' '}
                section, copy your Clerk Publishable Key.
              </li>
              <li>
                Rename <code className={codeBlock}>.env.example</code> to{' '}
                <code className={codeBlock}>.env</code>
              </li>
              <li>
                Paste your key into your <code className={codeBlock}>.env</code>{' '}
                file.
              </li>
            </ol>
            <p>The final result should resemble the following:</p>

            <div className='space-y-2 rounded-sm border bg-card px-3 py-3 text-sm'>
              <span className='text-muted-foreground ps-1 text-xs font-medium'>
                .env
              </span>
              <pre className='bg-muted text-foreground overflow-auto overscroll-x-contain rounded-sm px-3 py-2 font-mono text-xs'>
                <code>
                  <span className='text-muted-foreground before:pe-3 before:content-["1"]'>
                    VITE_CLERK_PUBLISHABLE_KEY=YOUR_PUBLISHABLE_KEY
                  </span>
                </code>
              </pre>
            </div>
          </div>

          <Separator className='my-6 w-full' />

          <Alert>
            <AlertTitle>Clerk Integration is Optional</AlertTitle>
            <AlertDescription className='space-y-2'>
              <p className='text-balance'>
                The Clerk integration lives entirely inside{' '}
                <code className={codeBlock}>src/routes/clerk</code>. If you plan
                to use Clerk as your auth service, you might want to place{' '}
                <code className={codeBlock}>ClerkProvider</code> at the root
                route.
              </p>
              <p>
                However, if you don't plan to use Clerk, you can safely remove
                this directory and related dependency{' '}
                <code className={codeBlock}>@clerk/clerk-react</code>.
              </p>
              <p className='text-muted-foreground text-sm'>
                This setup is modular by design and won't affect the rest of the
                application.
              </p>
            </AlertDescription>
          </Alert>
        </div>
      </Main>
    </AuthenticatedLayout>
  )
}
