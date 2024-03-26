import { Auction } from "@/app/types/Auction";

export default function AuctionCard({ auction }: { auction: Auction }) {
    return (
        <a href={"https://auta.ch/" + auction.link} className="w-full h-full flex flex-col">
            <div className="md:max-h-64 w-full rounded-md flex justify-center items-start">
                <img
                    alt={auction.name}
                    src={"https://auta.ch/" + auction.img}
                    className="max-h-[500px] md:max-h-64 w-full rounded-md object-cover transition-all duration-50 z-50"
                />
            </div>
            <div className="mt-2 h-full flex flex-col justify-between">
                <div className="w-full mb-6">
                    <div>
                        <span className="text-sm text-gray-500">{new Date().toLocaleString("pl-Pl")}</span>
                    </div>

                    <div>
                        <span className="font-medium text-[18px] md:text-xl">{auction.name}</span>
                    </div>
                </div>

                <div className="w-full mt-auto flex items-center gap-8 text-xs">
                    <div className="md:inline-flex md:shrink-0 md:items-center md:gap-2">
                        <svg
                            className="w-6 h-6 text-indigo-600"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="none"
                            viewBox="0 0 24 24">
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M10 11h2v5m-2 0h4m-2.592-8.5h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                            />
                        </svg>

                        <div className="mt-1.5 md:mt-0">
                            <p className="text-gray-500">1. rejestracja</p>

                            <p className="font-medium text-sm">{auction.firstRegistration}</p>
                        </div>
                    </div>

                    <div className="md:inline-flex md:shrink-0 md:items-center md:gap-2">
                        <svg
                            className="w-6 h-6 text-indigo-600"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="none"
                            viewBox="0 0 24 24">
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M3 15v4m6-6v6m6-4v4m6-6v6M3 11l6-5 6 5 5.5-5.5"
                            />
                        </svg>

                        <div className="mt-1.5 md:mt-0">
                            <p className="text-gray-500">Przebieg</p>

                            <p className="font-medium text-sm">{auction.mileage}</p>
                        </div>
                    </div>
                </div>
            </div>
        </a>
    );
}
