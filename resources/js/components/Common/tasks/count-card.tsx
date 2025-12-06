import { Database } from 'lucide-react';

interface ContentProps {
    stats: Record<string, number>;
    value: string;
}

export function CountCard({ stats, value } : ContentProps)  {
    const getColors = (value: string) => {
        const colorMap: Record<string, { bg: string; label: string; text: string }> = {
            'to_do': { bg: 'bg-blue-500/10', label: 'To Do', text: 'text-blue-500'},
            'in_progress': { bg: 'bg-yellow-500/10', label: 'In Progress', text: 'text-yellow-500' },
            'in_review': { bg: 'bg-purple-500/10', label: 'In Review', text: 'text-purple-500' },
            'done': { bg: 'bg-green-500/10', label: 'Done', text: 'text-green-500' },
            'closed': { bg: 'bg-gray-500/10', label: 'Closed', text: 'text-gray-500' },
        }

        return colorMap[value] || { bg: 'bg-blue-500/10' };
    }

    const status = getColors(value);

    return (
        <div className={`${status.bg} rounded-md p-4 flex flex-col gap-10`}>
            <p className="text-muted-foreground text-xs">
                {status.label}
            </p>
            <span className={`flex items-center gap-2 ${status.text}`}>
                <Database/>
                <p className="text-3xl font-medium">
                    {stats[value]}
                </p>
            </span>
        </div>
    );
}