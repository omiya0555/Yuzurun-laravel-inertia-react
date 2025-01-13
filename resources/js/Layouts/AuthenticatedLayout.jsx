import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const [isScrolled, setIsScrolled] = useState(false);
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    // スクロール時に実行される処理
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);  // スクロールしたら透明度を追加
            } else {
                setIsScrolled(false);  // スクロールしていなければ透明度を戻す
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="min-h-screen flex flex-col bg-stone-100">
            <nav className={`border-b fixed top-0 left-0 w-full z-50 shadow transition duration-300 
                ${isScrolled
                    ? 'bg-stone-100 bg-opacity-70'
                    : 'bg-stone-100'
                }`}
            >
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-12 justify-between">
                        <div className="flex">
                            <Link
                                href={route('home')}
                                className="flex shrink-0 items-center text-xl font-bold"
                            >
                                <>
                                    <span className='text-red-600'>Yuzu</span>
                                    <span className='text-blue-600'>run</span>
                                </>
                            </Link>

                            <div className="hidden sm:-my-px sm:ms-10 sm:flex">
                                <NavLink href={route('home')} active={route().current('home')}>
                                    ホーム
                                </NavLink>
                                <NavLink href={route('products.index')} active={route().current('products.index')}>
                                    さがす
                                </NavLink>
                                <NavLink href={route('products.create')} active={route().current('products.create')}>
                                    出品
                                </NavLink>
                                <NavLink href={route('chat.index')} active={route().current('chat.index')}>
                                    チャット
                                </NavLink>
                            </div>
                        </div>

                        <div className="hidden sm:ms-6 sm:flex sm:items-center">
                            <div className="relative ms-3">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center rounded-md border border-transparent px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none"
                                            >
                                                {user.name}
                                                <svg
                                                    className="-me-0.5 ms-2 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link href={route('profile.edit')}>
                                            プロフィール
                                        </Dropdown.Link>
                                        <Dropdown.Link href={route('logout')} method="post" as="button">
                                            ログアウト
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                                className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 transition duration-150 ease-in-out hover:bg-gray-100 hover:text-gray-500 focus:bg-gray-100 focus:text-gray-500 focus:outline-none"
                            >
                                <svg
                                    className="h-6 w-6"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden'}>
                    <div className="space-y-1 pb-3 pt-2 bg-stone-300">
                        <ResponsiveNavLink href={route('home')} active={route().current('home')}>
                            ホーム
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href={route('products.index')} active={route().current('products.index')}>
                            さがす
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href={route('products.create')} active={route().current('products.create')}>
                            出品
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href={route('chat.index')} active={route().current('chat.index')}>
                            チャット
                        </ResponsiveNavLink>
                    </div>

                    <div className="border-t border-gray-200 pb-1 pt-4 bg-stone-300">
                        <div className="space-y-1">
                            <ResponsiveNavLink href={route('profile.edit')}>プロフィール</ResponsiveNavLink>
                            <ResponsiveNavLink method="post" href={route('logout')} as="button">
                                ログアウト
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="bg-stone-100  pt-12">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">{header}</div>
                </header>
            )}

            <main className="flex-grow">{children}</main>

            {/* フッター */}
            <footer className="bg-gray-800 text-white py-4">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center">
                        <p className="text-xs md:text-sm">&copy; 2025 Yuzurun. All rights reserved.</p>
                        <div className="space-x-4 text-xs md:text-sm">
                            <Link href={route('home')} className="text-sm hover:underline">
                                ホーム
                            </Link>
                            <Link href={route('products.index')} className="text-sm hover:underline">
                                さがす
                            </Link>
                            <Link href={route('products.create')} className="text-sm hover:underline">
                                出品
                            </Link>
                            <Link href={route('chat.index')} className="text-sm hover:underline">
                                チャット
                            </Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
