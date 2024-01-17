import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import {
  PGVectorStore,
  PGVectorStoreArgs,
} from "langchain/vectorstores/pgvector";
import { PoolConfig } from "pg";
import { RetrievalQAChain } from "langchain/chains";
import { OpenAIChat } from "langchain/llms/openai";
import { generateFile } from "./utils/file.utils.js";

async function reverseEngineering() {
  const embeddings = new OpenAIEmbeddings();

  const config = {
    postgresConnectionOptions: {
      type: "postgres",
      host: "127.0.0.1",
      port: 5432,
      user: "testuser",
      password: "testpwd",
      database: "vectordb",
    } as PoolConfig,
    tableName: "reacttailwind",
    columns: {
      idColumnName: "id",
      vectorColumnName: "vector",
      contentColumnName: "content",
      metadataColumnName: "metadata",
    },
  } as PGVectorStoreArgs;

  const db = await PGVectorStore.initialize(embeddings, config);

  const llm = new OpenAIChat();
  const chain = RetrievalQAChain.fromLLM(llm, db.asRetriever());
  const query = "can you explain me the Home.tsx file?";
  const answer = await db.similaritySearch(query);
  console.log(answer);
  const result = await chain.invoke({
    query,
  });

  await generateFile("output", "result.md", result.text);
  console.log(result.text);
}

export default reverseEngineering;
