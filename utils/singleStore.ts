import { AI } from "@singlestore/ai";
import { SingleStoreClient } from "@singlestore/client";

const ai = new AI({ openAIApiKey: process.env.OPENAI_API_KEY });
const client = new SingleStoreClient({ ai });

// Function to initialize the database and create the table
// export async function initializeDatabase() {
//   try {
//     const connection = client.connect({
//       host: process.env.DATABASE_HOST,
//       user: process.env.DATABASE_USERNAME,
//       password: process.env.DATABASE_PASSWORD,
//     });

//     await connection.database.create({
//       name: process.env.DATABASE_NAME!,
//       tables: {
//         cases: {
//           columns: {
//             id: { type: "BIGINT", primaryKey: true, autoIncrement: true },
//             name: { type: "VARCHAR(255)", nullable: false },
//             age: { type: "INT", nullable: false },
//             gender: { type: "VARCHAR(50)", nullable: false },
//             location: { type: "VARCHAR(255)", nullable: false },
//             profile_description: { type: "TEXT", nullable: false },
//             image_link: { type: "VARCHAR(255)", nullable: true },
//             embedding: { type: "vector(1536)", nullable: true },
//             donation_amount: {
//               type: "DECIMAL(10, 2)",
//               nullable: false,
//               default: 0,
//             },
//             createdAt: { type: "DATETIME(6)", default: "CURRENT_TIMESTAMP(6)" },
//             updatedAt: { type: "DATETIME(6)" },
//           },
//         },
//         tasks: {
//           columns: {
//             id: { type: "BIGINT", primaryKey: true, autoIncrement: true },
//             case_id: { type: "BIGINT", nullable: false },
//             name: { type: "VARCHAR(255)", nullable: false },
//             description: { type: "TEXT", nullable: false },
//             completed: { type: "BOOLEAN", nullable: false, default: false },
//             createdAt: { type: "DATETIME(6)", default: "CURRENT_TIMESTAMP(6)" },
//             updatedAt: { type: "DATETIME(6)" },
//           },
//           //   foreignKeys: [
//           //     {
//           //       columns: ["case_id"],
//           //       reference: {
//           //         table: "cases",
//           //         columns: ["id"],
//           //       },
//           //     },
//           //   ],
//         },
//       },
//     });

//     console.log("Database and tables created successfully");
//     return connection;
//   } catch (error) {
//     console.error("Error creating database and tables:", error);
//     throw error;
//   }
// }

const connection = client.connect({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
});

export interface Case {
  id: number;
  name: string;
  age: number;
  gender: string;
  location: string;
  profile_description: string;
  image_link: string | null;
  embedding: number[] | null;
  donation_amount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Task {
  id: number;
  case_id: number;
  name: string;
  description: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Database {
  name: string;
  tables: {
    case: Case;
    tasks: Task[];
  };
}

export const db = connection.database.use<Database>(process.env.DATABASE_NAME!);

export const caseTable = db.table.use("cases");
export const taskTable = db.table.use("tasks");

// Function to perform raw queries on the SingleStore database
// export async function query(sql: any, values = []) {
//   try {
//     const connection = client.connect({
//       host: process.env.DATABASE_HOST,
//       user: process.env.DATABASE_USERNAME,
//       password: process.env.DATABASE_PASSWORD,
//     });

//     const database = connection.database(process.env.DATABASE_NAME);
//     const [results] = await database.query(sql, values);
//     return results;
//   } catch (error) {
//     console.error("Error executing query:", error);
//     throw error;
//   }
// }
