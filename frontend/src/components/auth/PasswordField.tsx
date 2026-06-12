import { Eye, EyeOff, Lock } from 'lucide-react';
import { forwardRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PasswordStrength } from './PasswordStrength';

interface PasswordFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string;
  error?: string;
  showStrength?: boolean;
  watchValue?: string;
}

export const PasswordField = forwardRef<HTMLInputElement, PasswordFieldProps>(
  ({ label, error, showStrength, watchValue, className, id, ...props }, ref) => {
    const [visible, setVisible] = useState(false);
    const fieldId = id ?? `field-${label.toLowerCase().replace(/\s+/g, '-')}`;

    return (
      <div className="space-y-1.5">
        <Label htmlFor={fieldId} className="text-sm font-medium text-foreground/90">
          {label}
        </Label>
        <div className="relative group">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary">
            <Lock className="h-4 w-4" />
          </span>
          <Input
            id={fieldId}
            ref={ref}
            type={visible ? 'text' : 'password'}
            className={cn(
              'h-10 bg-card border-border/70 pl-10 pr-10 transition-all',
              'focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20',
              error &&
                'border-destructive focus-visible:border-destructive focus-visible:ring-destructive/20',
              className
            )}
            {...props}
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 text-muted-foreground hover:text-foreground"
            onClick={() => setVisible((v) => !v)}
            tabIndex={-1}
          >
            {visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>
        </div>
        {showStrength && watchValue !== undefined && (
          <PasswordStrength password={watchValue} />
        )}
        {error && (
          <p className="flex items-center gap-1.5 text-xs text-destructive">
            <AlertCircle className="h-3.5 w-3.5 shrink-0" />
            {error}
          </p>
        )}
      </div>
    );
  }
);

PasswordField.displayName = 'PasswordField';
