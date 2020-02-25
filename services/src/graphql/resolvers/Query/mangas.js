import Manga from "../../../db/models/Manga";
import "./../../../db/connection";

const mangasResolver = (context, args) => {
  if (args.searchTitle) {
    return Manga.find({
      title: new RegExp(args.searchTitle, "i")
    }).sort({ hits: -1 });
  } else {
    return Manga.find({}).sort({ lastUpdated: -1 });
  }
};

export default mangasResolver;
