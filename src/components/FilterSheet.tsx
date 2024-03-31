"use client";

import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

import { useState } from "react";
import ComboBox from "./ComboBox";
import SelectBox from "./SelectBox";

const cars = [
    { value: "Audi", label: "Audi" },
    { value: "Volkswagen", label: "Volkswagen" },
    { value: "Mercedes", label: "Mercedes" },
    { value: "BMW", label: "BMW" },
    { value: "Porsche", label: "Porsche" },
    { value: "Skoda", label: "Skoda" },
    { value: "Toyota", label: "Toyota" },
    { value: "Tesla", label: "Tesla" },
    { value: "Kia", label: "Kia" },
    { value: "Hyundai", label: "Hyundai" },
    { value: "Opel", label: "Opel" },
    { value: "Renault", label: "Renault" },
    { value: "Volvo", label: "Volvo" },
    { value: "Nissan", label: "Nissan" },
    { value: "Subaru", label: "Subaru" },
    { value: "Lamborghini", label: "Lamborghini" },
    { value: "Ferarri", label: "Ferarri" },
    { value: "Seat", label: "Seat" },
    { value: "Dacia", label: "Dacia" },
    { value: "Honda", label: "Honda" },
    { value: "Mazda", label: "Mazda" },
    { value: "Ford", label: "Ford" },
    { value: "Fiat", label: "Fiat" },
    { value: "Land Rover", label: "Land Rover" },
    { value: "Range Rover", label: "Range Rover" },
    { value: "Mini", label: "Mini" },
    { value: "Citroen", label: "Citroen" },
    { value: "Suzuki", label: "Suzuki" },
    { value: "Peugeot", label: "Peugeot" },
    { value: "MAN", label: "MAN" },
    { value: "SAAB", label: "SAAB" },
];

const yearsMin = 1900;
const yearsMax = 2024;
const years = Array.from({ length: yearsMax - yearsMin + 1 }, (_, i) => (i + yearsMin).toString());

const mileageMin = 0;
const mileageMax = 500000;
const mileageBy = 5000;
const mileages: string[] = [];

for (let currentMileage = mileageMin; currentMileage <= mileageMax; currentMileage += mileageBy) {
    mileages.push(currentMileage.toString());
}

export default function FilterSheet() {
    const [brand, setBrand] = useState<string>("");
    const [productionFrom, setProductionFrom] = useState<string>("");
    const [productionTo, setProductionTo] = useState<string>("");
    const [mileageFrom, setMileageFrom] = useState<string>("");
    const [mileageTo, setMileageTo] = useState<string>("");
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="gap-1.5 text-sm">
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M5.5 3C4.67157 3 4 3.67157 4 4.5C4 5.32843 4.67157 6 5.5 6C6.32843 6 7 5.32843 7 4.5C7 3.67157 6.32843 3 5.5 3ZM3 5C3.01671 5 3.03323 4.99918 3.04952 4.99758C3.28022 6.1399 4.28967 7 5.5 7C6.71033 7 7.71978 6.1399 7.95048 4.99758C7.96677 4.99918 7.98329 5 8 5H13.5C13.7761 5 14 4.77614 14 4.5C14 4.22386 13.7761 4 13.5 4H8C7.98329 4 7.96677 4.00082 7.95048 4.00242C7.71978 2.86009 6.71033 2 5.5 2C4.28967 2 3.28022 2.86009 3.04952 4.00242C3.03323 4.00082 3.01671 4 3 4H1.5C1.22386 4 1 4.22386 1 4.5C1 4.77614 1.22386 5 1.5 5H3ZM11.9505 10.9976C11.7198 12.1399 10.7103 13 9.5 13C8.28967 13 7.28022 12.1399 7.04952 10.9976C7.03323 10.9992 7.01671 11 7 11H1.5C1.22386 11 1 10.7761 1 10.5C1 10.2239 1.22386 10 1.5 10H7C7.01671 10 7.03323 10.0008 7.04952 10.0024C7.28022 8.8601 8.28967 8 9.5 8C10.7103 8 11.7198 8.8601 11.9505 10.0024C11.9668 10.0008 11.9833 10 12 10H13.5C13.7761 10 14 10.2239 14 10.5C14 10.7761 13.7761 11 13.5 11H12C11.9833 11 11.9668 10.9992 11.9505 10.9976ZM8 10.5C8 9.67157 8.67157 9 9.5 9C10.3284 9 11 9.67157 11 10.5C11 11.3284 10.3284 12 9.5 12C8.67157 12 8 11.3284 8 10.5Z"
                            fill="currentColor"
                            fillRule="evenodd"
                            clipRule="evenodd"></path>
                    </svg>
                    Filtruj
                </Button>
            </SheetTrigger>
            <SheetContent className="p-3 sm:p-6">
                <SheetHeader>
                    <SheetTitle>Filtruj wyniki</SheetTitle>
                    <SheetDescription>Podaj zaawansowane dane o samochodach i pofiltruj aukcje.</SheetDescription>
                </SheetHeader>
                <div className="grid gap-4 py-4">
                    <div className="w-full">
                        <ComboBox placeholder="Wybierz markę" items={cars} setItem={setBrand} defaultValue={brand} />
                    </div>
                    <div className="w-full">
                        <SelectBox
                            placeholder="Rok produkcji od:"
                            items={years}
                            setItem={setProductionFrom}
                            defaultValue={productionFrom}
                        />
                    </div>
                    <div className="w-full">
                        <SelectBox
                            placeholder="Rok produkcji do:"
                            items={years.reverse()}
                            setItem={setProductionTo}
                            defaultValue={productionTo}
                        />
                    </div>
                    <div className="w-full">
                        <SelectBox
                            placeholder="Przebieg od:"
                            items={mileages}
                            setItem={setMileageFrom}
                            defaultValue={mileageFrom}
                        />
                    </div>
                    <div className="w-full">
                        <SelectBox
                            placeholder="Przebieg do:"
                            items={mileages.reverse()}
                            setItem={setMileageTo}
                            defaultValue={mileageTo}
                        />
                    </div>
                </div>
                <SheetFooter>
                    <SheetClose asChild>
                        <form action={"./"} className="w-full">
                            <input type="hidden" name="brand" value={brand} />
                            <input type="hidden" name="productionFrom" value={productionFrom} />
                            <input type="hidden" name="productionTo" value={productionTo} />
                            <input type="hidden" name="mileageFrom" value={mileageFrom} />
                            <input type="hidden" name="mileageTo" value={mileageTo} />
                            <Button type="submit" className="w-full sm:w-fit">Pokaż wyniki</Button>
                        </form>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}
