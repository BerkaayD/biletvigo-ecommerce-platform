import sql from "mssql";

const config: sql.config = {
    user: process.env.DB_USER || "sa",
    password: process.env.DB_PASSWORD || "admin",
    server: process.env.DB_SERVER || "localhost",
    database: process.env.DB_NAME || "ECommerce",
    options: { 
        encrypt: process.env.DB_ENCRYPT === "true",
        trustServerCertificate: process.env.DB_TRUST_CERT === "true" || true
    },
};

let pool: sql.ConnectionPool | null = null;

export async function connectDB() {
    if (pool?.connected) return pool;
    pool = await sql.connect(config);
    return pool;
}
