import express, { Request, Response } from "express";

import { graphqlHTTP } from "express-graphql";
import { root } from "./graphql/resolvers";
import { schema } from "./graphql/schema";


const app = express();
const port = process.env.PORT || 3000;

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
