export const formatCurrency = (price: number) => {
  return <div>{price.toLocaleString('vi-VN', { currency: 'VND' })} đ</div>
}
