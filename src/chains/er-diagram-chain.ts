import { LLMChain } from "langchain/chains";
import { OpenAI } from "langchain/llms/openai";
import { PromptTemplate } from "langchain/prompts";
import { erDiagramParser } from "../parsers/er-diagram-parser.js";

export class ErDiagramChain extends LLMChain {
  constructor() {
    const template = `
    You will be provided an OpenAPI Specification specifically the components/schemas section of the specification.

    The Schemas are:
    {schemas}
    
    Your responsibilities are:
    1. You have to generate ER diagram for the provided schemas.
    2. You have to provide the format in 2 forms (LaTex and MermaidJS)
    3. In both formats establish the type of relationship that 2 entities are having.
    4. Also you will have to show the entity name and the fields associated with it.
    5. The output format should be in a JSON format with 2 properties, latex and mermaidjs with the necessary code with proper indendations and syntax
    
    Also make sure you don't make any syntax error.
    /n{formatInstructions}
      `;

    const llm = new OpenAI({
      temperature: 0,
      modelName: "gpt-3.5-turbo",
    });

    const prompt = new PromptTemplate({
      inputVariables: ["schemas"],
      template,
      partialVariables: {
        formatInstructions: erDiagramParser.getFormatInstructions(),
      },
    });

    super({
      llm,
      prompt,
    });
  }
}
