import { db } from '@/firebaseConfig';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { router } from '@inertiajs/react'; // 変更箇所

export async function createOrJoinChatRoom(product, buyer, initialMessage) {
  const roomId = `${product.id}_${buyer.id}`;
  try {
    console.log('送信します。');

    // Firestore に初回メッセージを送信
    await addDoc(collection(db, `chat_rooms/${roomId}/chat_messages`), {
      user_id: buyer.id,
      user_name: buyer.name,
      message: initialMessage,
      created_at: serverTimestamp(),
    });

    console.log('Firestore に送信しました。');

    // Inertia router で POST リクエストを送信
    router.post('/chat/join', {
      product_id: product.id,
      seller_id: product.seller.id,
      buyer_id: buyer.id,
      room_id: roomId,
      message: initialMessage,
    }, {
      onSuccess: () => {
        console.log('チャットルームに遷移しました。');
      },
      onError: (error) => {
        console.error('エラー:', error);
      },
    });
  } catch (e) {
    console.error('送信エラー:', e);
  }
}
