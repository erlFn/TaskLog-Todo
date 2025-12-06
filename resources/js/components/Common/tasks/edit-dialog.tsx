import { FormField } from "@/components/Form/form-field";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { TitleCase } from "@/lib/utils";
import { SelectPriority } from "@/pages/User/task/select-priority";
import { SelectStatus } from "@/pages/User/task/select-status";
import user from "@/routes/user";
import { Task } from "@/types";
import { Form } from "@inertiajs/react";
import { Pen } from 'lucide-react';
import { useState } from "react";

interface ContentProps {
    task: Task;
}

export function EditDialog({ task } : ContentProps) {
    const [ title, setTitle ] = useState(task.title);
    const [ description, setDescription ] = useState(task.description);

    return (
        <AlertDialog>
            <AlertDialogTrigger
                asChild
            >
                <Button
                    type="button"
                    variant="ghost"
                    className="cursor-pointer bg-gray-50 text-blue-500 hover:text-blue-600"
                >
                    <Pen/>
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="w-sm">
                <AlertDialogHeader>
                    <AlertDialogTitle className="font-normal">
                        Editing "{task.title}"
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-sm text-muted-foreground">
                        Edit "{task.title}" title, description, priority, and status
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <Form
                    action={user.tasks.update(task)}
                    method="put"
                    className="space-y-4"
                >
                    <FormField
                        label="* Title"
                    >
                        <Input
                            name="title"
                            value={title}
                            onChange={e => setTitle(TitleCase(e.target.value))}
                            className="focus-visible:ring-0"
                        />
                    </FormField>

                    <FormField
                        label="* Description"
                    >
                        <Textarea
                            rows={8}
                            name="description"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            className="focus-visible:ring-0 resize-none "
                        />
                    </FormField>

                    <FormField
                        label="* Status"
                    >
                        <SelectStatus
                            defaultValue={task.status}
                        />
                    </FormField>

                    <FormField
                        label="* Priority"
                    >
                        <SelectPriority
                            defaultValue={task.priority}
                        />
                    </FormField>

                    <AlertDialogFooter>
                        <AlertDialogCancel className="cursor-pointer">
                            Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                            type="submit"
                            className="cursor-pointer"
                        >
                            Update {task.title}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </Form>
            </AlertDialogContent>
        </AlertDialog>
    );
}