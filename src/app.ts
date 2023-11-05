import * as dotenv from "dotenv";
import generateEntities from "./generate-entities.ts";

dotenv.config();

async function main() {
  generateEntities();
}

main();
