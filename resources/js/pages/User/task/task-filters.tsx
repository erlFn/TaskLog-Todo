import { Input } from "@/components/ui/input";
import { SelectPriority } from "./select-priority";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { router } from "@inertiajs/react";
import user from "@/routes/user";
import { useState, useEffect, useRef } from "react";

interface TaskFiltersProps {
    search?: string;
    priority?: string;
}

export function TaskFilters({ search: initialSearch = "", priority: initialPriority = "" }: TaskFiltersProps) {
    const [search, setSearch] = useState(initialSearch);
    const [priority, setPriority] = useState(initialPriority);
    const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        setSearch(initialSearch);
        setPriority(initialPriority);
    }, [initialSearch, initialPriority]);

    const updateFilters = (newSearch: string, newPriority: string) => {
        const params: Record<string, string> = {};
        
        if (newSearch.trim()) {
            params.search = newSearch.trim();
        }
        
        if (newPriority) {
            params.priority = newPriority;
        }

        router.get(user.tasks.url(), params, {
            preserveState: true,
            preserveScroll: true,
            replace: true,
        });
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearch(value);

        // Clear existing timer
        if (debounceTimerRef.current) {
            clearTimeout(debounceTimerRef.current);
        }

        // Set new timer
        debounceTimerRef.current = setTimeout(() => {
            updateFilters(value, priority);
        }, 500);
    };

    // Cleanup timer on unmount
    useEffect(() => {
        return () => {
            if (debounceTimerRef.current) {
                clearTimeout(debounceTimerRef.current);
            }
        };
    }, []);

    const handlePriorityChange = (value: string) => {
        setPriority(value);
        updateFilters(search, value);
    };

    const handleClearFilters = () => {
        setSearch("");
        setPriority("");
        router.get(user.tasks.url(), {}, {
            preserveState: true,
            preserveScroll: true,
            replace: true,
        });
    };

    const hasActiveFilters = search || priority;

    return (
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <div className="relative flex-1 w-full sm:max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                    type="text"
                    placeholder="Search tasks by title..."
                    value={search}
                    onChange={handleSearchChange}
                    className="pl-9 pr-9"
                />
                {search && (
                    <button
                        onClick={() => {
                            setSearch("");
                            updateFilters("", priority);
                        }}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                        <X className="h-4 w-4" />
                    </button>
                )}
            </div>
            
            <div className="w-full sm:w-48">
                <SelectPriority
                    value={priority}
                    onValueChange={handlePriorityChange}
                    placeholder="All Priorities"
                />
            </div>

            {hasActiveFilters && (
                <Button
                    variant="outline"
                    onClick={handleClearFilters}
                    className="w-full sm:w-auto"
                >
                    <X className="h-4 w-4 mr-2" />
                    Clear Filters
                </Button>
            )}
        </div>
    );
}

