import { Link } from "@inertiajs/react";

export default function WelcomeButton( {children} ) {
  return (
    <div className="flex justify-center my-24">
      <Link
        href={route('register')}
        className="bg-red-600 hover:bg-red-800 text-white font-bold py-3 px-6 rounded-md transition"
      >
        {children}
      </Link>
    </div>
  );
}