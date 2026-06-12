import { Video, Menu } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cctvFeedsData } from '@/lib/trafficMockData';
import { CameraFeedCard } from './CameraFeedCard';

export function CCTVFeedsPanel() {
  return (
    <Card className="border-border/60">
      <CardHeader className="pb-2 pt-3 px-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            <Video size={14} className="text-accent" />
            Live CCTV Feeds
          </CardTitle>
          <Menu
            size={14}
            className="text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
          />
        </div>
      </CardHeader>
      <CardContent className="px-3 pb-3">
        <div className="grid grid-cols-2 gap-1.5">
          {cctvFeedsData.map((feed) => (
            <CameraFeedCard
              key={feed.id}
              name={feed.name}
              imageUrl={feed.imageUrl}
              className="h-24"
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
