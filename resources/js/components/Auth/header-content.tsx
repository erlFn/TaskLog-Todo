import { useEffect, useState } from "react";
import { CardDescription, CardTitle } from "../ui/card";

interface ContentProps {
    type: 'login' | 'register';
}

export function HeaderContent({ type } : ContentProps) {
    const [ title, setTitle ] = useState("");
    const [ description, setDescription ] = useState("");

    useEffect(() => {
        if (type === 'login') {
            setTitle('Sign In');
            setDescription('create an account');
        } else {
            setTitle('Create an account');
            setDescription('create an account');
        }
    }, [type]);
    return (
        <>
            <CardTitle className="text-lg font-light">
                {title}
            </CardTitle>
            <CardDescription className="text-sm">
                Enter your valid credentials to {description}
            </CardDescription>
        </>
    );
}