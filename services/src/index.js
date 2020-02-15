import "dotenv/config";

import "./db/connection"
import "./server";

import Manga from "./db/models/Manga";

const manga = new Manga({
        _id: "5e126eaa719a16695517b6ac", 
        alias: "love-round", 
        categories: [], 
        hits: 0, 
        image: null, 
        status: 1, 
        title: "Love Round!!" 
});

manga.save(function (err,manga){
    if (err) return console.error(err);
    console.log("saved");
})