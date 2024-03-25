"use client";

export default function NavBar() {
    return (
        <nav className="w-full bg-gray-900 border-b z-[100] mb-8">
            <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
                <a href="https://auta.ch" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src="https://auta.ch/static/website/img/autach.png" className="h-6 sm:h-8" alt="Flowbite Logo" />
                </a>
                <div className="flex items-center space-x-6 rtl:space-x-reverse">
                    <button
                        type="button"
                        className="text-white bg-indigo-700 hover:bg-indigo-800 font-medium rounded-lg text-sm px-4 py-2 text-center">
                        O projekcie
                    </button>
                </div>
            </div>
        </nav>
    );
}
