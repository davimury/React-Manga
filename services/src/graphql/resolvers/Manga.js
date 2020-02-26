import { fetchMangaInfo } from "./../../mangaSources/mangaEden";

const Manga = {
  id: mangaObj => mangaObj._id,
  info: async mangaObj => {
    const res = await fetchMangaInfo({
      mangaId: mangaObj.id
    });

    return {
      description: res.data.description,
      chapters: res.data.chapters,
      id: mangaObj.id
    };
  },
  lastUpdated: mangaObj =>
    new Date(mangaObj.lastUpdated * 1000)
};

export default Manga;
