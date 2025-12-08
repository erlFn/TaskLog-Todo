import { FormField } from "@/components/Form/form-field";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useLoading } from "@/hooks/use-loading";
import { TitleCase } from "@/lib/utils";
import user from "@/routes/user";
import { Form } from "@inertiajs/react";
import { LayoutList, SquarePlus } from 'lucide-react';
import { useEffect, useState } from "react";
import { toast } from "sonner";

export function CreateToDoDialog() {
    const [ title, setTitle ] = useState("");
    const [ openDialog, setOpenDialog ] = useState(false);
    const { setIsLoading } = useLoading();

    useEffect(() => {
        if (openDialog === false) return;

        return setTitle("");
    }, [openDialog])

    return (
        <Dialog
            open={openDialog}
            onOpenChange={setOpenDialog}
        >
            <DialogTrigger
                asChild
            >
                <Button
                    variant="ghost"
                    className="cursor-pointer flex items-center gap-2 transition-all duration-250 bg-blue-300 hover:bg-blue-400 hover:text-secondary font-normal text-secondary"
                >
                    <LayoutList/>
                    <p>
                        Create To do Container
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
                            Create To do Container
                        </p>
                    </DialogTitle>
                    <DialogDescription>
                        Enter a title for your To do Container
                    </DialogDescription>
                </DialogHeader>
                <Separator/>
                <Form
                    action={user.todo.store()}
                    method="post"
                    onStart={() => setIsLoading(true)}
                    onFinish={() => setIsLoading(false)}
                    onError={(error) => {
                        if (typeof error === 'string') {
                            toast.error(error);
                        } else if (typeof error === 'object' && error !== null) {
                            Object.values(error).forEach(msg => {
                                toast.error(msg as string);
                            });
                        }

                        setOpenDialog(false);
                    }}
                    onSuccess={() => {
                        toast.success(`Successfully created new todo container - "${title}"`);
                        setOpenDialog(false);
                    }}
                    className="space-y-4"
                >
                    <div>
                        <FormField
                            label="* Title"
                        >
                            <Input
                                name="title"
                                value={title}
                                onChange={e => setTitle(TitleCase(e.target.value))}
                                placeholder="Container Title"
                                className="focus-visible:ring-0"
                            />
                        </FormField>
                    </div>
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