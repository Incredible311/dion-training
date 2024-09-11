"use client";

import React from 'react'; 
import { ClerkProvider } from '@clerk/nextjs';
import '../styles/globals.css';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import Header from '@/components/Header';

export default function RootLayout({ children }) {
  return (
    <Provider store={store}>
      <ClerkProvider>
        <html lang="en">
          <body>
            <Header />
            <div className='mt-20'>
              {children}
            </div>
          </body>
        </html>
      </ClerkProvider>
    </Provider>
  );
}
