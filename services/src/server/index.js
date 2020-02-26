import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import express from "express";

import resolvers from "../graphql/resolvers/index";
import typeDefs from "../graphql/typeDef";

const port = 3000;

const apolloserver = new ApolloServer({
  resolvers,
  typeDefs
});

const app = express();

app.use(
  cors({
    origin: (origin, cb) => cb(null, true),
    credentials: true
  })
);

apolloserver.applyMiddleware({
  app,
  cors: false,
  path: "/graphql"
});

app.all("*", (req, res) => {
  res.status(404).json({ status: "Missing endpoint ⛔" });
});

app.listen(port, "0.0.0.0", () => {
  console.log("Services listening in port " + port);
});
