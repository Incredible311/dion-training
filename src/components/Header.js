import React from 'react';
import Link from 'next/link';
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'

const Header = () => {
  return (
    <div className='w-full fixed top-0 shadow-md flex justify-between bg-white z-50'>
      <div className='container mx-auto p-4 flex justify-end items-center'>
        <SignedOut>
          <SignInButton className='text-blue-500 font-semibold'/>
        </SignedOut>
        <SignedIn>
          <div className='flex items-center justify-end gap-4'>
            <Link
              href='/'
              className='font-semibold text-blue-500 hover:text-blue-700'
            >
              Products
            </Link>
            <Link
              href='/cart'
              className='font-semibold text-blue-500 hover:text-blue-700'
            >
              Cart
            </Link>
            <UserButton />
          </div>
        </SignedIn>

      </div>
    </div>
  )
};

export default Header;