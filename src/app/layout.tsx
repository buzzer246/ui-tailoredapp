import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from 'next/link'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ui-TailoredApp",
  description: "Responsive UI for all devices",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        {/* Add this script to handle the mobile menu toggle */}
        <script dangerouslySetInnerHTML={{
          __html: `
            document.addEventListener('DOMContentLoaded', function() {
              const menuButton = document.getElementById('mobile-menu-button');
              const mobileMenu = document.getElementById('mobile-menu');
              
              menuButton.addEventListener('click', function() {
                const isExpanded = this.getAttribute('aria-expanded') === 'true';
                this.setAttribute('aria-expanded', !isExpanded);
                mobileMenu.classList.toggle('hidden');
                
                // Toggle between hamburger and close icon
                const hamburger = this.querySelector('.hamburger');
                const close = this.querySelector('.close');
                hamburger.classList.toggle('hidden');
                close.classList.toggle('hidden');
              });
            });
          `
        }} />
      </head>
      <body className="min-h-screen flex flex-col bg-gray-50">
        {/* Responsive Navigation with working mobile menu */}
        <header className="sticky top-0 z-50 bg-white shadow-sm">
          <nav className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              {/* Mobile menu button */}
              <button
                id="mobile-menu-button"
                className="md:hidden flex items-center text-gray-700 hover:text-gray-900 focus:outline-none"
                aria-label="Toggle menu"
                aria-expanded="false"
              >
                {/* Hamburger icon (visible by default) */}
                <svg className="h-6 w-6 hamburger" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                {/* Close icon (hidden by default) */}
                <svg className="h-6 w-6 close hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              {/* Navigation links - desktop */}
              <div className="hidden md:flex space-x-8">
                <Link 
                  href="/home" 
                  className="text-base font-medium text-gray-700 hover:text-gray-900 transition-colors px-3 py-2 rounded-md hover:bg-gray-100 home"
                >
                  OrderDetails
                </Link>
                <Link 
                  href="/orderreceiptcard" 
                  className="text-base font-medium text-gray-700 hover:text-gray-900 transition-colors px-3 py-2 rounded-md hover:bg-gray-100 home"
                >
                  OrderReceiptCard
                </Link>
                <Link 
                  href="/deliveryreceipt" 
                  className="text-base font-medium text-gray-700 hover:text-gray-900 transition-colors px-3 py-2 rounded-md hover:bg-gray-100 home"
                >
                  DeliveryReceipt
                </Link>
              </div>
            </div>

            {/* Mobile menu - initially hidden */}
            <div id="mobile-menu" className="hidden md:hidden mt-3 space-y-2 pb-3">
              <Link 
                href="/home" 
                className="block text-base font-medium text-gray-700 hover:text-gray-900 transition-colors px-3 py-2 rounded-md hover:bg-gray-100 home"
              >
                OrderDetails
              </Link>
              <Link 
                href="/orderreceiptcard" 
                className="block text-base font-medium text-gray-700 hover:text-gray-900 transition-colors px-3 py-2 rounded-md hover:bg-gray-100 home"
              >
                OrderReceiptCard
              </Link>
              <Link 
                href="/deliveryreceipt" 
                className="block text-base font-medium text-gray-700 hover:text-gray-900 transition-colors px-3 py-2 rounded-md hover:bg-gray-100 home"
              >
                DeliveryReceipt
              </Link>
            </div>
          </nav>
        </header>

        {/* Main Content */}
        <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
            {children}
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 py-6">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-center md:text-left text-sm text-gray-500 mb-4 md:mb-0">
                © {new Date().getFullYear()} Ui-TailoredApp. All rights reserved.
              </div>
              <div className="flex space-x-6">
                <a href="#" className="text-gray-400 hover:text-gray-500">
                  <span className="sr-only">Privacy Policy</span>
                  <span className="text-sm">Privacy</span>
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-500">
                  <span className="sr-only">Terms</span>
                  <span className="text-sm">Terms</span>
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-500">
                  <span className="sr-only">Contact</span>
                  <span className="text-sm">Contact</span>
                </a>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
