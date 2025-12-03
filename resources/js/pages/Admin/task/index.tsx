import AppLayout from "@/layouts/app-layout";
import admin from "@/routes/admin";
import { BreadcrumbItem } from "@/types";

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Tasks', href: admin.tasks.url() }
];

export default function Index() {
    return (
        <AppLayout
            breadcrumbs={breadcrumbs}
        >
            <p>
                Admin Task Page
            </p>
        </AppLayout>
    );
}