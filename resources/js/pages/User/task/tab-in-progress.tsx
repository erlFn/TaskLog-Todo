import { RenderSkeleton } from "@/components/Common/render-skeleton";
import { TabsContent } from "@radix-ui/react-tabs";

interface ContentProps {
    count: number;
}

export function TabInProgress({ count } : ContentProps) {
    return (
        <TabsContent
            value="in_progress"
        >
            <div className="grid grid-cols-5 gap-4">
                <RenderSkeleton
                    count={count}
                    hasThin={true}
                />
            </div>
        </TabsContent>
    );
}