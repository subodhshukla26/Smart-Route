import { Camera } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CameraFeedCardProps {
  name: string;
  imageUrl: string;
  className?: string;
}

export function CameraFeedCard({ name, imageUrl, className }: CameraFeedCardProps) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-lg border border-border group cursor-pointer',
        className,
      )}
    >
      <img
        src={imageUrl}
        alt={`Camera feed: ${name}`}
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-2 flex items-center gap-1.5">
        <Camera size={11} className="text-white/80 shrink-0" />
        <span className="text-xs font-medium text-white/90 truncate">{name}</span>
        <span className="ml-auto flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
          <span className="text-[10px] text-white/60">LIVE</span>
        </span>
      </div>
    </div>
  );
}
