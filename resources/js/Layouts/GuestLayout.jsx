export default function GuestLayout({ children }) {
    return (
        <div
            className="flex min-h-screen flex-col items-center pt-6 sm:justify-center sm:pt-0"
            style={{
                backgroundImage: "url('images/yuzurun_bg.png')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}
        >
            <div className="mt-6 w-full overflow-hidden bg-white bg-opacity-90 px-6 py-4 shadow-md sm:max-w-md sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}