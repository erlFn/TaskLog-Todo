import { Button } from "../ui/button";
import { DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "../ui/dropdown-menu";
import { UserInfo } from "./user-info";
import { DoorOpen } from 'lucide-react';

export function UserMenu() {

    const handleLogout = () => {
        console.log('sign out');
    };
    
    return (
        <>
            <DropdownMenuLabel>
                <UserInfo
                    showEmail={true}
                />
            </DropdownMenuLabel>
            <DropdownMenuSeparator/>
            <DropdownMenuItem
                asChild
            >
                <Button
                    type="button"
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 cursor-pointer focus:bg-neutral-800 focus:text-secondary transition-all duration-250"
                >
                    <DoorOpen
                        className="text-secondary"
                    />
                    <p className="text-xs font-normal">
                        Sign out
                    </p>
                </Button>
            </DropdownMenuItem>
        </>
    );
}