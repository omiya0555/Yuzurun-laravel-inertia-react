import React, { useEffect, useState } from 'react';

function FlashMessage({ message, type = 'success', duration = 5000 }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!message) return;
    const timeout = setTimeout(() => setVisible(false), duration);
    return () => clearTimeout(timeout);
  }, [duration, message]);

  if (!message || !visible) return null;

  const bgColor = {
    success: 'bg-green-100 text-green-800 border-green-500',
    error: 'bg-red-100 text-red-800 border-red-500',
  }[type];

  return (
    <div className={`fixed top-4 right-4 z-50 max-w-md border rounded-lg shadow-lg p-4 ${bgColor}`}>
      <div className="flex justify-between items-center">
        <span>{message}</span>
        <button className="text-gray-600" onClick={() => setVisible(false)}>✖</button>
      </div>
    </div>
  );
}

export default FlashMessage;