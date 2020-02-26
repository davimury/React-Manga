import { gql } from "apollo-server";

const typeDefs = gql`
  enum MangaStatus {
    COMPLETED
    ONGOING
    SUSPENDED
  }

  scalar Date

  type Chapter {
    id: ID!
    images: [ChapterImage!]!
    lastUpdated: Date!
    number: Int
    title: String
  }

  type ChapterImage {
    index: Int!
    url: String!
    width: Int!
    height: Int!
  }

  type Manga {
    id: ID!
    info: MangaInfo!
    image: String
    lastUpdated: Date!
    status: MangaStatus
    title: String!
  }

  type MangaInfo {
    description: String
    chapters: [Chapter!]!
    id: ID!
  }

  type Query {
    chapter(id: ID!): Chapter
    manga(id: ID!): Manga!
    mangas(searchTitle: String): [Manga!]!
  }
`;

export default typeDefs;
