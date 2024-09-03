import React, { useState, useEffect } from 'react';
import { createProduct, updateProduct } from '../services/productService';

const ProductForm = ({ product, handleProductSubmited, setIsEditing }) => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');

  useEffect(() => {
    if (product) {
      setTitle(product.title);
      setPrice(product.price);
      setDescription(product.description);
      setImage(product.image);
    }
  }, [product])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const productData = { title, price: parseFloat(price), description, image };
    if (product) {
      const res = await updateProduct({ id: product.id, ...productData });
      handleProductSubmited(res);
      setIsEditing(false);
    } else {
      await createProduct(productData);
      setTitle('');
      setPrice('');
      setDescription('');
      setImage('');
      handleProductSubmited();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded">
      <h2 className="text-xl font-bold mb-4">
        {
          product ? `Update Product #${product.id}` : 'Add New Product'
        }
      </h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="mb-2 p-2 border rounded w-full"
      />
      <input
        type="text"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="mb-2 p-2 border rounded w-full"
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="mb-2 p-2 border rounded w-full"
      />
      <input
        type="text"
        placeholder="Image URL"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        className="mb-4 p-2 border rounded w-full"
      />
      <div className='flex justify-end items-center gap-4'>
        <button
          disabled={!(title && price && description && image)}
          type="submit"
          className={
            (title && price && description && image) ?
            "bg-blue-500 text-white p-2 rounded hover:shadow-lg" :
            "bg-gray-500 text-white p-2 rounded"
          }
        >
          {
            product ? 'Update Product' : 'Create Product'
          }
        </button>
        {
          setIsEditing ?
            <button
              onClick={() => setIsEditing(false)}
              className="border border-blue-500 text-blue-500 p-2 rounded hover:shadow-lg">
              Cancel
            </button> : null
        }
      </div>
    </form>
  );
};

export default ProductForm;
