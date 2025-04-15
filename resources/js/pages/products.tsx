import Navbar from "@/components/navbar";
import ProductCard from "@/components/product-card";

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
        <div>
            <Navbar />
            <div className="grid grid-cols-2 gap-6">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    )
}
