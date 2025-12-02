import AppLayout from "@/layouts/app-layout";
import { welcome } from "@/routes";
import { BreadcrumbItem } from "@/types";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Tasks',
        href: welcome.url()
    }
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