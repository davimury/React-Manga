import globalAxios from "axios";

const IMAGES_CDN_BASE =
  "https://cdn.mangaeden.com/mangasimg/";
const MANGA_EDEN_URL = "https://www.mangaeden.com/api/";

export const axios = globalAxios.create({
  baseURL: MANGA_EDEN_URL
});

const transformChapthers = chapters =>
  chapters.map(([number, lastUpdated, title, id]) => ({
    id,
    lastUpdated,
    number: parseInt(number),
    title
  }));

const transformImages = images =>
  images.map(([index, url, width, height]) => ({
    index,
    url: IMAGES_CDN_BASE + url,
    width,
    height
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
        image: IMAGES_CDN_BASE + image,
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

export const fetchChapterImages = ({ chapterId }) => {
  return axios
    .get("chapter/" + chapterId + "/")
    .then(res => {
      res.data.images = transformImages(res.data.images);
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
