import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { GithubRepoLoader } from "langchain/document_loaders/web/github";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { PoolConfig } from "pg";
import {
  PGVectorStore,
  PGVectorStoreArgs,
} from "langchain/vectorstores/pgvector";
import * as dotenv from "dotenv";

async function main() {
  const loader = new GithubRepoLoader(
    "https://github.com/BalamuruganD-Hexaware/reactTailwind",
    {
      branch: "master",
      recursive: true,
      unknown: "warn",
      maxConcurrency: 5,
    }
  );

  const docs = await loader.load();
  const textSplitter = new RecursiveCharacterTextSplitter({
    separators: ["\n"],
    chunkSize: 500,
    chunkOverlap: 0,
  });
  const texts = await textSplitter.splitDocuments(docs);
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

  PGVectorStore.fromDocuments(texts, embeddings, config).then(() => {
    console.log("database loaded successfully");
  });
}

dotenv.config();
main();
