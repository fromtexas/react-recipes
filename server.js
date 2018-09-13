const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config({ path: "variables.env" });
const bodyParser = require("body-parser");

const Recipe = require("./models/Recipe");
const User = require("./models/User");

// graphql middleware
const { graphiqlExpress, graphqlExpress } = require("apollo-server-express");
const { makeExecutableSchema } = require("graphql-tools");

const { typeDefs } = require("./schema");
const { resolvers } = require("./resolvers");

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

const PORT = process.env.PORT || 4444;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("db connected"))
  .catch(err => console.error(err));

app.use("/graphiql", graphiqlExpress({ endpointURL: "/graphql" }));
app.use(
  "/graphql",
  graphqlExpress({
    schema,
    context: {
      Recipe,
      User
    }
  })
);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
