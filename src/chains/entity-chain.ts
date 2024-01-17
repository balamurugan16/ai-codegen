import { LLMChain } from "langchain/chains";
import { OpenAI } from "langchain/llms/openai";
import { PromptTemplate } from "langchain/prompts";
import { entityGenerationParser } from "../parsers/entity-generation-parser.js";

export class EntityGenerationChain extends LLMChain {
  constructor() {
    const template = `
  You will be provided an OpenAPI Specification, You are required to generate code to create database entities for {language} using {library} using the provided OpenAPI Specifications.
  
  Your Open API Specification will be
  {schemas}
  
  You should also check the following points:
  1. Identify the Schemas and map the datatypes to the appropriate {language} datatypes
  2. Implement Relationships if Another entity is referred as type according to the cardinality.
  3. Add the necessary import statements for each file
  4. The output format should be in JSON format with an array of objects with a filename and the content of the file.
  5. For each file the Name of the class should be the name of the file in the respective casing that the language abides by.
  6. Make sure the content property is a single line string with proper indentations and new line characters.
  
  /n{formatInstructions}
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
