import { LabelField } from "@/components/Common/label-field";
import { RenderSkeleton } from "@/components/Common/render-skeleton";
import AppLayout from "@/layouts/app-layout";
import admin from "@/routes/admin";
import { BreadcrumbItem } from "@/types";
import { ListTodo } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'ToDo', href: admin.todo.url() }
];

export default function Index() {
    return (
        <AppLayout
            breadcrumbs={breadcrumbs}
        >
            <div className="space-y-4">
                <LabelField
                    icon={ListTodo}
                    label="To Do Overview"
                    isLast={true}
                    hasSep={true}
                    count={12}
                >
                    <div className="grid grid-cols-5 gap-4">
                        <RenderSkeleton
                            count={12}
                            hasThin={true}
                        />
                    </div>
                </LabelField>
            </div>
        </AppLayout>
    );
}