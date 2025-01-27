function PrivacyPolicyModal({ isOpen, onClose }) {
  return (
      isOpen && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
              <div className="bg-white p-6 rounded shadow-lg w-11/12 sm:w-3/4 md:w-1/2 lg:w-1/3">
                  <h2 className="text-2xl font-bold mb-4">プライバシーポリシー</h2>
                  <div className="overflow-y-auto max-h-96 text-sm space-y-4">
                      <p>第1条（個人情報の収集）<br />
                      本サービスでは、ユーザー登録時にメールアドレスやユーザー名などの情報を収集します。また、チャット機能や利用履歴に関連するデータも記録される場合があります。</p>

                      <p>第2条（個人情報の利用目的）<br />
                      収集した個人情報は、以下の目的で利用します：<br />
                      ・本サービスの提供および運営<br />
                      ・お問い合わせ対応<br />
                      ・利用規約や法令に違反する行為への対応</p>

                      <p>第3条（個人情報の管理）<br />
                      ユーザーの個人情報は、適切なセキュリティ対策を講じた上で管理します。不正アクセス、紛失、改ざん、漏洩などの防止に努めます。</p>

                      <p>第4条（第三者への提供）<br />
                      ユーザーの個人情報は、以下の場合を除き第三者に提供しません：<br />
                      ・ユーザーの同意がある場合<br />
                      ・法令に基づく場合<br /></p>

                      <p>第5条（個人情報の開示・訂正・削除）<br />
                      ユーザーから自身の個人情報の開示、訂正、削除の依頼があった場合は、本人確認の上で速やかに対応します。</p>

                      <p>第6条（プライバシーポリシーの変更）<br />
                      本プライバシーポリシーは、提供者の判断で変更される場合があります。変更後は速やかに通知し、変更日以降に効力を発揮します。</p>

                      <p>第7条（お問い合わせ窓口）<br />
                      本プライバシーポリシーに関するお問い合わせは、以下のメールアドレスまでご連絡ください：<br />
                      otoharadak@gmail.com</p>
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

export default PrivacyPolicyModal;
