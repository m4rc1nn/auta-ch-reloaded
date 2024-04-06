"use client";

import { useSearchParams } from "next/navigation";
import AuctionCard from "@/components/AuctionCard";
import { Auction } from "./types/Auction";
import FilterSheet from "@/components/FilterSheet";
import { useEffect, useState } from "react";

export default function Home() {
    const searchParams = useSearchParams();

    const brand = searchParams.get("brand");
    const productionFrom = searchParams.get("productionFrom");
    const productionTo = searchParams.get("productionTo");
    const mileageFrom = searchParams.get("mileageFrom");
    const mileageTo = searchParams.get("mileageTo");
    const auctionEndBefore = searchParams.get("auctionEndBefore");

    const [auctions, setAuctions] = useState<Auction[]>([]);

    useEffect(() => {
        (async () => {
            const auctionsResponse = await getAuctions(
                brand ? brand : null,
                productionFrom ? new Date(productionFrom) : null,
                productionTo ? new Date(productionTo) : null,
                mileageFrom ? parseInt(mileageFrom) : null,
                mileageTo ? parseInt(mileageTo) : null,
                auctionEndBefore ? new Date(auctionEndBefore) : null
            );
            if (auctionsResponse instanceof Error) return;
            setAuctions(auctionsResponse);
        })();
    }, []);

    return (
        <div className="mt-6 max-w-7xl container px-2 sm:px-3 mx-auto">
            <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div className="w-full flex flex-col">
                    <h1 className="text-3xl font-bold">Dostępne aukcje</h1>
                    <p className="mt-2 text-muted-foreground">
                        Sprawdź listę wszystkich aukcji samochodowych ze strony auta.ch
                    </p>
                </div>
                <FilterSheet />
            </div>
            {auctions.length === 0 && (
                <div className="my-6">
                    <span className="text-xl underline">Nie znaleziono aukacji dla podanych filtrów.</span>
                </div>
            )}
            <ul className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-3 place-items-start">
                {auctions.map((auction, index: number) => {
                    return <AuctionCard key={index} auction={auction} />;
                })}
            </ul>
        </div>
    );
}

async function getAuctions(
    brand: string | null,
    productionStart: Date | null,
    productionEnd: Date | null,
    mileageFrom: number | null,
    mileageTo: number | null,
    auctionEndBefore: Date | null
): Promise<Auction[] | Error> {
    try {
        const response = await fetch(`https://corsproxy.io/?https%3A%2F%2Fauta.ch%2Fapi%2Fv1%2Fauctions%2F%3Fformat%3Djson`).then((res) => res.json());

        const filteredAuctions = response
            .filter((entry: any) => {
                if (brand === null) return true;
                if (brand.trim() === "") return false;
                if (!entry.title.toLowerCase().includes(brand.toLowerCase())) return false;
                return true;
            })
            .filter((entry: any) => {
                if (productionStart === null) return true;
                const firstRegistration: Date = new Date(entry.production_date);
                if (firstRegistration.getTime() < productionStart.getTime()) return false;
                return true;
            })
            .filter((entry: any) => {
                if (productionEnd === null) return true;
                const firstRegistration: Date = new Date(entry.production_date);
                if (firstRegistration.getTime() > productionEnd.getTime()) return false;
                return true;
            })
            .filter((entry: any) => {
                if (mileageFrom === null) return true;
                const mileage: number = entry.run;
                if (mileage < mileageFrom) return false;
                return true;
            })
            .filter((entry: any) => {
                if (mileageTo === null) return true;
                const mileage: number = entry.run;
                if (mileage < mileageTo) return false;
                return true;
            })
            .filter((entry: any) => {
                if (auctionEndBefore === null) return true;
                const auctionEnd: Date = new Date(entry.end_date);
                if (auctionEnd.getTime() > auctionEndBefore.getTime()) return false;
                return true;
            })
            .map((entry: any) => {
                const link = `https://auta.ch/aukcje/licytacja/${entry.id}/${toKebabCase(entry.title)}`;
                const img = `https://auta.ch/${entry.photos}`;
                const auction: Auction = {
                    link,
                    name: entry.title,
                    img,
                    firstRegistration: new Date(entry.production_date),
                    mileage: parseInt(entry.run),
                    referenceNumber: entry.ref_id,
                    auctionEnd: new Date(entry.end_date ?? ""),
                };

                return auction;
            });

        return filteredAuctions.reverse();
    } catch (error) {
        console.error(error);
        return new Error("Error while fetching data from auta.ch");
    }
}

function toKebabCase(text: string) {
    return text
        .replace(/[\s_]+/g, "-")
        .replace(/([A-Z])/g, (match, letter, index) => (index > 0 ? "-" : "") + letter.toLowerCase())
        .replace(/[^a-zA-Z0-9-]/g, "")
        .replace(/^-+|-+$/g, "");
}
