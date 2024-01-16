const mongoose = require("mongoose");
const joi = require("joi");

const songSchema = new mongoose.Schema({
  name: { type: String, required: true },
  artist: { type: String, required: true },
  song: { type: String, required: true },
  img: { type: String, required: true },
  duration: { type: String, required: true },
});

const validate = (songs) => {
  const schema = joi.object({
    name: joi.string().required(),
    artist: joi.string().required(),
    song: joi.string().required(),
    img: joi.string().required(), 
    duration: joi.string().required(),
  });
  return schema.validate(songs);
};


const Song = mongoose.model("song", songSchema);

module.exports = { Song, validate };
