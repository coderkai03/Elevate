import { AI } from "@singlestore/ai";
import { SingleStoreClient } from "@singlestore/client";

export const ai = new AI({ openAIApiKey: process.env.OPENAI_API_KEY });
const client = new SingleStoreClient({ ai });

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
