import { DataDialog } from "@/components/Common/data-dialog";
import { TabsContent } from "@/components/ui/tabs";
import { Task } from "@/types";

interface ContentProps {
    tasks: Task[];
}

export function TabDone({ tasks } : ContentProps) {
    const filteredData = tasks.filter(task => task.status.includes('done'));

    return (
        <TabsContent
            value="done"
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