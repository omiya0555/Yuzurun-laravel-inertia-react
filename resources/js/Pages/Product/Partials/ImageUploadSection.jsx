import React, { useState } from 'react';
import InputError from '@/Components/InputError';

function ImageUploadSection({ images, setImages, errors, setData, data }) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    const validFiles = files.filter((file) => file.type.startsWith('image/'));

    if (validFiles.length + images.length > 5) {
      alert('5枚までしかアップロードできません。');
      return;
    }

    setImages((prevImages) => [...prevImages, ...validFiles]);
    setData('image_files', [...data.image_files, ...validFiles]);
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + images.length > 5) {
      alert('5枚までしかアップロードできません。');
      return;
    }
    setImages([...images, ...files]);
    setData('image_files', [...data.image_files, ...files]);
  };

  const removeImage = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    const updatedFiles = data.image_files.filter((_, i) => i !== index);
    setImages(updatedImages);
    setData('image_files', updatedFiles);
  };

  return (
    <div>
      <label
        htmlFor="image_files"
        className="block text-sm font-medium text-gray-700"
      >
        画像ファイルをアップロード (最大5枚)
      </label>

      <div
        className={`mt-2 flex justify-center rounded-lg border-2 p-6 ${
          isDragging
            ? 'border-blue-400 bg-blue-50'
            : 'border-dashed border-gray-300 bg-white hover:bg-gray-50 transition'
        }`}
        onDragOver={(e) => e.preventDefault()}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="text-center h-12">
          <div className="flex text-sm text-gray-600">
            <label
              htmlFor="image_files"
              className="relative cursor-pointer rounded-md font-medium text-blue-600 focus-within:ring-offset-2 hover:text-blue-800 transition"
            >
              <span>ファイルを選択</span>
              <input
                id="image_files"
                name="image_files"
                type="file"
                multiple
                accept="image/*"
                className="sr-only"
                onChange={handleImageChange}
              />
            </label>
            <p className="pl-1">またはドラッグ＆ドロップ</p>
          </div>
          <p className="text-xs text-gray-500">PNG, JPG, GIF 最大10MB</p>
        </div>
      </div>

      {errors.image_files && (
        <p className="text-red-500 text-sm mt-2">{errors.image_files[0]}</p>
      )}

      <div className="mt-4 grid grid-cols-5 gap-4">
        {images.map((image, index) => (
          <div key={index} className="relative">
            <img
              src={URL.createObjectURL(image)}
              alt="Preview"
              className="h-24 w-24 object-cover rounded-lg border"
            />
            <button
              type="button"
              className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
              onClick={() => removeImage(index)}
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ImageUploadSection;
