import { FooterContent } from "@/components/Auth/footer-content";
import { HeaderContent } from "@/components/Auth/header-content";
import { Card, CardContent, CardFooter, CardHeader} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import React from "react";

interface ContentProps {
    type: 'login' | 'register';
    children: React.ReactNode
}

export default function AuthLayout({ children, type } : ContentProps) {
    return (
        <div className="w-full min-h-screen flex items-center justify-center transition-all duration-750 opacity-100 starting:opacity-0">
            <Card className="w-md shadow-xs">
                <CardHeader className="text-center">
                    <HeaderContent
                        type={type}
                    />
                </CardHeader>
                <Separator className="w-full"/>
                <CardContent className="flex items-center justify-center">
                    {children}
                </CardContent>
                <Separator className="w-full"/>
                <CardFooter className="flex items-center justify-center text-xs">
                    <FooterContent
                        type={type}
                    />
                </CardFooter>
            </Card>
        </div>
    );
}