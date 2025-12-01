import React from "react";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from "../ui/sidebar";
import { SideHeader } from "./header";
import { NavMain } from "./nav-main";
import { SideFooter } from "./footer";
import { FooterNav } from "./footer-nav";

export function AppSidebar({ ...props } : React.ComponentProps<typeof Sidebar>) {    
    return (
        <Sidebar {...props}>
            <SidebarHeader>
                <SideHeader/>
            </SidebarHeader>

            <SidebarContent>
                <NavMain/>
            </SidebarContent>

            <SidebarFooter>
                <FooterNav/>
                <SideFooter/>
            </SidebarFooter>
        </Sidebar>
    );
}