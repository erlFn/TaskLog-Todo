import admin from "@/routes/admin";
import { router } from "@inertiajs/react";
import React, { useEffect, useRef, useState } from "react";
import { Search, X } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface TodoFilterProps {
    search?: string;
}

export default function TodoFilter({ search: initialSearch = "" } : TodoFilterProps) {
    const [ search, setSearch ] = useState(initialSearch);
    const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        setSearch(initialSearch);
    }, [initialSearch]);

    const updateFilter = (newSearch: string) => {
        const params: Record<string, string> = {};

        if (newSearch.trim()) {
            params.search = newSearch.trim();
        }

        router.get(admin.todo.url(), params, {
            preserveState: true,
            preserveScroll: true,
            replace: true,
        });
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearch(value);

        if (debounceTimerRef.current) {
            clearTimeout(debounceTimerRef.current);
        }

        debounceTimerRef.current = setTimeout(() => {
            updateFilter(value);
        }, 500);
    };

    useEffect(() => {
        return () => {
            if (debounceTimerRef.current) {
                clearTimeout(debounceTimerRef.current);
            }
        };
    }, []);

    const handleClearFilters = () => {
        setSearch("");
        router.get(admin.todo.url(), {}, {
            preserveState: true,
            preserveScroll: true,
            replace: true,
        });
    };

    const hasActiveFilters = search;

    return (
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <div className="relative flex-1 w-full sm:max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                    type="text"
                    placeholder="Search users by name..."
                    value={search}
                    onChange={handleSearchChange}
                    className="pl-9 pr-9 capitalize"
                />
                {search && (
                    <button
                        onClick={() => {
                            setSearch("");
                            updateFilter("");
                        }}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                        <X
                            className="size-4"
                        />
                    </button>
                )}
            </div>

            {hasActiveFilters && (
                <Button
                    variant="outline"
                    onClick={handleClearFilters}
                    className="w-full sm:w-auto"
                >
                    <X
                        className="size-4 mr-2"
                    />
                    Clear Filters
                </Button>
            )}
        </div>
    ); 
}