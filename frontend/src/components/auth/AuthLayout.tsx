import { BrandingPanel } from './BrandingPanel';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-[45%_55%] bg-background">
      <BrandingPanel />
      <div className="flex min-h-screen items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-md animate-fade-in">{children}</div>
      </div>
    </div>
  );
}
