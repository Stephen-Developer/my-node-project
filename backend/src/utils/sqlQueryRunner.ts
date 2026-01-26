import { readFileSync } from "node:fs";
import { Pool } from "pg";
import { join } from "node:path";

export async function runQuery(pool: Pool, queryFilePath: string): Promise<void> {

    const path = join(__dirname, queryFilePath);

    const queryText = readFileSync(path, "utf-8");

    try {
        const result = await pool.query(queryText);
    } catch (error) {
        console.error("Error executing query:", error);
    }
};