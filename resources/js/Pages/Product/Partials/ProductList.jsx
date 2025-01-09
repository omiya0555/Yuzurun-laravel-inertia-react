import { useState } from 'react';
import { Link } from '@inertiajs/react';

// カテゴリーリスト
const CATEGORIES = [
  '家電', '家具', '本', '衣類', 'おもちゃ', '雑貨', 'スポーツ用品', '食品',
  '美容・健康', '自転車', '車・バイク用品', 'アウトドア用品', 'アクセサリー',
  'ゲーム・ホビー', '楽器', 'ペット用品', 'キッチン用品', '文具・オフィス用品'
];

function ProductList({ products }) {
  const [filteredProducts, setFilteredProducts] = useState(products.data);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  // **検索とカテゴリで絞り込み**
  const handleSearch = () => {
    const filtered = products.data.filter((product) => {
      const matchesTerm = product.title.includes(searchTerm);
      const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
      return matchesTerm && matchesCategory;
    });
    setFilteredProducts(filtered);
  };

  // **全商品表示 (デフォルト)**
  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setFilteredProducts(products);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 pb-8">
      {/* フィルター */}
      <div className="flex flex-col md:flex-row gap-2 mb-6">
        <input
          type="text"
          placeholder="キーワード検索"
          className="flex-1 p-2 border border-gray-300 rounded-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="p-2 border border-gray-300 rounded-md"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">全てのカテゴリ</option>
          {CATEGORIES.map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-md"
          onClick={handleSearch}
        >
          検索
        </button>
        <button
          className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md"
          onClick={resetFilters}
        >
          クリア
        </button>
      </div>

      {/* 商品カードリスト */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredProducts.length === 0 ? (
          <p className="col-span-full text-center text-gray-500">該当する商品は見つかりませんでした。</p>
        ) : (
          filteredProducts.map((product) => (
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
                <p className="text-sm font-bold text-gray-800 truncate">{product.title}</p>
                <p className="text-xs text-gray-500">{product.category}</p>
                <p className="text-xs text-gray-500">出品者: {product.seller.name}</p>
              </div>
            </Link>
          ))
        )}
      </div>
      
      {/* ページネーション */}
      <div className="mt-8 flex justify-center">
        {products.links.map((link, index) => (
          <Link
            key={index}
            href={link.url}
            className={`inline-block px-3 py-1 mx-1 rounded-md ${link.active ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-800'}`}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
