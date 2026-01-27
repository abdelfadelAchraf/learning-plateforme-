import express, { Request, Response } from "express";

import { graphqlHTTP } from "express-graphql";
import { root } from "./graphql/resolvers";
import { schema } from "./graphql/schema";
import cors , { CorsOptions } from 'cors';

const app = express();
const port = process.env.PORT || 3000;


const allowedOrigins = ['http://localhost:5173'];

const options: CorsOptions = {
  origin: allowedOrigins,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // If your app uses cookies/sessions
  optionsSuccessStatus: 204
};

app.use(cors(options));
app.use(express.json());
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
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
