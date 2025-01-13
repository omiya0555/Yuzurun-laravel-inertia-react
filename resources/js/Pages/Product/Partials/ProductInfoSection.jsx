import React, { useState, useEffect } from 'react';
import { useForm, router } from '@inertiajs/react';
import { db } from '@/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import MessageModal from './MessageModal';
import ProductInfoCard from './ProductInfoCard';
import { createOrJoinChatRoom } from './createOrJoinChatRoom';

function ProductInfoSection({ product, isSeller, user }) {
  const [transactionStatus, setTransactionStatus] = useState(product.transaction_status);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [chatRoomExists, setChatRoomExists] = useState(false);
  const { data, setData, submit, processing } = useForm({
    product_id: product.id,
    new_status: product.transaction_status,
  });

  useEffect(() => {
    const checkChatRoomExists = async () => {
      const roomId = `${product.id}_${user.id}`;
      const chatRoomRef = doc(db, 'chat_rooms', roomId);
      const chatRoomSnap = await getDoc(chatRoomRef);

      if (chatRoomSnap.exists()) {
        setChatRoomExists(true);
      }
    };

    checkChatRoomExists();
  }, [product.id, user.id]);

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

  const handleModalSubmit = async ({ method, message }) => {
    setIsModalOpen(false); // モーダルを閉じる

    if (method === 'chat') {
      await createOrJoinChatRoom(product, user, message);
    } else if (method === 'line') {
      alert('LINEリンクを登録済みのメールに送信しました。');
    } else if (method === 'signal') {
      alert('Signalリンクを登録済みのメールに送信しました。');
    }
  };

  const handleGoToChatRoom = () => {
    const roomId = `${product.id}_${user.id}`;
    router.get(`/chat/room/${roomId}`);
  };

  return (
    <div className="max-w-[400px] min-w-[320px] mx-auto space-y-6 bg-stone-100">
      {/* 商品情報カード */}
      <ProductInfoCard product={product} />

      {/* ボタンセクション */}
      <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:justify-center sm:space-x-4">
        {isSeller ? (
          <>
            {transactionStatus === 0 ? (
              <form onSubmit={handleStatusSubmit} className="flex flex-col w-full space-y-4">
                <select
                  className="px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
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
                  className="bg-blue-600 w-full text-white font-bold py-2 px-6 rounded-md hover:bg-blue-800 transition"
                  disabled={processing}
                >
                  変更を確定する
                </button>
              </form>
            ) : transactionStatus === 1 ? (
              <form onSubmit={handleStatusSubmit} className="flex flex-col w-full space-y-4">
                <select
                  className="px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
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
                  className="bg-blue-600 w-full text-white font-bold py-2 px-6 rounded-md hover:bg-blue-800 transition"
                  disabled={processing}
                >
                  変更を確定する
                </button>
              </form>
            ) : (
              <p className="text-green-600 w-full font-bold text-center">取引は完了しています。</p>
            )}
          </>
        ) : (
          <>
            {chatRoomExists ? (
              <button
                onClick={handleGoToChatRoom}
                className="bg-green-600 w-full text-white font-bold py-2 px-6 rounded-md hover:bg-green-800 transition"
              >
                チャットルームへ移動
              </button>
            ) : transactionStatus === 0 ? (
              <button
                onClick={handleRequest}
                className="bg-blue-600 w-full text-white font-bold py-2 px-6 rounded-md hover:bg-blue-800 transition"
                disabled={processing}
              >
                取引を申請する
              </button>
            ) : (
              <p className="text-green-600 font-bold text-center">取引は完了しています。</p>
            )}
          </>
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
