import React, { useEffect, useState } from 'react';
import { db } from '@/firebaseConfig';
import { collection, query, or, where, onSnapshot } from 'firebase/firestore'; // `or` クエリをインポート
import { Head, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

function Index({ user_id }) {
  const [chatRooms, setChatRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]); // 表示するルーム
  const [activeTab, setActiveTab] = useState('all'); // "all" | "give" | "receive"

  useEffect(() => {
    const chatRoomsRef = collection(db, 'chat_rooms');
    const q = query(
      chatRoomsRef,
      or(where('buyer_id', '==', user_id), where('seller_id', '==', user_id))
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const rooms = snapshot.docs.map((doc) => ({
        id: doc.id, // roomId
        ...doc.data(),
      }));
      setChatRooms(rooms);
      setFilteredRooms(rooms); // 初期表示は「すべて」
    });

    return () => unsubscribe();
  }, [user_id]);

  // タブの変更時にフィルタリング処理
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === 'all') {
      setFilteredRooms(chatRooms);
    } else if (tab === 'give') {
      setFilteredRooms(chatRooms.filter((room) => room.seller_id === user_id));
    } else if (tab === 'receive') {
      setFilteredRooms(chatRooms.filter((room) => room.buyer_id === user_id));
    }
  };

  const handleOpenRoom = (roomId) => {
    router.get(`/chat/room/${roomId}`);
  };

  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-stone-800">
          チャット一覧
        </h2>
      }
    >
      <Head title="チャット一覧" />

      {/* タブ部分 */}
      <div className="flex justify-around max-w-6xl mx-auto bg-stone-200 rounded-full mb-4">
        <button
          className={`rounded-l-full flex-1 text-center py-2 font-semibold transition ${activeTab === 'all' ? 'bg-white text-stone-800 shadow' : 'text-stone-500 hover:bg-stone-300'}`}
          onClick={() => handleTabChange('all')}
        >
          すべて
        </button>
        <button
          className={`flex-1 text-center py-2 font-semibold transition ${activeTab === 'give' ? 'bg-red-400 text-stone-800 shadow' : 'text-stone-500 hover:bg-red-100'}`}
          onClick={() => handleTabChange('give')}
        >
          ゆずる
        </button>
        <button
          className={`rounded-r-full flex-1 text-center py-2 font-semibold transition ${activeTab === 'receive' ? 'bg-blue-400 text-stone-800 shadow' : 'text-stone-500 hover:bg-blue-100'}`}
          onClick={() => handleTabChange('receive')}
        >
          もらう
        </button>
      </div>

      {/* チャットルーム一覧 */}
      <div className="max-w-6xl mx-auto bg-white shadow rounded-md">
        <ul>
          {filteredRooms.length === 0 ? (
            <li className="py-8 text-center text-stone-600">チャットルームはありません。</li>
          ) : (
            filteredRooms.map((room) => (
              <div
                className='flex border-b cursor-pointer rounded-sm hover:bg-stone-300 hover:shadow-xl transition'
                onClick={() => handleOpenRoom(room.id)}
              >
                <img 
                  src={room.product_top_image_url}
                  className="aspect-square object-cover w-20 h-20"
                >
                </img>
                <li
                  key={room.id}
                  className="w-full py-2 px-8"
                >
                  <h2 className="text-base md:font-semibold">{room.product_title}</h2>
                  <span className='text-sm md:text-base text-gray-600'>
                    {user_id === room.seller_id ? `申請者：${room.buyer_name}` : `出品者：${room.seller_name}`}
                  </span>
                </li>
              </div>

            ))
          )}
        </ul>
      </div>
    </AuthenticatedLayout>
  );
}

export default Index;