import Manga from "../../../db/models/Manga";
import "./../../../db/connection";

const mangasResolver = () => { 
    return Manga.find({}).sort({ lastUpdated: -1 }); 
};

export default mangasResolver;
    