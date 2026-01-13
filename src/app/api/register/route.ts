import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import sql from "mssql";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
    try {
        const { email, password, firstName, lastName, phoneNumber } =
            await request.json();

        if (!password) {
            return NextResponse.json(
                { error: "Şifre alanı zorunludur" },
                { status: 400 }
            );
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        // --------------------------------------------

        const pool = await connectDB();
        console.log("Pool alındı");


        const result = await pool
            .request()
            .input("email", sql.NVarChar(100), email)
            .input("passwordHash", sql.NVarChar(255), hashedPassword)
            .input("firstName", sql.NVarChar(50), firstName)
            .input("lastName", sql.NVarChar(50), lastName)
            .input("phoneNumber", sql.NVarChar(20), phoneNumber || null)
            .input("createdDate", sql.DateTime, new Date())
            .query(`
                INSERT INTO dbo.Users (Email, PasswordHash, FirstName, LastName, PhoneNumber, CreatedDate)
                OUTPUT INSERTED.*
                VALUES (@email, @passwordHash, @firstName, @lastName, @phoneNumber, @createdDate)
            `);

        console.log("Kullanici eklendi:", result);

        return NextResponse.json(
            { message: "Kullanıcı başarıyla oluşturuldu!" },
            { status: 201 }
        );
    } catch (error: any) {
        console.error("Register error FULL:", error);

        return NextResponse.json(
            {
                error: "Kayıt sırasında hata oluştu",
                details: error?.originalError?.info?.message || error?.message || "Unknown error",
                code: error?.code,
                number: error?.number,
            },
            { status: 500 }
        );
    }
}
