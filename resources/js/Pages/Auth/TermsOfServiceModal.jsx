function TermsOfServiceModal({ isOpen, onClose }) {
    return (
        isOpen && (
            <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white p-6 rounded shadow-lg w-11/12 sm:w-3/4 md:w-1/2 lg:w-1/3">
                    <h2 className="text-2xl font-bold mb-4">利用規約</h2>
                    <div className="overflow-y-auto max-h-96 text-sm space-y-4">
                        <p>第1条（適用）<br />
                        本規約は、ユーザーが本サービスを利用する際の条件を定めるものです。本サービスを利用することで本規約に同意したものとみなします。</p>

                        <p>第2条（個人情報の利用目的）<br />
                        本サービスでは、収集したメールアドレスやチャット内容などの個人情報をアプリの機能提供目的以外では使用しません。</p>

                        <p>第3条（免責事項）<br />
                        損失やトラブルについては一切責任を負いません。</p>

                        <p>第4条（サービスの提供中断・終了）<br />
                        本サービスは、提供者の判断で任意のタイミングで提供を中止することがあります。その際、ユーザーに生じた損害について責任を負いません。</p>

                        <p>第5条（利用規約の変更）<br />
                        本規約は提供者の判断で変更される場合があります。変更時には通知を行い、通知日から効力を発揮します。</p>

                        <p>第6条（同意）<br />
                        利用規約に同意できない場合は、本サービスの利用をお控えください。</p>

                        <p>第7条（禁止事項）<br />
                        本サービスの利用において以下の行為を禁止します：不正アクセス、第三者への嫌がらせ、虚偽情報の提供、その他法律に反する行為。</p>

                        <p>第8条（知的財産権）<br />
                        本サービス内のすべてのコンテンツ（テキスト、画像、ソースコード等）の著作権は提供者に帰属します。無断で複製、転用することを禁止します。</p>

                        <p>第9条（利用制限および登録抹消）<br />
                        ユーザーが本規約に違反した場合、提供者は事前の通知なくサービスの利用制限やアカウントの抹消を行うことがあります。</p>

                        <p>第10条（保証の否認）<br />
                        本サービスは現状有姿で提供され、特定目的への適合性や正確性を保証するものではありません。</p>

                        <p>第11条（準拠法および管轄裁判所）<br />
                        本規約の解釈および適用については日本法を準拠法とし、紛争が生じた場合は提供者の所在地を管轄する裁判所を第一審の専属的管轄裁判所とします。</p>
                    </div>
                    <div className="mt-6 flex justify-end space-x-4">
                        <button
                            onClick={onClose}
                            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-800 transition"
                        >
                            閉じる
                        </button>
                    </div>
                </div>
            </div>
        )
    );
}

export default TermsOfServiceModal;
