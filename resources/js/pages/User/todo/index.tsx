import AppLayout from "@/layouts/app-layout";
import user from "@/routes/user";
import { BreadcrumbItem, Todo } from "@/types";
import { CreateToDoDialog } from "./create-todo-dialog";
import { LabelField } from "@/components/Common/label-field";
import { Box }  from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { ListTodo } from 'lucide-react';
import { router } from "@inertiajs/react";
import { useLoading } from "@/hooks/use-loading";

interface ContentProps {
    todos: Todo[];
}

export default function Index({ todos } : ContentProps) {
    const { setIsLoading } = useLoading();
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'ToDo', href: user.todo.url() }
    ];

    const handleRedirect = (todo: Todo) => {
        router.get(user.todo.view(todo), {}, {
            onStart: () => {
                setIsLoading(true);
            },
            onFinish: () => {
                setIsLoading(false);
            }
        });
    };

    return (
        <AppLayout
            breadcrumbs={breadcrumbs}
        >
            <div className="space-y-4">
                <CreateToDoDialog/>

                <LabelField
                    icon={Box}
                    label="Containers"
                    isLast={true}
                    hasSep={true}
                >
                    <div className="grid grid-cols-5 gap-4">
                        {todos.map(todo => (
                            <div
                                onClick={() => handleRedirect(todo)}
                                className="border p-4 rounded-md hover:border-blue-400/20 hover:bg-blue-400/4 transition-all duration-250 space-y-4"
                            >
                                <p className="text-neutral-700">
                                    {todo.title}
                                </p>
                                <div className="flex flex-col gap-2">
                                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                                        <ListTodo
                                            className="size-4"
                                        />
                                        <p>Total List</p>
                                    </span>
                                    <Badge
                                        className="bg-blue-400"
                                    >
                                        {todo.list_count}
                                    </Badge>
                                </div>
                            </div>
                        ))}
                    </div>
                </LabelField>
            </div>
        </AppLayout>
    );
}