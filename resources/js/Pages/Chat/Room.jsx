import React, { useEffect, useState } from 'react';
import { db } from '@/firebaseConfig';
import { collection, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';

function ChatRoom({ roomId, user_id }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const messagesRef = collection(db, `chat_rooms/${roomId}/chat_messages`);
    const unsubscribe = onSnapshot(messagesRef, (snapshot) => {
      const msgs = snapshot.docs.map((doc) => doc.data());
      setMessages(msgs);
    });

    return () => unsubscribe();
  }, [roomId]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    await addDoc(collection(db, `chat_rooms/${roomId}/chat_messages`), {
      user_id: user_id,
      message: newMessage,
      created_at: serverTimestamp(),
    });
    setNewMessage('');
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">チャットルーム</h1>
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`p-2 rounded ${msg.user_id === user_id ? 'bg-blue-100' : 'bg-gray-200'}`}>
            <p>{msg.message}</p>
          </div>
        ))}
      </div>
      <div className="flex mt-4">
        <input
          type="text"
          className="flex-1 border rounded p-2"
          placeholder="メッセージを入力"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button className="bg-blue-500 text-white p-2 rounded ml-2" onClick={handleSendMessage}>
          送信
        </button>
      </div>
    </div>
  );
}

export default ChatRoom;
