import { Skeleton } from "../ui/skeleton";

interface ContentProps {
    count: number;
    hasThin?: boolean;
}

export function RenderSkeleton({ count, hasThin = false } : ContentProps) {
    const renderSkeleton = () => {
        const elements = [];

        for (let i = 0; i < count; i++) {
            elements.push(
                <div className="space-y-1" key={i}>
                    <Skeleton
                        className="h-40"
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