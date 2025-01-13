export default function WelcomeInfo() {
    return (
        <div>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-16 mb-12'>
                {/* 概要 */}
                <div className="flex flex-col items-center justify-center space-y-4">
                    <h3 className='md:text-3xl text-2xl font-bold text-red-600'>「モノ」をゆずる</h3>
                    <p className='text-lg text-gray-700'>使える「モノ」を捨てるのはもったいない。</p>
                    <p className='text-lg text-gray-600'>次の人に<span className='font-bold'>無料</span>で譲りましょう！</p>
                    <p className='text-lg text-gray-600'>簡単な操作で出品できます。</p>
                </div>
                <div className='w-full h-64 flex py-6 bg-slate-200 items-center justify-center rounded-l-full rounded-br-full'>
                    <img
                        src="/images/smartphone_man_color.png"
                        alt="スマホを持つ男性"
                        className='h-full'
                    />
                </div>

                {/* 手順 */}
                <div className='order-2 lg:order-1 p-12 w-full h-64 bg-slate-300 flex items-center justify-center rounded-r-full rounded-bl-full'>
                    <img
                        src="/images/handshake_suit_color.png"
                        alt="握手"
                        className='h-full'
                    />
                </div>
                <div className="order-1 lg:order-2 flex flex-col  items-center justify-center space-y-4">
                    <h3 className='md:text-3xl text-2xl font-bold text-blue-600'>「モノ」をひきとる</h3>
                    <p className='text-lg text-gray-600'>新しい「モノ」が必要ですか？ゆずるんなら、</p>
                    <p className='text-lg text-gray-600'>欲しい「モノ」を<span className='font-bold'>無料</span>で見つけられます。</p>
                </div>
            </div>

            <hr className='mb-12' />

            {/* ガイドセクション */}
            <div className="mb-24">
                <h2 className='flex justify-center pt-24 pb-12 md:text-4xl text-2xl font-extrabold text-gray-900 mb-8'>ご利用の流れ</h2>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-12'>

                    <div className='flex flex-col justify-center items-center'>
                        <h3 className='md:text-2xl text-xl font-bold text-purple-700'>STEP 1: 会員登録</h3>
                        <p className='text-lg text-gray-600 mt-4'>ユーザー名、メール、パスワードで登録、</p>
                        <p className='text-lg text-gray-600 mt-4'>各プロバイダでシングルサインオンも可能🔥</p>
                    </div>
                    <div className='w-full h-48 p-6 bg-slate-200 flex items-center justify-center rounded-l-full rounded-br-full'>
                        <img
                            src="/images/slack_logo.png"
                            alt="Slack ロゴ"
                            className='h-full'
                        />
                    </div>

                    <div className='order-2 md:order-1 p-6 bg-slate-300 w-full h-48 flex items-center justify-center rounded-r-full rounded-bl-full'>
                        <img
                            src="/images/robot_color.png"
                            alt="ロボットのイラスト"
                            className='h-full'
                        />
                    </div>
                    <div className='order-1 md:order-2 flex flex-col justify-center  items-center'>
                        <h3 className='md:text-2xl text-xl font-bold text-purple-700'>STEP 2-A: 商品を出品</h3>
                        <p className='text-lg text-gray-600 mt-4'>「譲りたいモノ」を画像と説明付きで出品し、</p>
                        <p className='text-lg text-gray-600 mt-4'>次の人に渡しましょう🎁</p>
                    </div>

                    <div className='order-3 flex flex-col justify-center items-center'>
                        <h3 className='md:text-2xl text-xl font-bold text-purple-700'>STEP 2-B: 商品を引き取る</h3>
                        <p className='text-lg text-gray-600 mt-4'>「必要なモノ」をみつけたら、ボタンを押すだけ！</p>
                        <p className='text-lg text-gray-600 mt-4'>日時や場所の話し合いには、<br/>アプリ内チャット,LINE,Signalを選択できます🌸</p>
                    </div>
                    <div className='order-4 w-full h-48 p-6 bg-slate-200 flex items-center justify-center rounded-l-full rounded-br-full'>
                        <img
                            src="/images/gift_color.png"
                            alt="プレゼントの画像"
                            className='h-full'
                        />
                    </div>

                </div>
            </div>

            <hr className='mb-24' />

            {/* 備考セクション */}
            <div className="flex justify-center">
                <div>
                    <h2 className='md:text-3xl text-2xl font-extrabold text-gray-900 mb-8'>備考</h2>
                    <div className='text-sm md:text-xl text-gray-700 bg-stone-200 p-8 rounded-md leading-relaxed'>
                        <p className='mb-8'>
                            ・<span className='text-gray-900 font-semibold'>現在は出品機能に制限をかけております。</span>
                        </p>
                        <p className='mb-8'>
                            ・なぜならこのアプリの真の目的は、<span className='text-gray-900 font-semibold'>「転居にあたって譲れるものを譲ること」</span>だからです。
                        </p>
                        <p className='mb-8'>
                            ・受取場所や日時調整は、アプリ内チャット,LINE,Signalを選択できます。
                        </p>
                        <p className=''>
                            ・<span className='text-gray-900 font-semibold'>無料で配送方法も自由相談</span>のフリーマーケットサイトです ：）
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}