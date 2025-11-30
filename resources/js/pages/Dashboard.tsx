import { Head, Link, usePage, useForm } from '@inertiajs/react';
import { useState } from 'react';

interface User {
    isAdmin: boolean;
}

interface PageProps {
    user: User;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
}

export default function Dashboard() {
    const { props } = usePage<PageProps>();
    const { user } = props;
    const [activeSection, setActiveSection] = useState('dashboard');
    const { post } = useForm();

    const handleLogout = (e: React.FormEvent) => {
        e.preventDefault();
        post('/logout');
    };

    const getRoleLinks = () => {
        if (user.isAdmin) {
            return (
                <>
                    <li>
                        <Link
                            href="/admin/tasklogger"
                            className={`flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
                                activeSection === 'admin-tasklogger'
                                    ? 'bg-blue-600/20 text-blue-400 border border-blue-400/30'
                                    : 'text-gray-300 hover:bg-white/10 hover:text-white'
                            }`}
                            onClick={() => setActiveSection('admin-tasklogger')}
                        >
                            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            TaskLogger
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/admin/todolist"
                            className={`flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
                                activeSection === 'admin-todolist'
                                    ? 'bg-blue-600/20 text-blue-400 border border-blue-400/30'
                                    : 'text-gray-300 hover:bg-white/10 hover:text-white'
                            }`}
                            onClick={() => setActiveSection('admin-todolist')}
                        >
                            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                            TodoList
                        </Link>
                    </li>
                </>
            );
        }
        return (
            <>
                <li>
                    <Link
                        href="/tasklogger"
                        className={`flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
                            activeSection === 'tasklogger'
                                ? 'bg-blue-600/20 text-blue-400 border border-blue-400/30'
                                : 'text-gray-300 hover:bg-white/10 hover:text-white'
                        }`}
                        onClick={() => setActiveSection('tasklogger')}
                    >
                        <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        TaskLogger
                    </Link>
                </li>
                <li>
                    <Link
                        href="/todolist"
                        className={`flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
                            activeSection === 'todolist'
                                ? 'bg-blue-600/20 text-blue-400 border border-blue-400/30'
                                : 'text-gray-300 hover:bg-white/10 hover:text-white'
                        }`}
                        onClick={() => setActiveSection('todolist')}
                    >
                        <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                        TodoList
                    </Link>
                </li>
            </>
        );
    };

    return (
        <>
            <Head title="Dashboard" />
            
            <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent"></div>
                
                <div className="relative z-10 flex">
                    {/* Sidebar */}
                    <div className="w-64 bg-white/5 backdrop-blur-sm border-r border-white/10 shadow-lg flex flex-col fixed left-0 top-0 h-screen">
                        <div className="p-6 border-b border-white/10">
                            <h1 className="text-2xl font-bold text-white">
                                PROJECT TASK
                            </h1>
                        </div>

                        <nav className="p-4 flex-1">
                            <ul className="space-y-2">
                                {/* Dashboard */}
                                <li>
                                    <Link
                                        href="/dashboard"
                                        className={`flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
                                            activeSection === 'dashboard'
                                                ? 'bg-blue-600/20 text-blue-400 border border-blue-400/30'
                                                : 'text-gray-300 hover:bg-white/10 hover:text-white'
                                        }`}
                                        onClick={() => setActiveSection('dashboard')}
                                    >
                                        <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                        </svg>
                                        Dashboard
                                    </Link>
                                </li>

                                {/* Role-based Links */}
                                {getRoleLinks()}
                            </ul>
                        </nav>

                        <div className="p-4 border-t border-white/10">
                            <form onSubmit={handleLogout}>
                                <button
                                    type="submit"
                                    className="w-full flex items-center px-4 py-3 text-red-400 hover:bg-red-400/10 rounded-lg transition-all duration-200 border border-red-400/30 hover:border-red-400/50"
                                >
                                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                    </svg>
                                    Logout
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 ml-64 p-8">
                        <div className="mb-8">
                            <h1 className="text-3xl font-bold text-white">
                                Welcome to Your {user.isAdmin ? 'Admin' : 'Employee'} Dashboard
                            </h1>
                            <p className="text-gray-300 mt-2">
                                {user.isAdmin 
                                    ? 'Manage all employee tasks and todo lists efficiently'
                                    : 'Manage your tasks and todos efficiently'
                                }
                            </p>
                        </div>

                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                                <div className="flex items-center">
                                    <div className="p-3 rounded-full bg-blue-400/20 text-blue-400 border border-blue-400/30">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="text-lg font-semibold text-white">Total Tasks</h3>
                                        <p className="text-2xl font-bold text-gray-300">12</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                                <div className="flex items-center">
                                    <div className="p-3 rounded-full bg-green-400/20 text-green-400 border border-green-400/30">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="text-lg font-semibold text-white">Completed</h3>
                                        <p className="text-2xl font-bold text-gray-300">8</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                                <div className="flex items-center">
                                    <div className="p-3 rounded-full bg-orange-400/20 text-orange-400 border border-orange-400/30">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="text-lg font-semibold text-white">Pending</h3>
                                        <p className="text-2xl font-bold text-gray-300">4</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                            <h2 className="text-xl font-semibold text-white mb-4">Quick Actions</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {user.isAdmin ? (
                                    <>
                                        <Link
                                            href="/admin/tasklogger"
                                            className="p-4 border-2 border-dashed border-white/20 rounded-xl hover:border-blue-400 transition-colors duration-200 text-center"
                                        >
                                            <h3 className="font-semibold text-white">Admin TaskLogger</h3>
                                            <p className="text-gray-300 text-sm mt-1">Review all employee task logs</p>
                                        </Link>
                                        <Link
                                            href="/admin/todolist"
                                            className="p-4 border-2 border-dashed border-white/20 rounded-xl hover:border-green-400 transition-colors duration-200 text-center"
                                        >
                                            <h3 className="font-semibold text-white">Admin TodoList</h3>
                                            <p className="text-gray-300 text-sm mt-1">View all employee todo lists</p>
                                        </Link>
                                    </>
                                ) : (
                                    <>
                                        <Link
                                            href="/tasklogger"
                                            className="p-4 border-2 border-dashed border-white/20 rounded-xl hover:border-blue-400 transition-colors duration-200 text-center"
                                        >
                                            <h3 className="font-semibold text-white">Go to TaskLogger</h3>
                                            <p className="text-gray-300 text-sm mt-1">Manage your tasks and logs</p>
                                        </Link>
                                        <Link
                                            href="/todolist"
                                            className="p-4 border-2 border-dashed border-white/20 rounded-xl hover:border-green-400 transition-colors duration-200 text-center"
                                        >
                                            <h3 className="font-semibold text-white">Go to TodoList</h3>
                                            <p className="text-gray-300 text-sm mt-1">Manage your todo items</p>
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}