import mongoose from "mongoose";
import "dotenv/config";

mongoose.connect('mongodb://localhost:3999/react-manga', {
    useNewUrlParser: true, 
    useUnifiedTopology: true
});

