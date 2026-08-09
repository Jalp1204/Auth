import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import type { NodePgDatabase } from "drizzle-orm/node-postgres";

export const db: NodePgDatabase= drizzle(process.env.DATABASE_URL!);


