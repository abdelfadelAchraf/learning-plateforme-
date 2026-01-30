import express, { Request, Response } from "express";

import { graphqlHTTP } from "express-graphql";
import { root } from "./graphql/resolvers";
import { schema } from "./graphql/schema";
import cors, { CorsOptions } from "cors";

import dotenv from "dotenv";
import { connectDB } from "./db/connection";
import {
  globalRateLimiter,
  graphqlRateLimiter,
} from "./middleware/ratelimiter";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const allowedOrigins = ["http://localhost:5173"];

const options: CorsOptions = {
  origin: allowedOrigins,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(options));
app.use(express.json());

app.use(globalRateLimiter);

app.set("trust proxy", 1);

//Prevents large payload attacks.
app.use(express.json({ limit: "10kb" }));

// Connect to database
connectDB()
  .then(() => {
    console.log("MongoDB connecté avec succès");
  })
  .catch((error) => {
    console.error("Erreur lors de la connexion MongoDB:", error);
  });

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});
app.use(
  "/graphql",
  graphqlRateLimiter,
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: process.env.NODE_ENV !== "production",
  }),
);
app.listen(port, () => {
  console.log(`Our Server running on http://localhost:${port}/graphql`);
});

export default app;
