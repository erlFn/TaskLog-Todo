import { BreadcrumbItem as BreadcrumbType } from "@/types";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../ui/breadcrumb";
import React from "react";
import { InertiaLinkProps, router } from "@inertiajs/react";
import { useLoading } from "@/hooks/use-loading";
import { Button } from "../ui/button";

interface ContentProps {
    breadcrumbs: BreadcrumbType[];
}

export function Breadcrumbs({ breadcrumbs } : ContentProps) {
    const { setIsLoading } = useLoading();

    const handleRedirect = (href: NonNullable<InertiaLinkProps['href']>) => {
        router.get(href, {}, {
            onStart: () => {
                setIsLoading(true);
            },
            onFinish: () => {
                setIsLoading(false);
            }
        });
    };

    return (
        <>
            {breadcrumbs.length > 0 && (
                <Breadcrumb>
                    <BreadcrumbList>
                        {breadcrumbs.map((item, idx) => {
                            const isLast = idx === breadcrumbs.length - 1;

                            return(
                                <React.Fragment
                                    key={idx}
                                >
                                    <BreadcrumbItem>
                                        {isLast ? (
                                            <BreadcrumbPage className="text-blue-400 text-xs">
                                                {item.title}
                                            </BreadcrumbPage>
                                        ) : (
                                            <BreadcrumbLink
                                                asChild
                                            >
                                                <Button
                                                    variant="ghost"
                                                    onClick={() => handleRedirect(item.href)}
                                                    className="text-xs text-gray-400 cursor-pointer hover:text-muted-foreground"
                                                >
                                                    {item.title}
                                                </Button>
                                            </BreadcrumbLink>
                                        )}
                                    </BreadcrumbItem>
                                    {!isLast && (
                                        <BreadcrumbSeparator/>
                                    )}
                                </React.Fragment>
                            );
                        })}
                    </BreadcrumbList>
                </Breadcrumb>
            )}
        </>
    );
}