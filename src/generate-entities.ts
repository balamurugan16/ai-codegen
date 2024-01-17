import { EntityGenerationChain } from "./chains/entity-chain.js";
import { entityGenerationParser } from "./parsers/entity-generation-parser.js";
import { generateFile, loadContent } from "./utils/file.utils.js";

async function generateEntities() {
  const content = await loadContent("./data/oas.yml");

  const chain = new EntityGenerationChain();
  const result = await chain.call({
    schemas: content,
    language: "TypeScript",
    library: "TypeORM",
  });

  const files = await entityGenerationParser.parse(result.text);

  for (let file of files) {
    await generateFile("output", file.filename, file.content);
  }
}

export default generateEntities;
