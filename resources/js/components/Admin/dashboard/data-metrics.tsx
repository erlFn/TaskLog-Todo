import { Clipboard, LayoutList } from "lucide-react";

interface ContentProps {
    tasksCount: number;
    todoCount: number;
}

export function DataMetrics({ tasksCount, todoCount } : ContentProps) {
    const style = 'p-4 rounded-sm border flex flex-col gap-4'; 

    const renderLabel = (label: string) => {
        const elements = [];

        elements.push(
            <p className="text-sm" key={label}>
                {label}
            </p>
        );

        return elements;
    };

    return (
        <>
            <div className={`${style} border-sky-400/50 bg-sky-400/10`}>
                <span className="flex items-center gap-2 text-muted-foreground">
                    <Clipboard
                        className="size-4"
                    />
                    {renderLabel('Tasks')}
                </span>
                <p className="text-sky-600 text-4xl font-mono font-light">
                    {tasksCount}
                </p>
            </div>
            <div className={`${style} border-teal-400/50 bg-teal-400/10`}>
                <span className="flex items-center gap-2 text-muted-foreground">
                    <LayoutList
                        className="size-4"
                    />
                    {renderLabel('To Do')}
                </span>
                <p className="text-teal-600 text-4xl font-mono font-light">
                    {todoCount}
                </p>
            </div>
        </>
    );
}