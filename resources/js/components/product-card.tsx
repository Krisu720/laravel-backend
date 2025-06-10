import React from 'react'

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string | null;
  category: {
    id: number;
    name: string;
  };
}

const ProductCard = (props: { product: Product }) => {
  return (
    <a href={'/products/' + props.product.id}>
      {props.product.image ? <img src={"http://localhost:8000/storage/" + props.product.image} className='h-80 object-cover w-full bg-gray-100' />
        : <img src='https://placehold.co/600x600' className='h-80 object-cover w-full bg-gray-100' />}
      <div className='flex flex-col gap-2 p-6 text-center'>
        <h1 className='text-lg font-medium'>{props.product.name}</h1>
        <p className='text-sm text-gray-500'>{props.product.category.name}</p>
        <h1>{props.product.price.toFixed(2)} PLN</h1>
      </div>
    </a>
  )
}

export default ProductCard