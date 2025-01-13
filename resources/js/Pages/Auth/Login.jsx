import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}

            <form onSubmit={submit}>
                <div>
                    <h1 className='flex justify-center text-3xl mt-4 mb-8 font-sans font-semibold text-stone-800'>
                        <span className='text-red-500'>Yuzu</span>
                        <span className='text-blue-500'>run</span>
                    </h1>
                </div>
                <div>
                    <InputLabel htmlFor="email" value="Eメール" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="パスワード" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4 mx-2 block">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) =>
                                setData('remember', e.target.checked)
                            }
                        />
                        <span className="ms-2 text-sm text-gray-600">
                            パスワードを記憶
                        </span>
                    </label>
                </div>

                <div className="mt-4 mx-2 flex items-center justify-end space-x-5">
                    <Link
                        href={route('register')}
                        className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        新規登録
                    </Link>
                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            パスワードを忘れた場合
                        </Link>
                    )}

                    <PrimaryButton disabled={processing}>
                        ログイン
                    </PrimaryButton>
                </div>
            </form>

            {/* GoogleとSlack認証のセクション */}
            <hr className="my-6 border-t border-gray-300" />

            <div className="flex space-x-4">
                <button
                    onClick={() => window.location.href = route('auth.google.redirect')}
                    className="flex items-center justify-center w-full py-2 bg-stone-400 hover:bg-red-500 hover:text-white hover:shadow-lg hover:font-bold rounded-md transition duration-300"
                >
                    <img src="/images/google.svg" alt="Google Icon" className="w-5 h-5 mr-2" />
                    Google認証
                </button>

                <button
                    onClick={() => window.location.href = route('auth.slack.redirect')}
                    className="flex items-center justify-center w-full py-2 bg-stone-400 hover:bg-blue-700 hover:text-white rounded-md hover:shadow-lg hover:font-bold transition duration-300"
                >
                    <img src="/images/slack.svg" alt="Slack Icon" className="w-5 h-5 mr-2" />
                    Slack認証
                </button>
            </div>
        </GuestLayout>
    );
}
