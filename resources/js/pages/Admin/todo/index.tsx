import { LabelField } from "@/components/Common/label-field";
import AppLayout from "@/layouts/app-layout";
import admin from "@/routes/admin";
import { BreadcrumbItem, User } from "@/types";
import { ListTodo } from 'lucide-react';
import TodoFilter from "./todo-filter";
import { TodoContainer } from "@/components/Common/todo/todo-container";

interface ContentProps {
    users: User[];
    search: string;
}

export default function Index({ users, search } : ContentProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'ToDo', href: admin.todo.url() }
    ];

    return (
        <AppLayout
            breadcrumbs={breadcrumbs}
        >
            <div className="space-y-4">
                <div className="flex items-center justify-end">
                    <TodoFilter
                        search={search}
                    />
                </div>
                <LabelField
                    icon={ListTodo}
                    label="To Do Overview"
                    isLast={true}
                    hasSep={true}
                    count={12}
                >
                    <div className="grid grid-cols-5 gap-4">
                        {users.map(user => (
                            user.todos.map(data => (
                                <TodoContainer
                                    key={data.id}
                                    todo={data}
                                    isAdmin={true}
                                />
                            ))
                        ))}
                    </div>
                </LabelField>
            </div>
        </AppLayout>
    );
}