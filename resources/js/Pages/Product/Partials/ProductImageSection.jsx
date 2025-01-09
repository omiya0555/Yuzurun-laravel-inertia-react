import React from 'react';

function ProductImageSection({ productImageURLs }) {
  const images = Array.isArray(productImageURLs)
  ? productImageURLs
  : JSON.parse(productImageURLs || '[]');

  return (
    <div className="flex flex-col items-center">
      <div className="aspect-square w-full max-w-md bg-stone-200 flex items-center justify-center rounded-md overflow-hidden">
        <img
          src={images[0] || 'https://placehold.jp/400x400.png'}
          alt="メイン画像"
          className="object-cover w-full h-full"
        />
      </div>
      <div className="flex mt-4 space-x-2">
        {images.slice(1).map((url, index) => (
          <div key={index} className="aspect-square max-w-20 bg-stone-200 rounded-md overflow-hidden flex items-center justify-center">
            <img src={url} alt={`サムネイル ${index + 1}`} className="object-cover w-full h-full" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductImageSection;
