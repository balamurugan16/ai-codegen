import * as dotenv from "dotenv";
import { EntityGenerationChain } from "./chains/entity-chain.ts";
import { entityGenerationParser } from "./parsers/entity-generation-parser.ts";
import { generateFiles, loadContent } from "./utils/file.utils.ts";

dotenv.config();

async function main() {
  const content = await loadContent("./data/oas.yml");

  const chain = new EntityGenerationChain();
  const result = await chain.call({
    OAS: content,
  });

  const files = await entityGenerationParser.parse(result.text);

  await generateFiles(files);
}

main();
