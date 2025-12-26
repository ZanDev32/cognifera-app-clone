"use server"; // Tell Next.js this is a server action

import { revalidatePath } from "next/cache";
import { prisma } from "./db";
import { Book } from "./data";

export async function getBooks(): Promise<Book[]> {
    const books = await prisma.book.findMany({
        where: { deleted: false },
        orderBy: { createdAt: "desc" },
    });

    // Cast status from Prisma string to our stricter union type
    return books.map((book) => ({
        ...book,
        status: book.status as Book["status"],
    }));
}

export async function uploadBookAction(formData: FormData) {
    const title = formData.get("title") as string;

    if (!title) return;

    await prisma.book.create({
        data: {
            title,
            author: "Member",
            status: "Pending",
            deleted: false,
        },
    });
    revalidatePath("/dashboard/member");
}

export async function updateStatusAction(id: number, status: string) {
    await prisma.book.update({
        where: { id },
        data: { status: status as "Pending" | "Published" | "Rejected" },
    });
    revalidatePath("/dashboard/admin");
}

export async function deleteBookAction(id: number) {
    await prisma.book.update({
        where: { id },
        data: { deleted: true },
    });
    revalidatePath("/dashboard/admin");
}

export async function editBookTitle(id: number, formData: FormData) {
    const newTitle = (formData.get("title") as string) ?? "";
    if (!newTitle) return;

    await prisma.book.update({
        where: { id },
        data: { title: newTitle },
    });
    revalidatePath("/dashboard/admin");
}