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
import { useState } from "react";

export function CreateToDoDialog() {
    const [ title, setTitle ] = useState("");
    const { setIsLoading } = useLoading();

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