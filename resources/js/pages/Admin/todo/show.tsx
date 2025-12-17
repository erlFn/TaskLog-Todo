import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useLoading } from "@/hooks/use-loading";
import AppLayout from "@/layouts/app-layout";
import { getRelativeTime } from "@/lib/utils";
import admin from "@/routes/admin";
import { BreadcrumbItem, Todo } from "@/types";
import { router } from "@inertiajs/react";
import { MoveLeft, Users2, ListTodo } from 'lucide-react';

interface ContentProps {
    todo: Todo;
}

export default function Show({ todo } : ContentProps) {
    const { setIsLoading } = useLoading();

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'ToDo', href: admin.todo.url() },
        { title: `"${todo.title}"`, href: admin.todo.url() },
    ];

    const handleBack = () => {
        router.get(admin.todo.url(), {}, {
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
            <div className="space-y-4 w-full">
                <div className="flex items-center justify-between">
                    <Button
                        type="button"
                        onClick={handleBack}
                        variant="ghost"
                        className="cursor-pointer text-muted-foreground flex items-center gap-2 hover:text-muted-foreground"
                    >
                        <MoveLeft
                            className="size-4s"
                        />                       
                        <p>
                            Back
                        </p>
                    </Button>
                    <Badge className="flex items-center gap-4 w-3xs py-2 px-4">
                        <span
                            className="flex items-center gap-1"
                        >
                            <Users2
                                className="size-4"
                            />
                            <p>
                                {todo.creator.name}
                            </p>
                        </span>
                        <Separator
                            className="flex-1 bg-muted-foreground opacity-50"
                        />
                        <span
                            className="flex items-center gap-1"
                        >
                            <ListTodo
                                className="size-4"
                            />   
                            {todo.title}
                        </span>
                    </Badge>
                </div>
                <div className="grid gap-2">
                    {todo.lists.map(list => {
                        const statusValue = String(list.status).toLowerCase();
                        const isCompleted = statusValue === 'true' || statusValue === '1';

                        return (
                            <div className="flex items-center justify-between">
                                <Button
                                    key={list.id}
                                    type="button"
                                    variant="ghost"
                                    className={`cursor-pointer flex-1 ${isCompleted ? 'line-through text-muted-foreground' : ''} flex items-center justify-start gap-2`}
                                >
                                    <p>
                                        {list.description}
                                    </p>
                                    <Separator
                                        className="flex-1"
                                    />
                                    <p
                                        className="text-muted-foreground text-xs"
                                    >
                                        {getRelativeTime(list.updated_at)}
                                    </p>
                                </Button>
                            </div>
                        );
                    })}
                </div>
            </div>
        </AppLayout>
    );
}