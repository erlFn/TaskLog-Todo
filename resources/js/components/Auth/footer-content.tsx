import auth from "@/routes/auth";
import { Link } from "@inertiajs/react";
import { useEffect, useState } from "react";

interface ContentProps {
    type: 'login' | 'register';
}

export function FooterContent({ type } : ContentProps) {
    const [ description, setDescription ] = useState("");
    const [ title, setTitle ]  = useState("");
    const [ link, setLink ] = useState("");


    useEffect(() => {
        if (type === 'login') {
            setDescription("Don't have an account yet?");
            setTitle("Create an account");
            setLink(auth.register.url());
        } else {
            setDescription("Already have an account?");
            setTitle("Sign In");
            setLink(auth.login.url());
        }
    }, [type]);

    return (
        <div className="flex items-center gap-2 text-sm">
            <p className="text-muted-foreground">
                {description}
            </p>
            <Link
                href={link}
                className="text-blue-500"
            >
                {title}
            </Link>
        </div>
    );
}