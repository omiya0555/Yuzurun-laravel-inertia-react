import { useState, useEffect } from 'react';
import { Link, usePage, router } from '@inertiajs/react';
import ProductPagenateSection from './ProductPagenateSection';
import ProductCardList from './ProductCardList';

// ステータスリスト
const STATUS = {
  0: '出品中',
  1: '予約中',
  2: '取引完了',
};

// カテゴリーリスト
const CATEGORIES = [
  '家電', '家具', '本', '衣類', 'おもちゃ', '雑貨', 'スポーツ用品', '食品',
  '美容・健康', '自転車', '車・バイク用品', 'アウトドア用品', 'アクセサリー',
  'ゲーム・ホビー', '楽器', 'ペット用品', 'キッチン用品', '文具・オフィス用品',
];

function ProductList({ products }) {
  const { props } = usePage();
  const query = props.query || {};
  const [filteredProducts, setFilteredProducts] = useState(products.data);
  const [searchTerm, setSearchTerm] = useState(query.search || '');
  const [selectedCategory, setSelectedCategory] = useState(query.category || '');
  const [selectedStatuses, setSelectedStatuses] = useState(query.statuses ? query.statuses.split(',').map(Number) : []);

  // **検索処理**
  const handleSearch = () => {
    // クエリパラメータを更新して状態を保持したままページを更新
    router.get(window.location.pathname, {
      search: searchTerm,
      category: selectedCategory,
      statuses: selectedStatuses.join(','),
    }, { preserveState: true, replace: true });
  };

  // **クリア処理**
  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSelectedStatuses([]);
    router.get(window.location.pathname, {}, { preserveState: true, replace: true });
  };

  // **ステータスフィルターの選択処理**
  const handleStatusChange = (status) => {
    if (selectedStatuses.includes(status)) {
      setSelectedStatuses(selectedStatuses.filter((s) => s !== status));
    } else {
      setSelectedStatuses([...selectedStatuses, status]);
    }
  };

  useEffect(() => {
    const filtered = products.data.filter((product) => {
      const matchesTerm = product.title.includes(searchTerm);
      const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
      const matchesStatus =
        selectedStatuses.length > 0 ? selectedStatuses.includes(product.transaction_status) : true;
      return matchesTerm && matchesCategory && matchesStatus;
    });
    setFilteredProducts(filtered);
  }, [products.data, searchTerm, selectedCategory, selectedStatuses]);

  return (
    <div className="max-w-6xl mx-auto px-4 pb-8">
      {/* フィルター */}
      <div className="flex flex-col gap-1 md:gap-4 md:flex-row mb-6 bg-white shadow-sm p-4 rounded-md">
        <div className="flex-1">
          <input
            type="text"
            placeholder="キーワードを入力"
            className="w-full px-4 py-1 md:py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300 placeholder-gray-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          className="w-full md:w-auto px-4 py-1 md:py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300 bg-white"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">全てのカテゴリ</option>
          {CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        {/* ステータスフィルター */}
        <div className="flex flex-wrap gap-2">
          {Object.entries(STATUS).map(([key, label]) => (
            <label key={key} className="flex items-center">
              <input
                type="checkbox"
                className="mr-2"
                checked={selectedStatuses.includes(parseInt(key))}
                onChange={() => handleStatusChange(parseInt(key))}
              />
              <span className="text-sm text-gray-700">{label}</span>
            </label>
          ))}
        </div>

        <button
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold px-6 py-1 md:py-2 rounded-md transition duration-300"
          onClick={resetFilters}
        >
          クリア
        </button>
      </div>

      {/* 商品カードリスト */}
      <ProductCardList
        products={filteredProducts}
      />

      {/* ページネーション */}
      <ProductPagenateSection
        products={products}
      />
      
    </div>
  );
}

export default ProductList;
