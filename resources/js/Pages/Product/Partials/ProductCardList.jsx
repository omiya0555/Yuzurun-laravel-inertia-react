import { Link } from "@inertiajs/react";

// ステータスリスト
const STATUS = {
  0: '出品中',
  1: '予約中',
  2: '取引完了',
};

function ProductCardList({ products }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.length === 0 ? (
        <p className="col-span-full text-center text-gray-500">該当する商品は見つかりませんでした。</p>
      ) : (
        products.map((product) => (
          <Link
            href={`/products/${product.id}`}
            key={product.id}
            className="block bg-white p-4 shadow-sm rounded-md hover:shadow-lg transition"
          >
            <div className="aspect-square w-full bg-gray-200 rounded-sm overflow-hidden">
              <img
                src={product.image_urls ? JSON.parse(product.image_urls)[0] : 'https://placehold.jp/300x300.png'}
                alt={product.title}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="mt-2">
              <p className="text-sm font-bold text-gray-800 truncate">
                {product.title}
                <span className="text-xs text-gray-500 ml-2">[{STATUS[product.transaction_status]}]</span>
              </p>
              <p className="text-xs text-gray-500">{product.category}</p>
              <p className="text-xs text-gray-500">出品者: {product.seller.name}</p>
            </div>
          </Link>
        ))
      )}
    </div>
  );
}

export default ProductCardList;
