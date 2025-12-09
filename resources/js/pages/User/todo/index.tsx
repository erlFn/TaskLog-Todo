import AppLayout from "@/layouts/app-layout";
import user from "@/routes/user";
import { BreadcrumbItem, Todo } from "@/types";
import { CreateToDoDialog } from "./create-todo-dialog";
import { LabelField } from "@/components/Common/label-field";
import { Box }  from 'lucide-react';

interface ContentProps {
    todos: Todo[];
}

export default function Index({ todos } : ContentProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'ToDo', href: user.todo.url() }
    ];

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
                            <div className="space-y-4">
                                <p>
                                    {todo.title}
                                </p>
                                <p>
                                    {todo.creator.email}
                                </p>
                            </div>
                        ))}
                    </div>
                </LabelField>
            </div>
        </AppLayout>
    );
}