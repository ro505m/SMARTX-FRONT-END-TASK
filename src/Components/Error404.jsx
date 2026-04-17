import { Link } from "react-router-dom";

const Error404 = () => {
    return (
        <div className="h-screen w-full bg-[#0f172a] flex flex-col items-center justify-center relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="relative z-10 text-center px-4">
                <h1 className="text-[150px] font-black text-white leading-none tracking-tighter sm:text-[200px]">
                    404
                </h1>
                
                <div className="mt-4">
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-100 mb-4">
                        Oops! Page not found
                    </h2>
                    <p className="text-slate-400 max-w-md mx-auto mb-8 text-sm md:text-base leading-relaxed">
                        The page you're looking for doesn't exist or has been moved. Please check the URL or return to the homepage.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                        to="/"
                        className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold transition-all shadow-lg shadow-blue-500/25 active:scale-95"
                    >
                        Go Home
                    </Link>
                    
                    <button 
                        onClick={() => window.history.back()}
                        className="px-8 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl font-semibold border border-slate-700 transition-all active:scale-95"
                    >
                        Go Back
                    </button>
                </div>
            </div>

            <div className="absolute bottom-10 text-slate-800 font-mono text-xs select-none">
                &lt;status&gt;404_NOT_FOUND&lt;/status&gt;
            </div>
        </div>
    );
};

export default Error404;