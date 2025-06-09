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
                <h1 className="text-6xl font-bold mx-auto mb-6">Products</h1>
            <div className="grid grid-cols-4 gap-6">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
            </div>
        </AppLayout>
    )
}
