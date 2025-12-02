import { FormField } from "@/components/Form/form-field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AuthLayout from "@/layouts/auth-layout";
import { TitleCase } from "@/lib/utils";
import { Form } from "@inertiajs/react";
import { useState } from "react";
import { Send, Eye } from 'lucide-react';
import { Toggle } from "@/components/ui/toggle";
import { toast } from 'sonner';
import auth from "@/routes/auth";
import { Loading } from "@/components/Common/loading";

export default function Register() {
    const [ name, setName ] = useState('');
    const [ showPass1, setShowPass1 ] = useState(false);
    const [ showPass2, setShowPass2 ] = useState(false);
    const [ isLoading, setIsLoading ] = useState(false);

    return (
        <AuthLayout
            type="register"
        >
            {isLoading && (
                <Loading/>
            )}
            <Form
                action={auth.register.store()}
                method="post"
                className="w-full space-y-4"
                onStart={() => {
                    setIsLoading(true);
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
                onFinish={() => {
                    setIsLoading(false);
                }}
            >
                <FormField
                    label="* Name"
                >
                    <Input
                        name="name"
                        type="text"
                        placeholder="John Smith"
                        required
                        value={name}
                        onChange={e => setName(TitleCase(e.target.value))}
                        className="text-sm focus-visible:ring-0"
                    />
                </FormField>
                <FormField
                    label="* Email"
                >
                    <Input
                        name="email"
                        type="email"
                        placeholder="example@email.com"
                        required
                        className="text-sm focus-visible:ring-0"
                    />
                </FormField>
                <FormField
                    label="* Password"
                >
                    <div className="relative">
                        <Input
                            name="password"
                            type={showPass1 ? 'text' : 'password'}
                            placeholder="Password"
                            required
                            className="text-sm focus-visible:ring-0"
                        />
                        <div className="absolute right-0 top-0">
                            <Toggle
                                defaultChecked={showPass1}
                                onPressedChange={setShowPass1}
                                className="cursor-pointer"
                            >
                                <Eye/>
                            </Toggle>
                        </div>
                    </div>
                </FormField>
                <FormField
                    label="* Confirm Password"
                >
                    <div className="relative">
                        <Input
                            name="password_confirmation"
                            type={showPass2 ? 'text' : 'password'}
                            placeholder="Confirm Password"
                            required
                            className="text-sm focus-visible:ring-0"
                        />
                        <div className="absolute right-0 top-0">
                            <Toggle
                                defaultChecked={showPass2}
                                onPressedChange={setShowPass2}
                                className="cursor-pointer"
                            >
                                <Eye/>
                            </Toggle>
                        </div>
                    </div>
                </FormField>
                <Button
                    type="submit"
                    className="w-full cursor-pointer mt-4"
                >
                    <Send/>
                </Button>
            </Form>
        </AuthLayout>
    );
}