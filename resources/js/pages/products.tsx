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
        <div >
            <Navbar />
            <div className="p-6 ">
                <div className="bg-gray-100 h-full">
                </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    )
}
