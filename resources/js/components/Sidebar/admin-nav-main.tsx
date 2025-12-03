import admin from "@/routes/admin";
import { NavItem } from "@/types";
import { Link, usePage } from "@inertiajs/react";
import { LayoutDashboard, ClipboardList, ListTodo } from 'lucide-react';
import { SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";

const navItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: admin.dashboard.url(),
        icon: LayoutDashboard
    },
    {
        title: 'Tasks',
        href: admin.tasks.url(),
        icon: ClipboardList
    },
    {
        title: 'ToDo',
        href: admin.todo.url(),
        icon: ListTodo
    },
]

export function AdminNavMain() {
    const page = usePage();

    return (
        <SidebarGroup>
            <SidebarGroupLabel>
                Admin Navigation
            </SidebarGroupLabel>
            <SidebarGroupContent>
                <SidebarMenu className="space-y-1">
                    {navItems.map(( item, idx) => {
                        const activePage = item.href === page.url || page.url.startsWith(item.href + '/') || page.url.startsWith(item.href + '?');

                        return (
                            <SidebarMenuItem
                                key={idx}
                            >
                                <SidebarMenuButton
                                    asChild
                                >
                                    <Link
                                        href={item.href}
                                        className={`py-5 transition-all duration-250 ${activePage ? 'shadow-xs text-blue-500 bg-background pointer-events-none' : 'bg-neutral-600/2 text-muted-foreground'}`}
                                    >
                                        {item.icon && (
                                            <item.icon/>
                                        )}
                                        {item.title}
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        );
                    })}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
}