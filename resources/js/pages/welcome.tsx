import { Head } from '@inertiajs/react';
import { PropsWithChildren } from 'react';

interface LayoutProps extends PropsWithChildren {
    title: string;
    auth?: {
        user: {
            name: string;
            email: string;
        };
    };
}

export default function Layout({ title, auth, children }: LayoutProps) {
    return (
        <>
            <Head title={title}>
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            
            {/* Navigation Bar */}
            <nav className="absolute top-0 left-0 right-0 z-50">
                <div className="container mx-auto px-6 py-4">
                    <div className="flex justify-between items-center">
                        {/* Logo/Brand */}
                        <a 
                            href="/"
                            className="text-2xl font-bold text-white hover:text-blue-400 transition-colors duration-300"
                        >
                            TaskLog - Todo
                        </a>
                        
                        {/* Auth Buttons */}
                        <div className="flex space-x-4">
                            {auth?.user ? (
                                // Authenticated - Show Dashboard
                                <a
                                    href="/dashboard"
                                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-lg"
                                >
                                    Dashboard
                                </a>
                            ) : (
                                // Not authenticated - Show Login/Register
                                <>
                                    <a
                                        href="/login"
                                        className="px-6 py-2 text-white border border-white/20 rounded-lg hover:bg-white/10 transition-all duration-300"
                                    >
                                        Log In
                                    </a>
                                    <a
                                        href="/register"
                                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-lg"
                                    >
                                        Register
                                    </a>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Hero Section */}
            <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent"></div>
                
                {/* Main Content */}
                <div className="relative z-10 container mx-auto px-6 flex flex-col justify-center min-h-screen">
                    <div className="max-w-4xl mx-auto text-center">
                        {/* Main Heading */}
                        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                            Build Better Habits, One Task at a Time
                        </h1>
                        
                        {/* Subheading */}
                        <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
                            A clean, focused task logger that helps you capture ideas, 
                            organize work, and track completion - without the complexity of traditional project tools.
                        </p>
                        
                        {/* Feature Highlights */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-3xl mx-auto">
                            <div className="p-6 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10">
                                <div className="text-blue-400 text-lg font-semibold mb-2">✓ Simple</div>
                                <p className="text-gray-400">Clean, intuitive interface</p>
                            </div>
                            <div className="p-6 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10">
                                <div className="text-blue-400 text-lg font-semibold mb-2">✓ Powerful</div>
                                <p className="text-gray-400">All the features you need</p>
                            </div>
                            <div className="p-6 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10">
                                <div className="text-blue-400 text-lg font-semibold mb-2">✓ Free</div>
                                <p className="text-gray-400">No hidden costs</p>
                            </div>
                        </div>
                        
                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <a
                                href="/register"
                                className="px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg text-lg font-semibold"
                            >
                                Get Started Free
                            </a>
 
                        </div>
                        
                        {/* Trust Indicator */}
                        <div className="mt-12 text-gray-400 text-sm">
                            1st basic task for in choros.
                        </div>
                    </div>
                </div>
                
                {/* Floating Elements */}
                <div className="absolute top-1/4 left-10 w-4 h-4 bg-blue-400 rounded-full opacity-20 animate-pulse"></div>
                <div className="absolute top-1/3 right-20 w-6 h-6 bg-purple-400 rounded-full opacity-30 animate-bounce"></div>
                <div className="absolute bottom-1/4 left-1/4 w-3 h-3 bg-cyan-400 rounded-full opacity-40 animate-pulse"></div>
            </div>
        </>
    );
}