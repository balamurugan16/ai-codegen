import * as dotenv from "dotenv";
import generateEntities from "./generate-entities.ts";
import reverseEngineering from "./reverse-engineer.ts";
import generateErDiagram from "./generate-er-diagram.ts";

dotenv.config();

async function main() {
  generateEntities();
  // reverseEngineering();
  // generateErDiagram();
}

main();
