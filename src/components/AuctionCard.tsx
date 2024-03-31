import * as React from "react";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Auction } from "@/app/types/Auction";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

export default function AuctionCard({ auction }: { auction: Auction }) {
    return (
        <Link href={"https://auta.ch/" + auction.link} className="w-full h-full self-stretch">
            <Card className="w-full h-full flex justify-between flex-col">
                <CardHeader className="p-3 md:p-5">
                    <CardTitle>{auction.name}</CardTitle>
                    <CardDescription>{new Date(auction.auctionEnd).toLocaleString()}</CardDescription>
                </CardHeader>
                <CardContent className="p-3 md:p-5 relative">
                    <Image
                        src={"https://auta.ch/" + auction.img}
                        width={450}
                        height={250}
                        alt={auction.name}
                        className="object-cover max-h-[250px]"
                    />
                    <div className="absolute top-0 left-0 p-3 md:p-5 w-full h-full flex justify-start items-end z-50">
                        <div className="flex justify-start gap-2 p-1">
                            <Badge variant="secondary">{auction.firstRegistration}</Badge>
                            <Badge variant="secondary">{auction.mileage}</Badge>
                            <Badge variant="secondary">{auction.referenceNumber}</Badge>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
}
