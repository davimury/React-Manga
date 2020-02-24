const { gql } = require('apollo-server');

const typeDefs = gql`
  scalar Date

  type Manga {
    id: ID!
    image: String
    lastUpdated: Date!
    title: String!
  }

  type Query {
    mangas: [Manga!]!
  }
`;

module.exports = typeDefs;