import { RenderSkeleton } from "@/components/Common/render-skeleton";
import { ChartBarBig } from 'lucide-react';

export function TaskStats() {
    return (
        <div className="space-y-2">
            <span className="flex items-center gap-2 text-muted-foreground">
                <ChartBarBig
                    className="size-4"
                />
                <p className="text-xs">
                    Task Stats
                </p>
            </span>
            <div className="grid grid-cols-5 gap-2">
                <RenderSkeleton
                    count={5}
                />
            </div>
        </div>
    );
}