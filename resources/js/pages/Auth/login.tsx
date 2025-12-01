import { FormField } from "@/components/Form/form-field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Toggle } from "@/components/ui/toggle";
import AuthLayout from "@/layouts/auth-layout";
import { Form } from "@inertiajs/react";
import { Eye, Send } from 'lucide-react';
import { useState } from "react";

export default function Login() {
    const [ showPassword, setShowPassword ] = useState(false);

    return (
        <AuthLayout
            type='login'
        >
            <Form
                method="post"
                className="w-full space-y-4"
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