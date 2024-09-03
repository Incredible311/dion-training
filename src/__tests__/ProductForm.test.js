import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProductForm from '../components/ProductForm';
import { createProduct, updateProduct } from '../services/productService';

jest.mock('../services/productService');

describe('ProductForm', () => {
  const handleProductSubmited = jest.fn();
  const setIsEditing = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders the form with empty fields when no product is provided', () => {
    render(<ProductForm handleProductSubmited={handleProductSubmited} setIsEditing={setIsEditing} />);

    expect(screen.getByPlaceholderText('Title')).toHaveValue('');
    expect(screen.getByPlaceholderText('Price')).toHaveValue('');
    expect(screen.getByPlaceholderText('Description')).toHaveValue('');
    expect(screen.getByPlaceholderText('Image URL')).toHaveValue('');
    expect(screen.getByText('Add New Product')).toBeInTheDocument();
  });

  test('renders the form with product data when a product is provided', () => {
    const product = {
      id: 1,
      title: 'Sample Product',
      price: '19.99',
      description: 'A sample product description.',
      image: 'http://example.com/image.jpg',
    };

    render(<ProductForm product={product} handleProductSubmited={handleProductSubmited} setIsEditing={setIsEditing} />);

    expect(screen.getByPlaceholderText('Title')).toHaveValue('Sample Product');
    expect(screen.getByPlaceholderText('Price')).toHaveValue('19.99');
    expect(screen.getByPlaceholderText('Description')).toHaveValue('A sample product description.');
    expect(screen.getByPlaceholderText('Image URL')).toHaveValue('http://example.com/image.jpg');
    expect(screen.getByText('Update Product #1')).toBeInTheDocument();
  });

  test('submits the form and creates a new product', async () => {
    createProduct.mockResolvedValueOnce({ id: 2 });

    render(<ProductForm handleProductSubmited={handleProductSubmited} setIsEditing={setIsEditing} />);

    fireEvent.change(screen.getByPlaceholderText('Title'), { target: { value: 'New Product' } });
    fireEvent.change(screen.getByPlaceholderText('Price'), { target: { value: '29.99' } });
    fireEvent.change(screen.getByPlaceholderText('Description'), { target: { value: 'A new product description.' } });
    fireEvent.change(screen.getByPlaceholderText('Image URL'), { target: { value: 'http://example.com/new-image.jpg' } });

    await act(async () => {
      fireEvent.click(screen.getByText('Create Product'));
    });

    await waitFor(() => {
      expect(createProduct).toHaveBeenCalledWith({
        title: 'New Product',
        price: 29.99,
        description: 'A new product description.',
        image: 'http://example.com/new-image.jpg',
      });
      expect(handleProductSubmited).toHaveBeenCalled();
    });
  });

  test('submits the form and updates an existing product', async () => {
    const product = {
      id: 1,
      title: 'Sample Product',
      price: '19.99',
      description: 'A sample product description.',
      image: 'http://example.com/image.jpg',
    };

    updateProduct.mockResolvedValueOnce({ ...product, title: 'Updated Product' });

    render(<ProductForm product={product} handleProductSubmited={handleProductSubmited} setIsEditing={setIsEditing} />);

    fireEvent.change(screen.getByPlaceholderText('Title'), { target: { value: 'Updated Product' } });

    await act(async () => {
      fireEvent.click(screen.getByText('Update Product'));
    });

    await waitFor(() => {
      expect(updateProduct).toHaveBeenCalledWith({
        id: 1,
        title: 'Updated Product',
        price: 19.99,
        description: 'A sample product description.',
        image: 'http://example.com/image.jpg',
      });
      expect(handleProductSubmited).toHaveBeenCalled();
      expect(setIsEditing).toHaveBeenCalledWith(false);
    });
  });

  test('calls setIsEditing(false) when cancel button is clicked', () => {
    const product = {
      id: 1,
      title: 'Sample Product',
      price: '19.99',
      description: 'A sample product description.',
      image: 'http://example.com/image.jpg',
    };

    render(<ProductForm product={product} handleProductSubmited={handleProductSubmited} setIsEditing={setIsEditing} />);

    fireEvent.click(screen.getByText('Cancel'));

    expect(setIsEditing).toHaveBeenCalledWith(false);
  });
});
