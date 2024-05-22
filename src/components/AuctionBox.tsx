"use client";

import { Auction } from "@/app/types/Auction";
import AuctionCard from "./AuctionCard";
import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import useOnScreen from "@/hooks/useOnScreen";

export default function AuctionBox({ auctions }: { auctions: Auction[] }) {
    const [limit, setLimit] = useState<number>(15);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const buttonRef = useRef<HTMLButtonElement>(null);
    const isButtonVisible = useOnScreen(buttonRef);

    useEffect(() => {
        if (isButtonVisible && !isLoading) {
            incrementLimit();
        }
    }, [isButtonVisible]);

    const incrementLimit = () => {
        setIsLoading(true);
        setTimeout(() => {
            setLimit((prev) => prev + 15);
            setIsLoading(false);
        }, 1000);
    };

    return (
        <>
            <div className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-3 place-items-start">
                {auctions.slice(0, limit).map((auction: Auction, index: number) => {
                    return <AuctionCard key={index} auction={auction} />;
                })}
            </div>
            <div className="mt-4 mb-16 w-full flex justify-center items-center">
                <Button ref={buttonRef} onClick={incrementLimit} disabled={isLoading}>
                    {isLoading ? "Ładowanie..." : "Pokaż więcej"}
                </Button>
            </div>
        </>
    );
}
