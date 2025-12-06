import user from "@/routes/user";
import { Task } from "@/types";
import { router } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Trash } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

interface ContentProps {
    task: Task;
}

export function DeleteButton({ task } : ContentProps) {
    const handleDelete = () => {
        router.post(user.tasks.destroy(task));
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger
                asChild
            >
                <Button
                    type="button"
                    variant="ghost"
                    className="cursor-pointer bg-gray-50 text-red-500 hover:text-red-600"
                >
                    <Trash/>
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you sure you want to delete "{task.title}"?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete <span className="text-red-600">"{task.title}"</span> from our server.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel
                        className="cursor-pointer"
                    >
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleDelete}
                        className="cursor-pointer"
                    >
                        Delete Permanently
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}