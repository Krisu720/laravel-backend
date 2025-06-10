import { AnimatedNumber } from '@/components/ui/animated-number'
import { Button } from '@/components/ui/button'
import { InfiniteSlider } from '@/components/ui/infinite-slider'
import AppLayout from '@/layouts/app-layout'
import { useInView } from 'framer-motion'
import { ArrowUpRightIcon, LeafIcon } from 'lucide-react'
import React, { useRef, useState } from 'react'
import CarouselItems from '@/components/carousel'
import { Link } from '@inertiajs/react'

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
            <div className='flex flex-col md:h-[calc(100svh-68px)]'>
                <div className='h-full px-4 pb-4 md:px-6 md:pb-6'>
                    <div className='bg-gray-100 h-full grid grid-cols-1 md:grid-cols-2 gap-6 overflow-hidden relative'>
                        <InfiniteSlider className='absolute bottom-0'>
                            <h1 className='text-8xl font-extrabold text-white md:text-[190px]'>MONSIEUR</h1>
                            <h1 className='ml-12 text-8xl font-extrabold text-white md:text-[190px]'>MONSIEUR</h1>
                            <h1 className='ml-12 text-8xl font-extrabold text-white md:text-[190px]'>MONSIEUR</h1>
                        </InfiniteSlider>
                        <div className='flex flex-col items-start justify-center gap-6 p-6 md:p-12'>
                            <h1 className='text-2xl font-thin md:text-3xl'>Wear it classic</h1>
                            <h2 className='text-4xl font-extrabold md:text-6xl'>Men's Collection</h2>
                            <h3 className='text-xl text-gray-600 md:text-2xl'>Get it now to be a gentleman</h3>
                            <Link href="/products">
                                <Button size="lg" className='w-50 mt-6 py-8 text-lg md:text-xl'>
                                    Shop Now <ArrowUpRightIcon className='size-6' />
                                </Button>
                            </Link>
                        </div>
                        <div className='relative h-96 p-6 md:h-auto md:p-12'>
                            <div className='border-10 border-white top-1/6 absolute h-140 w-140' />
                            <img src="suit.png" alt="suit" className='h-full w-full absolute object-contain' />
                        </div>
                    </div>
                </div>
            </div>

         <CarouselItems />
            <div ref={ref} className='container my-12 grid grid-cols-1 gap-8 md:my-24 md:grid-cols-4 md:gap-4'>
                <div className='text-center md:text-left'>
                    <h1 className='text-5xl font-thin md:text-7xl'>Over</h1>
                </div>
                {section.map((item, index) => (
                    <div key={index} className='flex flex-col items-center justify-centers'>
                        <AnimatedNumber
                            className='inline-flex items-center font-mono text-2xl font-light text-zinc-800 dark:text-zinc-50 md:text-3xl'
                            springOptions={{
                                bounce: 0,
                                duration: 2000,
                            }}
                            value={item.value}
                        />
                        <span className='mt-6 text-center text-gray-600'>{item.title}</span>
                    </div>
                ))}

            </div>
            <div className='container'>
                <div className='flex flex-col items-center justify-center text-center'>
                    <h1 className='text-2xl font-thin md:text-3xl'>Everything you need</h1>
                    <h1 className='text-4xl font-extrabold md:text-6xl'>to know</h1>
                </div>
                <div className='mt-12 grid grid-cols-1 gap-6 md:grid-cols-2'>
                    <div className='bg-black p-6 md:p-12 '>
                        <h1 className='text-4xl font-thin text-white md:text-5xl'>
                            100%
                            <span className='ml-2 text-2xl md:text-3xl'>Cotton</span>
                        </h1>
                        <p className='mt-12 text-white'>
                            We use only the best materials to make our products. We are proud to say that our products are made from 100% cotton.
                        </p>
                    </div>
                    <div className='border p-6 md:p-12'>
                        <h1 className='text-center text-2xl font-thin md:text-3xl'>Your Suit - Your Style</h1>
                        <p className='mt-12 text-center text-gray-600 '>
                            We are a team of experts who are dedicated to providing the best products to our customers.
                        </p>
                    </div>
                    <div className='relative flex h-60 flex-col overflow-hidden border-2 border-black bg-gray-200 text-end'>
                        <img src="clock.webp" alt="suit" className='absolute h-full scale-150' />
                        <h1 className='p-4 text-2xl font-thin md:text-3xl'>Fitting addons</h1>
                        <h2 className='ml-auto mt-12 w-full p-4 text-sm md:w-1/2'>We combine the best color combinations to make your suit look perfect. Make your suit look perfect with diffrent variants of accessories.</h2>
                    </div>
                    <div className='bg-green-700 p-6'>
                        <h1 className='text-2xl font-thin text-white md:text-3xl'>ECO FRIENDLY <LeafIcon className='size-6' /> </h1>
                        <p className='mt-12 text-white'>
                            We are a team of experts who are dedicated to protecting our environment. Our packaging is made from recycled materials.
                        </p>
                    </div>
                </div>
            </div>
            <div className='my-16 md:my-30'>
                <h1 className='text-center text-8xl font-extrabold leading-none text-gray-200 md:text-[200px]'>
                    Monsieur
                </h1>
                <h1 className='bg-radial-[at_50%_72%] to-90% text-9xl font-extrabold leading-none text-transparent bg-clip-text text-center from-slate-200 via-slate-950 to-amber-900 md:text-[300px]'>
                    2025
                </h1>
            </div>
        </AppLayout>
    )
}

export default Mainpage