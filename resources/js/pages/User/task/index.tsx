import AppLayout from "@/layouts/app-layout";
import user from "@/routes/user";
import { BreadcrumbItem } from "@/types";

export default function Index() {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Tasks', href: user.tasks.url() }
    ];

    return (
        <AppLayout
            breadcrumbs={breadcrumbs}
        >
            <p>
                User Tasks Page
            </p>
        </AppLayout>
    );
}