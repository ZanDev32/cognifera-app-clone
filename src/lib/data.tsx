import { prisma } from "./db";

//Define the Book data type
export interface Book {
    id: number;
    title: string;
    author: string;
    status: "Pending" | "Published" | "Rejected";
    deleted: boolean;
}
export async function getBooks() {
    const books = await prisma.book.findMany({
        where: { deleted: false },
        orderBy: {
            createdAt: 'desc',
        },
    });

    return books;
}