export {};

declare global {
    interface Window {
        axios: any;
    }
}

declare module '@inertiajs/react' {
    interface PageProps {
        [key: string]: any;
    }
}