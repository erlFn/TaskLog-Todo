import { Breadcrumbs } from "@/components/Common/Breadcrumbs";
import { AppSidebar } from "@/components/Sidebar/app-sidebar";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { BreadcrumbItem } from "@/types";
import React from "react";

interface ContentProps {
    breadcrumbs: BreadcrumbItem[];
    children: React.ReactNode
}

export default function AppLayout({ children, breadcrumbs } : ContentProps) {
    return (
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
                <main className="w-full text-center p-4">
                    {children}
                </main>
            </SidebarInset>
            {/* End Main Content */}
        </SidebarProvider>
    );
}