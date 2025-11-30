import { Head, Link, useForm, router } from '@inertiajs/react';
import { useState } from 'react';
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

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
    items: TodoItem[];
}

interface TodoListProps {
    todoParents: TodoParent[];
    isAdmin: boolean;
    auth?: {
        user: {
            name: string;
            email: string;
        };
    };
}

export default function TodoList({ todoParents, isAdmin, auth }: TodoListProps) {
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editText, setEditText] = useState('');
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedList, setSelectedList] = useState<TodoParent | null>(null);
    const [listDialogOpen, setListDialogOpen] = useState(false);

    const parentForm = useForm({
        title: '',
        description: '',
    });

    const handleLogout = (e: React.FormEvent) => {
        e.preventDefault();
        router.post('/logout');
    };

    const handleAddParent = (e: React.FormEvent) => {
        e.preventDefault();
        parentForm.post('/todolist/parent', {
            onSuccess: () => {
                parentForm.reset();
                setDialogOpen(false);
            },
        });
    };

    const handleToggleComplete = (itemId: number, completed: boolean) => {
        router.put(`/todolist/item/${itemId}`, {
            completed: !completed
        });
    };

    const handleToggleImportant = (itemId: number, important: boolean) => {
        router.put(`/todolist/item/${itemId}`, {
            important: !important
        });
    };

    const handleDeleteItem = (itemId: number) => {
        if (confirm('Are you sure you want to delete this todo item?')) {
            router.delete(`/todolist/item/${itemId}`);
        }
    };

    const handleEdit = (item: TodoItem) => {
        setEditingId(item.id);
        setEditText(item.text);
    };

    const handleUpdate = (itemId: number) => {
        if (editText.trim()) {
            router.put(`/todolist/item/${itemId}`, {
                text: editText.trim()
            });
            setEditingId(null);
            setEditText('');
        }
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setEditText('');
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

    const handleListClick = (list: TodoParent) => {
        setSelectedList(list);
        setListDialogOpen(true);
    };

    const getCompletionPercentage = (items: TodoItem[]) => {
        if (items.length === 0) return 0;
        const completed = items.filter(item => item.completed).length;
        return Math.round((completed / items.length) * 100);
    };

    const getPriorityCount = (items: TodoItem[]) => {
        return items.filter(item => item.important).length;
    };

    return (
        <>
            <Head title="TodoList" />
            
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
                                    <Link href="/tasklogger" className="flex items-center px-4 py-3 rounded-lg text-gray-300 hover:bg-white/10 hover:text-white transition-all duration-200">
                                        <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                        TaskLogger
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/todolist" className="flex items-center px-4 py-3 rounded-lg bg-blue-600/20 text-blue-400 border border-blue-400/30 transition-all duration-200">
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
                        <div className="flex justify-between items-center mb-8">
                            <div>
                                <h1 className="text-3xl font-bold text-white">TodoList</h1>
                                <p className="text-gray-300 mt-2">Manage your daily todos efficiently</p>
                            </div>
                            
                            {/* Create Todo List Dialog */}
                            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                                <DialogTrigger asChild>
                                    <button
                                        onClick={() => setDialogOpen(true)}
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center"
                                    >
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                        </svg>
                                        Create List
                                    </button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px] bg-[#1e293b] border-white/10 text-white">
                                    <DialogHeader>
                                        <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                            Create Todo List
                                        </DialogTitle>
                                        <DialogDescription className="text-gray-300">
                                            Create a new todo list to organize your tasks
                                        </DialogDescription>
                                    </DialogHeader>
                                    <form onSubmit={handleAddParent} className="space-y-4 mt-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-1">List Title</label>
                                            <input 
                                                type="text" 
                                                value={parentForm.data.title}
                                                onChange={e => parentForm.setData('title', e.target.value)}
                                                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                                                placeholder="Enter list title" 
                                            />
                                            {parentForm.errors.title && <div className="text-red-400 text-sm mt-1">{parentForm.errors.title}</div>}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
                                            <textarea 
                                                value={parentForm.data.description}
                                                onChange={e => parentForm.setData('description', e.target.value)}
                                                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                                                rows={3}
                                                placeholder="Enter list description"
                                            ></textarea>
                                        </div>
                                        <div className="flex space-x-3 pt-2">
                                            <Button 
                                                type="submit" 
                                                disabled={parentForm.processing}
                                                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white transition-all duration-300"
                                            >
                                                {parentForm.processing ? 'Creating...' : 'Create Todo List'}
                                            </Button>
                                            <Button 
                                                type="button"
                                                variant="outline"
                                                onClick={() => setDialogOpen(false)}
                                                className="flex-1 bg-white/5 hover:bg-white/10 text-white border-white/10 hover:border-white/20 transition-all duration-300"
                                            >
                                                Cancel
                                            </Button>
                                        </div>
                                    </form>
                                </DialogContent>
                            </Dialog>
                        </div>

                        <div className="grid grid-cols-1 gap-6">
                            {/* Statistics */}
                            <div className="mt-6 pt-6 border-t border-white/10">
                                <h3 className="text-lg font-semibold text-white mb-3">Statistics</h3>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <div className="text-center">
                                        <div className="text-2xl font-bold bg-blue-400/20 text-blue-400 border border-blue-400/30 rounded-lg p-3">
                                            {todoParents.reduce((acc, parent) => acc + parent.items.length, 0)}
                                        </div>
                                        <p className="text-s text-gray-300 mt-1">Total Items</p>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold bg-green-400/20 text-green-400 border border-green-400/30 rounded-lg p-3">
                                            {todoParents.reduce((acc, parent) => acc + parent.items.filter(item => item.completed).length, 0)}
                                        </div>
                                        <p className="text-s text-gray-300 mt-1">Completed</p>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold bg-yellow-400/20 text-yellow-400 border border-yellow-400/30 rounded-lg p-3">
                                            {todoParents.reduce((acc, parent) => acc + parent.items.filter(item => item.important).length, 0)}
                                        </div>
                                        <p className="text-s text-gray-300 mt-1">Important</p>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold bg-white/5 text-gray-300 border border-white/10 rounded-lg p-3">
                                            {todoParents.reduce((acc, parent) => acc + parent.items.filter(item => !item.completed).length, 0)}
                                        </div>
                                        <p className="text-s text-gray-300 mt-1">Pending</p>
                                    </div>
                                </div>
                            </div>

                            {/* Todo Lists - Card Layout */}
                            <div className="flex flex-col">
                                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 flex-1 flex flex-col">
                                    <div className="flex items-center justify-between mb-6">
                                        <h2 className="text-xl font-semibold text-white">Your Todo Lists</h2>
                                        <div className="text-sm text-gray-300">
                                            {todoParents.length} lists • {todoParents.reduce((acc, parent) => acc + parent.items.length, 0)} total items
                                        </div>
                                    </div>

                                    <div className="flex-1 overflow-y-auto pr-2">
                                        {/* Card Grid Layout - 4 cards per row */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                            {todoParents.map((parent: TodoParent) => {
                                                const completionPercentage = getCompletionPercentage(parent.items);
                                                const priorityCount = getPriorityCount(parent.items);
                                                const totalItems = parent.items.length;
                                                const completedItems = parent.items.filter(item => item.completed).length;

                                                return (
                                                    <div 
                                                        key={parent.id}
                                                        onClick={() => handleListClick(parent)}
                                                        className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-200 cursor-pointer transform hover:scale-105"
                                                    >
                                                        {/* Card Header */}
                                                        <div className="mb-4">
                                                            <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2">
                                                                {parent.title}
                                                            </h3>
                                                            <p className="text-gray-300 text-sm line-clamp-2">
                                                                {parent.description || 'No description'}
                                                            </p>
                                                        </div>

                                                        {/* Progress Bar */}
                                                        <div className="mb-4">
                                                            <div className="flex justify-between text-xs text-gray-400 mb-1">
                                                                <span>Progress</span>
                                                                <span>{completionPercentage}%</span>
                                                            </div>
                                                            <div className="w-full bg-white/10 rounded-full h-2">
                                                                <div 
                                                                    className="bg-green-400 h-2 rounded-full transition-all duration-300"
                                                                    style={{ width: `${completionPercentage}%` }}
                                                                ></div>
                                                            </div>
                                                        </div>

                                                        {/* Stats */}
                                                        <div className="grid grid-cols-2 gap-2 text-xs">
                                                            <div className="text-center">
                                                                <div className="text-white font-semibold">{totalItems}</div>
                                                                <div className="text-gray-400">Total</div>
                                                            </div>
                                                            <div className="text-center">
                                                                <div className="text-green-400 font-semibold">{completedItems}</div>
                                                                <div className="text-gray-400">Done</div>
                                                            </div>
                                                        </div>

                                                        {/* Priority Indicator */}
                                                        {priorityCount > 0 && (
                                                            <div className="mt-3 flex items-center justify-center">
                                                                <span className="px-2 py-1 bg-yellow-400/20 text-yellow-400 border border-yellow-400/30 text-xs rounded-full">
                                                                    {priorityCount} Important
                                                                </span>
                                                            </div>
                                                        )}

                                                        {/* Footer */}
                                                        <div className="mt-4 pt-3 border-t border-white/10 text-xs text-gray-400 flex justify-between">
                                                            <span>{parent.items.length} items</span>
                                                            <span>{new Date(parent.created_at).toLocaleDateString()}</span>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    {todoParents.length === 0 && (
                                        <div className="text-center py-8 text-gray-400">
                                            No todo lists found. Create your first list!
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* List Detail Dialog */}
                {selectedList && (
                    <Dialog open={listDialogOpen} onOpenChange={setListDialogOpen}>
                        <DialogContent className="max-w-4xl bg-[#1e293b] border-white/10 text-white max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                                <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                    {selectedList.title}
                                </DialogTitle>
                                <DialogDescription className="text-gray-300">
                                    {selectedList.description || 'No description provided'}
                                </DialogDescription>
                            </DialogHeader>

                            <div className="mt-6">
                                {/* List Stats */}
                                <div className="grid grid-cols-4 gap-4 mb-6">
                                    <div className="text-center p-4 bg-white/5 rounded-lg border border-white/10">
                                        <div className="text-2xl font-bold text-white">{selectedList.items.length}</div>
                                        <div className="text-gray-300 text-sm">Total Items</div>
                                    </div>
                                    <div className="text-center p-4 bg-white/5 rounded-lg border border-white/10">
                                        <div className="text-2xl font-bold text-green-400">
                                            {selectedList.items.filter(item => item.completed).length}
                                        </div>
                                        <div className="text-gray-300 text-sm">Completed</div>
                                    </div>
                                    <div className="text-center p-4 bg-white/5 rounded-lg border border-white/10">
                                        <div className="text-2xl font-bold text-yellow-400">
                                            {selectedList.items.filter(item => item.important).length}
                                        </div>
                                        <div className="text-gray-300 text-sm">Important</div>
                                    </div>
                                    <div className="text-center p-4 bg-white/5 rounded-lg border border-white/10">
                                        <div className="text-2xl font-bold text-gray-300">
                                            {getCompletionPercentage(selectedList.items)}%
                                        </div>
                                        <div className="text-gray-300 text-sm">Progress</div>
                                    </div>
                                </div>

                                {/* Todo Items */}
                                <div className="space-y-3">
                                    <h3 className="text-lg font-semibold text-white mb-4">Todo Items</h3>
                                    {selectedList.items.map((item: TodoItem) => (
                                        <div key={item.id} className={`flex items-center justify-between p-4 border rounded-lg transition-all duration-200 ${
                                            item.completed 
                                                ? 'border-green-400/30 bg-green-400/10' 
                                                : 'border-white/10 hover:bg-white/5'
                                        }`}>
                                            <div className="flex items-center flex-1">
                                                {/* Checkbox */}
                                                <input 
                                                    type="checkbox" 
                                                    checked={item.completed}
                                                    onChange={() => handleToggleComplete(item.id, item.completed)}
                                                    className="w-5 h-5 text-green-400 bg-white/5 border-white/10 rounded focus:ring-green-500 focus:ring-offset-gray-900 focus:ring-2" 
                                                />
                                                
                                                {/* Todo Text or Edit Input */}
                                                <div className="ml-3 flex-1">
                                                    {editingId === item.id ? (
                                                        <div className="flex items-center space-x-2">
                                                            <input
                                                                type="text"
                                                                value={editText}
                                                                onChange={(e) => setEditText(e.target.value)}
                                                                className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                                                                autoFocus
                                                            />
                                                            <button
                                                                onClick={() => handleUpdate(item.id)}
                                                                className="px-3 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 border border-blue-400/30 hover:border-blue-400/50 rounded-lg transition-all duration-200"
                                                            >
                                                                Save
                                                            </button>
                                                            <button
                                                                onClick={handleCancelEdit}
                                                                className="px-3 py-2 bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10 hover:border-white/20 rounded-lg transition-all duration-200"
                                                            >
                                                                Cancel
                                                            </button>
                                                        </div>
                                                    ) : (
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
                                                    )}
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
                                                {/* Action Buttons */}
                                                <div className="flex items-center space-x-1">
                                                    {/* Update Button */}
                                                    <button 
                                                        onClick={() => editingId === item.id ? handleUpdate(item.id) : handleEdit(item)}
                                                        className={`p-2 rounded-lg transition-all duration-200 ${
                                                            editingId === item.id 
                                                                ? 'bg-green-400/20 text-green-400 border border-green-400/30' 
                                                                : 'text-blue-400 hover:text-blue-300 hover:bg-blue-400/10 border border-transparent hover:border-blue-400/30'
                                                        }`}
                                                        title="Update todo"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={editingId === item.id ? "M5 13l4 4L19 7" : "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"} />
                                                        </svg>
                                                    </button>

                                                    {/* Important Toggle */}
                                                    <button 
                                                        onClick={() => handleToggleImportant(item.id, item.important)}
                                                        className={`p-2 rounded-lg transition-all duration-200 border ${
                                                            item.important 
                                                                ? 'bg-yellow-400/20 text-yellow-400 border-yellow-400/30' 
                                                                : 'text-gray-400 hover:text-gray-300 hover:bg-white/5 border-transparent hover:border-white/10'
                                                        }`}
                                                        title={item.important ? "Mark as not important" : "Mark as important"}
                                                    >
                                                        <svg className="w-4 h-4" fill={item.important ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                                        </svg>
                                                    </button>

                                                    {/* Delete Button */}
                                                    <button 
                                                        onClick={() => handleDeleteItem(item.id)}
                                                        className="p-2 text-red-400 hover:text-red-300 rounded-lg hover:bg-red-400/10 border border-transparent hover:border-red-400/30 transition-all duration-200"
                                                        title="Delete todo"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {selectedList.items.length === 0 && (
                                    <div className="text-center py-8 text-gray-400">
                                        No todo items in this list.
                                    </div>
                                )}
                            </div>
                        </DialogContent>
                    </Dialog>
                )}
            </div>
        </>
    );
}