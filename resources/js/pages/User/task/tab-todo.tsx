import { DataDialog } from "@/components/Common/data-dialog";
import { TabsContent } from "@/components/ui/tabs";
import { Task } from "@/types";

interface ContentProps {
    tasks: Task[];
}

export function TabToDo({ tasks } : ContentProps) {
    const filteredData = tasks.filter(task => task.status.includes('to_do'));

    return (
        <TabsContent
            value="to_do"
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