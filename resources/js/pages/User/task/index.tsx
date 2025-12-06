import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TaskStats } from "@/components/User/task/task-stats";
import AppLayout from "@/layouts/app-layout";
import user from "@/routes/user";
import { BreadcrumbItem, TabsData, Task } from "@/types";
import { TabToDo } from "./tab-todo";
import { TabInProgress } from "./tab-in-progress";
import { TabInReview } from "./tab-in-review";
import { TabClosed } from "./tab-closed";
import { TabDone } from "./tab-done";
import { CreateTaskDialog } from "./create-task-dialog";
import { TaskFilters } from "./task-filters";

interface ContentProps {
    tasks: {
        data: Task[];
    };
    stats: Record<string, number>;
    filters?: {
        search?: string;
        priority?: string;
    };
}

export default function Index({ tasks, stats, filters = {} } : ContentProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Tasks', href: user.tasks.url() }
    ];

    const tabsData: TabsData[] = [
        { label: 'To Do', value: 'to_do' },
        { label: 'In Progress', value: 'in_progress' },
        { label: 'In Review', value: 'in_review' },
        { label: 'Done', value: 'done' },
        { label: 'Closed', value: 'closed' }
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
                
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                    <CreateTaskDialog/>
                    <TaskFilters
                        search={filters?.search}
                        priority={filters?.priority}
                    />
                </div>

                <Tabs defaultValue="to_do">
                    <TabsList className="w-full space-x-4">
                        {tabsData.map(data => {
                            const colors = getColors(data.value || 'to_do');

                            return (
                                <TabsTrigger
                                    key={data.value}
                                    value={data.value}
                                    className={`cursor-pointer ${colors.activeBg} data-[state=active]:text-secondary font-normal text-sm text-muted-foreground transition-all duration-350 flex items-center gap-2`}
                                >
                                    <p>
                                        {data.label}
                                    </p>
                                </TabsTrigger>
                            );
                        })}
                    </TabsList>
                    <TabToDo
                        tasks={tasks.data}
                    />
                    <TabInProgress
                        tasks={tasks.data}
                    />
                    <TabInReview
                        tasks={tasks.data}
                    />
                    <TabDone
                        tasks={tasks.data}
                    />
                    <TabClosed
                        tasks={tasks.data}
                    />
                </Tabs>      
            </div>
        </AppLayout>
    );
}