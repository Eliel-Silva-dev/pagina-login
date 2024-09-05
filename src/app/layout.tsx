import type { Metadata } from 'next';

import { Roboto } from 'next/font/google';

import NavBar from '@/shared/components/NavBar';
import Footer from '@/shared/components/Footer';

import { Suspense } from 'react';

import './globals.css';

const roboto = Roboto({ subsets: ['latin'], weight: ['400', '700', '900'] });

export const metadata: Metadata = {
  title: 'Login | Hydrah tec',
  description: 'pagina de login com integração a banco de dados',
  keywords: 'login, cadastro, pagina de login, fazer login, logar',
  icons: 'img/imgfaviconlogin.svg',
  robots: 'index, follow',
  authors: [{ name: 'Eliel Silva', url: 'https://github.com/Eliel-Silva-dev' }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={roboto.className}>
        <NavBar />
        <Suspense fallback={<div>Carregando dados da pagina...</div>}>
          {children}
        </Suspense>
        <Footer />
      </body>
    </html>
  );
}
