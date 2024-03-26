"use client";

import { useEffect, useState } from "react";
import ComboBox from "./ComboBox";
import SelectBox from "./SelectBox";
import Link from "next/link";

const cars = [
    { value: "Audi", label: "Audi" },
    { value: "Toyota", label: "Toyota" },
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

type FillterBlockProps = {
    brandSQ: string, productionFromSQ: string, productionToSQ: string, mileageFromSQ: string, mileageToSQ: string
}
export default function FillterBlock({brandSQ, productionFromSQ, productionToSQ, mileageFromSQ, mileageToSQ} : FillterBlockProps) {
    const [brand, setBrand] = useState<string>("");
    const [productionFrom, setProductionFrom] = useState<string>("");
    const [productionTo, setProductionTo] = useState<string>("");
    const [mileageFrom, setMileageFrom] = useState<string>("");
    const [mileageTo, setMileageTo] = useState<string>("");

    useEffect(() => {
        setBrand(brandSQ);
        setProductionFrom(productionFromSQ);
        setProductionTo(productionToSQ);
        setMileageFrom(mileageFromSQ);
        setMileageTo(mileageToSQ);
    }, [])

    return (
        <form action={"/"} className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full md:w-1/2">
            <div className="md:col-span-2">
                <ComboBox placeholder="Wybierz markę" items={cars} setItem={setBrand} defaultValue={brand} />
            </div>
            <div>
                <SelectBox placeholder="Rok produkcji od:" items={years} setItem={setProductionFrom} defaultValue={productionFrom} />
            </div>
            <div>
                <SelectBox placeholder="Rok produkcji do:" items={years} setItem={setProductionTo} defaultValue={productionTo} />
            </div>
            <div>
                <SelectBox placeholder="Przebieg od:" items={mileages} setItem={setMileageFrom} defaultValue={mileageFrom}/>
            </div>
            <div>
                <SelectBox placeholder="Przebieg do:" items={mileages} setItem={setMileageTo} defaultValue={mileageTo} />
            </div>
            <div>
                <Link href={"./"}>
                    <button className="w-full text-white bg-red-500 hover:bg-red-600 font-medium rounded-lg text-lg px-4 py-2 text-center">
                        Wyczyść
                    </button>
                </Link>
            </div>
            <div>
                <button
                    type="submit"
                    className="w-full text-white bg-indigo-700 hover:bg-indigo-800 font-medium rounded-lg text-lg px-4 py-2 text-center">
                    Wyszukaj
                </button>
            </div>
            <input type="hidden" name="brand" value={brand} />
            <input type="hidden" name="productionFrom" value={productionFrom} />
            <input type="hidden" name="productionTo" value={productionTo} />
            <input type="hidden" name="mileageFrom" value={mileageFrom} />
            <input type="hidden" name="mileageTo" value={mileageTo} />
        </form>
    );
}
