import { Breadcrumbs } from "@/components/Common/Breadcrumbs";
import { AppSidebar } from "@/components/Sidebar/app-sidebar";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { BreadcrumbItem } from "@/types";
import React from "react";
import { LoadingProvider, useLoading } from "@/hooks/use-loading";
import { Loading } from "@/components/Common/loading";

interface ContentProps {
    breadcrumbs: BreadcrumbItem[];
    children: React.ReactNode
}

function AppLayoutContent({ children, breadcrumbs }: ContentProps) {
    const { isLoading } = useLoading();

    return (
        <>
            {isLoading && <Loading />}
            <SidebarProvider className="transition-all duration-750 opacity-100 starting:opacity-0">
                {/* Sidebar */}
                    <AppSidebar collapsible="icon"/>
                {/* End Sidebar */}

                {/* Main Content*/}
                <SidebarInset>
                    <header className="p-4 border-b flex items-center gap-4">
                        <SidebarTrigger className="cursor-pointer"/>
                        <Separator
                            orientation="vertical"
                        />
                        <Breadcrumbs
                            breadcrumbs={breadcrumbs}
                        />
                    </header>
                    <main className="w-full p-4">
                        {children}
                    </main>
                </SidebarInset>
                {/* End Main Content */}
            </SidebarProvider>
        </>
    );
}

export default function AppLayout({ children, breadcrumbs }: ContentProps) {
    return (
        <LoadingProvider>
            <AppLayoutContent breadcrumbs={breadcrumbs}>
                {children}
            </AppLayoutContent>
        </LoadingProvider>
    );
}