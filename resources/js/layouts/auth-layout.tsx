import { FooterContent } from "@/components/Auth/footer-content";
import { HeaderContent } from "@/components/Auth/header-content";
import { Loading } from "@/components/Common/loading";
import { Card, CardContent, CardFooter, CardHeader} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import React, { useState } from "react";

interface ContentProps {
    type: 'login' | 'register';
    children: React.ReactNode
}

export default function AuthLayout({ children, type } : ContentProps) {
    const [ isLoading, setIsLoading ] = useState(false);

    return (
        <>
            {isLoading && (
                <Loading/>
            )}
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
                            setIsLoading={setIsLoading}
                        />
                    </CardFooter>
                </Card>
            </div>
        </>
    );
}