const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function authenticate(
  req,
  res,
  next
) {

  const apiKey =
    req.headers["x-api-key"];

  if (!apiKey) {

    return res.status(401).json({
      success:false,
      error:"API key required"
    });

  }

  const key =
    await prisma.apiKey.findUnique({

      where:{
        apiKey
      }

    });

  if (!key) {

    return res.status(401).json({
      success:false,
      error:"Invalid API key"
    });

  }

  if (!key.isActive) {

    return res.status(403).json({
      success:false,
      error:"API key has been disabled"
    });

  }

  next();
}

module.exports = authenticate;