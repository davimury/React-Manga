import axios from "axios";
import "dotenv/config";
import cron from "node-cron";

import "./db/connection";
import Manga from "./db/models/Manga";

const axiosME = axios.create({
  baseURL: process.env.MANGAEDEN_URL
});

const transformMangeEden = manga =>
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

const seed = async () => {
  const res = await axiosME.get();
  const mangas = transformMangeEden(res.data.manga);
  console.log('mangas back, got ' + mangas.length);

  await Manga.insertMany(mangas);

  console.log("seeded");
};

seed();

//cron.schedule("0 * * * *", () => {
//  console.log("running a task every second");
//});
