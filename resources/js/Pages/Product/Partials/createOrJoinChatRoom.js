import { db } from '@/firebaseConfig';
import { doc, addDoc, setDoc, collection, getDoc, serverTimestamp } from 'firebase/firestore';
import { router } from '@inertiajs/react'; // router をインポート

export async function createOrJoinChatRoom(product, buyer, initialMessage) {
  const roomId = `${product.id}_${buyer.id}`;
  try {
    console.log('チャットルームの存在を確認しています...');

    // 既存ドキュメントが存在するか確認
    const roomDocRef = doc(db, 'chat_rooms', roomId);
    const roomSnapshot = await getDoc(roomDocRef);

    if (roomSnapshot.exists()) {
      const proceed = confirm('チャットルームが既に存在します。チャットルームに移動しますか？');
      if (!proceed) {
        console.log('キャンセルされました。元の画面に留まります。');
        return;
      }
    } else {
      // 1. chat_rooms/{roomId} のドキュメントを作成
      await setDoc(roomDocRef, {
        id: roomId,
        product_title: product.title,
        buyer_id: buyer.id,
        buyer_name: buyer.name,
        seller_id: product.seller_id,
        seller_name: product.seller ? product.seller.name : 'Unknown',
      });

      console.log('新しいチャットルームを作成しました。');

      // 2. chat_rooms/{roomId}/chat_messages に最初のメッセージを追加
      await addDoc(collection(db, `chat_rooms/${roomId}/chat_messages`), {
        product_title: product.title,
        user_id: buyer.id,
        user_name: buyer.name,
        message: initialMessage,
        created_at: serverTimestamp(),
      });

      console.log('最初のメッセージを送信しました。');
    }

    // 3. チャットルームページへ遷移
    router.get(`/chat/room/${roomId}`, {}, {
      onSuccess: () => {
        console.log('チャットルームに遷移しました。');
      },
      onError: (error) => {
        console.error('エラー:', error);
      },
    });
  } catch (e) {
    console.error('エラーが発生しました:', e);
  }
}
