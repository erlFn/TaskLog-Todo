import { Loading } from "@/components/Common/loading";
import { FormField } from "@/components/Form/form-field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Toggle } from "@/components/ui/toggle";
import AuthLayout from "@/layouts/auth-layout";
import auth from "@/routes/auth";
import { SharedData } from "@/types";
import { Form, usePage } from "@inertiajs/react";
import { Eye, Send } from 'lucide-react';
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Login() {
    const { flash } = usePage<SharedData>().props;
    const [ showPassword, setShowPassword ] = useState(false);
    const [ isLoading, setIsLoading ] = useState(false);

    useEffect(() => {
        if (flash?.error) {
            toast.error(flash.error);
        } else if (flash?.success) {
            toast.success(flash.success);
        } else if (flash?.info) {
            toast.info(flash.info);
        }
    }, [flash]);

    return (
        <AuthLayout
            type='login'
        >
            {isLoading && (
                <Loading/>
            )}
            <Form
                action={auth.login.store()}
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
                    label="* Email"
                >
                    <Input
                        name="email"
                        type="email"
                        placeholder="example@email.com"
                        required
                        className="text-sm"
                    />
                </FormField>
                <FormField
                    label="* Password"
                >
                    <div className="relative">
                        <Input
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Password"
                            className="text-sm"
                        />
                        <div className="absolute right-0 top-0">
                            <Toggle
                                defaultChecked={showPassword}
                                onPressedChange={setShowPassword}
                                className="cursor-pointer"
                            >
                                <Eye/>
                            </Toggle>
                        </div>
                    </div>
                </FormField>
                <Button
                    type="submit"
                    className="mt-4 w-full cursor-pointer"
                >
                    <Send/>
                </Button>
            </Form>
        </AuthLayout>
    );
}