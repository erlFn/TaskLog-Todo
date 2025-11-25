export {};

declare global {
    interface Window {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        axios: any;
    }
}

declare module '@inertiajs/react' {
    interface PageProps {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        [key: string]: any;
    }
}