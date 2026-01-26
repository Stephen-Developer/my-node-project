import { Pool, PoolClient } from "pg";
import { StartedPostgreSqlContainer, PostgreSqlContainer } from "@testcontainers/postgresql";
import { runQuery } from "../src/utils/sqlQueryRunner";
import { User } from "../src/types/user";

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

        await runQuery(pool, "../db/init.sql");
    });

    afterAll(async () => {
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
        const { UserModel } = await import("../src/models/userModel");
        const userModel = new UserModel(pool);

        const expectedUser: User = {
            username: "alice",
            password: "secret"
        }

        const user = await userModel.create(expectedUser, client);

        expect(user).toMatchObject<User>(expectedUser);
    });

    test("retrieves password hash correctly", async () => {
        const { UserModel } = await import("../src/models/userModel");
        const userModel = new UserModel(pool);

        const expectedUser: User = {
            username: "bob",
            password: "mypassword"
        }

        const user = await userModel.create(expectedUser, client);

        const hash = await userModel.getPasswordHash(expectedUser.username, client);

        expect(hash).toBe(user.password);
    });

    test("finds all users", async () => {
        const { UserModel } = await import("../src/models/userModel");
        const userModel = new UserModel(pool);

        const expectedUsers: User[] = [
            { username: "eve", password: "1234" },
            { username: "frank", password: "5678" }
        ];

        await userModel.create(expectedUsers[0], client);
        await userModel.create(expectedUsers[1], client);

        const users = await userModel.findAll(client);

        expect(users.length).toBe(2);

        expect(users).toMatchObject<User[]>(expectedUsers);
    });

    test("resets all users", async () => {
        const { UserModel } = await import("../src/models/userModel");
        const userModel = new UserModel(pool);

        const expectedUsers: User[] = [
            { username: "charlie", password: "pass1" },
            { username: "dave", password: "pass2" }
        ];

        await userModel.create(expectedUsers[0], client);
        await userModel.create(expectedUsers[1], client);

        let users = await userModel.findAll(client);
        expect(users.length).toBe(2);

        const deletedCount = await userModel.resetAll(client);
        expect(deletedCount).toBe(2);

        users = await userModel.findAll(client);
        expect(users.length).toBe(0);
    });

    test("password for non-existent user returns null", async () => {
        const { UserModel } = await import("../src/models/userModel");
        const userModel = new UserModel(pool);

        const hash = await userModel.getPasswordHash("nonuser", client);

        expect(hash).toBeNull();
    });

    test("resetAll on empty table returns zero", async () => {
        const { UserModel } = await import("../src/models/userModel");
        const userModel = new UserModel(pool);

        const deletedCount = await userModel.resetAll(client);

        expect(deletedCount).toBe(0);
    });

    test("findAll on empty table returns empty array", async () => {
        const { UserModel } = await import("../src/models/userModel");
        const userModel = new UserModel(pool);

        const users = await userModel.findAll(client);

        expect(users).toEqual([]);
    });
})