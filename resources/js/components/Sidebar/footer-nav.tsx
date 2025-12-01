import { NavItem } from "@/types";
import { SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "../ui/sidebar";
import { Github } from 'lucide-react';
import { Separator } from "../ui/separator";

const navItems: NavItem[] = [
    {
        title: 'Jireh',
        href: 'https://github.com/Jirehcatindoy2001',
        icon: Github,
    },
    {
        title: 'Kyla',
        href: 'https://github.com/kylaparr',
        icon: Github,
    },
];

export function FooterNav() {
    const { state } = useSidebar();

    const handleRedirect = (url: string) => {
        window.open(url, "_blank", "noopener,noreferrer");
    };

    return (
        <SidebarGroup
            className={`${state === 'collapsed' && 'p-0'}`}
        >
            <SidebarGroupLabel className="flex items-center gap-2">
                Creators
                <Separator className="flex-1"/>
            </SidebarGroupLabel>
            <SidebarGroupContent>
                <SidebarMenu>
                    {navItems.map((item, idx)  => (
                        <SidebarMenuItem
                            key={idx}
                        >
                            <SidebarMenuButton
                                onClick={() => handleRedirect(item.href as string)}
                                className={`cursor-pointer py-5 transition-all duration-250 hover:bg-neutral-800 hover:text-secondary ${state === 'collapsed' ? 'text-neutral-900' : 'text-muted-foreground'}`}
                            >   
                                {item.icon && (
                                    <item.icon/>
                                )}
                                {item.title}
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
}