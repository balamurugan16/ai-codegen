import { ErDiagramChain } from "./chains/er-diagram-chain.js";
import { erDiagramParser } from "./parsers/er-diagram-parser.js";
import { generateFile, loadContent } from "./utils/file.utils.js";

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
