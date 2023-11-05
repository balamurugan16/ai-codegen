import { LLMChain } from "langchain/chains";
import { OpenAI } from "langchain/llms/openai";
import { PromptTemplate } from "langchain/prompts";
import { entityGenerationParser } from "../parsers/entity-generation-parser.ts";

export class ErDiagramChain extends LLMChain {
  constructor() {
    const template = `
      `;

    const llm = new OpenAI({
      temperature: 0,
      modelName: "gpt-3.5-turbo",
    });

    const prompt = new PromptTemplate({
      inputVariables: ["schemas", "language", "library"],
      template,
      partialVariables: {
        formatInstructions: entityGenerationParser.getFormatInstructions(),
      },
    });

    super({
      llm,
      prompt,
    });
  }
}
