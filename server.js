const express = require("express");
const { PrismaClient } = require("@prisma/client");
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const helmet = require("helmet");
const cors = require("cors");
const compression = require("compression");
const rateLimit = require("express-rate-limit");
const authenticate = require("./middleware/auth");
const authRoutes = require("./auth/authRoutes");

const prisma = new PrismaClient();
const app = express();

const apiLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 100,
  keyGenerator: (req) => {
    return req.headers["x-api-key"];
  },
  handler: (req, res) => {
    res.status(429).json({
      success: false,
      error: "Rate limit exceeded",
      limit: 100,
      retryAfter: "1 hour"
    });
  }
});

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200
});

app.use(limiter);
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(compression());

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 1000 // limit each IP to 1000 requests per windowMs
  })
);

// Swagger setup
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'MDDS Address API',
      version: '1.0.0',
      description: 'API for searching Indian addresses from the MDDS dataset',
    },
    servers: [
      {
        url: 'http://localhost:3000/api/v1',
      },
    ],
  },
  apis: ['./server.js'], // Path to the API docs
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

if (process.env.NODE_ENV === "production") {
    app.use("/api/v1", authenticate, apiLimiter);
}

// Auth Routes
app.use("/api/auth", authRoutes);

async function verifyApiKey(req, res, next) {

    const apiKey = req.headers["x-api-key"];

    if (!apiKey) {
        return res.status(401).json({
            success: false,
            error: "API key required"
        });
    }

    const key = await prisma.apiKey.findUnique({
        where: {
            apiKey
        }
    });

    if (!key || !key.isActive) {
        return res.status(403).json({
            success: false,
            error: "Invalid API key"
        });
    }

    await prisma.apiUsage.create({
      data: {
        apiKey: key.apiKey,
        endpoint: req.originalUrl
      }
    });

    next();
}

/**
 * @swagger
 * /:
 *   get:
 *     summary: API status check
 *     description: Returns a message indicating the API is running.
 *     responses:
 *       200:
 *         description: API is running.
 */
app.get("/", (req, res) => {
    res.send("MDDS Address API Running");
});

app.get("/health", async (req, res) => {

    const villages = await prisma.village.count();

    res.json({
        status:"healthy",
        database:"connected",
        villages
    });

});

app.get("/villages", async (req, res) => {

    const villages = await prisma.village.findMany({
        take: 20
    });

    res.json(villages);
});

/**
 * @swagger
 * /api/v1/search:
 *   get:
 *     summary: Search for a village
 *     description: Searches for villages by name. Requires a query parameter `q`.
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         description: The search query for the village name.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of matching villages with their full address hierarchy.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   code:
 *                     type: string
 *                   village:
 *                     type: string
 *                   subDistrict:
 *                     type: string
 *                   district:
 *                     type: string
 *                   state:
 *                     type: string
 */
app.get("/api/v1/search", async (req, res) => {

    const q = req.query.q || "";

    await prisma.searchLog.create({
      data: {
        query: q
      }
    });

    if (q.length < 2) {
        return res.json([]);
    }

    const villages = await prisma.village.findMany({
        where: {
            name: {
                contains: q,
                mode: "insensitive"
            }
        },
        include: {
            subDistrict: {
                include: {
                    district: {
                        include: {
                            state: true
                        }
                    }
                }
            }
        },
        take: 20
    });

    const result = villages.map((v) => ({
        code: v.code,
        village: v.name,
        subDistrict: v.subDistrict.name,
        subDistrictCode: v.subDistrict.code,
        district: v.subDistrict.district.name,
        districtCode: v.subDistrict.district.code,
        state: v.subDistrict.district.state.name,
        stateCode: v.subDistrict.district.state.code,
    }));

    res.json(result);
});

/**
 * @swagger
 * /stats:
 *   get:
 *     summary: Get database statistics
 *     description: Returns the total count of states, districts, sub-districts, and villages in the database.
 *     responses:
 *       200:
 *         description: Database statistics.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 states:
 *                   type: integer
 *                 districts:
 *                   type: integer
 *                 subDistricts:
 *                   type: integer
 *                 villages:
 *                   type: integer
 */
app.get("/stats", async (req, res) => {
  try {
    const states = await prisma.state.count();
    const districts = await prisma.district.count();
    const subDistricts = await prisma.subDistrict.count();
    const villages = await prisma.village.count();

    res.json({
      states,
      districts,
      subDistricts,
      villages
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to load statistics"
    });
  }
});

app.get("/analytics", async (req, res) => {
  try {

    const totalSearches =
      await prisma.searchLog.count();

    const uniqueQueries =
      await prisma.searchLog.groupBy({
        by: ["query"]
      });

    const topSearches =
      await prisma.searchLog.groupBy({
        by: ["query"],
        _count: {
          query: true
        },
        orderBy: {
          _count: {
            query: "desc"
          }
        },
        take: 10
      });

    const recentSearches =
      await prisma.searchLog.findMany({
        orderBy: {
          id: "desc"
        },
        take: 10
      });

    res.json({
      totalSearches,
      uniqueQueries: uniqueQueries.length,
      topSearches,
      recentSearches
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: "Analytics failed"
    });

  }
});

