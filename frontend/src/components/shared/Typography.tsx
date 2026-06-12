import { cn } from '@/lib/utils';

interface TypographyProps {
  children: React.ReactNode;
  className?: string;
}

export function TypographyH1({ children, className }: TypographyProps) {
  return (
    <h1 className={cn('text-3xl font-semibold tracking-tight text-foreground', className)}>
      {children}
    </h1>
  );
}

export function TypographyH2({ children, className }: TypographyProps) {
  return (
    <h2 className={cn('text-xl font-semibold tracking-tight text-foreground', className)}>
      {children}
    </h2>
  );
}

export function TypographyH3({ children, className }: TypographyProps) {
  return (
    <h3 className={cn('text-base font-semibold text-foreground', className)}>
      {children}
    </h3>
  );
}

export function TypographyP({ children, className }: TypographyProps) {
  return (
    <p className={cn('text-sm text-muted-foreground leading-relaxed', className)}>
      {children}
    </p>
  );
}

export function TypographyLabel({ children, className }: TypographyProps) {
  return (
    <span className={cn('label-meta', className)}>
      {children}
    </span>
  );
}
