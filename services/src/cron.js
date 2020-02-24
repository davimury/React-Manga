import axios from "axios";
import "dotenv/config";
import cron from "node-cron";

import "./db/connection";
import Manga from "./db/models/Manga";
import { fetchAllMangas } from "./mangaSources/mangaEden";

const seed = async () => {
  const res = await fetchAllMangas("en");
  const mangas = transformMangeEden(res.data.manga);

  console.log('mangas back, got ' + mangas.length);

  await Manga.insertMany(mangas);

  console.log("seeded");
};

seed();

//cron.schedule("0 * * * *", () => {
//  console.log("running a task every second");
//});
