import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = (() => {
    const raw = process.env.DATABASE_URL;
    if (!raw) return undefined;
    try {
        const url = new URL(raw);
        if (!url.searchParams.has("sslmode")) url.searchParams.set("sslmode", "require");
        return url.toString();
    } catch {
        // If DATABASE_URL isn't a valid URL (rare), fall back to raw.
        return raw;
    }
})();

const adapter = new PrismaPg({
    connectionString,
});

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma = 
    globalForPrisma.prisma ||
    new PrismaClient({
        adapter: adapter,
    });
    
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;