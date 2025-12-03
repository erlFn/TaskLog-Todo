import { RenderSkeleton } from "@/components/Common/render-skeleton";
import { TabsContent } from "@/components/ui/tabs";

interface ContentProps {
    count: number;
}

export function TabToDo({ count } : ContentProps) {
    return (
        <TabsContent
            value="to_do"
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