import { Head, Link, useForm, usePage, router } from '@inertiajs/react';
import { useState } from 'react';

interface TaskLog {
    id: number;
    title: string;
    description: string;
    status: string;
    priority: string;
    reviewed: boolean;
    reviewed_at: string | null;
    created_at: string;
    user: {
        id: number;
        name: string;
    };
}

interface Employee {
    id: number;
    name: string;
}

interface PageProps {
    taskLogs: TaskLog[];
    employees: Employee[];
    filters: { employee_id?: string; date?: string };
    [key: string]: any;
}

export default function AdminTaskLogger() {
    const { props } = usePage<PageProps>();
    const { taskLogs, employees, filters } = props;
    const [selectedTask, setSelectedTask] = useState<TaskLog | null>(null);
    const [showDialog, setShowDialog] = useState(false);

    const { data, setData, get } = useForm({
        employee_id: filters?.employee_id || '',
        date: filters?.date || '',
    });

    const handleFilter = () => {
        get('/admin/tasklogger', {
            preserveState: true,
        });
    };

    const handleClearFilters = () => {
        setData({
            employee_id: '',
            date: '',
        });
        get('/admin/tasklogger', {
            preserveState: true,
        });
    };

    const handleRowClick = (task: TaskLog) => {
        setSelectedTask(task);
        setShowDialog(true);
    };

    const handleMarkAsReviewed = () => {
        if (selectedTask) {
            router.post(`/tasklogger/${selectedTask.id}/review`, {}, {
                onSuccess: () => {
                    setShowDialog(false);
                    router.reload({ only: ['taskLogs'] });
                }
            });
        }
    };

    const handleDownloadPDF = () => {
        window.open('/admin/tasklogger/pdf?employee_id=' + data.employee_id + '&date=' + data.date, '_blank');
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

    const handleLogout = (e: React.FormEvent) => {
        e.preventDefault();
        router.post('/logout');
    };

    return (
        <>
            <Head title="Admin TaskLogger" />
            
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
                                    <Link href="/admin/dashboard" className="flex items-center px-4 py-3 rounded-lg text-gray-300 hover:bg-white/10 hover:text-white transition-all duration-200">
                                        <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                        </svg>
                                        Dashboard
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/admin/tasklogger" className="flex items-center px-4 py-3 rounded-lg bg-blue-600/20 text-blue-400 border border-blue-400/30 transition-all duration-200">
                                        <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                        TaskLogger
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/admin/todolist" className="flex items-center px-4 py-3 rounded-lg text-gray-300 hover:bg-white/10 hover:text-white transition-all duration-200">
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
                            <h1 className="text-3xl font-bold text-white">Admin TaskLogger</h1>
                            <p className="text-gray-300 mt-2">Manage and review all employee task logs</p>
                        </div>

                        {/* Filters */}
                        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 mb-6">
                            <h2 className="text-xl font-semibold text-white mb-4">Filters</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Employee</label>
                                    <select
                                        value={data.employee_id}
                                        onChange={e => setData('employee_id', e.target.value)}
                                        className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    >
                                        <option value="">All Employees</option>
                                        {employees.map((employee: Employee) => (
                                            <option key={employee.id} value={employee.id}>
                                                {employee.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Date</label>
                                    <input
                                        type="date"
                                        value={data.date}
                                        onChange={e => setData('date', e.target.value)}
                                        className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                                <div className="flex items-end space-x-2">
                                    <button
                                        onClick={handleFilter}
                                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-200"
                                    >
                                        Apply Filters
                                    </button>
                                    <button
                                        onClick={handleClearFilters}
                                        className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-all duration-200"
                                    >
                                        Clear
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Task Logs Table */}
                        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-semibold text-white">Task Logs</h2>
                                <div className="flex space-x-2">
                                    <button
                                        onClick={handleDownloadPDF}
                                        className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-all duration-200"
                                    >
                                        Download PDF Summary
                                    </button>
                                </div>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-white/10">
                                            <th className="text-left py-3 px-4 text-gray-300 font-semibold">Employee</th>
                                            <th className="text-left py-3 px-4 text-gray-300 font-semibold">Title</th>
                                            <th className="text-left py-3 px-4 text-gray-300 font-semibold">Description</th>
                                            <th className="text-left py-3 px-4 text-gray-300 font-semibold">Status</th>
                                            <th className="text-left py-3 px-4 text-gray-300 font-semibold">Priority</th>
                                            <th className="text-left py-3 px-4 text-gray-300 font-semibold">Date</th>
                                            <th className="text-left py-3 px-4 text-gray-300 font-semibold">Reviewed</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {taskLogs.map((task: TaskLog) => (
                                            <tr
                                                key={task.id}
                                                onClick={() => handleRowClick(task)}
                                                className="border-b border-white/5 hover:bg-white/5 cursor-pointer transition-colors duration-200"
                                            >
                                                <td className="py-3 px-4">{task.user.name}</td>
                                                <td className="py-3 px-4">{task.title}</td>
                                                <td className="py-3 px-4 max-w-md truncate">{task.description}</td>
                                                <td className="py-3 px-4">
                                                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(task.status)}`}>
                                                        {task.status}
                                                    </span>
                                                </td>
                                                <td className="py-3 px-4">
                                                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(task.priority)}`}>
                                                        {task.priority}
                                                    </span>
                                                </td>
                                                <td className="py-3 px-4 text-sm text-gray-300">
                                                    {new Date(task.created_at).toLocaleDateString()}
                                                </td>
                                                <td className="py-3 px-4">
                                                    {task.reviewed ? (
                                                        <span className="text-green-400 text-sm">✓ Reviewed</span>
                                                    ) : (
                                                        <span className="text-yellow-400 text-sm">Pending</span>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {taskLogs.length === 0 && (
                                <div className="text-center py-8 text-gray-400">
                                    No task logs found matching your filters.
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Task Detail Dialog */}
                {showDialog && selectedTask && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-xl font-bold text-white">Task Details</h3>
                                <button
                                    onClick={() => setShowDialog(false)}
                                    className="text-gray-400 hover:text-white transition-colors duration-200"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">Employee</label>
                                    <p className="text-white">{selectedTask.user.name}</p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">Date Created</label>
                                    <p className="text-white">{new Date(selectedTask.created_at).toLocaleString()}</p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">Title</label>
                                    <p className="text-white">{selectedTask.title}</p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
                                    <p className="text-white whitespace-pre-wrap">{selectedTask.description}</p>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-1">Status</label>
                                        <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(selectedTask.status)}`}>
                                            {selectedTask.status}
                                        </span>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-1">Priority</label>
                                        <span className={`px-3 py-1 text-sm font-medium rounded-full ${getPriorityColor(selectedTask.priority)}`}>
                                            {selectedTask.priority}
                                        </span>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">Review Status</label>
                                    <p className={selectedTask.reviewed ? "text-green-400" : "text-yellow-400"}>
                                        {selectedTask.reviewed 
                                            ? `Reviewed on ${selectedTask.reviewed_at ? new Date(selectedTask.reviewed_at).toLocaleString() : 'N/A'}`
                                            : 'Pending Review'
                                        }
                                    </p>
                                </div>
                            </div>

                            <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-white/10">
                                {!selectedTask.reviewed && (
                                    <button
                                        onClick={handleMarkAsReviewed}
                                        className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-all duration-200"
                                    >
                                        Mark as Reviewed
                                    </button>
                                )}
                                <button
                                    onClick={() => setShowDialog(false)}
                                    className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-all duration-200"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}