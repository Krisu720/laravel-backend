import { Product } from "@/pages/sigle-product";
import { create } from "zustand";
import {persist} from "zustand/middleware";

type ProductWithQuantity = Product & {
    quantity: number;
}

interface CartStore {
    products: ProductWithQuantity[];
    addProduct: (product: Product) => void;
    setQuantity: (product: Product, quantity: number) => void;
    removeProduct: (product: Product) => void;
    clearCart: () => void;
}

const useCartStore = create(persist<CartStore>(
    (set) => ({
        products: [],
        addProduct: (product) => set((state) => ({
            products: state.products.some((p) => p.id === product.id)
                ? state.products.map((p) =>
                    p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
                )
                : [...state.products, { ...product, quantity: 1 }],
        })),
        setQuantity: (product, quantity) => set((state) => ({
            products: state.products.map((p) => p.id === product.id ? { ...p, quantity } : p),
        })),
        removeProduct: (product) => set((state) => ({
            products: state.products.filter((p) => p.id !== product.id),
        })),
        clearCart: () => set(() => ({
            products: [],
        })),
    }),
    {
        name: "cart",
    }
))

export default useCartStore