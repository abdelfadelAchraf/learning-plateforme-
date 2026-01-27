import express, { Request, Response } from "express";

import { graphqlHTTP } from "express-graphql";
import { root } from "./graphql/resolvers";
import { schema } from "./graphql/schema";
import cors, { CorsOptions } from "cors";

import dotenv from "dotenv";
import { connectDB } from "./db/connection";

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

// Connect to database
connectDB().then(() => {
  console.log('MongoDB connecté avec succès');
}).catch((error) => {
  console.error('Erreur lors de la connexion MongoDB:', error);
});

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true,
  }),
);
app.listen(port, () => {
  console.log(`Our Server running on http://localhost:${port}/graphql`);
});

export default app;
