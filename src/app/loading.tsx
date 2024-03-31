import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div className="max-w-7xl container mx-auto">
            <ul className="grid gap-3 md:grid-cols-2 lg:grid-cols-3 place-items-start mt-6">
                {Array.from(Array(10), (_, index) => index + 1).map((index: number) => {
                    return <Skeleton key={index} className="h-[300px] w-full rounded-xl" />;
                })}
            </ul>
        </div>
    );
}
