let cache = {
    timestamp: 0,
    data: null as any
}

const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes in milliseconds

async function fetchAuctions() {
    const now = Date.now();
    if (cache.data && now - cache.timestamp < CACHE_DURATION) {
        return cache.data;
    }
    try {
        const response = await fetch(`https://auta.ch/api/v1/auctions/?format=json`).then((res) => res.json());
        cache = {
            timestamp: now,
            data: response.reverse(),
        };
        return response.reverse();
    } catch(error) {
        throw new Error("Error while fetching data from auta.ch")
    }
}

export async function getAuctions(
    brand: string | null,
    productionStart: Date | null,
    productionEnd: Date | null,
    mileageFrom: number | null,
    mileageTo: number | null,
    auctionEndBefore: Date | null
): Promise<Auction[] | Error> {
    try {
        
        const auctions = await fetchAuctions();
        const filteredAuctions = auctions
            .sort((a: number, b: number) => {
                return a - b;
            })
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
                    auctionEnd: (() => {
                        const endDate = new Date(entry.end_date ?? "");
                        endDate.setHours(endDate.getHours() - 2);
                        return endDate;
                    })(),
                };

                return auction;
            });

        return filteredAuctions.reverse();
    } catch (error) {
        console.error(error);
        return new Error("Error while fetching data from auta.ch");
    }
}

export function toKebabCase(text: string) {
    return text
        .replace(/[\s_]+/g, "-")
        .replace(/([A-Z])/g, (match, letter, index) => (index > 0 ? "-" : "") + letter.toLowerCase())
        .replace(/[^a-zA-Z0-9-]/g, "")
        .replace(/^-+|-+$/g, "");
}