import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SignedIn } from '@clerk/nextjs'

const ProductCard = ({ product, onAddToCart }) => {

  return (
    <div
      className="border rounded-lg shadow-xl flex flex-col justify-between"
    >
      <div>
        <div className="relative h-48 w-full">
          <Image
            src={product.image}
            alt={product.title}
            layout="fill"
            objectFit="contain"
            className='rounded-t-lg'
          />
        </div>
        <div className='flex flex-col justify-between p-4'>
          <div>
            <h2 className="text-lg font-bold">{product.title}</h2>
            <p className="text-sm">{product.description}</p>
            <Link href={`/product/${product.id}`} className='text-blue-500 hover:text-blue-700 hover:underline'>
              View
            </Link>
          </div>
        </div>
      </div>
      <div className='flex justify-between items-center p-4 pt-0'>
        <p className="text-xl font-semibold mt-2">${product.price}</p>
        <SignedIn>
          <button
            onClick={() => onAddToCart(product)}
            className="mt-2 bg-blue-500 text-white p-2 rounded hover:shadow-lg"
          >
            Add to Cart
          </button>
        </SignedIn>
      </div>
    </div>
  );
};

export default ProductCard;
