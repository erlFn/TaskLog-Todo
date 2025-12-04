import { FormField } from "@/components/Form/form-field";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { LayoutList, SquarePlus } from 'lucide-react';

export function CreateToDoDialog() {
    return (
        <Dialog>
            <DialogTrigger
                asChild
            >
                <Button
                    variant="ghost"
                    className="cursor-pointer flex items-center gap-2 transition-all duration-250 bg-blue-300 hover:bg-blue-400 hover:text-secondary font-normal text-secondary"
                >
                    <LayoutList/>
                    <p>
                        Create To Do Container
                    </p>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle
                        className="flex items-center gap-2 font-light"
                    >
                        <LayoutList
                            className="size-5"
                        />
                        <p>
                            Create To Do Container
                        </p>
                    </DialogTitle>
                    <DialogDescription>
                        Enter a title for your To Do Container
                    </DialogDescription>
                </DialogHeader>
                <Separator/>
                <div>
                    <FormField
                        label="* Title"
                    >
                        <Input
                            placeholder="ToDo Container Title"
                            className="focus-visible:ring-0"
                        />
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