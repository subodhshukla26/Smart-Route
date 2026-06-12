import { AlertCircle } from 'lucide-react';
import { forwardRef } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: React.ReactNode;
  error?: string;
  helpText?: string;
}

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, icon, error, helpText, className, id, ...props }, ref) => {
    const fieldId = id ?? `field-${label.toLowerCase().replace(/\s+/g, '-')}`;

    return (
      <div className="space-y-1.5">
        <Label htmlFor={fieldId} className="text-sm font-medium text-foreground/90">
          {label}
        </Label>
        <div className="relative group">
          {icon && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary">
              {icon}
            </span>
          )}
          <Input
            id={fieldId}
            ref={ref}
            className={cn(
              'h-10 bg-card border-border/70 transition-all',
              'focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20',
              icon && 'pl-10',
              error &&
                'border-destructive focus-visible:border-destructive focus-visible:ring-destructive/20',
              className
            )}
            {...props}
          />
        </div>
        {error && (
          <p className="flex items-center gap-1.5 text-xs text-destructive">
            <AlertCircle className="h-3.5 w-3.5 shrink-0" />
            {error}
          </p>
        )}
        {helpText && !error && (
          <p className="text-xs text-muted-foreground">{helpText}</p>
        )}
      </div>
    );
  }
);

InputField.displayName = 'InputField';
