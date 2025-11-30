import { Head, useForm } from '@inertiajs/react';
import { FormEvent } from 'react';

export default function Register() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        terms: false,
    });

    const submit = (e: FormEvent) => {
        e.preventDefault();
        post('/register');
    };

    return (
        <>
            <Head title="Register">
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
                        
                        {/* Login Link */}
                        <a
                            href="/login"
                            className="px-6 py-2 text-white border border-white/20 rounded-lg hover:bg-white/10 transition-all duration-300"
                        >
                            Log In
                        </a>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white flex items-center justify-center p-6">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent"></div>
                
                {/* Register Form */}
                <div className="relative z-10 w-full max-w-md">
                    <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 shadow-2xl">
                        {/* Header */}
                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                                Create Account
                            </h1>
                            <p className="text-gray-400">Join thousands of productive people</p>
                        </div>

                        {/* Register Form */}
                        <form onSubmit={submit} className="space-y-6">
                            {/* Name Field */}
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                                    Full Name
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    required
                                    value={data.name}
                                    onChange={e => setData('name', e.target.value)}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                                    placeholder="Enter your full name"
                                />
                                {errors.name && (
                                    <div className="text-red-400 text-sm mt-1">{errors.name}</div>
                                )}
                            </div>

                            {/* Email Field */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                                    Email Address
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    required
                                    value={data.email}
                                    onChange={e => setData('email', e.target.value)}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                                    placeholder="Enter your email"
                                />
                                {errors.email && (
                                    <div className="text-red-400 text-sm mt-1">{errors.email}</div>
                                )}
                            </div>

                            {/* Password Field */}
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    required
                                    value={data.password}
                                    onChange={e => setData('password', e.target.value)}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                                    placeholder="Create a password"
                                />
                                {errors.password && (
                                    <div className="text-red-400 text-sm mt-1">{errors.password}</div>
                                )}
                            </div>

                            {/* Confirm Password Field */}
                            <div>
                                <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-300 mb-2">
                                    Confirm Password
                                </label>
                                <input
                                    id="password_confirmation"
                                    type="password"
                                    required
                                    value={data.password_confirmation}
                                    onChange={e => setData('password_confirmation', e.target.value)}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                                    placeholder="Confirm your password"
                                />
                            </div>

                            {/* Terms Agreement */}
                            <div className="flex items-center">
                                <input
                                    id="terms"
                                    type="checkbox"
                                    required
                                    checked={data.terms}
                                    onChange={e => setData('terms', e.target.checked)}
                                    className="w-4 h-4 text-blue-600 bg-white/5 border-white/10 rounded focus:ring-blue-500 focus:ring-2"
                                />
                                <label htmlFor="terms" className="ml-2 text-sm text-gray-300">
                                    I agree to the{' '}
                                    <a href="/terms" className="text-blue-400 hover:text-blue-300 transition-colors duration-300">
                                        Terms of Service
                                    </a>{' '}
                                    and{' '}
                                    <a href="/privacy" className="text-blue-400 hover:text-blue-300 transition-colors duration-300">
                                        Privacy Policy
                                    </a>
                                </label>
                            </div>
                            {errors.terms && (
                                <div className="text-red-400 text-sm mt-1">{errors.terms}</div>
                            )}

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:transform-none"
                            >
                                {processing ? 'Creating Account...' : 'Create Account'}
                            </button>
                        </form>

                        {/* Divider */}
                        <div className="mt-6 pt-6 border-t border-white/10">
                            <p className="text-center text-gray-400 text-sm">
                                Already have an account?{' '}
                                <a href="/login" className="text-blue-400 hover:text-blue-300 font-semibold transition-colors duration-300">
                                    Sign in
                                </a>
                            </p>
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