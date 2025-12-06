import { FormField } from "@/components/Form/form-field";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Clipboard, SquarePlus } from 'lucide-react';
import { SelectPriority } from "./select-priority";
import { Badge } from "@/components/ui/badge";
import { Form } from "@inertiajs/react";
import user from "@/routes/user";
import { TitleCase } from "@/lib/utils";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export function CreateTaskDialog() {
    const [ title, setTitle ] = useState("");
    const [ openDialog, setOpenDialog ] = useState(false);

    useEffect(() => {
        setTitle('');
    }, [openDialog]);

    return (
        <Dialog
            open={openDialog}
            onOpenChange={setOpenDialog}
        >
            <DialogTrigger
                asChild
            >
                <div className="flex items-center gap-2">
                    <Button
                        variant="ghost"
                        className="cursor-pointer flex items-center gap-2 transition-all duration-250 hover:bg-blue-400 hover:text-secondary font-normal text-muted-foreground"
                    >
                        <Clipboard/>
                        <p>
                            Create New Task
                        </p>
                    </Button>
                    <Separator className="flex-1"/>
                </div>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 font-light">
                        <Clipboard 
                            className="size-5"
                        />
                        <p>
                            Create New Task  
                        </p>
                    </DialogTitle>
                    <DialogDescription>
                        Enter a title, description, and priority for your new task.
                    </DialogDescription>
                </DialogHeader>
                <Separator/>
                <Form
                    action={user.tasks.store()}
                    method="post"
                    className="space-y-4"
                    onSuccess={() => {
                        toast.success('Successfully created a new task');
                        setOpenDialog(false);
                    }}
                    onError={(error) => {
                        if (typeof error === 'string') {
                            toast.error(error);
                        } else if (typeof error === 'object' && error !== null) {
                            Object.values(error).forEach(msg => {
                                toast.error(msg as string);
                            });
                        }
                    }}
                >
                    <FormField
                        label="* Title"
                    >
                        <Input
                            name="title"
                            placeholder="Task Title"
                            className="focus-visible:ring-0"
                            value={title}
                            onChange={e => setTitle(TitleCase(e.target.value))}
                        />
                    </FormField>
                    <FormField
                        label="* Status"
                    >
                        <Badge className="bg-blue-500">
                            To Do
                        </Badge>
                    </FormField>
                    <FormField
                        label="* Description"
                    >
                        <Textarea
                            name="description"
                            rows={5}
                            placeholder="A brief description of your task"
                            className="resize-none focus-visible:ring-0"
                        />
                    </FormField>
                    <FormField
                        label="* Priority"
                    >
                        <SelectPriority
                            value=""
                        />
                    </FormField>
                    <DialogFooter>
                        <Button
                            type="submit"
                            className="w-full cursor-pointer"
                        >
                            <SquarePlus/>
                        </Button>
                    </DialogFooter>
                </Form>
            </DialogContent>
        </Dialog>
    );
}