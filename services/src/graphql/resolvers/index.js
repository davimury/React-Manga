import Chapter from "./Chapter";
import Manga from "./Manga";
import * as Query from "./Query";

const resolvers = {
  MangaStatus: {
    SUSPENDED: 0,
    ONGOING: 1,
    COMPLETED: 2
  },
  Manga,
  Chapter,
  Query
};

export default resolvers;
