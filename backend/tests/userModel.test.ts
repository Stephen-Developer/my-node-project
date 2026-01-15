import { Pool, PoolClient } from "pg";
import { StartedPostgreSqlContainer, PostgreSqlContainer } from "@testcontainers/postgresql";
import { runQuery } from "../src/utils/sqlQueryRunner";

describe("User Model", () => {
    jest.setTimeout(60000);

    let container: StartedPostgreSqlContainer;
    let pool: Pool;
    let client: PoolClient;

    beforeAll(async () => {
        container = await new PostgreSqlContainer("postgres:15-alpine")
        .withDatabase("testdb")
        .withUsername("testuser")
        .withPassword("testpass")
        .start();

        // Set env vars BEFORE importing your model/db 
        process.env.DB_HOST = container.getHost(); 
        process.env.DB_PORT = container.getMappedPort(5432).toString(); 
        process.env.DB_USER = container.getUsername(); 
        process.env.DB_PASS = container.getPassword(); 
        process.env.DB_NAME = container.getDatabase();

        // Now import your model AFTER env vars are set 
        const dbModule = await import("../src/db");
        pool = dbModule.pool;

        console.log("Initializing database schema");
        await runQuery(pool, "../db/init.sql");
    });

    afterAll(async () => {
        console.log("Closing DB pool and stopping container");
        await pool.end();
        await container.stop();
    });

    beforeEach(async () => {
        client = await pool.connect();
        await client.query('BEGIN');
    });

    afterEach(async () => {
        await client.query('ROLLBACK');
        client.release();
    });

    test("creates a user", async () => { 
        const { create } = await import("../src/models/userModel");
        
        console.log("Creating user 'alice'");
        const user = await create({ username: "alice", password: "secret" }, client); 
        
        expect(user.username).toBe("alice");
        expect(user).toHaveProperty("password");
    });

    test("retrieves password hash correctly", async () => {
        const { create, getPasswordHash } = await import("../src/models/userModel");

        const user = await create({ username: "bob", password: "mypassword" }, client);

        console.log("Retrieving password hash for 'bob'");
        const hash = await getPasswordHash("bob", client);

        expect(hash).toBe(user.password);
    });

    test("finds all users", async () => {
        const { create, findAll } = await import("../src/models/userModel");

        await create({ username: "eve", password: "1234" }, client);
        await create({ username: "frank", password: "5678" }, client);
        
        console.log("Finding all users");
        const users = await findAll(client);

        expect(users.length).toBe(2);

        const usernames = users.map(u => u.username);
        expect(usernames).toContain("eve");
        expect(usernames).toContain("frank");
    });

    test("resets all users", async () => {
        const { create, resetAll, findAll } = await import("../src/models/userModel");

        await create({ username: "charlie", password: "pass1" }, client);
        await create({ username: "dave", password: "pass2" }, client);

        let users = await findAll(client);
        expect(users.length).toBe(2);

        console.log("Resetting all users");
        const deletedCount = await resetAll(client);

        expect(deletedCount).toBe(2);

        users = await findAll(client);
        expect(users.length).toBe(0);
    });

    test("password for non-existent user returns null", async () => {
        const { getPasswordHash } = await import("../src/models/userModel");

        console.log("Retrieving password hash for non-existent user 'nonuser'");
        const hash = await getPasswordHash("nonuser", client);

        expect(hash).toBeNull();
    });

    test("resetAll on empty table returns zero", async () => {
        const { resetAll } = await import("../src/models/userModel");

        console.log("Resetting all users on empty table");
        const deletedCount = await resetAll(client);

        expect(deletedCount).toBe(0);
    });

    test("findAll on empty table returns empty array", async () => {
        const { findAll } = await import("../src/models/userModel");

        console.log("Finding all users on empty table");
        const users = await findAll(client);

        expect(users).toEqual([]);
    });
})