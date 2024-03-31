"use client";

import { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

type SelectBoxProps = {
    placeholder: string;
    items: string[];
    setItem: (item: string) => void;
    defaultValue: string;
    unit?: string;
};

export default function SelectBox({ placeholder, items, setItem, defaultValue, unit }: SelectBoxProps) {
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
                <SelectTrigger className="py-6 text-sm">
                    <SelectValue placeholder={placeholder} className="text-sm" />
                </SelectTrigger>
                <SelectContent>
                    {items.map((item, index) => {
                        return (
                            <SelectItem className="text-sm" key={index} value={item}>
                                {item} {unit ? unit : ''}
                            </SelectItem>
                        );
                    })}
                </SelectContent>
            </Select>
        </div>
    );
}
