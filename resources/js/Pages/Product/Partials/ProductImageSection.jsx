import React, { useState } from 'react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

function ProductImageSection({ productImageURLs }) {
  const images = Array.isArray(productImageURLs)
    ? productImageURLs
    : JSON.parse(productImageURLs || '[]');

  const galleryImages = images.map((url) => ({
    original: url || 'https://placehold.jp/800x800.png',
    thumbnail: url || 'https://placehold.jp/100x100.png',
  }));

  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  const closeGallery = () => setIsGalleryOpen(false);

  return (
    <div className="flex flex-col items-center">
      {/* メイン画像 */}
      <div
        className="aspect-square w-full max-w-md bg-stone-200 flex items-center justify-center rounded-md overflow-hidden cursor-pointer"
        onClick={() => setIsGalleryOpen(true)}
      >
        <img
          src={images[0] || 'https://placehold.jp/400x400.png'}
          alt="メイン画像"
          className="object-cover w-full h-full"
        />
      </div>

      {/* サムネイル画像 */}
      <div className="flex mt-4 space-x-2">
        {images.slice(1).map((url, index) => (
          <div
            key={index}
            className="aspect-square max-w-20 bg-stone-200 rounded-md overflow-hidden flex items-center justify-center cursor-pointer"
            onClick={() => setIsGalleryOpen(true)}
          >
            <img src={url} alt={`サムネイル ${index + 1}`} className="object-cover w-full h-full" />
          </div>
        ))}
      </div>

      {/* モーダルで画像ギャラリー表示 */}
      {isGalleryOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50"
          onClick={closeGallery} // モーダル外クリックで閉じる
        >
          <div
            className="relative w-full max-w-2xl bg-white rounded-lg shadow-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()} // 内部クリックでイベントを伝播しない
          >
            <ImageGallery
              items={galleryImages}
              showThumbnails={true}
              showFullscreenButton={false}
              showPlayButton={false}
              slideDuration={300}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductImageSection;
