import './globals.css';
import { CartProvider } from '@/components/CartContext';
import LayoutWrapper from '@/components/LayoutWrapper';
import PluginRunner from '@/components/PluginRunner';
import TopLoader from '@/components/TopLoader';

export const metadata = {
  title: 'Lotus Spa - Chăm sóc sắc đẹp toàn diện | Beauty & Relax',
  description: 'Lotus Spa mang đến trải nghiệm thư giãn và chăm sóc sắc đẹp chuyên sâu: Massage thư giãn, chăm sóc da mặt, chăm sóc body, xông hơi thải độc, chăm sóc tóc với kỹ thuật viên chuyên nghiệp và không gian yên tĩnh.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body className="bg-white text-gray-800 font-sans antialiased min-h-screen">
        <TopLoader color="#5d7a3f" />
        <CartProvider>
          <LayoutWrapper>
            {children}
          </LayoutWrapper>
          <PluginRunner />
        </CartProvider>
      </body>
    </html>
  );
}
