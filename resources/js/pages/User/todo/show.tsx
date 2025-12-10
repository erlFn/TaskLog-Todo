import { FormField } from "@/components/Form/form-field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useLoading } from "@/hooks/use-loading";
import AppLayout from "@/layouts/app-layout";
import user from "@/routes/user";
import { BreadcrumbItem, Todo } from "@/types";
import { Form, router } from "@inertiajs/react";
import { MoveLeft, Plus } from 'lucide-react';

interface ContentProps {
    todo: Todo;
}

export default function Show({ todo } : ContentProps) {
    const { setIsLoading } = useLoading();
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'To Do', href: user.todo.url() },
        { title: todo.title, href: user.todo.view(todo) }
    ];

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
                    <Form>
                        <Sheet>
                            <SheetTrigger
                                asChild
                            >
                                <Button
                                    className="cursor-pointer bg-blue-400 hover:bg-blue-500 hover:text-secondary transition-all duration-250 flex items-center gap-2"
                                >
                                    <Plus
                                        className="size-4"
                                    />
                                    <p>New List</p>
                                </Button>
                            </SheetTrigger>
                            <SheetContent>
                                <SheetHeader>
                                    <SheetTitle
                                        className="text-muted-foreground font-normal"
                                    >
                                        Create new "{todo.title}"" list
                                    </SheetTitle>
                                </SheetHeader>
                                <div className="px-4">
                                    <FormField
                                        label="* Description"
                                    >
                                        <Input
                                            className="focus-visible:ring-0 focus-visible:border-blue-400"
                                        />
                                    </FormField>
                                </div>
                                <SheetFooter>
                                    <Button
                                        type="submit"
                                        className="cursor-pointer"
                                    >
                                        <p>
                                            Create
                                        </p>
                                    </Button>
                                    <SheetClose
                                        asChild
                                    >
                                        <Button
                                            variant="outline"
                                            className="cursor-pointer"
                                        >
                                            Close
                                        </Button>
                                    </SheetClose>
                                </SheetFooter>
                            </SheetContent>
                        </Sheet>
                    </Form>
                </div>
            </div>
        </AppLayout>
    );
}