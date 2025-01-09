import WelcomeInfo from '@/Components/WelcomeInfo';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Home() {
    return (
        <AuthenticatedLayout>
            <Head title="ホーム" />

            {/* 画像ヘッダー */}
            <div className="relative">
                <img
                    src="/images/yuzurun_bg.png"
                    alt="Market Background"
                    className="object-cover w-full h-[700px]"
                />
                <div className="absolute inset-0 bg-black bg-opacity-10 flex pt-36 justify-center">
                    <h1 className="md:text-4xl text-2xl font-extrabold text-white drop-shadow-lg flex space-x-4">
                        <span className='text-red-500'>Welcome</span>
                        <span className='text-stone-100'>to</span>
                        <span className='text-blue-500'>Yuzurun!</span>
                    </h1>
                </div>
            </div>

            {/* コンテンツ */}
            <div className="mt-8 mb-24 mx-4 md:mx-16">
                <h2 className="text-4xl font-bold text-center mb-8">はじめよう</h2>
                <div className="flex justify-center space-x-28 mb-20">
                    <Link
                        href={route('products.index')}
                        className="bg-blue-600 hover:bg-blue-800 text-white font-bold p-2 rounded-md transition"
                    >
                        マーケットをみる
                    </Link>
                    <Link
                        href={route('products.create')}
                        className="bg-red-600 hover:bg-red-800 text-white font-bold p-2 rounded-md transition"
                    >
                        出品してみる
                    </Link>
                </div>
                <WelcomeInfo />
            </div>
        </AuthenticatedLayout>
    );
}
