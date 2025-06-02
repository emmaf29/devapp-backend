import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGO_URI!;
const dbName = process.env.MONGO_DB_NAME!;

let client: MongoClient;

const connectToMongo = async () => {
  if (!client) {
    client = new MongoClient(uri);
    await client.connect();
  }
  return client.db(dbName);
};

export default connectToMongo;


/*
REPOSITORY=mongodb
MONGO_URI=mongodb://localhost:27017
MONGO_DB_NAME=mi_base*/
