import { LabelField } from "@/components/Common/label-field";
import AppLayout from "@/layouts/app-layout";
import admin from "@/routes/admin";
import { BreadcrumbItem, Task } from "@/types";
import { Clipboard } from 'lucide-react';
import { TaskFilters } from "./task-filters";
import { TaskStats } from "@/components/User/task/task-stats";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabToDo } from "@/pages/User/task/tab-todo";
import { TabInProgress } from "@/pages/User/task/tab-in-progress";
import { TabInReview } from "@/pages/User/task/tab-in-review";
import { TabDone } from "@/pages/User/task/tab-done";
import { TabClosed } from "@/pages/User/task/tab-closed";

interface TaskStatus {
    value: string;
    label: string;
}

interface ContentProps {
    tasks: Task[];
    tasksCount: number;
    filters?: {
        search?: string;
        priority?: string;
    };
    stats: Record<string, number>;
    taskStatus: TaskStatus[];
}

export default function Index({ tasks, tasksCount, filters, stats, taskStatus } : ContentProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Tasks', href: admin.tasks.url() }
    ];

    const getColors = (value: string) => {
        const colorMap: Record<string, { activeBg: string }> = {
            'to_do': { activeBg: 'data-[state=active]:bg-blue-500' },
            'in_progress': { activeBg: 'data-[state=active]:bg-yellow-500' },
            'in_review': { activeBg: 'data-[state=active]:bg-purple-500' },
            'done': { activeBg: 'data-[state=active]:bg-green-500' },
            'closed': { activeBg: 'data-[state=active]:bg-gray-500' },
        }

        return colorMap[value] || { activeBg: 'data-[state=active]:bg-blue-500' };
    }

    return (
        <AppLayout
            breadcrumbs={breadcrumbs}
        >
            <div className="space-y-4">
                <TaskStats
                    stats={stats}
                />
                <div className="flex items-center justify-end">
                    <TaskFilters
                        search={filters?.search}
                        priority={filters?.priority}
                    />
                </div>
                <LabelField
                    icon={Clipboard}
                    label="Tasks Overview"
                    hasSep={true}
                    isLast={true}
                    count={tasksCount}
                >
                    <Tabs
                        defaultValue={taskStatus[0].value}
                    >
                        <TabsList
                            className="w-full space-x-4"
                        >
                            {taskStatus.map(status => {
                                const colors = getColors(status.value || 'to_do');

                                return (
                                    <TabsTrigger
                                        key={status.value}
                                        value={status.value}
                                        className={`cursor-pointer ${colors.activeBg} data-[state=active]:text-secondary font-normal text-sm text-muted-foreground transition-all duration-350 flex items-center gap-2`}
                                    >
                                        <p>
                                            {status.label}
                                        </p>
                                    </TabsTrigger>
                                );
                            })}
                        </TabsList>
                        <TabToDo
                            tasks={tasks}
                        />
                        <TabInProgress
                            tasks={tasks}
                        />
                        <TabInReview
                            tasks={tasks}
                        />
                        <TabDone
                            tasks={tasks}
                        />
                        <TabClosed
                            tasks={tasks}
                        />
                    </Tabs>
                </LabelField>
            </div>
        </AppLayout>
    );
}