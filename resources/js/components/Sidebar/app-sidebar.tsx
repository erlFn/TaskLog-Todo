import React from "react";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from "../ui/sidebar";
import { SideHeader } from "./header";
import { NavMain } from "./nav-main";
import { SideFooter } from "./footer";
import { FooterNav } from "./footer-nav";
import { usePage } from "@inertiajs/react";
import { SharedData } from "@/types";
import { AdminNavMain } from "./admin-nav-main";

export function AppSidebar({ ...props } : React.ComponentProps<typeof Sidebar>) {
    const { auth } = usePage<SharedData>().props;

    return (
        <Sidebar {...props}>
            <SidebarHeader>
                <SideHeader/>
            </SidebarHeader>

            <SidebarContent>
                {auth.user.role === 'user' ? (
                    <NavMain/>
                ) : (
                    <AdminNavMain/>
                )}
            </SidebarContent>

            <SidebarFooter>
                <FooterNav/>
                <SideFooter/>
            </SidebarFooter>
        </Sidebar>
    );
}