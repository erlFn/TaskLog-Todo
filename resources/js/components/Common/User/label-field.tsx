
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { LucideIcon } from 'lucide-react';
import React from 'react';

interface ContentProps {
    label: string;  
    icon: LucideIcon | null;
    children: React.ReactNode
    isLast?: boolean;
    count?: number;
}

export function LabelField({ label, icon, children, isLast, count = 0 } : ContentProps) {
    const Icon = icon;

    return (
        <div className="flex flex-col gap-2">
            <span className='flex items-center gap-2 text-muted-foreground text-xs'>
                {Icon && (
                    <Icon
                        className='size-4'
                    />
                )}
                <p className='text-xs'>
                    {label}
                </p>
                {count > 0 && (
                    <Badge className='text-xs bg-blue-500 font-mono'>
                        {count}
                    </Badge>
                )}
            </span>
            {children}
            {!isLast && (
                <Separator
                    className='mt-4'
                />
            )}
        </div>
    );
}