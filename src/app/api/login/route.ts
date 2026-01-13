import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import sql from "mssql";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json(
                { error: "Email ve şifre alanları zorunludur" },
                { status: 400 }
            );
        }

        const pool = await connectDB();

        const result = await pool
            .request()
            .input("email", sql.NVarChar(100), email)
            .query(`
                SELECT Email, PasswordHash, FirstName, LastName, PhoneNumber
                FROM dbo.Users
                WHERE Email = @email
            `);

        if (result.recordset.length === 0) {
            return NextResponse.json(
                { error: "Email veya şifre hatalı" },
                { status: 401 }
            );
        }

        const user = result.recordset[0];
        const isPasswordValid = await bcrypt.compare(password, user.PasswordHash);

        if (!isPasswordValid) {
            return NextResponse.json(
                { error: "Email veya şifre hatalı" },
                { status: 401 }
            );
        }

        const userData = {
            email: user.Email,
            firstName: user.FirstName,
            lastName: user.LastName,
            phoneNumber: user.PhoneNumber
        };

        const response = NextResponse.json(
            {
                message: "Giriş başarılı",
                user: userData
            },
            { status: 200 }
        );

        try {
            response.cookies.set("user", JSON.stringify(userData), {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                maxAge: 60 * 60 * 24 * 7,
                path: "/"
            });
        } catch (cookieError: any) {
            console.error("Cookie set hatası:", cookieError);
        }

        return response;
    } catch (error: any) {
        console.error("Login error:", error);
        console.error("Error stack:", error?.stack);
        console.error("Error details:", {
            message: error?.message,
            name: error?.name,
            code: error?.code,
            originalError: error?.originalError
        });
        return NextResponse.json(
            {
                error: "Giriş sırasında hata oluştu",
                details: error?.message || "Unknown error",
                stack: process.env.NODE_ENV === "development" ? error?.stack : undefined
            },
            { status: 500 }
        );
    }
}
