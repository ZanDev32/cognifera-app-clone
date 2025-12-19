
//Define the Book data type
export interface Book {
    id: number;
    title: string;
    author: string;
    status: "Pending" | "Published" | "Rejected";
}
// Initial data (Mock Data)
export const initialBooks: Book[] = [
    {
        id: 1,
        title: "Filosofi Kopi Modern",
        author: "Dee Lestari (Member)",
        status: "Published",
    },
    {
        id: 2,
        title: "Cara Belajar Next. js",
        author: "Budi Hacker",
        status: "Pending",
    }
];