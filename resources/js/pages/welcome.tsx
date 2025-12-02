import { Button } from "@/components/ui/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { welcome } from "@/routes";
import auth from "@/routes/auth";
import { NavItem, SharedData } from "@/types";
import { InertiaLinkProps, router, usePage } from "@inertiajs/react";
import { useEffect } from "react";
import { toast } from 'sonner';

const navItems: NavItem[] = [
    {
        title: 'Login',
        href: auth.login.url(),
    },
    {
        title: 'Register',
        href: auth.register.url(),
    },
]

export default function Welcome() {
    const { flash } = usePage<SharedData>().props;

    const handleRedirect = (url: NonNullable<InertiaLinkProps['href']>) => {
        router.get(url);
    };

    useEffect(() => {
        if (flash?.error) {
            toast.error(flash.error);
        } else if (flash?.success) {
            toast.success(flash.success);
        }
    }, [flash]);

    return (
        <div className="w-full min-h-screen flex flex-col gap-4 items-center justify-center transition-all duration-750 opacity-100 starting:opacity-0">
            <HoverCard>
                <HoverCardTrigger asChild>
                    <Button
                        variant="link"
                        type="button"
                        className="cursor-pointer px-12 py-8 border border-blue-500/30 bg-blue-500/20 text-blue-500"
                    >
                        @TaskTodo
                    </Button>
                </HoverCardTrigger>
                <HoverCardContent>
                    <div className="flex flex-col">
                        <p className="text-sm font-normal">
                            @TaskTodo
                        </p>
                        <p className="text-muted-foreground text-xs">
                            Laravel + React
                        </p>
                    </div>
                </HoverCardContent>
            </HoverCard>
            <div className="flex flex-col items-center gap-2">
                {navItems.map(item => (
                    <Button
                        type="button"
                        variant="link"
                        onClick={() => handleRedirect(item.href)}
                        className="text-sm bg-blue-500/10 hover:bg-blue-500/30 p-2 px-6 hover:px-12 rounded-full text-blue-500 hover:text-blue-500 underline-offset-4 hover:underline transition-all duration-250 cursor-pointer"
                    >
                        {item.title}
                    </Button>
                ))}
            </div>
        </div>
    );
}