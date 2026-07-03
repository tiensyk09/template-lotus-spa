import OrdersPageClient from '@/components/OrdersPageClient';

export const metadata = {
  title: 'Tài khoản & Lịch sử đơn hàng | Lotus Spa',
  description: 'Tra cứu lịch hẹn, xem chi tiết lịch sử dịch vụ và cập nhật thông tin liên hệ tại Lotus Spa.'
};

export default function OrdersPage() {
  return <OrdersPageClient />;
}
