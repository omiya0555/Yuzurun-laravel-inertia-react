import React, { useState } from 'react';

function MessageModal({ isOpen, onClose, onSubmit }) {

  const [selectedTab, setSelectedTab] = useState('chat'); // タブ状態: "chat", "line", "signal"
  const [selectedMessage, setMessage] = useState('');     // メッセージ内容

  if (!isOpen) return null;

  const handleSubmit = () => {
    // タブの選択状態に応じて送信するフラグを変更
    const selectedMethod = selectedTab; // chat, line, signal
    onSubmit({ method: selectedMethod, message: selectedMessage });
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded shadow-lg p-6 w-11/12 sm:w-96">
        <div className='my-4'>
          <p className='text-xl flex justify-center'>チャット方法を選びましょう！</p>
        </div>
        <div className="flex justify-around border-b pb-2 mb-4">
          <button
            className={`py-2 px-4 font-bold ${selectedTab === 'chat' ? 'border-b-4 border-purple-600 text-purple-600' : 'text-gray-500'}`}
            onClick={() => setSelectedTab('chat')}
          >
            チャット
          </button>
          <button
            className={`py-2 px-4 font-bold ${selectedTab === 'line' ? 'border-b-4 border-green-600 text-green-600' : 'text-gray-500'}`}
            onClick={() => setSelectedTab('line')}
          >
            LINE
          </button>
          <button
            className={`py-2 px-4 font-bold ${selectedTab === 'signal' ? 'border-b-4 border-blue-600 text-blue-600' : 'text-gray-500'}`}
            onClick={() => setSelectedTab('signal')}
          >
            Signal
          </button>
        </div>

        {/* タブの内容を切り替え */}
        {selectedTab === 'chat' && (
          <div className='space-y-1 h-32'>
            <p>アプリ内のチャットでもろもろ決めます。</p>
            <p className='font-semibold text-purple-600 pb-2'>通知はありません。</p>
            <textarea
              className="w-full border-gray-400 rounded-md px-4 py-1"
              placeholder='例:〇〇と申します。 〇日〇時に、〇〇でうけとれます！'
              onChange={(e) => setMessage(e.target.value)}
              rows={2}
            />
          </div>
        )}

        {selectedTab === 'line' && (
          <div className="text-stone-600 space-y-2 mb-16">
            <p>LINEを使ってもろもろ決める方法です。</p>
            <p>LINEリンクを登録済みのメールに送信します。</p>
            <p className="font-semibold text-green-600">
              送信後、メール内のリンクから友達追加してください。
            </p>
          </div>
        )}

        {selectedTab === 'signal' && (
          <div className=" text-stone-600 space-y-2 mb-16">
            <p>Signalを使ってもろもろ決める方法です。</p>
            <p>Signalリンクを登録済みのメールに送信します。</p>
            <p className="font-semibold text-blue-500">
              送信後、メール内のリンクから友達追加してください。
            </p>
          </div>
        )}

        <div className="flex justify-between space-x-2 mt-6">
          <button
            onClick={onClose}
            className="bg-red-600 text-white font-bold py-2 px-4 rounded hover:bg-red-800 transition"
          >
            キャンセル
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-800 transition"
          >
            送信する
          </button>
        </div>
      </div>
    </div>
  );
}

export default MessageModal;