app.delete("/analytics", async (req, res) => {
  try {
    await prisma.searchLog.deleteMany();
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to clear analytics" });
  }
});

app.get("/usage", async (req, res) => {

  const totalRequests =
    await prisma.apiUsage.count();

  const topEndpoints =
    await prisma.apiUsage.groupBy({
      by: ["endpoint"],
      _count: true
    });

  const topApiKeys =
    await prisma.apiUsage.groupBy({
      by: ["apiKey"],
      _count: true
    });

  res.json({
    totalRequests,
    topEndpoints,
    topApiKeys
  });

});

/**
 * @swagger
 * /api/v1/states:
 *   get:
 *     summary: Retrieve a list of all states
 *     description: Retrieve a list of all states in India, sorted alphabetically.
 *     responses:
 *       200:
 *         description: A list of states.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   code:
 *                     type: string
 *                   name:
 *                     type: string
 */
app.get(
  "/api/v1/states",
  verifyApiKey,
  async (req, res) => {

    const states = await prisma.state.findMany({
        orderBy: {
            name: "asc"
        }
    });

    res.json(states);
});

/**
 * @swagger
 * /api/v1/districts/{stateCode}:
 *   get:
 *     summary: Retrieve a list of districts for a given state
 *     description: Retrieve a list of districts for a given state code.
 *     parameters:
 *       - in: path
 *         name: stateCode
 *         required: true
 *         description: The code of the state to retrieve districts for.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of districts.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   code:
 *                     type: string
 *                   district:
 *                     type: string
 */
app.get("/api/v1/districts/:stateCode", async (req, res) => {

    const districts = await prisma.district.findMany({
        where: {
            state: {
                code: req.params.stateCode
            }
        },
        orderBy: {
            name: "asc"
        }
    });

    const result = districts.map(d => ({
        code: d.code,
        district: d.name
    }));

    res.json(result);
});

/**
 * @swagger
 * /api/v1/subdistricts/{districtCode}:
 *   get:
 *     summary: Retrieve a list of sub-districts for a given district
 *     description: Retrieve a list of sub-districts for a given district code.
 *     parameters:
 *       - in: path
 *         name: districtCode
 *         required: true
 *         description: The code of the district to retrieve sub-districts for.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of sub-districts.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   code:
 *                     type: string
 *                   subDistrict:
 *                     type: string
 */
app.get("/api/v1/subdistricts/:districtCode", async (req, res) => {

    const subdistricts = await prisma.subDistrict.findMany({
        where: {
            district: {
                code: req.params.districtCode
            }
        },
        orderBy: {
            name: "asc"
        }
    });

    res.json(
        subdistricts.map(s => ({
            code: s.code,
            subDistrict: s.name
        }))
    );
});

/**
 * @swagger
 * /api/v1/villages/{subdistrictCode}:
 *   get:
 *     summary: Retrieve a list of villages for a given sub-district
 *     description: Retrieve a list of villages for a given sub-district code. Returns a maximum of 100 villages.
 *     parameters:
 *       - in: path
 *         name: subdistrictCode
 *         required: true
 *         description: The code of the sub-district to retrieve villages for.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of villages.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   code:
 *                     type: string
 *                   village:
 *                     type: string
 */
app.get("/api/v1/villages/:subdistrictCode", async (req, res) => {

    const villages = await prisma.village.findMany({
        where: {
            subDistrict: {
                code: req.params.subdistrictCode
            }
        },
        take: 100
    });

    res.json(
        villages.map(v => ({
            code: v.code,
            village: v.name
        }))
    );
});

/**
 * @swagger
 * /api/v1/village/{code}:
 *   get:
 *     summary: Retrieve full details for a specific village
 *     description: Retrieve the full address hierarchy (village, sub-district, district, state) for a given village code.
 *     parameters:
 *       - in: path
 *         name: code
 *         required: true
 *         description: The code of the village to retrieve details for.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The full address details of the village.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: string
 *                 village:
 *                   type: string
 *                 subDistrict:
 *                   type: string
 *                 district:
 *                   type: string
 *                 state:
 *                   type: string
 *       404:
 *         description: Village not found.
 */
app.get("/api/v1/village/:code", async (req, res) => {

    const village = await prisma.village.findUnique({
        where: {
            code: req.params.code
        },
        include: {
            subDistrict: {
                include: {
                    district: {
                        include: {
                            state: true
                        }
                    }
                }
            }
        }
    });

    if (!village) {
        return res.status(404).json({
            message: "Village not found"
        });
    }

    res.json({
        code: village.code,
        village: village.name,
        subDistrict: village.subDistrict.name,
        district: village.subDistrict.district.name,
        state: village.subDistrict.district.state.name
    });
});

app.use((err, req, res, next) => {

    console.error(err);

    res.status(500).json({
        success:false,
        error:err.message
    });

});
console.log("NODE_ENV =", process.env.NODE_ENV);
app.listen(3000, () => {
    console.log("Server running on port 3000");
});
