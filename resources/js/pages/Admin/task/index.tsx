import { LabelField } from "@/components/Common/label-field";
import { RenderSkeleton } from "@/components/Common/render-skeleton";
import AppLayout from "@/layouts/app-layout";
import admin from "@/routes/admin";
import { BreadcrumbItem } from "@/types";
import { Clipboard } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Tasks', href: admin.tasks.url() }
];

export default function Index() {
    return (
        <AppLayout
            breadcrumbs={breadcrumbs}
        >
            <div className="space-y-4">
                <LabelField
                    icon={Clipboard}
                    label="Tasks Overview"
                    hasSep={true}
                    isLast={true}
                >
                    <div className="grid grid-cols-5 gap-4">
                        <RenderSkeleton
                            count={18}
                            hasThin={true}
                        />
                    </div>
                </LabelField>
            </div>
        </AppLayout>
    );
}