import { DataDialog } from "@/components/Common/data-dialog";
import { Task } from "@/types";
import { TabsContent } from "@radix-ui/react-tabs";

interface ContentProps {
    tasks: Task[];
}

export function TabInProgress({ tasks } : ContentProps) {
    const filteredData = tasks.filter(task => task.status.includes('in_progress'));

    return (
        <TabsContent
            value="in_progress"
        >
            <div className="grid grid-cols-5 gap-4">
                {filteredData.map(task => (
                    <DataDialog
                        key={task.id}
                        tasks={task}
                    />
                ))}
            </div>
        </TabsContent>
    );
}