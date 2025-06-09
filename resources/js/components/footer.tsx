import { Link } from '@inertiajs/react'
import React from 'react'

const Footer = () => {
    return (
        <div className='bg-gray-50 border-t p-6 flex justify-between items-center'>
            <Link href="/" className="text-3xl tracking-widest ">Monsieur</Link>
            <span className='text-gray-500'>© 2025 Monsieur - All rights reserved</span>
            <div className='flex items-center gap-4'>
                <a href="/" className="text-lg  hover:bg-black hover:text-white">Author</a>
                <a href="/" className="text-lg  hover:bg-black hover:text-white">Repository</a>
            </div>
        </div>
    )
}

export default Footer