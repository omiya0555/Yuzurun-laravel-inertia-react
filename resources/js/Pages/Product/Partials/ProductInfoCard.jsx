function ProductInfoCard({ product }) {
  return (
    <div className="bg-white rounded-md shadow-sm overflow-hidden p-6 sm:p-8">
      <h3 className="text-2xl font-semibold text-center sm:text-left">{product.title}</h3>
      <p className="text-gray-700 w-full text-sm sm:text-base mt-2">{product.description}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
        <p className="text-sm font-semibold">出品者: <span className="text-gray-600">{product.seller.name}</span></p>
        <p className="text-sm font-semibold">場所: <span className="text-gray-600">{product.location_name}</span></p>
        <p className="text-sm font-semibold">カテゴリー: <span className="text-gray-600">{product.category}</span></p>
        <p className="text-sm font-semibold">状態: <span className="text-gray-600">{product.condition}</span></p>        </div>
      <p className="mt-4 text-center text-lg font-bold text-red-600">
        現在のステータス:{' '}
        {transactionStatus === 0 ? '出品中' : transactionStatus === 1 ? '予約中' : '取引完了'}
      </p>
    </div>
  );
}

export default ProductInfoCard;
