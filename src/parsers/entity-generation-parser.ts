import { StructuredOutputParser } from "langchain/output_parsers";
import { z } from "zod";

const schema = z
  .array(
    z.object({
      filename: z.string().describe("Name of the entity file"),
      content: z.string().describe("Content of the file"),
    })
  )
  .describe("An array of code files with filenames and content of the file");

export type EntityGeneratorParserType = z.infer<typeof schema>;

export const entityGenerationParser =
  StructuredOutputParser.fromZodSchema(schema);
