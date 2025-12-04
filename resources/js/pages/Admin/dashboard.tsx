import { DataMetrics } from "@/components/Admin/dashboard/data-metrics";
import { LabelField } from "@/components/Common/label-field";
import { RenderSkeleton } from "@/components/Common/render-skeleton";
import AppLayout from "@/layouts/app-layout";
import { welcome } from "@/routes";
import { BreadcrumbItem } from "@/types";
import { HardDrive, Clipboard, ListTodo } from "lucide-react";

export default function Dashboard() {
    const breadCrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: welcome.url() },
    ];

    return (
        <AppLayout
            breadcrumbs={breadCrumbs}
        >
            <div className="space-y-4">
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
                <LabelField
                    icon={Clipboard}
                    label="Tasks Data"
                    showAll={true}
                    count={4}
                >
                    <div className="grid grid-cols-3 gap-2">
                        <RenderSkeleton
                            count={4}
                        />
                    </div>
                </LabelField>
                <LabelField
                    icon={ListTodo}
                    label="To Do Data"
                    showAll={true}
                    isLast={true}
                    count={2}
                >
                    <div className="grid grid-cols-4 gap-2">
                        <RenderSkeleton
                            count={2}
                        />
                    </div>
                </LabelField>
            </div>
        </AppLayout>
    );
}