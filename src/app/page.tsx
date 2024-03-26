"use client";

import AuctionCard from "@/components/AuctionCard";
import axios from "axios";
import { JSDOM } from "jsdom";
import { useEffect, useState } from "react";
import { Auction } from "./types/Auction";

export const revalidate = 900;

async function getAuctions(
    brand: string = "",
    productionStart: string = "",
    productionEnd: string = "",
    mileageFrom: string = "",
    mileageTo: string = ""
): Promise<Auction[]> {
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
}

export default async function Home() {
    const auctions = await getAuctions();

    return (
        <div className="max-w-7xl mx-auto">
            {auctions.length === 0 && <span>Brak aukcji.</span>}
            <ul className="grid gap-3 md:grid-cols-2 lg:grid-cols-3 place-items-start">
                {auctions.map((auction, index: number) => {
                    return (
                        <li
                            key={index}
                            className="w-full h-full rounded-lg p-4 shadow-sm shadow-indigo-100 hover:cursor-pointer hover:bg-slate-100 transition-all duration-300 flex justify-center items-start self-start">
                            <AuctionCard auction={auction} />
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
