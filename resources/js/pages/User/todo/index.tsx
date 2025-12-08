import AppLayout from "@/layouts/app-layout";
import user from "@/routes/user";
import { BreadcrumbItem } from "@/types";
import { CreateToDoDialog } from "./create-todo-dialog";
import { LabelField } from "@/components/Common/label-field";
import { Box }  from 'lucide-react';
import { RenderSkeleton } from "@/components/Common/render-skeleton";

export default function Index() {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'ToDo', href: user.todo.url() }
    ];

    return (
        <AppLayout
            breadcrumbs={breadcrumbs}
        >
            <div className="space-y-4">
                <CreateToDoDialog/>

                <LabelField
                    icon={Box}
                    label="Containers"
                    isLast={true}
                    hasSep={true}
                >
                    <p>
                        asdasd
                    </p>
                </LabelField>
            </div>
        </AppLayout>
    );
}