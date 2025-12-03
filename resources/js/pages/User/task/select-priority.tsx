import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TabsData } from "@/types";

const selectItems: TabsData[] = [
    {
        label: 'Low',
        value: 'low',
    },
    {
        label: 'Normal',
        value: 'normal',
    },
    {
        label: 'High',
        value: 'high',
    },
    {
        label: 'Urgent',
        value: 'urgent',
    },
];

const getColors = (value: string) => {
    const colorMap: Record<string, { bg: string; text: string }> = {
        'low': { bg: 'bg-neutral-500', text: 'text-neutral-500' },
        'normal': { bg: 'bg-blue-500', text: 'text-blue-500' },
        'high': { bg: 'bg-orange-500', text: 'text-orange-500' },
        'urgent': { bg: 'bg-red-500', text: 'text-red-500' },
    };

    return colorMap[value] || { bg: 'bg-neutral-500', text: 'text-neutral-500' };
};

export function SelectPriority() {
    return (
        <Select>
            <SelectTrigger
                className="w-full cursor-pointer"
            >
                <SelectValue
                    placeholder="Select Priority"
                />
            </SelectTrigger>
            <SelectContent>
                {selectItems.map(item => {
                    const colors = getColors(item.value || 'todo');

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