import { Badge } from "@/components/ui/badge";
import { useLoading } from "@/hooks/use-loading";
import admin from "@/routes/admin";
import user from "@/routes/user";
import { SharedData, Todo } from "@/types";
import { router, usePage } from "@inertiajs/react";
import { ListTodo } from 'lucide-react';
import { Users2 } from 'lucide-react';

interface ContentProps {
    todo: Todo;
    isAdmin?: boolean;
}

export function TodoContainer({ todo, isAdmin } : ContentProps) {
    const { setIsLoading } = useLoading();
    const { auth } = usePage<SharedData>().props;

    const handleRedirect = () => {
        if (isAdmin) {
            return router.get(admin.todo.show(todo), {}, {
                onStart: () => {
                    setIsLoading(true);
                },
                onFinish: () => {
                    setIsLoading(false);
                }
            });
        }

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
        <div
            onClick={handleRedirect}
            className="border p-4 rounded-md hover:border-blue-400/20 hover:bg-blue-400/4 transition-all duration-250 space-y-4 cursor-pointer"
        >
            <p
                className="text-neutral-700"
            >
                {todo.title}
            </p>
            <div className="flex flex-col gap-2">
                <span
                    className="flex items-center gap-1 text-xs text-muted-foreground"
                >
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
            {auth.user.role === 'admin' && (
                <div className="flex items-center gap-4">
                    <p className="text-muted-foreground text-xs">
                        Created by:
                    </p>
                    <Badge
                        className="flex items-center gap-2"
                    >
                        <Users2
                            className="size-4"
                        />
                        <p>
                            {todo.creator.name}
                        </p>
                    </Badge>
                </div>
            )}
        </div>
    );
}