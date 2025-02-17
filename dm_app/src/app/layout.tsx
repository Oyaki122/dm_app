import './globals.css';
import type {Metadata} from 'next';
import {Inter} from 'next/font/google';
import Provider from './provider';
import React from 'react';

import Header from './header';
import Main from './main';
import Footer from './footer';

// eslint-disable-next-line new-cap
const inter = Inter({subsets: ['latin']});

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};


export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <Provider>
          <Header />
          <Main>{children}</Main>
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
