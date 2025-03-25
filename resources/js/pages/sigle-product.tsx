import Navbar from '@/components/navbar'
import { Button } from '@/components/ui/button'
import React from 'react'

const SingleProduct = () => {
    return (
        <div>
            <Navbar />
            <div className='h-svh grid grid-cols-2'>
                <img src='shirt.png' className='object-cover bg-gray-100' />
                <div className='p-24'>
                    <h1 className='text-3xl font-medium'>Koszulka bawełniana</h1>
                    <h2 className='text-xl text-gray-500 mt-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam quos laudantium aperiam ullam rerum deserunt. Sed, molestiae.</h2>
                    <p className='text-semibold text-2xl mt-6'>634 PLN</p>
                    <div className='mt-8 flex'>

                    <Button>Dodaj produkt</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SingleProduct