import { db } from '@/firebaseConfig';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { router } from '@inertiajs/react'; // router をインポート

export async function createOrJoinChatRoom(product, buyer, initialMessage) {
  const roomId = `${product.id}_${buyer.id}`;
  try {
    console.log('送信します。');

    await addDoc(collection(db, 'chat_rooms'), {
      id: roomId,
      product_title: product.title,
      buyer_id: buyer.id,
      buyer_name: buyer.name,
      seller_id: product.seller_id,
      seller_name: product.seller ? product.seller.name : 'Unknown',
    });

    await addDoc(collection(db, `chat_rooms/${roomId}/chat_messages`), {
      product_title: product.title,
      user_id: buyer.id,
      user_name: buyer.name,
      message: initialMessage,
      created_at: serverTimestamp(),
    });

    console.log('Firestore に送信しました。');

    // `router.get` を使用してチャット一覧ページに遷移
    router.get(`/chat/room/${roomId}`, {}, {
      onSuccess: () => {
        console.log('チャットルーム一覧に遷移しました。');
      },
      onError: (error) => {
        console.error('エラー:', error);
      },
    });
  } catch (e) {
    console.error('送信エラー:', e);
  }
}
