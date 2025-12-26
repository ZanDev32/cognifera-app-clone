"use server"; // Tell Next.js this is a server action

import { revalidatePath } from "next/cache";
import { prisma } from "./db";

export async function uploadBookAction(formData: FormData) {
    const title = formData.get("title") as string;
    
    if (!title) return;

    await prisma.book.create({
        data: {
            title: title,
            author: "Member",
            status: "Pending",
        },
    });
    revalidatePath("/dashboard/admin");
    return { success: true };
}

export async function updateStatusAction(id: number, status: string) {
    // Database update logic
    await prisma.book.update({
        where: { id: id },
        data: { status: status as "Pending" | "Published" | "Rejected" },
    });
    revalidatePath("/dashboard/admin");
}