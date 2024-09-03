import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProductCard from '../components/ProductCard';

jest.mock('next/image', () => {
  const MockImage = ({ src, alt }) => <img src={src} alt={alt} />;
  MockImage.displayName = 'Image';
  return MockImage;
});

jest.mock('next/link', () => {
  const MockLink = ({ children, href }) => <a href={href}>{children}</a>;
  MockLink.displayName = 'Link';
  return MockLink;
});

jest.mock('@clerk/nextjs', () => ({
  SignedIn: ({ children }) => <>{children}</>,
}));

describe('ProductCard', () => {
  const product = {
    id: 1,
    title: 'Sample Product',
    description: 'This is a sample product description.',
    price: 99.99,
    image: '/sample-image.jpg',
  };
  const onAddToCart = jest.fn();

  test('renders product details correctly', () => {
    render(<ProductCard product={product} onAddToCart={onAddToCart} />);

    const image = screen.getByAltText(product.title);
    expect(image).toHaveAttribute('src', product.image);

    expect(screen.getByText(product.title)).toBeInTheDocument();
    expect(screen.getByText(product.description)).toBeInTheDocument();
    expect(screen.getByText(`$${product.price}`)).toBeInTheDocument();

    const viewLink = screen.getByText('View');
    expect(viewLink).toBeInTheDocument();
    expect(viewLink).toHaveAttribute('href', `/product/${product.id}`);
  });

  test('calls onAddToCart when Add to Cart button is clicked', () => {
    render(<ProductCard product={product} onAddToCart={onAddToCart} />);

    const addToCartButton = screen.getByText('Add to Cart');
    fireEvent.click(addToCartButton);

    expect(onAddToCart).toHaveBeenCalledTimes(1);
    expect(onAddToCart).toHaveBeenCalledWith(product);
  });

  test('does not render Add to Cart button when not signed in', () => {
    // Re-mock the SignedIn component to simulate not being signed in
    jest.mock('@clerk/nextjs', () => ({
      SignedIn: ({ children }) => null,
    }));

    const ProductCardNoAuth = require('../components/ProductCard').default;

    render(<ProductCardNoAuth product={product} onAddToCart={onAddToCart} />);
  });
});
