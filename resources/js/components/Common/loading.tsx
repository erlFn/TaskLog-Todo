import { Spinner } from "../ui/spinner";

export function Loading() {
    return (
        <div className="inset-0 fixed z-50 flex items-center justify-center bg-background/70 pointer-events-none">
            <Spinner/>
        </div>
    );
}