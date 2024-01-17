import { EntityGenerationChain } from "./chains/entity-chain.ts";
import { ErDiagramChain } from "./chains/er-diagram-chain.ts";
import { entityGenerationParser } from "./parsers/entity-generation-parser.ts";
import { erDiagramParser } from "./parsers/er-diagram-parser.ts";
import { generateFile, loadContent } from "./utils/file.utils.ts";

async function generateErDiagram() {
  const content = await loadContent("./data/oas.yml");

  const chain = new ErDiagramChain();
  const result = await chain.call({
    schemas: content,
  });

  const file = await erDiagramParser.parse(result.text);

  generateFile("output", "latex.txt", file.latex);
  generateFile("output", "mermaid.txt", file.mermaidjs);
}

export default generateErDiagram;
