import AcmeLogo from '@/app/ui/acme-logo';
import LoginForm from '@/app/ui/login-form';
import { Suspense } from 'react';

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="relative mx-auto w-full max-w-[400px] p-4">
        <div className="flex flex-col space-y-2.5">
          {/* Top banner */}
          <div className="flex h-20 w-full items-end rounded-lg bg-bloodRed-500 p-3 md:h-36">
            <div className="w-full flex  justify-center text-white">
              <AcmeLogo />
            </div>
          </div>

          {/* Login Form */}
          <Suspense>
            <LoginForm />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
