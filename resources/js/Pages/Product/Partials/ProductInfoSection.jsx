import React from 'react';
import { useForm, Link } from '@inertiajs/react';

function ProductInfoSection({ product, isSeller }) {
  const { submit, processing } = useForm({
    newStatus: 1, // REQUESTED
  });

  const handleRequest = () => {
    if (confirm('取引を申請しますか？')) {
      submit('post', `/transactions/${product.transaction_id}/update-status`, {
        onSuccess: () => {
          console.log('取引申請が成功しました');
        },
        onError: (error) => {
          console.error('取引申請エラー:', error);
        },
      });
    };
  };

  return (
    <div className="space-y-6 text-stone-800">
      <h3 className="text-2xl pl-6 font-semibold">{product.title}</h3>
      <p className="text-sm   pl-6">{product.description}</p>
      <p className="text-base pl-6">カテゴリー: {product.category}</p>
      <p className="text-base pl-6 ">状態:{product.condition}</p>
      <p className="text-base pl-6 ">出品者:{product.seller.name}</p>
      <p className="text-sm pl-6">出品日: {new Date(product.created_at).toLocaleDateString()}</p>

      <div className="flex justify-center  items-center pl-6">
        {isSeller ? (
          <div className="flex items-center mt-12 space-x-8">
            <p className="font-semibold">取引申請待ち</p>
            <Link
              href={`/transactions/${product.transaction_id}`}
              className="text-blue-600 hover:underline font-semibold"
            >
              取引詳細を見る
            </Link>
          </div>
        ) : (

          <button
            disabled={processing}
            onClick={handleRequest}
            className={`w-4/5 bg-blue-600 hover:bg-blue-800 text-white border py-2 rounded-md shadow-sm hover:shadow-lg transition}`}
          >
            取引申請
          </button>
        )
        }
      </div>
    </div>
  );
}

export default ProductInfoSection;
