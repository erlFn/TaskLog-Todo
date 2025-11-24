import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';

export default function TaskLogger() {
    const [tasks, setTasks] = useState([
        {
            id: 1,
            title: 'Design Homepage',
            description: 'Create wireframes and mockups for the homepage',
            status: 'To Do',
            priority: 'High',
            createdAt: '2 hours ago'
        },
        {
            id: 2,
            title: 'API Integration',
            description: 'Integrate with third-party API services',
            status: 'In Progress',
            priority: 'Medium',
            createdAt: '1 day ago'
        },
        {
            id: 3,
            title: 'User Testing',
            description: 'Conduct user testing sessions and gather feedback',
            status: 'In Review',
            priority: 'Low',
            createdAt: '3 days ago'
        },
        {
            id: 4,
            title: 'Database Optimization',
            description: 'Optimize database queries and indexes for better performance',
            status: 'To Do',
            priority: 'High',
            createdAt: '4 hours ago'
        },
    ]);

    const statusOptions = ['To Do', 'In Progress', 'In Review', 'Done', 'Closed'];
    const priorityOptions = ['Low', 'Medium', 'High'];

    const handleLogout = (e: React.FormEvent) => {
        e.preventDefault();
        window.location.href = '/';
    };

    const handleStatusChange = (taskId: number, newStatus: string) => {
        setTasks(tasks.map(task => 
            task.id === taskId ? { ...task, status: newStatus } : task
        ));
    };

    const getStatusColor = (status: string) => {
        const colors: { [key: string]: string } = {
            'To Do': 'bg-gray-400/20 text-gray-300 border border-gray-400/30',
            'In Progress': 'bg-blue-400/20 text-blue-400 border border-blue-400/30',
            'In Review': 'bg-yellow-400/20 text-yellow-400 border border-yellow-400/30',
            'Done': 'bg-green-400/20 text-green-400 border border-green-400/30',
            'Closed': 'bg-purple-400/20 text-purple-400 border border-purple-400/30'
        };
        return colors[status] || colors['To Do'];
    };

    const getPriorityColor = (priority: string) => {
        const colors: { [key: string]: string } = {
            'Low': 'bg-green-400/20 text-green-400 border border-green-400/30',
            'Medium': 'bg-yellow-400/20 text-yellow-400 border border-yellow-400/30',
            'High': 'bg-red-400/20 text-red-400 border border-red-400/30'
        };
        return colors[priority] || colors['Low'];
    };

    return (
        <>
            <Head title="TaskLogger" />
            
            <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent"></div>
                
                <div className="relative z-10 flex">
                    {/* Sidebar - Fixed */}
                    <div className="w-64 bg-white/5 backdrop-blur-sm border-r border-white/10 shadow-lg flex flex-col fixed left-0 top-0 h-screen">
                        <div className="p-6 border-b border-white/10">
                            <h1 className="text-2xl font-bold text-white">TaskLog - Todo</h1>
                        </div>
                        <nav className="p-4 flex-1">
                            <ul className="space-y-2">
                                <li>
                                    <Link href="/dashboard" className="flex items-center px-4 py-3 rounded-lg text-gray-300 hover:bg-white/10 hover:text-white transition-all duration-200">
                                        <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                        </svg>
                                        Dashboard
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/tasklogger" className="flex items-center px-4 py-3 rounded-lg bg-blue-600/20 text-blue-400 border border-blue-400/30 transition-all duration-200">
                                        <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                        TaskLogger
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/todolist" className="flex items-center px-4 py-3 rounded-lg text-gray-300 hover:bg-white/10 hover:text-white transition-all duration-200">
                                        <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                        </svg>
                                        TodoList
                                    </Link>
                                </li>
                            </ul>
                        </nav>

                        {/* Logout Button */}
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
                            <h1 className="text-3xl font-bold text-white">TaskLogger</h1>
                            <p className="text-gray-300 mt-2">Manage and log your tasks with status tracking</p>
                        </div>

                        {/* Task Logger Content */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Task Form - Fixed */}
                            <div className="lg:col-span-1">
                                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 sticky top-8">
                                    <h2 className="text-xl font-semibold text-white mb-4">Add New Task</h2>
                                    <form className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-1">Task Title</label>
                                            <input type="text" className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300" placeholder="Enter task title" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
                                            <textarea className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300" rows={3} placeholder="Enter task description"></textarea>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-1">Status</label>
                                            <select className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300">
                                                {statusOptions.map(option => (
                                                    <option key={option} value={option}>{option}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-1">Priority</label>
                                            <select className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300">
                                                {priorityOptions.map(option => (
                                                    <option key={option} value={option}>{option}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105">
                                            Add Task
                                        </button>
                                    </form>
                                </div>
                            </div>

                            {/* Task List - Scrollable */}
                            <div className="lg:col-span-2 flex flex-col">
                                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 flex-1 flex flex-col">
                                    {/* Header */}
                                    <div className="flex items-center justify-between mb-4">
                                        <h2 className="text-xl font-semibold text-white">Task List</h2>
                                        <div className="text-sm text-gray-300">
                                            {tasks.length} tasks
                                        </div>
                                    </div>

                                    {/* Scrollable Task List */}
                                    <div className="flex-1 overflow-y-auto pr-2 max-h-[calc(100vh-20rem)]">
                                        <div className="space-y-4">
                                            {tasks.map((task) => (
                                                <div key={task.id} className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all duration-200">
                                                    <div className="flex items-start justify-between">
                                                        <div className="flex-1">
                                                            <h3 className="font-semibold text-white text-lg">{task.title}</h3>
                                                            <p className="text-gray-300 mt-1">{task.description}</p>
                                                            
                                                            <div className="flex items-center space-x-4 mt-3">
                                                                {/* Status Dropdown */}
                                                                <div className="relative">
                                                                    <label className="block text-xs font-medium text-gray-400 mb-1">Status</label>
                                                                    <select 
                                                                        value={task.status}
                                                                        onChange={(e) => handleStatusChange(task.id, e.target.value)}
                                                                        className={`px-3 py-1 text-sm font-medium rounded-lg border-0 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200 ${getStatusColor(task.status)}`}
                                                                    >
                                                                        {statusOptions.map(option => (
                                                                            <option key={option} value={option}>{option}</option>
                                                                        ))}
                                                                    </select>
                                                                </div>

                                                                {/* Priority Badge */}
                                                                <div>
                                                                    <label className="block text-xs font-medium text-gray-400 mb-1">Priority</label>
                                                                    <span className={`px-3 py-1 text-sm font-medium rounded-lg ${getPriorityColor(task.priority)}`}>
                                                                        {task.priority}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        
                                                        <div className="flex items-center space-x-2 ml-4">
                                                            <button className="text-green-400 hover:text-green-300 p-2 rounded-lg hover:bg-green-400/10 transition-colors duration-200 border border-green-400/30 hover:border-green-400/50">
                                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                                </svg>
                                                            </button>
                                                            <button className="text-red-400 hover:text-red-300 p-2 rounded-lg hover:bg-red-400/10 transition-colors duration-200 border border-red-400/30 hover:border-red-400/50">
                                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/10">
                                                        <span className="text-xs text-gray-400">Created {task.createdAt}</span>
                                                        <div className="flex items-center space-x-2">
                                                            <span className="text-xs text-gray-400">ID: #{task.id}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Task Statistics */}
                                    <div className="mt-6 pt-6 border-t border-white/10">
                                        <h3 className="text-lg font-semibold text-white mb-3">Task Statistics</h3>
                                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                                            {statusOptions.map(status => (
                                                <div key={status} className="text-center">
                                                    <div className={`text-2xl font-bold rounded-xl p-3 ${getStatusColor(status)}`}>
                                                        {tasks.filter(task => task.status === status).length}
                                                    </div>
                                                    <p className="text-xs text-gray-300 mt-1">{status}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
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