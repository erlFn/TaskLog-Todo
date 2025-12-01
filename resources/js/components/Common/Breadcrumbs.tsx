import { BreadcrumbItem as BreadcrumbType } from "@/types";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../ui/breadcrumb";
import React from "react";
import { Link } from "@inertiajs/react";

interface ContentProps {
    breadcrumbs: BreadcrumbType[];
}

export function Breadcrumbs({ breadcrumbs } : ContentProps) {
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
                                                <Link
                                                    href={item.href}
                                                    className="text-xs text-gray-400"
                                                >
                                                    {item.title}
                                                </Link>
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