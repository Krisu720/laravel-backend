import React from 'react'

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string | null;
}

const ProductCard = (props: { product: Product }) => {
  return (
    <a href={'/product/' + props.product.id}>
      {props.product.image ? <img src={"http://localhost:8000/storage/" + props.product.image} className='h-250 object-cover w-full bg-gray-100' />
        : <img src='https://placehold.co/600x600' className='h-250 object-cover w-full bg-gray-100' />}
      <div className='flex flex-col gap-2 p-6'>
        <h1 className='text-lg font-medium'>{props.product.name}</h1>
        <h1 className='text-lg text-gray-500'>{props.product.description}</h1>
        <h1 >{props.product.price.toFixed(2)} PLN</h1>
      </div>
    </a>
  )
}

export default ProductCard