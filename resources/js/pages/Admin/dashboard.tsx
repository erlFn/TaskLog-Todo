import { DataMetrics } from "@/components/Admin/dashboard/data-metrics";
import { LabelField } from "@/components/Common/User/label-field";
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
            <LabelField
                icon={HardDrive}
                label="Data Metrics"
            >
                <div className="grid grid-cols-2 gap-4">
                    <DataMetrics
                        tasksCount={100}
                        todoCount={200}
                    />
                </div>
            </LabelField>
        </AppLayout>
    );
}