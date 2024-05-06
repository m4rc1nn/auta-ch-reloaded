"use client";

import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";

export default function TimeRemainingText({ endDate }: { endDate: Date }) {
    const [timeRemaining, setTimeRemaining] = useState<string>("Wczytywanie...");

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeRemaining(getTimeDifference(new Date(), endDate));
        }, 1000);
        return () => clearInterval(interval);
    }, []);
    return (
        <span className="flex flex-row items-center gap-2">
            <PaperPlaneIcon />
            {timeRemaining}
        </span>
    );
}

function getTimeDifference(startDate: Date, endDate: Date): string {
    const timeDiff: number = endDate.getTime() - startDate.getTime();
    if (timeDiff <= 0) return "Zakończono";

    const days: number = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours: number = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes: number = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds: number = Math.floor((timeDiff % (1000 * 60)) / 1000);

    return `${days >= 1 ? `${days} dni ` : ""}${hours >= 1 ? `${hours} godzin ` : ""}${
        minutes >= 1 ? `${minutes} minut ` : ""
    }${seconds} sekund`;
}
