import { DataMetrics } from "@/components/Admin/dashboard/data-metrics";
import { DataDialog } from "@/components/Common/data-dialog";
import { LabelField } from "@/components/Common/label-field";
import { TodoContainer } from "@/components/Common/todo/todo-container";
import AppLayout from "@/layouts/app-layout";
import { welcome } from "@/routes";
import admin from "@/routes/admin";
import { BreadcrumbItem, Task, Todo } from "@/types";
import { HardDrive, Clipboard, ListTodo } from "lucide-react";

interface ContentProps {
    tasks: {
        data: Task[];
    };
    tasksCount: number;
    todos: {
        data: Todo[];
    };
    todosCount: number;
}

export default function Dashboard({ tasks, tasksCount, todos, todosCount } : ContentProps) {
    const breadCrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: welcome.url() },
    ];

    return (
        <AppLayout
            breadcrumbs={breadCrumbs}
        >
            <div className="space-y-4">
                <LabelField
                    icon={HardDrive}
                    label="Data Metrics"
                >
                    <div className="grid grid-cols-2 gap-4">
                        <DataMetrics
                            tasksCount={tasksCount}
                            todoCount={todosCount}
                        />
                    </div>
                </LabelField>
                <LabelField
                    icon={Clipboard}
                    label="Tasks Data"
                    showAll={true}
                    href={admin.tasks.url()}
                    count={tasksCount}
            >
                    <div className="grid grid-cols-3 gap-2">
                        {tasks.data.map(task => (
                            <DataDialog
                                key={task.id}
                                tasks={task}
                            />
                        ))}
                    </div>
                </LabelField>
                <LabelField
                    icon={ListTodo}
                    label="To Do Data"
                    showAll={true}
                    href={admin.todo.url()}
                    isLast={true}
                    count={2}
                >
                    <div className="grid grid-cols-4 gap-2">
                        {todos.data.map(todo => (
                            <TodoContainer
                                key={todo.id}
                                todo={todo}
                            />
                        ))}
                    </div>
                </LabelField>
            </div>
        </AppLayout>
    );
}