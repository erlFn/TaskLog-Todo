import { DataMetrics } from "@/components/Admin/dashboard/data-metrics";
import { DataDialog } from "@/components/Common/data-dialog";
import { LabelField } from "@/components/Common/label-field";
import { RenderSkeleton } from "@/components/Common/render-skeleton";
import AppLayout from "@/layouts/app-layout";
import user from "@/routes/user";
import { BreadcrumbItem, Task } from "@/types";
import { HardDriveDownload, Clipboard, LayoutList } from 'lucide-react'

interface ContentProps {
    tasks: {
        data: Task[];
    };
    taskCount: number;
}

export default function Dashboard({ tasks, taskCount } : ContentProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: user.dashboard.url()}
    ];

    return(
        <AppLayout
            breadcrumbs={breadcrumbs}
        >
            <div className="space-y-4">
                <LabelField
                    icon={HardDriveDownload}
                    label="Metrics"
                >
                    <div className="grid grid-cols-2 gap-2">
                        <DataMetrics
                            tasksCount={88}
                            todoCount={100}
                        />
                    </div>
                </LabelField>
                <LabelField
                    icon={Clipboard}
                    label="Tasks"
                    count={taskCount}
                    showAll={true}
                    href={user.tasks.url()}
                >
                    <div className="grid grid-cols-5 gap-2">
                        {tasks.data.map(task => (
                            <DataDialog
                                key={task.id}
                                tasks={task}
                            />
                        ))}
                    </div>
                </LabelField>
                <LabelField
                    icon={LayoutList}
                    label="To do"
                    count={1}
                    showAll={true}
                    href={user.todo.url()}
                    isLast={true}
                >
                    <div className="grid grid-cols-5 gap-2">
                        <RenderSkeleton
                            count={10}
                        />
                    </div>
                </LabelField>
            </div>
        </AppLayout>
    );
}