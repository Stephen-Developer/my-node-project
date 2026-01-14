import { readFileSync } from "node:fs";
import { Pool } from "pg";
import { join } from "node:path";

export async function runQuery(pool: Pool, queryFilePath: string): Promise<void> {

    const path = join(__dirname, queryFilePath);
    console.log(`Running query from path: ${path}`);

    const queryText = readFileSync(path, "utf-8");

    try {
        const result = await pool.query(queryText);
        console.log("Query executed successfully:", result.command || "ok");
    } catch (error) {
        console.error("Error executing query:", error);
    }
};