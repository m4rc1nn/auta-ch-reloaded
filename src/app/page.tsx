import FilterSheet from "@/components/FilterSheet";
import AuctionBox from "@/components/AuctionBox";
import { getAuctions } from "@/utils/auctionsUtil";

export default async function Home({ searchParams }: { searchParams: any }) {
    const { brand, productionFrom, productionTo, mileageFrom, mileageTo, auctionEndBefore } = searchParams;
    const auctions = await getAuctions(
        brand ? brand : null,
        productionFrom ? new Date(productionFrom) : null,
        productionTo ? new Date(productionTo) : null,
        mileageFrom ? parseInt(mileageFrom) : null,
        mileageTo ? parseInt(mileageTo) : null,
        auctionEndBefore ? new Date(auctionEndBefore) : null
    );

    if (auctions instanceof Error) {
        return (
            <div className="mt-6 max-w-7xl container px-2 sm:px-3 mx-auto">
                <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                    <div className="my-6">
                        <span className="text-xl underline">
                            Wystąpił błąd podczas przetwarzania zapytania ze strony auta.ch. Spróbuj ponownie później.
                        </span>
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
            <AuctionBox auctions={auctions} />
        </div>
    );
}
