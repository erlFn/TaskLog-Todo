import { DataMetrics } from "@/components/Admin/dashboard/data-metrics";
import { Separator } from "@/components/ui/separator";
import AppLayout from "@/layouts/app-layout";
import { welcome } from "@/routes";
import { BreadcrumbItem } from "@/types";
import { HardDrive } from "lucide-react";

export default function Dashboard() {
    const breadCrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: welcome.url() },
    ];

    return (
        <AppLayout
            breadcrumbs={breadCrumbs}
        >
            <div className="w-full flex flex-col gap-2">
                <span className="flex items-center gap-2 text-muted-foreground text-xs">
                    <HardDrive
                        className="size-4"
                    />
                    <p>
                        Data Metrics
                    </p>
                </span>
                <div className="grid grid-cols-2 gap-4">
                    <DataMetrics/>
                </div>
            </div>
            <Separator
                className="my-4"
            />
        </AppLayout>
    );
}