import path from "path";
import { readFile, writeFile } from "fs/promises";
import { EntityGeneratorParserType } from "../parsers/entity-generation-parser.ts";

export const loadContent = async (location: string) => {
  const buffer = await readFile(path.join(process.cwd(), location));
  return buffer.toString();
};

export const generateFiles = async (files: EntityGeneratorParserType) => {
  for (let i = 0; i < files.length; i++) {
    await writeFile(
      path.join(process.cwd(), "output", files[i].filename),
      files[i].content
    );
  }
};
