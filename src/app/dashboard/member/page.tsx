// "use client";
import { uploadBookAction, getBooks } from "@/lib/actions";

export default async function MemberPage() {
    const books = await getBooks();

    return (

        <div className="min-h-screen p-8">
            <h1 className="text-3xl font-bold mb-8 text-gray-800">My Dashboard</h1>

            {/* Grid: 1 Column on Mobile, 3 Columns on Desktop */}
            <div className="grid md:grid-cols-3 gap-8">

                {/* SECTION 1: UPLOAD FORM (Takes 1 column) */}
                <div className="bg-white p-6 rounded-lg shadow border border-orange-100 h-fit">
                    <h2 className="text-xl font-bold text-orange-600 mb-4">Upload Book</h2>

                    <form action={uploadBookAction} className="space-y-4">
                        <div>
                            <label
                                className="block text-sm
                                mb-1">Book Title</label>
                            <input
                                type="text"
                                name="title"
                                className="w-full border p-2 rounded"
                                placeholder="Enter title..."
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-orange-600 text-white p-2 rounded hover:bg-orange-700"
                        >
                            Submit Manuscript
                        </button>
                    </form>
                </div>

                {/* SECTION 2: TABLE (Will go here) */}
                <div className="md:col-span-2 bg-white p-6 rounded-lg shadow border border-gray-100">
                    <h2 className="text-xl font-bold mb-4 text-gray-700">My Submissions</h2>
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b bg-orange-50">
                                <th className="p-3">Title</th>
                                <th className="p-3">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Loop through the books */}
                            {books.map((book) => (
                                <tr key={book.id} className="border-b hover:bg-gray-50">
                                    <td className="p-3">{book.title}</td>
                                    <td className="p-3">
                                        {/* Dynamic Color based on Status */}
                                        <span className={`px-2 py-1 rounded text-xs font-bold ${
                                            book.status === "Published" ? "bg-green-100 text-green-700" :
                                            book.status === "Pending" ? "bg-yellow-100 text-yellow-700" :
                                            "bg-red-100 text-red-700"
                                        }`}>
                                            {book.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}