import { NavItem } from "@/types";
import { SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import { LayoutDashboard, ClipboardList, ListTodo } from 'lucide-react';
import { Link, usePage } from "@inertiajs/react";
import user from "@/routes/user";

const navItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: user.dashboard.url(),
        icon: LayoutDashboard
    },
    {
        title: 'Tasks',
        href: user.tasks.url(),
        icon: ClipboardList
    },
    {
        title: 'To Do',
        href: user.todo.url(),
        icon: ListTodo
    }
];

export function NavMain() {
    const page = usePage();

    return (
        <SidebarGroup>
            <SidebarGroupLabel>
                Navigation
            </SidebarGroupLabel>
            <SidebarGroupContent>
                <SidebarMenu className="space-y-1">
                    {navItems.map((item, idx) => {
                        const activePage = item.href === page.url || page.url.startsWith(item.href + '/') || page.url.startsWith(item.href + '?');

                        return(
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