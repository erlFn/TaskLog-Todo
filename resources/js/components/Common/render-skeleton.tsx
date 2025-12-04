import { Skeleton } from "../ui/skeleton";

interface ContentProps {
    count: number;
    status?: 'to_do' | 'in_progress' | 'in_review' | 'done' | 'closed';
    hasThin?: boolean;
}

export function RenderSkeleton({ count, hasThin = false, status} : ContentProps) {

    const getColors = (value: string) => {
        const colorMap: Record<string, { bg: string }> = {
            'to_do': { bg: 'bg-blue-500/10' },
            'in_progress': { bg: 'bg-yellow-500/10' },
            'in_review': { bg: 'bg-purple-500/10' },
            'done': { bg: 'bg-green-500/10' },
            'closed': { bg: 'bg-gray-500/10' },
        }

        return colorMap[value] || { bg: 'bg-blue-500/10' };
    }

    const renderSkeleton = () => {
        const color = status ? getColors(status) : null;
        const elements = [];

        for (let i = 0; i < count; i++) {
            elements.push(
                <div className="space-y-1" key={i}>
                    <Skeleton
                        className={`h-40 ${status && color ? color.bg : ''}`}
                    />
                    {hasThin && (
                        <Skeleton
                            className="h-8"
                        />
                    )}
                </div>
            )
        }

        return elements;
    };

    return (
        <>
            {renderSkeleton()}
        </>
    );
}