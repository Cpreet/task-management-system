import { MongoClient } from "mongodb";

const uri = "mongodb+srv://" +
  "cluster0.6sypb.mongodb.net/" +
  "?authMechanism=MONGODB-X509" +
  "&authSource=%24external" +
  "&tls=true&tlsCertificateKeyFile=%2Fhome%2Fcharanpreet%2FDownloads%2FX509-cert-5244912522725863036.pem"

export const dbClient = new MongoClient(uri);
const db = dbClient.db("task_master")

export default db;
