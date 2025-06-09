import { AnimatedNumber } from '@/components/ui/animated-number'
import { Button } from '@/components/ui/button'
import { InfiniteSlider } from '@/components/ui/infinite-slider'
import AppLayout from '@/layouts/app-layout'
import { useInView } from 'framer-motion'
import { ArrowUpRightIcon, LeafIcon } from 'lucide-react'
import React, { useRef, useState } from 'react'
import CarouselItems from '@/components/carousel'

const Mainpage = () => {

    const [value, setValue] = useState(0);
    const [value2, setValue2] = useState(0);
    const [value3, setValue3] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref);

    if (isInView && value === 0 && value2 === 0 && value3 === 0) {
        setValue(1000000);
        setValue2(290000);
        setValue3(53);
    }

    const section = [
        {
            title: 'Sales through the world',
            value: value,
        },
        {
            title: 'Customers',
            value: value2,
        },
        {
            title: 'Years of experience',
            value: value3,
        },
    ]

    return (
        <AppLayout>
            <div className='h-[calc(100svh-68px)] flex flex-col'>
                <div className='h-full px-6 pb-6'>
                    <div className='bg-gray-100 h-full grid grid-cols-2 gap-6 overflow-hidden relative'>
                        <InfiniteSlider className='absolute bottom-0'>
                            <h1 className='text-[190px] font-extrabold text-white'>MONSIEUR</h1>
                            <h1 className='text-[190px] font-extrabold text-white ml-12'>MONSIEUR</h1>
                            <h1 className='text-[190px] font-extrabold text-white ml-12'>MONSIEUR</h1>
                        </InfiniteSlider>
                        <div className='flex flex-col justify-center items-start gap-6 p-12'>
                            <h1 className='text-3xl font-thin'>Wear it classic</h1>
                            <h2 className='text-6xl font-extrabold'>Men's Collection</h2>
                            <h3 className='text-2xl text-gray-600'>25% OFF with code "SUIT2025"</h3>
                            <Button size="lg" className='mt-6 w-50 py-8 text-xl'>Shop Now <ArrowUpRightIcon className='size-6' /></Button>
                        </div>
                        <div className='relative p-12'>
                            <div className='border-10 border-white top-1/6 absolute h-140 w-140' />
                            <img src="suit.png" alt="suit" className='h-full object-contain absolute w-full' />
                        </div>
                    </div>
                </div>
            </div>

         <CarouselItems />
            <div ref={ref} className='grid grid-cols-4 container my-24'>
                <div className=''>
                    <h1 className='text-7xl font-thin'>Over</h1>
                </div>
                {section.map((item, index) => (
                    <div key={index} className='flex flex-col items-center justify-centers'>
                        <AnimatedNumber
                            className='inline-flex items-center font-mono text-3xl font-light text-zinc-800 dark:text-zinc-50'
                            springOptions={{
                                bounce: 0,
                                duration: 2000,
                            }}
                            value={item.value}
                        />
                        <span className='mt-6 text-gray-600'>{item.title}</span>
                    </div>
                ))}

            </div>
            <div className='container'>
                <div className='flex flex-col items-center justify-center'>
                    <h1 className='text-3xl font-thin'>Everything you need</h1>
                    <h1 className='text-6xl font-extrabold'>to know</h1>
                </div>
                <div className='grid grid-cols-2 gap-6 mt-12'>
                    <div className='p-12 bg-black '>
                        <h1 className='text-white text-5xl font-thin'>
                            100%
                            <span className='text-3xl ml-2'>Cotton</span>
                        </h1>
                        <p className='mt-12 text-white'>
                            We use only the best materials to make our products. We are proud to say that our products are made from 100% cotton.
                        </p>
                    </div>
                    <div className='p-12 border'>
                        <h1 className='text-3xl font-thin text-center'>Your Suit - Your Style</h1>
                        <p className='mt-12 text-gray-600 text-center '>
                            We are a team of experts who are dedicated to providing the best products to our customers.
                        </p>
                    </div>
                    <div className='h-60  relative overflow-hidden text-end flex flex-col border-2 border-black bg-gray-200'>
                        <img src="clock.webp" alt="suit" className='scale-150  absolute h-full' />
                        <h1 className='text-3xl font-thin p-4'>Fitting addons</h1>
                        <h2 className='text-sm mt-12 w-1/2 ml-auto p-4'>We combine the best color combinations to make your suit look perfect. Make your suit look perfect with diffrent variants of accessories.</h2>
                    </div>
                    <div className='p-6 bg-green-700'>
                        <h1 className='text-white text-3xl font-thin'>ECO FRIENDLY <LeafIcon className='size-6' /> </h1>
                        <p className='mt-12 text-white'>
                            We are a team of experts who are dedicated to protecting our environment. Our packaging is made from recycled materials.
                        </p>
                    </div>
                </div>
            </div>
            <div className='my-30'>
                <h1 className='text-[200px] leading-none font-extrabold text-gray-200 text-center'>
                    Monsieur
                </h1>
                <h1 className='text-[300px] bg-clip-text text-transparent bg-radial-[at_50%_72%] from-slate-200 via-slate-950 to-amber-900 to-90% leading-none font-extrabold text-center'>
                    2025
                </h1>
            </div>
        </AppLayout>
    )
}

export default Mainpage