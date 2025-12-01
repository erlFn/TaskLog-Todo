import AppLayout from "@/layouts/app-layout";
import { welcome } from "@/routes";
import { BreadcrumbItem } from "@/types";

export default function Dashboard() {
    const breadCrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: welcome.url(),
        },
    ];

    return (
        <AppLayout
            breadcrumbs={breadCrumbs}
        >
            <p>
                Admin Dashboard
            </p>
        </AppLayout>
    );
}