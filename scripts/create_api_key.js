const { PrismaClient } = require("@prisma/client");
const crypto = require("crypto");

const prisma = new PrismaClient();

async function main() {

  const apiKey =
    "ak_" +
    crypto.randomBytes(16).toString("hex");

  const key = await prisma.apiKey.create({

    data: {
      name: "Development Key",
      apiKey
    }

  });

  console.log(key);
}

main();