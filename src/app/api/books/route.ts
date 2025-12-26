import { getBooks } from "@/lib/data";
import { NextResponse } from "next/server";

export async function GET() {
    const books = await getBooks();
    return NextResponse.json(books);
}