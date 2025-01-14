import '../css/app.css';
import './bootstrap';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css'; // プログレスバーのスタイルをインポート
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { router } from '@inertiajs/react'

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

// NProgress の設定
NProgress.configure({
    showSpinner: false, // スピナー非表示
    minimum: 0.1,       // 初期状態の最小値
    speed: 500,         // バーの進行速度(ms)
    trickleSpeed: 200,  // 自動トリクル速度
});

// 画面遷移イベントのフック
router.on('start', () => {
    NProgress.start();
    overlay.classList.add('active');
});

router.on('finish', (event) => {
    if (!event.detail.visit.completed) return; // 完了しない場合、バーを止めない
    NProgress.done(); 
    overlay.classList.remove('active'); 
});

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob('./Pages/**/*.jsx'),
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(<App {...props} />);
    },
    progress: {
        color: '#4B5563', 
    },
});