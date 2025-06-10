import ProductCard from "@/components/product-card";
import AppLayout from "@/layouts/app-layout";
import { useState } from "react";

type Props = {
    products: {
        id: number;
        name: string;
        description: string;
        price: number;
        image: string;
        category: {
            id: number;
            name: string;
        };
    }[];
}

export default function Products({ products }: Props) {
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
    
    const categories = Array.from(new Set(products.map(product => product.category.id)))
        .map(id => products.find(product => product.category.id === id)?.category)
        .filter((category): category is { id: number; name: string } => category !== undefined)
        .sort((a, b) => a.name.localeCompare(b.name));

    const filteredProducts = selectedCategory
        ? products.filter(product => product.category.id === selectedCategory)
        : products;

    return (
        <AppLayout>
            <div className="container">
                <h1 className="mx-auto mb-6 text-center text-4xl font-bold md:text-6xl">Products</h1>
                
                <div className="mb-8 flex justify-center gap-4">
                    <button
                        onClick={() => setSelectedCategory(null)}
                        className={`rounded-lg px-4 py-2 ${
                            selectedCategory === null
                                ? "bg-black text-white"
                                : "bg-gray-200 text-black hover:bg-gray-300"
                        }`}
                    >
                        Wszystkie
                    </button>
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => setSelectedCategory(category.id)}
                            className={`rounded-lg px-4 py-2 ${
                                selectedCategory === category.id
                                    ? "bg-black text-white"
                                    : "bg-gray-200 text-black hover:bg-gray-300"
                            }`}
                        >
                            {category.name}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {filteredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
