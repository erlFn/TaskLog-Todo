import AppLayout from "@/layouts/app-layout";
import user from "@/routes/user";
import { BreadcrumbItem, Todo } from "@/types";

interface ContentProps {
    todo: Todo;
}

export default function Show({ todo } : ContentProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'To Do', href: user.todo.url() },
        { title: todo.title, href: user.todo.view(todo) }
    ]

    return (
        <AppLayout
            breadcrumbs={breadcrumbs}
        >
            <p>
                {todo.title}
            </p>
            <p>
                {todo.creator.email}
            </p>
        </AppLayout>
    );
}