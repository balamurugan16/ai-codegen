import path from "path";
import { readFile, writeFile } from "fs/promises";

export const loadContent = async (location: string) => {
  const buffer = await readFile(path.join(process.cwd(), location));
  return buffer.toString();
};

export const generateFile = async (
  baseLocation: string,
  fileName: string,
  content: string
) => {
  await writeFile(path.join(process.cwd(), baseLocation, fileName), content);
};
