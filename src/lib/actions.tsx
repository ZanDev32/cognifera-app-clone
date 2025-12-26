"use server";
import { initialBooks, Book } from "@/lib/data";

export async function uploadBookAction(formData: FormData) {
    const title = formData.get("title") as string;
    console.log("Server recerived title:", title);
}

export async function updateStatusAction(id: number, status: string) {
    console.log(`Book ID ${id} is now ${status}`);
}

export async function deleteBookAction(id: number) {
    console.log("DELETE ACTION TRIGGERED for ID:", id);
}

export async function editBookTitle(id: number, formData: FormData) {
    const newTitle = formData.get("title") as string;
    
    console.log(`Renaming book ${id} to ${newTitle}`);
}