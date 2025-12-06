import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TabsData } from "@/types";
import { useState } from "react";

interface ContentProps {
    defaultValue: string;
}

export function SelectStatus({ defaultValue = "" } : ContentProps) {
    const [ value, setValue ] = useState(defaultValue);

    const statusItems: TabsData[] = [
        { label: 'To Do', value: 'to_do' },
        { label: 'In Progress', value: 'in_progress' },
        { label: 'In Review', value: 'in_review' },
        { label: 'Done', value: 'done' },
        { label: 'Closed', value: 'closed' }
    ];

    const getColors = (value: string) => {
        const colorMap: Record<string, { bg: string; text: string }> = {
            'to_do': { bg: 'bg-blue-500', text: 'text-blue-500' },
            'in_progress': { bg: 'bg-yellow-500', text: 'text-yellow-500' },
            'in_review': { bg: 'bg-purple-500', text: 'text-purple-500' },
            'done': { bg: 'bg-green-500', text: 'text-green-500' },
            'closed': { bg: 'bg-gray-500', text: 'text-gray-500' },
        }

        return colorMap[value] || { bg: 'bg-blue-500', text: 'text-blue-500' };
    }

    return (
        <Select
            name="status"
            value={value}
            onValueChange={value => setValue(value)}
        >
            <SelectTrigger
                className="w-full cursor-pointer"
            >
                <SelectValue
                    placeholder="Select Status"
                />
            </SelectTrigger>
            <SelectContent>
                {statusItems.map(item => {
                    const colors = getColors(item.value);

                    return (
                        <SelectItem
                            key={item.value}
                            value={item.value}
                            className="cursor-pointer"
                        >
                            <span
                                className={`rounded-full size-3 ${colors.bg}`}
                            />
                            <p
                                className={colors.text}
                            >
                              {item.label}  
                            </p>
                        </SelectItem>
                    );
                })}
            </SelectContent>
        </Select>
    );
}