import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import TermsOfServiceModal from './TermsOfServiceModal'; // 利用規約モーダルのインポート

export default function Register() {
    const [isModalOpen, setIsModalOpen] = useState(false); // モーダル状態
    const [isAgreed, setIsAgreed] = useState(false); // 利用規約同意状態
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        if (isAgreed) {
            post(route('register'), {
                onFinish: () => reset('password', 'password_confirmation'),
            });
        } else {
            alert('利用規約に同意してください。');
        }
    };

    return (
        <GuestLayout>
            <Head title="Register" />
            <form onSubmit={submit}>
                <div>
                    <h1 className="flex justify-center text-3xl mt-4 mb-8 font-sans font-semibold text-stone-800">
                        <span className="text-red-500">Yuzu</span>
                        <span className="text-blue-500">run</span>
                    </h1>
                </div>
                <div>
                    <InputLabel htmlFor="name" value="ユーザー名" />
                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full"
                        autoComplete="name"
                        isFocused={true}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                    />
                </div>
                <div className="mt-4">
                    <InputLabel htmlFor="email" value="Eメール" />
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />
                </div>
                <div className="mt-4">
                    <InputLabel htmlFor="password" value="パスワード" />
                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData('password', e.target.value)}
                        required
                    />
                </div>
                <div className="mt-4">
                    <InputLabel htmlFor="password_confirmation" value="パスワード確認" />
                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        required
                    />
                </div>

                <div className="mt-4">
                    <label className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            className="form-checkbox rounded-sm"
                            checked={isAgreed}
                            onChange={() => setIsAgreed(!isAgreed)}
                        />
                        <span className="text-sm text-gray-600">利用規約に同意します</span>
                        <button
                            type="button"
                            className="underline text-blue-500 hover:text-blue-700 text-sm"
                            onClick={() => setIsModalOpen(true)}
                        >
                            詳細を確認
                        </button>
                    </label>
                </div>

                <div className="mt-4 flex items-center justify-end">
                    <Link
                        href={route('login')}
                        className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        既に登録済みですか？
                    </Link>

                    <PrimaryButton className="ms-4" disabled={processing || !isAgreed}>
                        新規登録
                    </PrimaryButton>
                </div>
            </form>

            {/* GoogleとSlack認証のセクション */}
            <hr className="my-6 border-t border-gray-300" />
            <div className="flex space-x-4">
                <button
                    onClick={() => {
                        if (isAgreed) {
                            window.location.href = route('auth.google.redirect');
                        } else {
                            alert('利用規約に同意してください。');
                        }
                    }}
                    className="flex items-center justify-center w-full py-2 bg-stone-400 hover:bg-red-500 hover:text-white hover:shadow-lg hover:font-bold rounded-md transition duration-300"
                >
                    <img src="/images/google.svg" alt="Google Icon" className="w-5 h-5 mr-2" />
                    Google認証
                </button>

                <button
                    onClick={() => {
                        if (isAgreed) {
                            window.location.href = route('auth.slack.redirect');
                        } else {
                            alert('利用規約に同意してください。');
                        }
                    }}
                    className="flex items-center justify-center w-full py-2 bg-stone-400 hover:bg-blue-700 hover:text-white rounded-md hover:shadow-lg hover:font-bold transition duration-300"
                >
                    <img src="/images/slack.svg" alt="Slack Icon" className="w-5 h-5 mr-2" />
                    Slack認証
                </button>
            </div>

            {/* 利用規約モーダル */} 
            <TermsOfServiceModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </GuestLayout>
    );
}
