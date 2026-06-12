import { cn } from '@/lib/utils';

interface PasswordStrengthResult {
  score: number; // 0-4
  label: string;
  color: string;
}

export function getPasswordStrength(password: string): PasswordStrengthResult {
  if (!password) return { score: 0, label: '', color: '' };

  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  // Normalize to 0-4
  const normalized = Math.min(4, score);

  if (normalized <= 1) return { score: normalized, label: 'Weak', color: 'destructive' };
  if (normalized === 2) return { score: normalized, label: 'Fair', color: 'warning' };
  if (normalized === 3) return { score: normalized, label: 'Strong', color: 'success' };
  return { score: normalized, label: 'Very Strong', color: 'accent' };
}

interface PasswordStrengthProps {
  password: string;
}

export function PasswordStrength({ password }: PasswordStrengthProps) {
  const { score, label, color } = getPasswordStrength(password);
  if (!password) return null;

  const segments = 4;
  const filledCount = Math.ceil((score / 5) * segments);

  const segmentColor = {
    destructive: 'bg-destructive',
    warning: 'bg-[var(--warning)]',
    success: 'bg-[var(--success)]',
    accent: 'bg-accent',
  }[color] ?? 'bg-border';

  const labelColor = {
    destructive: 'text-destructive',
    warning: 'text-[var(--warning)]',
    success: 'text-[var(--success)]',
    accent: 'text-accent',
  }[color] ?? 'text-muted-foreground';

  return (
    <div className="space-y-1.5">
      <div className="flex gap-1">
        {Array.from({ length: segments }).map((_, i) => (
          <div
            key={i}
            className={cn(
              'h-1 flex-1 rounded-full transition-all duration-300',
              i < filledCount ? segmentColor : 'bg-border/50'
            )}
          />
        ))}
      </div>
      <p className={cn('text-xs font-medium', labelColor)}>
        Password strength: {label}
      </p>
    </div>
  );
}
