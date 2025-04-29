import Navbar from '@/components/navbar'
import { Button } from '@/components/ui/button'
import React from 'react'
import useCartStore from '@/hooks/use-cart-store'

export type Product = {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string | null;
}

const SingleProduct = (props: { product: Product }) => {

    const {addProduct} = useCartStore();

    return (
        <div>
            <Navbar />
            <div className='h-svh grid grid-cols-2'>
                <img src={props.product.image ? "http://localhost:8000/storage/" + props.product.image : 'https://placehold.co/600x600'} className='object-cover bg-gray-100 w-full' />
                <div className='p-24'>
                    <h1 className='text-3xl font-medium'>{props.product.name}</h1>
                    <h2 className='text-xl text-gray-500 mt-4'>{props.product.description}</h2>
                    <p className='text-semibold text-2xl mt-6'>{props.product.price.toFixed(2)} PLN</p>
                    <div className='mt-8 flex'>
                        <Button onClick={() => addProduct(props.product)}>Dodaj produkt</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SingleProduct