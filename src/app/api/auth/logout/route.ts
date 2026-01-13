import { NextResponse } from "next/server";

export async function POST() {
    try {
        const response = NextResponse.json(
            { message: "Çıkış başarılı" },
            { status: 200 }
        );

        response.cookies.delete("user");

        return response;
    } catch (error: any) {
        console.error("Logout error:", error);
        return NextResponse.json(
            { error: "Çıkış sırasında hata oluştu" },
            { status: 500 }
        );
    }
}
