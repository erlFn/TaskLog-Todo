import { FormField } from "@/components/Form/form-field";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useLoading } from "@/hooks/use-loading";
import AppLayout from "@/layouts/app-layout";
import user from "@/routes/user";
import { BreadcrumbItem, Lists, Todo } from "@/types";
import { Form, router } from "@inertiajs/react";
import { formatDistanceToNow, parseISO } from "date-fns";
import { MoveLeft, Trash2, Plus } from 'lucide-react';
import { useState } from "react";
import { toast } from "sonner";

interface ContentProps {
    todo: Todo;
}

export default function Show({ todo } : ContentProps) {
    const { setIsLoading } = useLoading();
    const [ description, setDescription ] = useState("");
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'To Do', href: user.todo.url() },
        { title: todo.title, href: user.todo.view(todo.slug) }
    ];

    const getRelativeTime = (date: string) => {
        return formatDistanceToNow(parseISO(date), { addSuffix: true });
    }

    const handleBack = () => {
        router.get(user.todo.url(), {}, {
            onStart: () => {
                setIsLoading(true);
            },
            onFinish: () => {
                setIsLoading(false);
            }
        })
    };

    const handleUpdate = (todoList: Lists, currentStatus: boolean) => {
        router.put(user.todo.list.update([todo, todoList]), { 
            status: !currentStatus
        }, {
            onStart: () => {
                setIsLoading(true);
            },
            onFinish: () => {
                setIsLoading(false);
            }
        });
    };

    const handleDelete = (todoList: Lists) => {
        router.post(user.todo.list.delete([todo, todoList]), {}, {
            onStart: () => {
                setIsLoading(true);
            },
            onFinish: () => {
                setIsLoading(false);
            }
        });
    };

    const handleTodoDelete = () => {
        router.post(user.todo.delete(todo), {}, {
            onStart: () => {
                setIsLoading(true);
            },
            onSuccess: () => {
                toast.success(`Successfully deleted "${todo.title}"`);
            },
            onFinish: () => {
                setIsLoading(false);
            }
        });
    }

    return (
        <AppLayout
            breadcrumbs={breadcrumbs}
        >
            <div className="space-y-4 w-full">
                <div className="flex items-center justify-between">
                    <Button
                        onClick={handleBack}
                        variant="ghost"
                        className="cursor-pointer text-muted-foreground flex items-center gap-2 hover:text-muted-foreground"
                    >
                        <MoveLeft
                            className="size-4"
                        />
                        <p>
                            Back
                        </p>
                    </Button>
                    <div className="flex items-center gap-2">
                        <AlertDialog>
                            <AlertDialogTrigger
                                asChild
                            >
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="bg-red-500 text-secondary hover:bg-red-600 hover:text-secondary cursor-pointer"
                                >
                                    <Trash2
                                        className="size-4"
                                    />
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>
                                        Are you sure you want to delete "{todo.title}"?
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone. This will permanently delete <span className="text-red-600">"{todo.title}"</span> from our server.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel
                                        className="cursor-pointer"
                                    >
                                        Cancel
                                    </AlertDialogCancel>
                                    <AlertDialogAction
                                        onClick={handleTodoDelete}
                                        className="cursor-pointer"
                                    >
                                        Delete Permanently
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                        <Dialog>
                            <DialogTrigger
                                asChild
                            >
                                <Button
                                    className="cursor-pointer bg-blue-400 hover:bg-blue-500 hover:text-secondary transition-all duration-250 flex items-center gap-2"
                                >
                                    <Plus
                                        className="size-4"
                                    />
                                    <p>
                                        Create new list
                                    </p>
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <Form
                                    action={user.todo.list.store(todo)}
                                    method="post"
                                    onFinish={() => setDescription("")}
                                >   
                                    <FormField
                                        label="* Description"
                                    >
                                        <Input
                                            name="description"
                                            value={description}
                                            onChange={e => setDescription(e.target.value)}
                                        />
                                    </FormField>
                                    <DialogFooter>
                                        <Button
                                            type="submit"
                                            className="w-full mt-4 cursor-pointer"
                                        >
                                            Submit
                                        </Button>
                                    </DialogFooter>
                                </Form>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
                <div className="grid gap-2">
                    {todo.lists.map(list => {
                        const statusValue = String(list.status).toLowerCase();
                        const isCompleted = statusValue === 'true' || statusValue === '1';

                        return (
                            <div className="flex items-center justify-between">
                                <Button
                                    key={list.id}
                                    variant="ghost"
                                    onClick={() => handleUpdate(list, isCompleted)}
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
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => handleDelete(list)}
                                    className="cursor-pointer hover:bg-red-500 hover:text-secondary"
                                >
                                    <Trash2
                                        className="size-4"
                                    />
                                </Button>
                            </div>
                        );
                    })}
                </div>
            </div>
        </AppLayout>
    );
}