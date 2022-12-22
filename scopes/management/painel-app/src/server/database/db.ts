import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import { IDB } from "../schemas/IDB";

// File path

const getDefaultDBPath = () => {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const file = join(__dirname, "db.json");

  return file;
};

const DB_FILE = process.env.DB_FILE ?? getDefaultDBPath();

// Configure lowdb to write to JSONFile
const adapter = new JSONFile<IDB>(DB_FILE);

export const db = new Low<IDB>(adapter);

export const getData = async (): Promise<IDB> => {
  await db.read();

  db.data ||= { machines: [] };

  return db.data;
};

export const saveData = async () => {
  await db.write();
};

export const getMachines = async () => {
  const { machines } = await getData();
  return machines;
};

export const getMachine = async (machineId: string) => {
  const machines = await getMachines();
  return machines.find((m) => m.id === machineId);
};
