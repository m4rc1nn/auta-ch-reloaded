import AuctionCard from "@/components/AuctionCard";
import axios from "axios";
import { JSDOM } from "jsdom";
import { Auction } from "./types/Auction";
import FilterSheet from "@/components/FilterSheet";

export default async function Home({ searchParams }: { searchParams: any }) {
    const { brand, productionFrom, productionTo, mileageFrom, mileageTo } = searchParams;
    const auctions = await getAuctions(brand, productionFrom, productionTo, mileageFrom, mileageTo);

    if (auctions instanceof Error) {
        return (
            <div className="mt-6 max-w-7xl container px-2 sm:px-3 mx-auto">
                <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                    <div className="my-6">
                        <span className="text-xl underline">Wystąpił błąd podczas przetwarzania zapytania ze strony auta.ch. Spróbuj ponownie później.</span>
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
    brand: string = "",
    productionStart: string = "",
    productionEnd: string = "",
    mileageFrom: string = "",
    mileageTo: string = ""
): Promise<Auction[] | Error> {
    try {
        const { data } = await axios.get(
            `https://auta.ch/aukcje/?phrase=&brand=${brand}&production_date_from=${productionStart}&production_date_to=${productionEnd}&run_from=${mileageFrom}&run_to=${mileageTo}`,
            { responseType: "document" }
        );

        const dom = new JSDOM(data);
        const document = dom.window.document;

        const auctionEntries = [...document.querySelectorAll(".auction-entry")].map((entry) => {
            const link = entry.querySelector("a")?.getAttribute("href") ?? "";
            const img = entry.querySelector(".auction-entry-image")?.getAttribute("src") ?? "";
            const name = entry.querySelector(".auction-entry-info h4 a")?.textContent ?? "";
            const firstRegistration = entry.querySelector(".auction-entry-info p b")?.textContent ?? "";
            const mileage = entry.querySelectorAll(".auction-entry-info p b")[1]?.textContent ?? "";
            const referenceNumber = entry.querySelector("b.reference-number-field")?.textContent ?? "";
            const auctionEnd = new Date(entry.getAttribute("data-end") ?? "1711398806025") ?? new Date();

            const auction: Auction = {
                link,
                name,
                img,
                firstRegistration,
                mileage,
                referenceNumber,
                auctionEnd,
            };

            return auction;
        });
        return auctionEntries;
    } catch (error) {
        console.error(error);
        return new Error("Error while fetching data from auta.ch");
    }
}
