import React, { useEffect, useState } from 'react';
import { db } from '@/firebaseConfig';
import { collection, query, or, where, onSnapshot } from 'firebase/firestore'; // `or` クエリをインポート
import { router } from '@inertiajs/react';

function Index({ user_id }) {
  const [chatRooms, setChatRooms] = useState([]);

  useEffect(() => {
    const chatRoomsRef = collection(db, 'chat_rooms'); // チャットルーム全体のコレクションを参照
    const q = query(
      chatRoomsRef,
      or(where('buyer_id', '==', user_id), where('seller_id', '==', user_id)) // 購入者または出品者として関連するルームを取得
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const rooms = snapshot.docs.map((doc) => ({
        id: doc.id, // roomId
        ...doc.data(),
      }));
      setChatRooms(rooms);
    });

    return () => unsubscribe();
  }, [user_id]);

  const handleOpenRoom = (roomId) => {
    router.get(`/chat/room/${roomId}`); // チャットルームの詳細ページに遷移
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">チャット一覧</h1>
      <ul>
        {chatRooms.map((room) => (
          <li key={room.id} className="p-2 border-b cursor-pointer" onClick={() => handleOpenRoom(room.id)}>
            <h2 className="text-lg font-semibold">{room.product_title}</h2>
            <span>{ user_id === room.seller_id ? `申請者：${room.buyer_name}` : `出品者：${room.seller_name}`  }</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Index;
