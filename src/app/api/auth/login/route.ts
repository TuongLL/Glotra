import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
    try {
        const { userId } = await auth();

        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Fetch full user info from Clerk
        const clerkUser = await (await clerkClient()).users.getUser(userId);
        const email = clerkUser.emailAddresses[0]?.emailAddress || "";

        // Upsert user into Prisma DB
        const user = await prisma.user.upsert({
            where: { id: userId },
            update: {
                email,
                name: `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`.trim(),
                image: clerkUser.imageUrl,
            },
            create: {
                id: userId,
                email,
                name: `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`.trim(),
                image: clerkUser.imageUrl,
            },
        });

        return NextResponse.json({
            message: "User synced",
            user,
        });
    } catch (error) {
        console.error("Auth error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
