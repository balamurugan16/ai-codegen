import { StructuredOutputParser } from "langchain/output_parsers";
import { z } from "zod";

const schema = z
  .object({
    latex: z.string().describe("ER Diagram in LaTex format"),
    mermaidjs: z.string().describe("ER Diagram in Mermaid JS format"),
  })
  .describe("An object containing both the LaTex code and MermaidJS code");

export type ErDiagramParser = z.infer<typeof schema>;

export const erDiagramParser = StructuredOutputParser.fromZodSchema(schema);
