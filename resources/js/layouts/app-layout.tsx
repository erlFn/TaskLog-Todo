import { AppSidebar } from "@/components/Sidebar/app-sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";

interface ContentProps {
    children: React.ReactNode
}

export default function AppLayout({ children } : ContentProps) {
    return (
        <SidebarProvider className="transition-all duration-750 opacity-100 starting:opacity-0">
            {/* Sidebar */}
                <AppSidebar collapsible="icon"/>
            {/* End Sidebar */}

            {/* Main Content*/}
            <SidebarInset>
                <header className="p-4 border-b">
                    <SidebarTrigger className="cursor-pointer"/>
                </header>
                <main className="w-full min-h-screen">
                    {children}
                </main>
            </SidebarInset>
            {/* End Main Content */}
        </SidebarProvider>
    );
}