import { EntityGenerationChain } from "./chains/entity-chain.ts";
import { entityGenerationParser } from "./parsers/entity-generation-parser.ts";
import { generateFiles, loadContent } from "./utils/file.utils.ts";

async function generateEntities() {
  const content = await loadContent("./data/oas.yml");

  const chain = new EntityGenerationChain();
  const result = await chain.call({
    schemas: content,
    language: "C#",
    library: "Entity Framework",
  });

  const files = await entityGenerationParser.parse(result.text);

  await generateFiles(files);
}

export default generateEntities;
