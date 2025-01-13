import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import ProductList from './Partials/ProductList';

export default function Index({ products }) {
  return (
      <AuthenticatedLayout
        header={
          <h2 className="text-xl font-semibold leading-tight text-gray-800">
            マーケット
          </h2>
        }
      >
        <Head title="マーケット" />

        {products.data.length > 0 ? (
          <ProductList products={products} />
        ) : (
          <p className="text-gray-600 flex justify-center mt-24">
            寂しいですが、商品はありません。(´;ω;｀)
          </p>
        )}

      </AuthenticatedLayout>
  );
}