import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TaskStats } from "@/components/User/task/task-stats";
import AppLayout from "@/layouts/app-layout";
import user from "@/routes/user";
import { BreadcrumbItem, TabsData } from "@/types";
import { TabToDo } from "./tab-todo";
import { TabInProgress } from "./tab-in-progress";
import { TabInReview } from "./tab-in-review";
import { TabClosed } from "./tab-closed";
import { TabDone } from "./tab-done";

export default function Index() {
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

    return (
        <AppLayout
            breadcrumbs={breadcrumbs}
        >
            <div className="space-y-4">
                <TaskStats/>
                <Tabs defaultValue="to_do">
                    <TabsList className="w-full space-x-4">
                        {tabsData.map(data => (
                            <TabsTrigger
                                key={data.value}
                                value={data.value}
                                className="cursor-pointer data-[state=active]:bg-blue-400 data-[state=active]:text-secondary font-normal text-sm text-muted-foreground transition-all duration-350"
                            >
                                {data.label}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                    <TabToDo
                        count={5}
                    />
                    <TabInProgress
                        count={10}
                    />
                    <TabInReview
                        count={12}
                    />
                    <TabDone
                        count={17}
                    />
                    <TabClosed
                        count={8}
                    />
                </Tabs>      
            </div>
        </AppLayout>
    );
}