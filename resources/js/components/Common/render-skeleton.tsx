import { Skeleton } from "../ui/skeleton";

interface ContentProps {
    count: number;
}

export function RenderSkeleton({ count } : ContentProps) {
    const renderSkeleton = () => {
        const elements = [];

        for (let i = 0; i < count; i++) {
            elements.push(
                <Skeleton
                    key={i}
                    className="h-40"
                />
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