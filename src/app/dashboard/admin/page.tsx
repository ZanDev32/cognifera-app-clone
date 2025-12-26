"use client";

import { useEffect, useState } from "react";
import { deleteBookAction, editBookTitle, updateStatusAction } from "@/lib/actions";
import { Book } from "@/lib/data"; // Use the same mock data

export default function AdminPage() {
    const [books, setBooks] = useState<Book[]>([]);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [draftTitle, setDraftTitle] = useState("");

    useEffect(() => {
        const load = async () => {
            const res = await fetch("/api/books");
            if (!res.ok) return;
            const data: Book[] = await res.json();
            setBooks(data);
        };
        load();
    }, []);

    const startEditing = (book: Book) => {
        setEditingId(book.id);
        setDraftTitle(book.title);
    };

    const cancelEditing = () => {
        setEditingId(null);
        setDraftTitle("");
    };

    const saveTitle = async (bookId: number, formData: FormData) => {
        await editBookTitle(bookId, formData);
        const newTitle = (formData.get("title") as string) ?? "";
        setBooks((prev) => prev.map((b) => (b.id === bookId ? { ...b, title: newTitle } : b)));
        setEditingId(null);
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
                    <p className="text-3x1 font-bold">{books.length}</p>
                </div>
                <div className="bg-white p-6 rounded-1g shadow border-1-4 border-green-508">
                    <h3 className="text-gray-500 text-sm"> Published Books</h3>
                    <p className="text-3xl font-bold">
                        {books.filter((b: Book) => b.status == "Published").length}
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
                        {books.map((book: Book) => (
                            <tr key={book.id} className="hover: bg-gray-50">
                                <td className="p-4 font-medium">
                                    {editingId === book.id ? (
                                        <form
                                            action={saveTitle.bind(null, book.id)}
                                            className="flex items-center gap-2"
                                        >
                                            <input
                                                name="title"
                                                className="w-full border rounded px-2 py-1"
                                                value={draftTitle}
                                                onChange={(e) => setDraftTitle(e.target.value)}
                                            />
                                            <button
                                                type="submit"
                                                className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                                            >
                                                Save
                                            </button>
                                            <button
                                                type="button"
                                                onClick={cancelEditing}
                                                className="bg-gray-200 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-300"
                                            >
                                                Cancel
                                            </button>
                                        </form>
                                    ) : (
                                        <div className="flex items-center gap-2">
                                            <span>{book.title}</span>
                                            <button
                                                type="button"
                                                onClick={() => startEditing(book)}
                                                className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                                            >
                                                Edit
                                            </button>
                                        </div>
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
                                    <form action={updateStatusAction.bind(null, book.id, "Published")}>
                                        <button
                                            type="submit"
                                            className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
                                        >
                                            Approve
                                        </button>
                                    </form>
                                    <form action={updateStatusAction.bind(null, book.id, "Rejected")}>
                                        <button
                                            type="submit"
                                            className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                                        >
                                            Reject
                                        </button>
                                    </form>
                                    <form action={deleteBookAction.bind(null, book.id)}>
                                        <button
                                            type="submit"
                                            className="text-gray-400 hover:text-red-600 ml-2"
                                        >
                                            (x)
                                        </button>
                                    </form>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div >
    );
}