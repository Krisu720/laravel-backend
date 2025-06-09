import ProductCard from "@/components/product-card";
import AppLayout from "@/layouts/app-layout";

type Props = {
    products: {
        id: number;
        name: string;
        description: string;
        price: number;
        image: string;
    }[]
}
export default function Products({ products }: Props) {
    console.log(products)
    return (
        <AppLayout >
            <div className="container">
                <h1 className="mx-auto mb-6 text-center text-4xl font-bold md:text-6xl">Products</h1>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
            </div>
        </AppLayout>
    )
}
