import { Button } from '@/components/ui/button'
import React from 'react'
import useCartStore from '@/hooks/use-cart-store'
import { MinusIcon, PlusIcon } from 'lucide-react'
import { Group, Button as NumberButton,Input as AriaInput, NumberField } from "react-aria-components";
import AppLayout from '@/layouts/app-layout'
import CarouselItems from '@/components/carousel'
export type Product = {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string | null;
}

const SingleProduct = (props: { product: Product }) => {
    const { addProduct, products, setQuantity, removeProduct } = useCartStore();

    const cartProduct = products.find(p => p.id === props.product.id);

    return (
        <AppLayout>
            <div className='grid grid-cols-2 container'>
                <img src={props.product.image ? "http://localhost:8000/storage/" + props.product.image : 'https://placehold.co/600x600'} className='object-cover bg-gray-100 w-full' />
                <div className='p-24'>
                    <h1 className='text-3xl font-medium'>{props.product.name}</h1>
                    <h2 className='text-xl text-gray-500 mt-4'>{props.product.description}</h2>
                    <p className='text-semibold text-2xl mt-6'>{props.product.price.toFixed(2)} PLN</p>
                    <div className='mt-8 flex'>
                        {cartProduct ? (
                            <div className="w-32">
                                <NumberField defaultValue={cartProduct.quantity} minValue={0} onChange={v => v === 0 ? removeProduct(cartProduct) : setQuantity(cartProduct, v)}>
                                    <Group className="border-input data-focus-within:border-ring data-focus-within:ring-ring/50 data-focus-within:has-aria-invalid:ring-destructive/20 dark:data-focus-within:has-aria-invalid:ring-destructive/40 data-focus-within:has-aria-invalid:border-destructive relative inline-flex h-9 w-full items-center overflow-hidden rounded-md border text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none data-disabled:opacity-50 data-focus-within:ring-[3px]">
                                        <NumberButton
                                            slot="decrement"
                                            className="border-input bg-background text-muted-foreground/80 hover:bg-accent hover:text-foreground -ms-px flex aspect-square h-[inherit] items-center justify-center rounded-s-md border text-sm transition-[color,box-shadow] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                                        >
                                            <MinusIcon size={16} aria-hidden="true" />
                                        </NumberButton>
                                        <AriaInput className="bg-background text-foreground w-full grow px-3 py-2 text-center tabular-nums" />
                                        <NumberButton
                                            slot="increment"
                                            className="border-input bg-background text-muted-foreground/80 hover:bg-accent hover:text-foreground -me-px flex aspect-square h-[inherit] items-center justify-center rounded-e-md border text-sm transition-[color,box-shadow] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                                        >
                                            <PlusIcon size={16} aria-hidden="true" />
                                        </NumberButton>
                                    </Group>
                                </NumberField>
                            </div>
                        ) : (
                            <Button onClick={() => addProduct(props.product)}>Add product</Button>
                        )}
                    </div>
                </div>
            </div>
            <div className='container'>
                <h1 className='text-6xl font-bold mx-auto mb-6'>Other products</h1>
                <CarouselItems />
            </div>
        </AppLayout>
    )
}

export default SingleProduct