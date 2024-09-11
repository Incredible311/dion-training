"use client";

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../../store/cartSlice';
import { SignedOut, SignedIn } from '@clerk/nextjs';
import Link from 'next/link';

export default function Cart() {
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();

  return (
    <div className="container mx-auto p-4">
      <div className='flex items-center justify-between mb-4'>
        <h1 className="text-2xl font-bold">Cart</h1>
        <Link href='/' className='text-blue-500 hover:text-blue-700 hover:underline'>
          {`< Return`}
        </Link>
      </div>
      <SignedOut>
        <span class="rounded-md bg-yellow-50 px-2 py-1 text-sm font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
          Note: Sign in to manage products on cart.
        </span>
      </SignedOut>
      <SignedIn>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div>
            {cart.map(item => (
              <div key={item.id} className="border p-4 rounded-lg mb-2">
                <h2 className="text-lg font-bold">{item.title}</h2>
                <p className="text-sm">{item.description}</p>
                <div className='flex justify-between items-center'>
                  <p className="text-xl font-semibold mt-2">${item.price}</p>
                  <button
                    onClick={() => dispatch(removeFromCart(item))}
                    className="mt-2 bg-red-500 text-white p-2 rounded hover:shadow-lg"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </SignedIn>
    </div>
  );
}
