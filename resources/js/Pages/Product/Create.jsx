import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ImageUploadSection from '@/Pages/Product/Partials/ImageUploadSection';

export default function CreateProduct({ categories, conditions }) {
  const [images, setImages] = useState([]);
  const { data, setData, post, processing, errors, reset } = useForm({
    title: '',
    description: '',
    category: '',
    condition: '',
    image_files: [],
  });

  const overlay = document.createElement('div');
  overlay.className = 'loading-overlay';
  document.body.appendChild(overlay);

  const submit = (e) => {
    e.preventDefault();
    overlay.classList.add('active');

    post(route('products.store'), {
      onSuccess: () => {
        reset();
        overlay.classList.remove('active');
      },
      onError: () => {
        overlay.classList.remove('active');
      },
      preserveScroll: true,
    });
  };

  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-stone-800">
          マーケットに出品
        </h2>
      }
    >
      <Head title="出品" />
      <div className="flex max-w-xl mx-auto px-12 pb-8 rounded-md">
        <form onSubmit={submit} className="w-full space-y-4">
          {/* タイトル */}
          <div>
            <InputLabel htmlFor="title" value="商品名" />
            <input
              type="text"
              id="title"
              name="title"
              value={data.title}
              className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              onChange={(e) => setData('title', e.target.value)}
              required
            />
            {errors.title && <p className="text-red-500 text-sm mt-2">{errors.title}</p>}
          </div>

          {/* 画像アップロード */}
          <ImageUploadSection
            images={images}
            setImages={setImages}
            errors={errors}
            setData={setData}
            data={data}
          />
          {Object.keys(errors)
            .filter((key) => key.startsWith('image_files'))
            .slice(0, 1) // 最初の1つだけ取得
            .map((key) => (
              <p key={key} className="text-red-500 text-sm mt-2">
                {errors[key][0]} {/* 最初のメッセージのみ */}
              </p>
            ))}

          {/* 商品説明 */}
          <div>
            <InputLabel htmlFor="description" value="商品説明" />
            <textarea
              id="description"
              name="description"
              value={data.description}
              className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              rows="4"
              onChange={(e) => setData('description', e.target.value)}
              required
            />
            {errors.description && <p className="text-red-500 text-sm mt-2">{errors.description}</p>}
          </div>

          {/* カテゴリー */}
          <div>
            <InputLabel htmlFor="category" value="カテゴリー" />
            <select
              id="category"
              name="category"
              value={data.category}
              className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              onChange={(e) => setData('category', e.target.value)}
              required
            >
              <option value="">カテゴリーを選択してください</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
            {errors.category && <p className="text-red-500 text-sm mt-2">{errors.category}</p>}
          </div>

          {/* コンディション */}
          <div>
            <InputLabel htmlFor="condition" value="状態" />
            <select
              id="condition"
              name="condition"
              value={data.condition}
              className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              onChange={(e) => setData('condition', e.target.value)}
              required
            >
              <option value="">状態を選択してください</option>
              {conditions.map((condition, index) => (
                <option key={index} value={condition}>
                  {condition}
                </option>
              ))}
            </select>
            {errors.condition && <p className="text-red-500 text-sm mt-2">{errors.condition}</p>}
          </div>

          {/* 提出ボタン */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={processing}
              className={`w-full bg-red-600 text-white font-bold mt-4 px-8 py-3 rounded-md hover:bg-red-800 transition ${processing ? 'opacity-50 cursor-not-allowed' : ''
                }`}
            >
              {processing ? '送信中...' : '出品する'}
            </button>
          </div>
        </form>
      </div>
    </AuthenticatedLayout>
  );
}
