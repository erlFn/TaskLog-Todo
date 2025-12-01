import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import { UserInfo } from "./user-info";
import { Settings2 } from 'lucide-react';
import { UserMenu } from "./user-menu";

export function SideFooter() {

    return(
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger
                        asChild
                    >
                        <SidebarMenuButton
                            size="lg"
                            className="cursor-pointer hover:shadow-sm transition-all duration-250"
                        >
                            <UserInfo
                                // 
                            />
                            <Settings2
                                className="ml-auto"
                            /> 
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        align="start"
                        side="top"
                        className="w-3xs"
                    >
                        <UserMenu/>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}