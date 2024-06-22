import * as React from "react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Auction } from "@/app/types/Auction";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import TimeRemainingText from "./TimeRemainingText";
import { CalendarIcon, BarChartIcon, IdCardIcon } from "@radix-ui/react-icons";

export default function AuctionCard({ auction }: { auction: Auction }) {
    return (
        <Link href={auction.link} target="_blank" className="w-full h-full self-stretch">
            <Card className="w-full h-full flex justify-between flex-col">
                <CardHeader className="p-2 md:p-4">
                    <TooltipProvider delayDuration={1}>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <CardTitle className="text-nowrap overflow-hidden text-ellipsis max-w-full">
                                    {auction.name}
                                </CardTitle>
                            </TooltipTrigger>
                            <TooltipContent side="bottom">
                                <p>{auction.name}</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <CardDescription>
                        <TimeRemainingText endDate={auction.auctionEnd} />
                    </CardDescription>
                </CardHeader>
                <CardContent className="p-2 md:p-4 relative h-full w-full">
                    <img src={auction.img}
                        width={450}
                        height={250}
                        alt={auction.name}
                        className="h-full w-full object-cover max-h-[300px] rounded-md"
                    />
                    <div className="absolute top-0 left-0 p-3 md:p-5 w-full h-full flex justify-start items-end z-10">
                        <div className="flex justify-start gap-2 p-1">
                            <Badge variant="secondary" className="flex flex-row gap-1 items-center">
                                <CalendarIcon className="max-h-[80%]" />
                                {auction.firstRegistration.toLocaleDateString()}
                            </Badge>
                            <Badge variant="secondary" className="flex flex-row gap-1 items-center">
                                <BarChartIcon className="max-h-[80%]" />
                                {auction.mileage} km
                            </Badge>
                            <Badge variant="secondary" className="flex flex-row gap-1 items-center">
                                <IdCardIcon className="max-h-[80%]" />
                                {auction.referenceNumber}
                            </Badge>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
}
