import { ApolloServer } from "apollo-server-express";
import bodyParser from "body-parser";
import express from "express";

// import resolvers from "#root/graphql/resolvers";
import typeDefs from "../graphql/typeDef";

const port = process.env.PORT || 3000;

const apolloserver = new ApolloServer({
    resolvers: {},
    typeDefs
});

const app = express();

apolloserver.applyMiddleware({ app, path: "/graphql" });

app.all("*", (req, res) => {
    res.status(404).json({ status: "Missing endpoint ⛔" });
});

app.listen(port, "0.0.0.0", () => {
    console.log('Services listening in port ' + port)
});