import AppLayout from "@/layouts/app-layout";
import user from "@/routes/user";
import { BreadcrumbItem } from "@/types";

export default function Dashboard() {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: user.dashboard.url()}
    ];

    return(
        <AppLayout
            breadcrumbs={breadcrumbs}
        >
            <p>
                User Dashboard
            </p>
        </AppLayout>
    );
}