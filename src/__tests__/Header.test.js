import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from '../components/Header';

jest.mock('next/link', () => {
  const MockLink = ({ children, href }) => <a href={href}>{children}</a>;
  MockLink.displayName = 'Link';
  return MockLink;
});

jest.mock('@clerk/nextjs', () => ({
  SignInButton: () => <button>Sign In</button>,
  SignedIn: ({ children }) => <>{children}</>,
  SignedOut: ({ children }) => <>{children}</>,
  UserButton: () => <button>User</button>,
}));

describe('Header', () => {
  test('renders Sign In button when signed out', () => {
    render(<Header />);

    expect(screen.getByText('Sign In')).toBeInTheDocument();

  });

  test('renders navigation links and User button when signed in', () => {
    // Mock SignedIn to simulate a signed-in user
    jest.mock('@clerk/nextjs', () => ({
      SignInButton: () => <button>Sign In</button>,
      SignedIn: ({ children }) => <>{children}</>,
      SignedOut: () => null,
      UserButton: () => <button>User</button>,
    }));

    // Re-import the Header component to apply the new mock
    const HeaderSignedIn = require('../components/Header').default;

    render(<HeaderSignedIn />);

    expect(screen.getByText('Products')).toBeInTheDocument();
    expect(screen.getByText('Cart')).toBeInTheDocument();
    expect(screen.getByText('User')).toBeInTheDocument();

  });
});
