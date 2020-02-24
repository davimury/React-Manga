var mongoose = require('mongoose');
mongoose.set('debug', true);

var schema = new mongoose.Schema({
    alias: String,
    categories: [String],
    hits: Number,
    image: String,
    lastUpdated: Number,
    status: Number,
    title: String
});

var Manga = mongoose.model('Manga', schema);

module.exports = Manga;