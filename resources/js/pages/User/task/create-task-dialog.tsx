import { FormField } from "@/components/Form/form-field";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Clipboard, SquarePlus } from 'lucide-react';
import { SelectPriority } from "./select-priority";
import { Badge } from "@/components/ui/badge";

export function CreateTaskDialog() {
    return (
        <Dialog>
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
                <div className="space-y-4">
                    <FormField
                        label="* Title"
                    >
                        <Input
                            placeholder="Task Title"
                            className="focus-visible:ring-0"
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
                            rows={5}
                            placeholder="A brief description of your task"
                            className="resize-none focus-visible:ring-0"
                        />
                    </FormField>
                    <FormField
                        label="* Priority"
                    >
                        <SelectPriority/>
                    </FormField>
                </div>
                <DialogFooter>
                    <Button
                        className="w-full cursor-pointer"
                    >
                        <SquarePlus/>
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}