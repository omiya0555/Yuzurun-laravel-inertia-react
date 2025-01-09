import React from 'react';

function MessageModal({ isOpen, onClose, onSubmit }) {
  const templates = [
    'こんにちは！この商品を引き取りたいです。',
    '商品について詳しく話を聞きたいです。',
    '受け取り方法について相談させてください。'
  ];

  const [selectedMessage, setSelectedMessage] = React.useState(templates[0]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded shadow-lg p-6 w-11/12 sm:w-96">
        <p className="text-md font-bold ml-1 mb-1">取引申請メッセージを選択</p>
        <select
          className="w-full px-4 py-2 border rounded-md mb-4"
          value={selectedMessage}
          onChange={(e) => setSelectedMessage(e.target.value)}
        >
          {templates.map((template, index) => (
            <option key={index} value={template}>
              {template}
            </option>
          ))}
        </select>
        <textarea
          className="w-full border rounded-md px-4 py-2"
          value={selectedMessage}
          onChange={(e) => setSelectedMessage(e.target.value)}
          rows={5}
        />
        <div className="flex justify-end space-x-2 mt-4">
          <button
            onClick={onClose}
            className="bg-red-600 text-white font-bold py-2 px-4 rounded hover:bg-red-800 transition"
          >
            キャンセル
          </button>
          <button
            onClick={() => onSubmit(selectedMessage)}
            className="bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-800 transition"
          >
            送信
          </button>
        </div>
      </div>
    </div>
  );
}

export default MessageModal;
