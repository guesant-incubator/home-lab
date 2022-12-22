import { execSync } from "node:child_process";
import { getMachine } from "../../database/db";

export const wakeup = async (machineId: string) => {
  const machine = await getMachine(machineId);

  if (machine) {
    execSync(`wakeonlan -i ${machine.subnet} ${machine.mac}`);
  }
};
