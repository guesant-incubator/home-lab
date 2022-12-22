import { execSync } from "node:child_process";
import { getMachine } from "../../database/db";
import { IMachine } from "../../schemas/IMachine";

const SSH_IDENTITY_PATH = process.env.SSH_IDENTITY_PATH;

const sshToMachine = (machine: IMachine, command: string) => {
  return [
    "ssh",
    "-o StrictHostKeyChecking=no",
    ...(SSH_IDENTITY_PATH ? [`-i ${SSH_IDENTITY_PATH}`] : []),
    `labmanager@${machine.ip}`,
    `"${command}"`,
  ].join(" ");
};

export const suspend = async (machineId: string) => {
  const machine = await getMachine(machineId);

  if (machine) {
    const command = sshToMachine(machine, "sudo systemctl suspend");
    execSync(command);
  }
};
