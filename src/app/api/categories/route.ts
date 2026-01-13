import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";

export async function GET() {
    try {
        const pool = await connectDB();
        console.log("Pool alındı.");
        const result = await pool.request()
            .query(
                ` SELECT CategoryID, Name, Slug, Icon, ParentID 
                FROM Categories 
                WHERE IsActive = 1`
            );
        return NextResponse.json(result.recordset);
    }

    catch (error) {
        console.error("Kategori cekilemedi: ", error);
        return NextResponse.json(
            { error: "Kategoriler yuklenemedi." },
            { status: 500 }
        );
    }
}