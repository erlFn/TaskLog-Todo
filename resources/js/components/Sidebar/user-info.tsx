import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { UserRound } from 'lucide-react';
import { useSidebar } from "../ui/sidebar";
import { User } from "@/types";

interface ContentProps {
    showEmail?: boolean;
    user: User;
}

export function UserInfo({ showEmail = false, user } : ContentProps) {
    const { state } = useSidebar();

    return (
        <div className={`flex items-center gap-2 ${state !== 'collapsed' && 'truncate'}`}>
            <Avatar 
                className="size-8 rounded-full overflow-hidden"
            >
                <AvatarImage
                    // src={user.avatar}
                    // alt={user.name}
                />
                <AvatarFallback
                    className="rounded-full bg-neutral-600 text-secondary"
                >
                    <UserRound
                        strokeWidth={1.5}
                        absoluteStrokeWidth
                        className="size-5"
                    />
                </AvatarFallback>
            </Avatar>
            <div className="flex flex-col truncate">
                <p className="truncate">
                    {user.name}
                </p>
                {showEmail && (
                    <p className="truncate text-xs text-muted-foreground">
                        {user.email}
                    </p>
                )}
            </div>
        </div>
    );
}