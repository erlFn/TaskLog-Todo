import { Head, Link, useForm, usePage, router } from '@inertiajs/react';
import { useState } from 'react';

interface TaskLog {
    id: number;
    title: string;
    description: string;
    status: string;
    priority: string;
    reviewed: boolean;
    created_at: string;
}

interface PageProps {
    taskLogs: TaskLog[];
    isAdmin: boolean;
    [key: string]: any;
}

export default function TaskLogger() {
    const { props } = usePage<PageProps>();
    const { taskLogs, isAdmin } = props;
    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        description: '',
        status: 'To Do',
        priority: 'Medium',
    });

    const statusOptions = ['To Do', 'In Progress', 'In Review', 'Done', 'Closed'];
    const priorityOptions = ['Low', 'Medium', 'High'];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/tasklogger', {
            onSuccess: () => reset(),
        });
    };

    const handleStatusChange = (taskId: number, newStatus: string) => {
        router.put(`/tasklogger/${taskId}`, {
            status: newStatus
        });
    };

    const handleLogout = (e: React.FormEvent) => {
        e.preventDefault();
        router.post('/logout');
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
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent"></div>
                
                <div className="relative z-10 flex">
                    {/* Sidebar */}
                    <div className="w-64 bg-white/5 backdrop-blur-sm border-r border-white/10 shadow-lg flex flex-col fixed left-0 top-0 h-screen">
                        <div className="p-6 border-b border-white/10">
                            <h1 className="text-2xl font-bold text-white">PROJECT TASK</h1>
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
                        <div className="p-4 border-t border-white/10">
                            <form onSubmit={handleLogout}>
                                <button type="submit" className="w-full flex items-center px-4 py-3 text-red-400 hover:bg-red-400/10 rounded-lg transition-all duration-200 border border-red-400/30 hover:border-red-400/50">
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

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Task Form */}
                            <div className="lg:col-span-1">
                                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 sticky top-8">
                                    <h2 className="text-xl font-semibold text-white mb-4">Add New Task</h2>
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-1">Task Title</label>
                                            <input 
                                                type="text" 
                                                value={data.title}
                                                onChange={e => setData('title', e.target.value)}
                                                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300" 
                                                placeholder="Enter task title" 
                                            />
                                            {errors.title && <div className="text-red-400 text-sm mt-1">{errors.title}</div>}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
                                            <textarea 
                                                value={data.description}
                                                onChange={e => setData('description', e.target.value)}
                                                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300" 
                                                rows={3} 
                                                placeholder="Enter task description"
                                            ></textarea>
                                            {errors.description && <div className="text-red-400 text-sm mt-1">{errors.description}</div>}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-1">Status</label>
                                            <select 
                                                value={data.status}
                                                onChange={e => setData('status', e.target.value)}
                                                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                                            >
                                                {statusOptions.map(option => (
                                                    <option key={option} value={option}>{option}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-1">Priority</label>
                                            <select 
                                                value={data.priority}
                                                onChange={e => setData('priority', e.target.value)}
                                                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                                            >
                                                {priorityOptions.map(option => (
                                                    <option key={option} value={option}>{option}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <button 
                                            type="submit" 
                                            disabled={processing}
                                            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:transform-none"
                                        >
                                            {processing ? 'Adding Task...' : 'Add Task'}
                                        </button>
                                    </form>
                                </div>
                            </div>

                            {/* Task List */}
                            <div className="lg:col-span-2 flex flex-col">
                                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 flex-1 flex flex-col">
                                    <div className="flex items-center justify-between mb-4">
                                        <h2 className="text-xl font-semibold text-white">Your Task Logs</h2>
                                        <div className="text-sm text-gray-300">
                                            {taskLogs.length} tasks
                                        </div>
                                    </div>

                                    <div className="flex-1 overflow-y-auto pr-2 max-h-[calc(100vh-20rem)]">
                                        <div className="space-y-4">
                                            {taskLogs.map((task: TaskLog) => (
                                                <div key={task.id} className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all duration-200">
                                                    <div className="flex items-start justify-between">
                                                        <div className="flex-1">
                                                            <h3 className="font-semibold text-white text-lg">{task.title}</h3>
                                                            <p className="text-gray-300 mt-1">{task.description}</p>
                                                            
                                                            <div className="flex items-center space-x-4 mt-3">
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

                                                                <div>
                                                                    <label className="block text-xs font-medium text-gray-400 mb-1">Priority</label>
                                                                    <span className={`px-3 py-1 text-sm font-medium rounded-lg ${getPriorityColor(task.priority)}`}>
                                                                        {task.priority}
                                                                    </span>
                                                                </div>

                                                                <div>
                                                                    <label className="block text-xs font-medium text-gray-400 mb-1">Reviewed</label>
                                                                    <span className={`px-3 py-1 text-sm font-medium rounded-lg ${
                                                                        task.reviewed 
                                                                            ? 'bg-green-400/20 text-green-400 border border-green-400/30'
                                                                            : 'bg-yellow-400/20 text-yellow-400 border border-yellow-400/30'
                                                                    }`}>
                                                                        {task.reviewed ? 'Reviewed' : 'Pending'}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/10">
                                                        <span className="text-xs text-gray-400">
                                                            Created {new Date(task.created_at).toLocaleDateString()}
                                                        </span>
                                                        <div className="flex items-center space-x-2">
                                                            <span className="text-xs text-gray-400">ID: #{task.id}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {taskLogs.length === 0 && (
                                        <div className="text-center py-8 text-gray-400">
                                            No task logs found. Create your first task!
                                        </div>
                                    )}

                                    {/* Task Statistics */}
                                    <div className="mt-6 pt-6 border-t border-white/10">
                                        <h3 className="text-lg font-semibold text-white mb-3">Task Statistics</h3>
                                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                                            {statusOptions.map(status => (
                                                <div key={status} className="text-center">
                                                    <div className={`text-2xl font-bold rounded-xl p-3 ${getStatusColor(status)}`}>
                                                        {taskLogs.filter((task: TaskLog) => task.status === status).length}
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
            </div>
        </>
    );
}