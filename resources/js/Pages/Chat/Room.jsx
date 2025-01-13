import React, { useEffect, useState, useRef } from 'react';
import { db } from '@/firebaseConfig';
import { collection, query, where, getDocs, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';
import { Head, router } from '@inertiajs/react';
import AuthenticatedChatLayout from '@/Layouts/AuthenticatedChatLayout';

function Room({ roomId, user_id, user_name }) {
  const [roomInfo, setRoomInfo] = useState(null); // ルーム情報を格納
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [error, setError] = useState('');
  const chatEndRef = useRef(null); // 自動スクロール用

  // Firestore のチャットルーム情報を取得
  useEffect(() => {
    const fetchRoomInfo = async () => {
      const chatRoomsRef = collection(db, 'chat_rooms'); // chat_roomsコレクション参照
      const q = query(chatRoomsRef, where('id', '==', roomId)); // idがroomIdと一致するドキュメントを取得

      try {
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const roomDoc = querySnapshot.docs[0]; // 一致する最初のドキュメントを取得
          setRoomInfo(roomDoc.data()); // ルーム情報をstateにセット
        } else {
          console.error('ルーム情報が見つかりません。');
          setError('ルーム情報が存在しません。');
        }
      } catch (error) {
        console.error('ルーム情報取得エラー:', error);
        setError('ルーム情報の取得に失敗しました。');
      }
    };

    fetchRoomInfo(); // useEffect内で非同期処理を実行
  }, [roomId]);

  // Firestore のチャットメッセージを監視
  useEffect(() => {
    const messagesRef = collection(db, `chat_rooms/${roomId}/chat_messages`);
    const unsubscribe = onSnapshot(
      messagesRef,
      (snapshot) => {
        const msgs = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMessages(msgs.sort((a, b) => a.created_at?.seconds - b.created_at?.seconds));
      },
      (error) => {
        console.error('メッセージ取得エラー:', error);
        setError('メッセージの取得に失敗しました。');
      }
    );

    return () => unsubscribe();
  }, [roomId]);

  // 新しいメッセージが追加されたら自動スクロール
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    setError('');
    if (!newMessage.trim()) return;

    const messageData = {
      user_id: user_id,
      user_name: user_name,
      message: newMessage.trim(),
      created_at: serverTimestamp(),
    };

    try {
      await addDoc(collection(db, `chat_rooms/${roomId}/chat_messages`), messageData);
      setNewMessage('');
    } catch (error) {
      console.error('メッセージ送信エラー:', error);
      setError('メッセージの送信に失敗しました。もう一度お試しください。');
    }
  };

  return (
    <AuthenticatedChatLayout className="bg-stone-100 h-screen flex flex-col">
      <Head title="チャットルーム" />
      <div className="relative bg-stone-100 h-screen flex flex-col">
        {/* ヘッダーを固定 */}
        <div className="sticky top-12 z-10 bg-stone-200 flex items-center">
          <button
            className="ml-4 bg-white text-stone-800 font-semibold w-16 p-1 rounded shadow hover:bg-stone-300 transition"
            onClick={() => router.get('/chat')}
          >
            戻る
          </button>
          <h2 className="text-lg font-semibold text-stone-800 p-1 border-b w-full lg:w-4/5 mx-auto ml-4">
            {roomInfo ? (
              <>
                {roomInfo.product_title}
                <div className="text-base text-gray-600 mt-1">
                  {user_id === roomInfo.seller_id
                    ? `申請者：${roomInfo.buyer_name}`
                    : `出品者：${roomInfo.seller_name}`}
                </div>
              </>
            ) : (
              'チャットルーム情報を読み込み中...'
            )}
          </h2>
        </div>

        {/* メッセージ表示エリア */}
        <div className="flex-grow flex flex-col justify-between overflow-hidden w-full lg:w-4/5 mx-auto mt-12 bg-white">
          <div className="overflow-y-auto px-8 py-8 space-y-4 flex-grow">
            {error && <p className="text-red-500">{error}</p>}

            {messages.length === 0 ? (
              <p className="text-stone-600 text-center">まだメッセージはありません。</p>
            ) : (
              <>
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.user_id === user_id ? 'justify-end' : 'justify-start'} mb-4`}
                  >
                    <div className="flex items-center space-x-2">
                      <div
                        className={`py-2 px-4 rounded-lg shadow max-w-xs break-words ${msg.user_id === user_id ? 'bg-blue-500 text-white' : 'bg-stone-500 text-white'
                          }`}
                      >
                        {msg.message}
                      </div>
                      <span className="text-xs text-gray-500">
                        {msg.created_at?.toDate().toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        }) ?? '不明'}
                      </span>
                    </div>
                  </div>
                ))}
                <div ref={chatEndRef} />
              </>
            )}
          </div>

          {/* 送信フォームを固定 */}
          <div className="bg-stone-200 p-4 border-t border-stone-300">
            <form onSubmit={handleSendMessage} className="flex items-center space-x-4">
              <input
                type="text"
                placeholder="メッセージを入力"
                className="flex-1 rounded-md border border-stone-300 p-2 focus:outline-none focus:ring focus:ring-stone-200"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-800 focus:outline-none focus:ring focus:ring-blue-300 transition"
                disabled={!newMessage.trim()}
              >
                送信
              </button>
            </form>
          </div>
        </div>
      </div>
    </AuthenticatedChatLayout>
  );
}

export default Room;
