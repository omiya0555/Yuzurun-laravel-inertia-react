import React, { useState } from 'react';
import { Head, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ProductImageSection from '@/Pages/Product/Partials/ProductImageSection';
import ProductInfoSection from '@/Pages/Product/Partials/ProductInfoSection';

export default function Show({ product: initialProduct }) {
  const { auth } = usePage().props;
  const [product, setProduct] = useState(initialProduct);
  const isSeller = auth.user.id === product.seller_id;

  return (
      <AuthenticatedLayout
        header={<h2 className="text-xl font-semibold leading-tight text-stone-800">商品詳細</h2>}
      >
        <Head title="商品詳細" />

        <div className="bg-stone-100">
          <div className="max-w-7xl mx-auto px-4 mb-2">
            <button
              onClick={() =>
                 (window.location.href = '/products')
              }
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold ml-2 py-2 px-4 rounded shadow-sm transition"
            >
              ← 戻る
            </button>
          </div>

          <div className="py-4">
            <div className="mx-auto max-w-4xl sm:px-6 lg:px-8">
              <div className="grid md:grid-cols-2 gap-6 p-8">
                <ProductImageSection productImageURLs={product.image_urls} />
                <ProductInfoSection
                  product={product}
                  onRequestTransaction={() => setProduct((prev) => ({ ...prev, isRequested: true }))}
                  isSeller={isSeller}
                />
              </div>
            </div>
          </div>
        </div>
      </AuthenticatedLayout>
  );
}
