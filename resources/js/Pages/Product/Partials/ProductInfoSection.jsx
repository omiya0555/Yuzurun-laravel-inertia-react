import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import MessageModal from './MessageModal';
import { createOrJoinChatRoom } from './createOrJoinChatRoom'; 

function ProductInfoSection({ product, isSeller, user }) {
  const [transactionStatus, setTransactionStatus] = useState(product.transaction_status);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, setData, submit, processing } = useForm({
    product_id: product.id,
    new_status: product.transaction_status,
  });

  const handleStatusChange = (e) => {
    setData('new_status', parseInt(e.target.value));
  };

  const handleStatusSubmit = (e) => {
    e.preventDefault();
    if (confirm('ステータスを変更しますか？')) {
      submit('put', `/products/${product.id}/status`, {
        onSuccess: () => {
          console.log('ステータス変更が成功しました');
          setTransactionStatus(data.new_status);
        },
        onError: (error) => {
          console.error('ステータス変更エラー:', error);
        },
      });
    }
  };

  const handleRequest = () => {
    setIsModalOpen(true); // モーダルを開く
  };

  const handleModalSubmit = async (message) => {
    setIsModalOpen(false); // モーダルを閉じる

    // Firestoreのチャットルーム作成関数を呼び出し
    await createOrJoinChatRoom(product, user, message);
  };

  return (
    <div className="space-y-4 text-stone-800">
      <h3 className="text-2xl pl-6 font-semibold">{product.title}</h3>
      <p className="text-base pl-6">{product.description}</p>
      <p className="text-sm pl-6">出品者: {product.seller.name}</p>
      <p className="text-sm pl-6">場所: {product.location_name}</p>
      <p className="text-sm pl-6">カテゴリー: {product.category}</p>
      <p className="text-sm pl-6">状態: {product.condition}</p>
      <p className="text-sm pl-6">
        出品日: {new Date(product.created_at).toLocaleDateString()}
      </p>
      <p className="text-base pl-6 font-bold text-red-600">
        現在のステータス:{' '}
        {transactionStatus === 0
          ? '出品中'
          : transactionStatus === 1
          ? '予約中'
          : '取引完了'}
      </p>

      <div className="flex justify-start pl-6">
        {isSeller ? (
          <div>
            {transactionStatus === 0 ? (
              <form onSubmit={handleStatusSubmit} className="flex flex-col items-start space-y-2">
                <select
                  className="block w-full px-4 py-2 mt-1 border rounded-md"
                  value={data.new_status}
                  onChange={handleStatusChange}
                  required
                >
                  <option value="">変更を選択</option>
                  <option value="1">予約中</option>
                  <option value="2">取引完了</option>
                </select>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded mt-2 transition"
                  disabled={processing}
                >
                  変更を確定する
                </button>
              </form>
            ) : transactionStatus === 1 ? (
              <form onSubmit={handleStatusSubmit} className="flex flex-col items-start space-y-2">
                <select
                  className="block w-full px-4 py-2 mt-1 border rounded-md"
                  value={data.new_status}
                  onChange={handleStatusChange}
                  required
                >
                  <option value="">変更を選択</option>
                  <option value="0">出品中</option>
                  <option value="2">取引完了</option>
                </select>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded mt-2 transition"
                  disabled={processing}
                >
                  変更を確定する
                </button>
              </form>
            ) : (
              <p className="text-green-600 font-bold">取引は完了しています。</p>
            )}
          </div>
        ) : (
          <div>
            {transactionStatus === 0 ? (
              <button
                onClick={handleRequest}
                className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded transition"
                disabled={processing}
              >
                取引を申請する
              </button>
            ) : transactionStatus === 1 ? (
              <button
                disabled
                className="bg-stone-400 text-white font-bold py-2 px-4 rounded cursor-not-allowed"
              >
                予約中
              </button>
            ) : (
              <p className="text-green-600 font-bold">取引は完了しています。</p>
            )}
          </div>
        )}
      </div>

      <MessageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
      />
    </div>
  );
}

export default ProductInfoSection;
