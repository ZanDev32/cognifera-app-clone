"use server"; // Tell Next.js this is a server action

import { revalidatePath } from "next/cache";
import { prisma } from "./db";
import { Book } from "./data";

export async function getBooks(): Promise<Book[]> {
    return await prisma.book.findMany({
        where: { deleted: false },
        orderBy: { createdAt: "desc" },
    });
}

export async function uploadBookAction(formData: FormData) {
    const title = formData.get("title") as string;
    
    if (!title) return;

    await prisma.book.create({
        data: {
            title: title,
            author: "Member",
            status: "Pending",
            deleted: false,
        },
    });
    revalidatePath("/dashboard/member");
}

export async function updateStatusAction(id: number, status: string) {
    // Database update logic
    await prisma.book.update({
        where: { id: id },
        data: { status: status as "Pending" | "Published" | "Rejected" },
    });
    revalidatePath("/dashboard/admin");
}

export async function deleteBookAction(id: number) {
    await prisma.book.update({
        where: { id: id },
        data: { deleted: true },
    });
    revalidatePath("/dashboard/admin");
}