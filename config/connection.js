require("dotenv").config();
const mongoose = require("mongoose");
const { getSecret } = require("./keyvault");

async function putKeyVaultSecretInEnvVar() {

    const secretName = process.env.KEY_VAULT_SECRET_NAME_DATABASE_URL;
    const keyVaultName = process.env.KEY_VAULT_NAME;

    console.log(secretName);
    console.log(keyVaultName);
    
    if (!secretName || !keyVaultName) throw Error("getSecret: Required params missing");

    connectionString = await getSecret(secretName, keyVaultName);
    process.env.DATABASE_URL = connectionString;

}

async function getConnectionInfo() {
  console.log(`db url (${process.env.DATABASE_URL})`)
  if (!process.env.DATABASE_URL) {

    await putKeyVaultSecretInEnvVar();

    // still don't have a database url?
    if(!process.env.DATABASE_URL){
      throw new Error("No value in DATABASE_URL in env var");
    }
  }

  // To override the database name, set the DATABASE_NAME environment variable in the .env file
  const DATABASE_NAME = process.env.DATABASE_NAME || "azure-todo-app";

  return {
   // DATABASE_URL: process.env.DATABASE_URL,
    DATABASE_NAME: process.env.DATABASE_NAME,
    DATABASE_URL: "mongodb://marcinek3-server:tOp8OqXyFBqOSJZfCrqohjiXZHa3TMjjPILYyCVVgYZP7h7xK9qDXJBJgAPtz9GKoMpxPjO4zcIfACDbsM1xTA==@marcinek3-server.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@marcinek3-server@"
    
  }
}


module.exports = {
  getConnectionInfo
}
