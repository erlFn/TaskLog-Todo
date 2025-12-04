import { DataMetrics } from "@/components/Admin/dashboard/data-metrics";
import { LabelField } from "@/components/Common/label-field";
import { RenderSkeleton } from "@/components/Common/render-skeleton";
import AppLayout from "@/layouts/app-layout";
import user from "@/routes/user";
import { BreadcrumbItem } from "@/types";
import { HardDriveDownload, Clipboard, LayoutList } from 'lucide-react'

export default function Dashboard() {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: user.dashboard.url()}
    ];

    return(
        <AppLayout
            breadcrumbs={breadcrumbs}
        >
            <div className="space-y-4">
                <LabelField
                    icon={HardDriveDownload}
                    label="Metrics"
                >
                    <div className="grid grid-cols-2 gap-2">
                        <DataMetrics
                            tasksCount={88}
                            todoCount={100}
                        />
                    </div>
                </LabelField>
                <LabelField
                    icon={Clipboard}
                    label="Tasks"
                    count={100}
                    showAll={true}
                >
                    <div className="grid grid-cols-5 gap-2">
                        <RenderSkeleton
                            count={5}
                        />
                    </div>
                </LabelField>
                <LabelField
                    icon={LayoutList}
                    label="To do"
                    count={1}
                    showAll={true}
                    isLast={true}
                >
                    <div className="grid grid-cols-5 gap-2">
                        <RenderSkeleton
                            count={10}
                        />
                    </div>
                </LabelField>
            </div>
        </AppLayout>
    );
}