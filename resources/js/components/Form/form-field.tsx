import { Label } from "../ui/label";

interface ContentProps {
    label: string;
    children: React.ReactNode;
}

export function FormField({ label, children } : ContentProps) {
    return (
        <div className="w-full flex flex-col gap-1">
            <Label
                className="text-muted-foreground text-xs"
            >
                {label}
            </Label>
            {children}
        </div>
    );
}