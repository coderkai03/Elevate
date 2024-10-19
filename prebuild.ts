import { loadEnvConfig } from "@next/env";
import { SingleStoreClient } from "@singlestore/client";

const dir = process.cwd();
const env = loadEnvConfig(dir).combinedEnv;

(async () => {
  try {
    const client = new SingleStoreClient();

    const connection = client.connect({
      host: env.DATABASE_HOST,
      user: env.DATABASE_USERNAME,
      password: env.DATABASE_PASSWORD,
    });

    await connection.database.create({
      name: env.DATABASE_NAME!,
      tables: {
        cases: {
          columns: {
            id: { type: "BIGINT", primaryKey: true, autoIncrement: true },
            name: { type: "VARCHAR(255)", nullable: false },
            age: { type: "INT", nullable: false },
            gender: { type: "VARCHAR(50)", nullable: false },
            location: { type: "VARCHAR(255)", nullable: false },
            profile_description: { type: "TEXT", nullable: false },
            image_link: { type: "VARCHAR(255)", nullable: true },
            embedding: { type: "vector(1536)", nullable: true },
            donation_amount: {
              type: "DECIMAL(10, 2)",
              nullable: false,
              default: 0,
            },
            createdAt: { type: "DATETIME(6)", default: "CURRENT_TIMESTAMP(6)" },
            updatedAt: { type: "DATETIME(6)" },
          },
        },
        tasks: {
          columns: {
            id: { type: "BIGINT", primaryKey: true, autoIncrement: true },
            case_id: { type: "BIGINT", nullable: false },
            name: { type: "VARCHAR(255)", nullable: false },
            description: { type: "TEXT", nullable: false },
            completed: { type: "BOOLEAN", nullable: false, default: false },
            createdAt: { type: "DATETIME(6)", default: "CURRENT_TIMESTAMP(6)" },
            updatedAt: { type: "DATETIME(6)" },
          },
        },
      },
    });

    console.log("Database and tables created successfully");
    process.exit(0);
  } catch (error) {
    console.error("Error creating database and tables:", error);
    process.exit(1);
  }
})();
