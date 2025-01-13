import { Link } from "@inertiajs/react";

function ProductPagenateSection({ products }) {
  return (
    <div className="mt-8 flex justify-center">
      {products.links.map((link, index) => (
        <Link
          key={index}
          href={link.url}
          preserveState
          className={`inline-block px-3 py-1 mx-1 rounded-md ${link.active ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-800'}`}
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
}

export default ProductPagenateSection;
