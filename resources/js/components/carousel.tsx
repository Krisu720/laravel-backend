import React, { useState } from 'react'
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from './ui/carousel'
import { Button } from './ui/button'
import { ArrowLeft, ArrowRight } from 'lucide-react'

const CarouselItems = () => {
    const [api, setApi] = useState<CarouselApi>()

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
                        {Array.from({ length: 8 }).map((_, index) => (
                            <CarouselItem key={index} className='basis-1/4'>
                                <img src="suitproduct.webp" className='h-100 w-full object-cover' />
                                <div className='bg-white p-4 '>
                                    <h1 className='font-bold'>Men's Suit</h1>
                                    <h1 className='text-gray-700 text-sm'>100% Cotton Blue Suit </h1>
                                    <h1 className='mt-2'>80.99 PLN</h1>
                                </div>
                            </CarouselItem>
                        ))}

                    </CarouselContent>
                </Carousel>
            </div>
        </div>
    )
}

export default CarouselItems