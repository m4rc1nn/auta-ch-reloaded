"use client";

export default function Error() {
    return (
        <div className="mt-6 max-w-7xl container px-2 sm:px-3 mx-auto">
            <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div className="my-6">
                    <span className="text-xl underline">
                        Wystąpił błąd podczas przetwarzania zapytania ze strony auta.ch. Spróbuj ponownie później.
                    </span>
                </div>
            </div>
        </div>
    );
}
