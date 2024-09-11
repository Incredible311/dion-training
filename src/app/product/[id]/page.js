"use client";

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { getProductById, deleteProduct } from '../../../services/productService';
import ProductForm from '@/components/ProductForm';
import Image from 'next/image';
import Link from 'next/link';
import { SignedIn } from '@clerk/nextjs'

export default function ProductDetail({ params }) {
  const router = useRouter();
  const id = params.id;
  const [product, setProduct] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (id) {
      async function fetchProduct() {
        const product = await getProductById(id);
        setProduct(product);
      }
      fetchProduct();
    }
  }, [id]);

  const handleDelete = async () => {
    if (product) {
      await deleteProduct(product.id);
      router.push('/');
    }
  };

  if (!product) return <p className='text-center'>Loading...</p>;

  return (
    <div className="container mx-auto p-4">
      <Link href='/' className='text-blue-500 hover:text-blue-700 hover:underline'>
        {`< Return`}
      </Link>
      <div className="relative h-72 w-full mb-4">
        <Image
          src={product.image}
          alt={product.title}
          layout="fill"
          objectFit="contain"
        />
      </div>
      {isEditing ? (
        <ProductForm
          product={product}
          handleProductSubmited={setProduct}
          setIsEditing={setIsEditing}
        />
      ) : (
        <div>
          <h1 className="text-2xl font-bold">{product.title}</h1>
          <p>{product.description}</p>
          <p className="text-xl font-semibold">${product.price}</p>
          <SignedIn>
            <div className='flex justify-end items-center gap-4'>
              <button onClick={() => setIsEditing(true)} className="bg-blue-500 text-white p-2 rounded px-8 hover:shadow-lg">
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="border border-red-500 text-red-500 p-2 rounded px-4 hover:shadow-lg">
                Delete
              </button>
            </div>
          </SignedIn>
        </div>
      )}
    </div>
  );
}
