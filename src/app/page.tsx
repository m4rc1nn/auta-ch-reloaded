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

    const [auctions, setAuctions] = useState<Auction[] | null>(null);

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

    if (auctions === null) {
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
                <div className="my-6 flex justify-center items-center">
                    <div role="status">
                        <svg
                            aria-hidden="true"
                            className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                            viewBox="0 0 100 101"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="currentColor"
                            />
                            <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentFill"
                            />
                        </svg>
                    </div>
                </div>
            </div>
        );
    }

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
        const response = await fetch(
            `https://corsproxy.io/?https%3A%2F%2Fauta.ch%2Fapi%2Fv1%2Fauctions%2F%3Fformat%3Djson`
        ).then((res) => res.json());

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
