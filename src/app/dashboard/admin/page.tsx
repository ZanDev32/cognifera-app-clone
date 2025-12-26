"use client";

import { useState } from "react";
import { updateStatusAction, deleteBookAction, editBookTitle } from "@/lib/actions";
import { initialBooks } from "@/lib/data"; // Use the same mock data

export default function AdminPage() {
    const [books, setBooks] = useState(initialBooks);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [draftTitle, setDraftTitle] = useState("");

    const startEditing = (id: number, currentTitle: string) => {
        setEditingId(id);
        setDraftTitle(currentTitle);
    };

    const saveTitle = async (id: number) => {
        const formData = new FormData();
        formData.append("title", draftTitle);
        await editBookTitle(id, formData);
        setBooks((prev) => prev.map((b) => (b.id === id ? { ...b, title: draftTitle } : b)));
        setEditingId(null);
    };

    const cancelEditing = () => {
        setEditingId(null);
        setDraftTitle("");
    };
    
    return (
        <div className="min-h-screen p-8">
            
            {/* Header */}
            <header className="flex justify-between items-center mb-8">
                <h1 className="text-3x1 font-bold text-gray-800">Editor Dashboard</h1>
                <div className="bg-orange-100 text-orange-800 px-4 py-2 rounded-full font-bold">
                    Admin Mode
                </div>
            </header>
            {/* Stats Cards (Grid Layout) */}
            <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-white p-6 rounded-1g shadow border-1-4 border-yellow-400">
                    <h3 className="text-gray-500 text-sm"> Total Submissions</h3>
                    <p className="text-3x1 font-bold">{initialBooks.length}</p>
                </div>
                <div className="bg-white p-6 rounded-1g shadow border-1-4 border-green-508">
                    <h3 className="text-gray-500 text-sm"> Published Books</h3>
                    <p className="text-3xl font-bold">
                        {initialBooks.filter(b => b.status == "Published").length}
                    </p>
                </div>
            </div>
            
            {/* Management Table */}
            <div className="bg-white rounded-1g shadow overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-800 text-white">
                        <tr>
                            <th className="p-4">Title</th>
                            <th className="p-4">Author</th>
                            <th className="p-4">Current Status</th>
                            <th className="p-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {books.map((book) => (
                            <tr key={book.id} className="hover: bg-gray-50">
                                <td className="p-4 font-medium">
                                    
                                    {/* Edit Button */}
                                    {editingId === book.id ? (
                                        <input
                                            className="w-full border rounded px-2 py-1"
                                            value={draftTitle}
                                            onChange={(e) => setDraftTitle(e.target.value)}
                                        />
                                    ) : (
                                        book.title
                                    )}
                                </td>
                                <td className="p-4 text-gray-600"> {book.author}</td>
                                {/* Status Column */}
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded text-xs font-bold
                                    ${book.status == "Published" ? "bg-green-100 text-green-700" :
                                            book.status == "Rejected" ? "bg-red-100 text-red-700" :
                                                "bg-yellow-100 text-yellow-700"}`}>
                                        {book.status}
                                    </span>
                                </td>

                                {/* ACTION BUTTONS */}
                                <td className="p-4 flex gap-2">
                                    <button
                                        onClick={() => updateStatusAction(book.id, 'Published')}
                                        className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
                                    >
                                        Approve
                                    </button>
                                    <button
                                        onClick={() => updateStatusAction(book.id, "Rejected")}
                                        className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                                    >
                                        Reject
                                    </button>
                                    
                                    {/* Edit Button */}
                                    {editingId === book.id ? (
                                        <>
                                            <button
                                                onClick={() => saveTitle(book.id)}
                                                className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                                            >
                                                Save
                                            </button>
                                            <button
                                                onClick={cancelEditing}
                                                className="bg-gray-200 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-300"
                                            >
                                                Cancel
                                            </button>
                                        </>
                                    ) : (
                                        <button
                                            onClick={() => startEditing(book.id, book.title)}
                                            className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                                        >
                                            Edit
                                        </button>
                                    )}
                                    <button
                                        onClick={() => deleteBookAction(book.id)}
                                        className="text-gray-400 hover:text-red-600 ml-2"
                                    >
                                        (x)
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div >
    );
}