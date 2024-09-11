"use client";

import React, { useEffect, useState, useMemo } from 'react';
import ProductCard from '../components/ProductCard';
import ProductForm from '@/components/ProductForm';
import { getProducts } from '../services/productService';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import InfiniteScroll from 'react-infinite-scroll-component';
import { debounce } from '../utils/infiniteScroll';
import { SignedIn, SignedOut } from '@clerk/nextjs'

export default function Home() {
  const [products, setProducts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();

  const fetchProducts = async () => {
    const fetchedProducts = await getProducts(page);
    setProducts(prevProducts => [...prevProducts, ...fetchedProducts]);
    if (fetchedProducts.length === 0) setHasMore(false);
  }

  useEffect(() => {
    fetchProducts();
  }, [page]);

  const handleSearch = debounce((term) => {
    setSearchTerm(term);
  }, 300);

  const filteredProducts = useMemo(() => {
    return products.filter(product =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [products, searchTerm]);

  return (
    <div className="container mx-auto p-4">
      <SignedIn>
        <ProductForm handleProductSubmited={() => fetchProducts()} />
        <hr className='mt-4 mb-4 border-black' />
      </SignedIn>
      <SignedOut>
        <div className='mb-4'>
          <span class="rounded-md bg-yellow-50 px-2 py-1 text-sm font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
            Note: Sign in to see more details and manage products.
          </span>
        </div>
      </SignedOut>
      <h1 className='font-bold text-2xl mb-4'>Products List</h1>
      <input
        type="text"
        placeholder="Search Products"
        className="mb-4 p-2 border rounded w-full"
        onChange={(e) => handleSearch(e.target.value)}
      />
      <InfiniteScroll
        dataLength={filteredProducts.length}
        next={() => setPage(prevPage => prevPage + 1)}
        hasMore={hasMore}
        loader={<h4 className='text-center p-4'>Loading...</h4>}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.map((product, i) => (
            <ProductCard
              key={i}
              product={product}
              onAddToCart={(item) => dispatch(addToCart(item))}
            />
          ))}
        </div>
      </InfiniteScroll>

    </div>
  );
}
