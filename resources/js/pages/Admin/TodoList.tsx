// [file name]: TodoList.tsx (Admin version)
import { Head, Link, usePage, router } from '@inertiajs/react';
import { useState } from 'react';

interface TodoItem {
    id: number;
    text: string;
    completed: boolean;
    important: boolean;
    category: string;
    created_at: string;
}

interface TodoParent {
    id: number;
    title: string;
    description: string;
    created_at: string;
    user: {
        id: number;
        name: string;
    };
    items: TodoItem[];
}

interface PageProps {
    todoParents: TodoParent[];
    [key: string]: any;
}

export default function AdminTodoList() {
    const { props } = usePage<PageProps>();
    const { todoParents } = props;
    const [selectedItem, setSelectedItem] = useState<TodoItem | null>(null);
    const [showDialog, setShowDialog] = useState(false);

    const handleLogout = (e: React.FormEvent) => {
        e.preventDefault();
        router.post('/logout');
    };

    const getCategoryColor = (category: string) => {
        const colors: { [key: string]: string } = {
            'Personal': 'bg-purple-400/20 text-purple-400 border border-purple-400/30',
            'Work': 'bg-blue-400/20 text-blue-400 border border-blue-400/30',
            'Shopping': 'bg-green-400/20 text-green-400 border border-green-400/30',
            'Health': 'bg-red-400/20 text-red-400 border border-red-400/30'
        };
        return colors[category] || colors['Personal'];
    };

    const handleDeleteParent = (parentId: number) => {
        if (confirm('Are you sure you want to delete this todo list and all its items?')) {
            router.delete(`/todolist/parent/${parentId}`, {
                onSuccess: () => window.location.reload()
            });
        }
    };

    const handleDeleteItem = (itemId: number) => {
        if (confirm('Are you sure you want to delete this todo item?')) {
            router.delete(`/todolist/item/${itemId}`, {
                onSuccess: () => window.location.reload()
            });
        }
    };

    const handleToggleComplete = (itemId: number, completed: boolean) => {
        router.put(`/todolist/item/${itemId}`, {
            completed: !completed
        }, {
            onSuccess: () => window.location.reload()
        });
    };

    const handleItemClick = (item: TodoItem) => {
        setSelectedItem(item);
        setShowDialog(true);
    };

    const handleCloseDialog = () => {
        setShowDialog(false);
        setSelectedItem(null);
    };

    return (
        <>
            <Head title="Admin TodoList" />
            
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
                                    <Link href="/admin/tasklogger" className="flex items-center px-4 py-3 rounded-lg text-gray-300 hover:bg-white/10 hover:text-white transition-all duration-200">
                                        <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                        TaskLogger
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/admin/todolist" className="flex items-center px-4 py-3 rounded-lg bg-blue-600/20 text-blue-400 border border-blue-400/30 transition-all duration-200">
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
                            <h1 className="text-3xl font-bold text-white">Admin TodoList</h1>
                            <p className="text-gray-300 mt-2">View and manage all employee todo lists</p>
                        </div>

                        {/* Todo Lists */}
                        <div className="space-y-6">
                            {todoParents.map((parent: TodoParent) => (
                                <div key={parent.id} className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                                    {/* Parent Header */}
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className="text-xl font-semibold text-white">{parent.title}</h3>
                                            <p className="text-gray-300 mt-1">{parent.description}</p>
                                            <div className="flex items-center space-x-4 mt-2 text-sm text-gray-400">
                                                <span>By: {parent.user.name}</span>
                                                <span>Created: {new Date(parent.created_at).toLocaleDateString()}</span>
                                                <span>{parent.items.length} items</span>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => handleDeleteParent(parent.id)}
                                            className="px-4 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 border border-red-400/30 hover:border-red-400/50 rounded-lg transition-all duration-200"
                                        >
                                            Delete List
                                        </button>
                                    </div>

                                    {/* Todo Items */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {parent.items.map((item: TodoItem) => (
                                            <div 
                                                key={item.id} 
                                                onClick={() => handleItemClick(item)}
                                                className={`flex items-center justify-between p-4 border rounded-lg transition-all duration-200 cursor-pointer ${
                                                    item.completed 
                                                        ? 'border-green-400/30 bg-green-400/10' 
                                                        : 'border-white/10 hover:bg-white/5 hover:border-white/20'
                                                }`}
                                            >
                                                <div className="flex items-center flex-1">
                                                    {/* Checkbox */}
                                                    <input 
                                                        type="checkbox" 
                                                        checked={item.completed}
                                                        onChange={(e) => {
                                                            e.stopPropagation();
                                                            handleToggleComplete(item.id, item.completed);
                                                        }}
                                                        className="w-5 h-5 text-green-400 bg-white/5 border-white/10 rounded focus:ring-green-500 focus:ring-offset-gray-900 focus:ring-2" 
                                                    />
                                                    
                                                    {/* Todo Text */}
                                                    <div className="ml-3 flex-1">
                                                        <div className="flex items-center space-x-3">
                                                            <span className={`${item.completed ? 'line-through text-gray-500' : 'text-white'} ${item.important ? 'font-semibold' : ''}`}>
                                                                {item.text}
                                                            </span>
                                                            {item.important && (
                                                                <span className="px-2 py-1 bg-yellow-400/20 text-yellow-400 border border-yellow-400/30 text-xs rounded-full">
                                                                    Important
                                                                </span>
                                                            )}
                                                        </div>
                                                        <div className="flex items-center space-x-2 mt-1">
                                                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(item.category)}`}>
                                                                {item.category}
                                                            </span>
                                                            <span className="text-xs text-gray-400">
                                                                {new Date(item.created_at).toLocaleDateString()}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                <div className="flex items-center space-x-2 ml-4">
                                                    {/* Delete Button */}
                                                    <button 
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleDeleteItem(item.id);
                                                        }}
                                                        className="p-2 text-red-400 hover:text-red-300 rounded-lg hover:bg-red-400/10 border border-transparent hover:border-red-400/30 transition-all duration-200"
                                                        title="Delete todo"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {parent.items.length === 0 && (
                                        <div className="text-center py-4 text-gray-400">
                                            No todo items in this list.
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        {todoParents.length === 0 && (
                            <div className="text-center py-8 text-gray-400">
                                No todo lists found.
                            </div>
                        )}
                    </div>
                </div>

                {/* Item Detail Dialog */}
                {showDialog && selectedItem && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 max-w-md w-full">
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-xl font-bold text-white">Todo Item Details</h3>
                                <button
                                    onClick={handleCloseDialog}
                                    className="text-gray-400 hover:text-white transition-colors duration-200"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">Text</label>
                                    <p className="text-white">{selectedItem.text}</p>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-1">Status</label>
                                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                            selectedItem.completed 
                                                ? 'bg-green-400/20 text-green-400 border border-green-400/30'
                                                : 'bg-yellow-400/20 text-yellow-400 border border-yellow-400/30'
                                        }`}>
                                            {selectedItem.completed ? 'Completed' : 'Pending'}
                                        </span>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-1">Priority</label>
                                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                            selectedItem.important 
                                                ? 'bg-red-400/20 text-red-400 border border-red-400/30'
                                                : 'bg-gray-400/20 text-gray-300 border border-gray-400/30'
                                        }`}>
                                            {selectedItem.important ? 'Important' : 'Normal'}
                                        </span>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">Category</label>
                                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(selectedItem.category)}`}>
                                        {selectedItem.category}
                                    </span>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">Created</label>
                                    <p className="text-white text-sm">
                                        {new Date(selectedItem.created_at).toLocaleString()}
                                    </p>
                                </div>
                            </div>

                            <div className="flex justify-end mt-6 pt-4 border-t border-white/10">
                                <button
                                    onClick={handleCloseDialog}
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