import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import { Box } from 'lucide-react';

export function SideHeader() {
    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton 
                    className="bg-background shadow-xs border py-6 pointer-events-none" 
                >
                    <Box/>
                    <span>
                        <p className="font-normal">
                            Task - Todo
                        </p>
                        <p className="text-muted-foreground text-xs">
                            Laravel + React
                        </p>
                    </span>
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}