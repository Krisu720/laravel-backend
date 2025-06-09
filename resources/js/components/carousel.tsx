import React, { useEffect, useState } from 'react'
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from './ui/carousel'
import { Button } from './ui/button'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import axios from 'axios'
import { Link } from '@inertiajs/react'

interface Product {
    id: number
    name: string
    description: string
    price: string
    image: string
}

const CarouselItems = () => {
    const [api, setApi] = useState<CarouselApi>()
    const [products, setProducts] = useState<Product[]>([])

    useEffect(() => {
        axios
            .get('/api/products') // This is a placeholder, you should replace it with your actual API endpoint
            .then(response => {
                setProducts(response.data)
            })
            .catch(error => {
                console.error('Error fetching products:', error)
            })
    }, [])

    const handleNext = () => {
        api?.scrollNext()
    }

    const handlePrev = () => {
        api?.scrollPrev()
    }
    return (
        <div className='container'>
            <div className='flex  items-center'>
                <h1 className='text-3xl'>Sales</h1>
                <div className='flex gap-2 ml-auto'>
                    <Button onClick={handlePrev} className='size-14 bg-gray-100 group hover:bg-black'>
                        <ArrowLeft className='size-6 text-black group-hover:text-white' />
                    </Button>
                    <Button onClick={handleNext} className='size-14 bg-gray-100 group hover:bg-black'>
                        <ArrowRight className='size-6 text-black group-hover:text-white' />
                    </Button>
                </div>
            </div>
            <div className='mt-4'>
                <Carousel setApi={setApi} opts={{
                    align: 'start',
                    skipSnaps: false,
                    loop: true,
                }}>
                    <CarouselContent className='flex '>
                        {products.map(product => (
                            <CarouselItem key={product.id} className='basis-1/4 cursor-pointer'>
                                <Link href={`/products/${product.id}`}>
                                    <img src={product.image} className='h-100 w-full object-cover' />
                                    <div className='bg-white p-4 '>
                                        <h1 className='font-bold'>{product.name}</h1>
                                        <h1 className='text-gray-700 text-sm'>{product.description}</h1>
                                        <h1 className='mt-2'>{product.price} PLN</h1>
                                    </div>
                                </Link>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            </div>
        </div>
    )
}

export default CarouselItems