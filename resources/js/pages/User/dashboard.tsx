import { DataMetrics } from "@/components/Admin/dashboard/data-metrics";
import { DataDialog } from "@/components/Common/data-dialog";
import { LabelField } from "@/components/Common/label-field";
import { TodoContainer } from "@/components/Common/todo/todo-container";
import { Badge } from "@/components/ui/badge";
import AppLayout from "@/layouts/app-layout";
import user from "@/routes/user";
import { BreadcrumbItem, Task, Todo } from "@/types";
import { HardDriveDownload, Clipboard, LayoutList } from 'lucide-react'

interface ContentProps {
    tasks: {
        data: Task[];
    };
    taskCount: number;
    todos: {
        data: Todo[];
    };
    todosCount: number;
}

export default function Dashboard({ tasks, taskCount, todos, todosCount } : ContentProps) {
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
                            tasksCount={taskCount}
                            todoCount={todosCount}
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
                    {tasks.data.length > 0 ? (
                        <div className="grid grid-cols-5 gap-2">
                            {tasks.data.map(task => (
                                <DataDialog
                                    key={task.id}
                                    tasks={task}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="flex items-center justify-center">
                            <Badge
                                className="px-4 bg-blue-400"
                            >
                                No tasks yet.
                            </Badge>
                        </div>
                    )}
                </LabelField>
                <LabelField
                    icon={LayoutList}
                    label="To do"
                    count={todosCount}
                    showAll={true}
                    href={user.todo.url()}
                    isLast={true}
                >
                    {todos.data.length > 0 ? (
                        <div className="grid grid-cols-5 gap-2">
                            {todos.data.map(todo => (
                                <TodoContainer
                                    key={todo.id}
                                    todo={todo}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="flex items-center justify-center">
                            <Badge
                                className="px-4 bg-blue-400"
                            >
                                No Todo lists yet.
                            </Badge>
                        </div>
                    )}
                </LabelField>
            </div>
        </AppLayout>
    );
}