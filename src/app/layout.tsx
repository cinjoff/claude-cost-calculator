import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
});

export const metadata: Metadata = {
  title: 'Claude vs Amsterdam',
  description: "Is Claude expensive? Let's put it in Amsterdam terms.",
  openGraph: {
    title: 'Claude vs Amsterdam',
    description: "Is Claude expensive? Let's put it in Amsterdam terms.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${jakarta.variable} font-sans antialiased`}>{children}</body>
    </html>
  );
}
