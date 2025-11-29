import { Head, Link, router, usePage } from '@inertiajs/react';

interface TaskLog {
    id: number;
    title: string;
    description: string;
    status: string;
    priority: string;
    reviewed: boolean;
    reviewed_at: string | null;
    created_at: string;
    updated_at: string;
    user: {
        id: number;
        name: string;
        email: string;
    };
}

interface TaskLogDetailProps {
    taskLog: TaskLog;
    isAdmin: boolean;
}

export default function TaskLogDetail({ taskLog, isAdmin }: TaskLogDetailProps) {
    const { props } = usePage();
    const errors = props.errors as { [key: string]: string };

    const handleLogout = (e: React.FormEvent) => {
        e.preventDefault();
        router.post('/logout');
    };

    const handleMarkAsReviewed = () => {
        if (confirm('Are you sure you want to mark this task as reviewed?')) {
            router.post(`/tasklogger/${taskLog.id}/review`);
        }
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

    // Show error if taskLog is not available
    if (!taskLog) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white">
                <div className="flex-1 ml-64 p-8">
                    <div className="max-w-4xl mx-auto text-center py-16">
                        <h2 className="text-2xl font-bold text-white mb-4">Task Not Found</h2>
                        <p className="text-gray-300 mb-6">The requested task could not be found.</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <>
            <Head title={`Task: ${taskLog.title}`} />
            
            <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent"></div>
                
                <div className="relative z-10 flex">
                    {/* Sidebar */}
                    <div className="w-64 bg-white/5 backdrop-blur-sm border-r border-white/10 shadow-lg flex flex-col fixed left-0 top-0 h-screen">
                        <div className="p-6 border-b border-white/10">
                            <h1 className="text-2xl font-bold text-white">CHOROS TASK</h1>
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
                        <div className="max-w-4xl mx-auto">
                            {/* Error Messages */}
                            {errors && Object.keys(errors).length > 0 && (
                                <div className="mb-6 p-4 bg-red-400/20 border border-red-400/30 rounded-lg">
                                    <h3 className="text-red-400 font-semibold mb-2">Error</h3>
                                    <ul className="text-red-300 text-sm">
                                        {Object.entries(errors).map(([key, error]) => (
                                            <li key={key}>• {error}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            <div className="mb-6">
                                <h1 className="text-3xl font-bold text-white">Task Details</h1>
                                <p className="text-gray-300 mt-2">Detailed view of your task</p>
                            </div>

                            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                                {/* Task Header */}
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <h2 className="text-2xl font-bold text-white mb-2">{taskLog.title}</h2>
                                        <div className="flex items-center space-x-4">
                                           <p className="text-gray-300 mt-2">Status: </p>
                                            <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(taskLog.status)}`}>
                                                {taskLog.status}
                                            </span>

                                            <p className="text-gray-300 mt-2">Priority: </p>
                                            <span className={`px-3 py-1 text-sm font-medium rounded-full ${getPriorityColor(taskLog.priority)}`}>
                                                {taskLog.priority} Priority
                                            </span>

                                              <p className="text-gray-300 mt-2">Review: </p>
                                            <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                                                taskLog.reviewed 
                                                    ? 'bg-green-400/20 text-green-400 border border-green-400/30'
                                                    : 'bg-yellow-400/20 text-yellow-400 border border-yellow-400/30'
                                            }`}>
                                                {taskLog.reviewed ? 'Reviewed' : 'Pending'}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-sm text-gray-400">Task ID</div>
                                        <div className="text-white font-mono">#{taskLog.id}</div>
                                    </div>
                                </div>

                                {/* Task Description */}
                                <div className="mb-6">
                                    <h3 className="text-lg font-semibold text-white mb-3">Description</h3>
                                    <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                                        <p className="text-gray-300 whitespace-pre-wrap">{taskLog.description}</p>
                                    </div>
                                </div>

                                {/* Task Metadata */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                    <div>
                                        <h3 className="text-lg font-semibold text-white mb-3">Task Information</h3>
                                        <div className="space-y-3">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-400">Assigned To</label>
                                                <p className="text-white">{taskLog.user.name}</p>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-400">Email</label>
                                                <p className="text-white">{taskLog.user.email}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-white mb-3">Timeline</h3>
                                        <div className="space-y-3">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-400">Created</label>
                                                <p className="text-white">{new Date(taskLog.created_at).toLocaleString()}</p>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-400">Last Updated</label>
                                                <p className="text-white">{new Date(taskLog.updated_at).toLocaleString()}</p>
                                            </div>
                                            {taskLog.reviewed_at && (
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-400">Reviewed At</label>
                                                    <p className="text-white">{new Date(taskLog.reviewed_at).toLocaleString()}</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex justify-end space-x-3 pt-6 border-t border-white/10">
                                    <Link
                                        href="/tasklogger"
                                        className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-all duration-200"
                                    >
                                        Back to List
                                    </Link>
                                    {isAdmin && !taskLog.reviewed && (
                                        <button
                                            onClick={handleMarkAsReviewed}
                                            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-all duration-200"
                                        >
                                            Mark as Reviewed
                                        </button>
                                    )}
                                    {isAdmin && (
                                        <Link
                                            href={`/tasklogger/${taskLog.id}/edit`}
                                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-200"
                                        >
                                            Edit Task
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}