"use client";
import * as React from "react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useEffect } from "react";

type Item = { value: string; label: string };

type ComboBoxProps = {
    placeholder: string;
    items: Item[];
    setItem: (item: string) => void;
    defaultValue: string;
};

export default function ComboBox({ placeholder, items, setItem, defaultValue }: ComboBoxProps) {
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState("");

    useEffect(() => {
        setValue(defaultValue);
    }, [defaultValue])

    return (
        <div className="w-full relative">
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-full py-6 justify-between text-sm">
                        {value ? value : placeholder}
                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent align="start" className="w-full p-0">
                    <Command className="w-full">
                        <CommandInput placeholder={placeholder} className="h-9" />
                        <CommandEmpty>Nie znaleziono.</CommandEmpty>
                        <CommandGroup className="max-h-[400px] overflow-scroll">
                            {items.map((item) => (
                                <CommandItem
                                    key={item.value}
                                    value={item.value}
                                    onSelect={() => {
                                        setValue(item.label);
                                        setItem(item.label);
                                        setOpen(false);
                                    }}
                                    className="text-sm">
                                    {item.label}
                                    <CheckIcon
                                        className={cn(
                                            "ml-auto h-4 w-4",
                                            value === item.value ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    );
}
