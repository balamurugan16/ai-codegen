import * as dotenv from "dotenv";
import generateEntities from "./generate-entities.js";
import reverseEngineering from "./reverse-engineer.js";
import generateErDiagram from "./generate-er-diagram.js";

dotenv.config();

async function main() {
  // generateEntities();
  reverseEngineering();
  // generateErDiagram();
}

main();
