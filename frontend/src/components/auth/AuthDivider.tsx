import { Separator } from '@/components/ui/separator';

interface AuthDividerProps {
  text?: string;
}

export function AuthDivider({ text = 'OR' }: AuthDividerProps) {
  return (
    <div className="flex items-center gap-3">
      <Separator className="flex-1 bg-border/60" />
      <span className="label-meta shrink-0">{text}</span>
      <Separator className="flex-1 bg-border/60" />
    </div>
  );
}
