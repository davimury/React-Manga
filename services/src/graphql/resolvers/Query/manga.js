import Manga from "../../../db/models/Manga";
import "./../../../db/connection";

const mangaResolver = (context, args) => { 
    return Manga.findById(args.id); 
};

export default mangaResolver;
    