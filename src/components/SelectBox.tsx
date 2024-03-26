"use client";

import { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

type SelectBoxProps = {
    placeholder: string;
    items: string[];
    setItem: (item: string) => void;
    defaultValue: string;
};

export default function SelectBox({ placeholder, items, setItem, defaultValue }: SelectBoxProps) {
    const [value, setValue] = useState<string>("");

    useEffect(() => {
        setValue(defaultValue);
    }, [defaultValue]);
    return (
        <div className="w-full">
            <Select
                value={value}
                onValueChange={(v: string) => {
                    setValue(v);
                    setItem(v);
                }}>
                <SelectTrigger className="py-6 text-lg">
                    <SelectValue placeholder={placeholder} className="text-lg" />
                </SelectTrigger>
                <SelectContent>
                    {items.map((item, index) => {
                        return (
                            <SelectItem className="text-lg" key={index} value={item}>
                                {item}
                            </SelectItem>
                        );
                    })}
                </SelectContent>
            </Select>
        </div>
    );
}
