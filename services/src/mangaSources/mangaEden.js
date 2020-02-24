import globalAxios from "axios";

var mangaEden = "https://www.mangaeden.com/api/";
export const axios = globalAxios.create({
  baseURL: mangaEden
});

const transformChapthers = chapters =>
  chapters.map(([number, lastUpdated, title, id]) => ({
    id,
    lastUpdated,
    number: parseInt(number),
    title
  }));

const transformMangas = manga =>
  manga
    .filter(manga => manga.ld)
    .map(
      ({
        a: alias,
        c: categories,
        h: hits,
        i: _id,
        im: image,
        ld: lastUpdated,
        s: status,
        t: title
      }) => ({
        _id,
        alias,
        categories,
        hits,
        image,
        lastUpdated,
        status,
        title
      })
    );

export const fetchAllMangas = lang => {
  const langKey = { en: 0 }[lang];
  return axios.get("list/" + langKey).then(res => {
    res.data.manga = transformMangas(res.data.manga);
    return res;
  });
};

export const fetchMangaInfo = ({ mangaId }) => {
  return axios.get("manga/" + mangaId + "/").then(res => {
    res.data.chapters = transformChapthers(
      res.data.chapters
    );
    return res;
  });
};
