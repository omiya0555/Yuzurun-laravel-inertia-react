import WelcomeInfo from '@/Components/WelcomeInfo';
import { Link, Head } from '@inertiajs/react';

export default function Welcome() {
    return (
        <div className="min-h-screen flex flex-col bg-stone-100">
            <Head title="Welcome to Omiya Market" />
            <header className="shadow">
                <div className="max-w-7xl mx-auto px-4 py-1 flex justify-between items-center">
                    <h1 className="text-xl font-bold">
                        <span className="text-red-600">Yuzu</span>
                        <span className="text-blue-600">run</span>
                    </h1>
                    <div className="space-x-4">
                        <Link href={route('login')} className="text-sm font-medium text-blue-500 hover:underline">
                            ログイン
                        </Link>
                        <Link href={route('register')} className="text-sm font-medium text-blue-500 hover:underline">
                            会員登録
                        </Link>
                    </div>
                </div>
            </header>

            {/* メインコンテンツ */}
            <main className='mb-24'>
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

                <div className="mt-16">
                    <h2 className="text-4xl font-bold text-center mb-8">Yuzurunとは？</h2>
                    <p className="text-center text-xl text-gray-700">
                        日常の中で<span className="font-bold">まだ使える「モノ」</span>を捨てるのはもったいない。<br /><br />
                        次の人に<span className="text-red-600 font-bold">無料で譲ったり</span>、<br /><br />
                        必要な「モノ」を<span className="text-blue-600 font-bold">無料で受け取る</span>ことができます。
                    </p>
                    <div className="flex justify-center my-24">
                        <Link
                            href={route('register')}
                            className="bg-red-600 hover:bg-red-800 text-white font-bold py-3 px-6 rounded-md transition"
                        >
                            無料登録してはじめる
                        </Link>
                    </div>


                    <div className='px-8'>
                        <WelcomeInfo />
                    </div>

                    <hr className='my-24' />

                    <div className="flex justify-center">
                        <Link
                            href={route('register')}
                            className="bg-red-600 hover:bg-red-800 text-white font-bold py-3 px-6 rounded-md transition"
                        >
                            無料登録してはじめる
                        </Link>
                    </div>

                </div>
            </main>

            <footer className="bg-gray-800 text-white py-4">
                <div className="max-w-7xl mx-auto text-center">
                    <p className="text-sm">&copy; 2025 Yuzurun. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}
