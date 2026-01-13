import { connectDB } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(){
    try{
        const pool = await connectDB();
        const result = await pool.request().query('SELECT * FROM cities');

        return NextResponse.json(result.recordset);

    }
    catch(error){
        console.error('Veritabanı hatasi: ', error);
        return NextResponse.json({
            error:
            'Sehirler yuklenemedi.'
         },
        {   
            status: 500
        });
    }
}