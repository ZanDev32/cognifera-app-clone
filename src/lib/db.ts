import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = (() => {
    const raw = process.env.DATABASE_URL_POOL ?? process.env.DATABASE_URL;
    if (!raw) return undefined;
    try {
        const url = new URL(raw);
        // Prefer safe defaults for serverless (Supabase + pgbouncer friendly)
        if (!url.searchParams.has("sslmode")) url.searchParams.set("sslmode", "require");
        if (!url.searchParams.has("pgbouncer")) url.searchParams.set("pgbouncer", "true");
        if (!url.searchParams.has("connection_limit")) url.searchParams.set("connection_limit", "1");
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