import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { LucideIcon, ArrowRight } from 'lucide-react';
import React from 'react';
import { Button } from '../ui/button';
import { InertiaLinkProps, router } from '@inertiajs/react';
import user from '@/routes/user';

interface ContentProps {
    label: string;  
    icon: LucideIcon | null;
    children: React.ReactNode
    isLast?: boolean;
    showAll?: boolean
    count?: number;
    hasSep?: boolean;
    href?: NonNullable<InertiaLinkProps['href']>;
}

export function LabelField({ label, icon, children, isLast, showAll, hasSep, href, count = 0 } : ContentProps) {
    const Icon = icon;

    const handleRedirect = () => {
        router.get(href ?? user.dashboard.url());
    }

    return (
        <div className="flex flex-col gap-2">
            <div className='flex items-center justify-between gap-4'>
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
                {hasSep && (
                    <Separator className='flex-1'/>
                )}
                {showAll && (
                    <Button 
                        type='button'
                        variant="ghost"
                        onClick={handleRedirect}
                        className='flex items-center gap-2 text-muted-foreground cursor-pointer'
                    >
                        <p className='text-xs'>
                            See all
                        </p>
                        <ArrowRight
                            className='size-4'
                        />
                    </Button>
                )}
            </div>
            {children}
            {!isLast && (
                <Separator
                    className='mt-4'
                />
            )}
        </div>
    );
}