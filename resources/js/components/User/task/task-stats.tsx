import { CountCard } from "@/components/Common/tasks/count-card";
import { ChartBarBig } from 'lucide-react';

interface ContentProps {
    stats: Record<string, number>;
}

export function TaskStats({ stats } : ContentProps) {
    const cardValues = [
        { value: 'to_do' },
        { value: 'in_review' },
        { value: 'in_progress' },
        { value: 'done' },
        { value: 'closed' },
    ];

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
                {cardValues.map(value => (
                    <CountCard
                        key={value.value}
                        value={value.value}
                        stats={stats}
                    />
                ))}
            </div>
        </div>
    );
}