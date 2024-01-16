

const router = require("express").Router();
const { PlayList, validate } = require("../models/playList");
const { Song } = require("../models/song");
const { User } = require("../models/user");
const auth = require("../middleware/auth");
const validObjectId = require("../middleware/validObjectId");
const joi = require("joi");



// creat playlist
router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });

  const user = await User.findById(req.user._id);
  const playList = await PlayList({ ...req.body, user: user._id }).save();
  user.playList.push(playList._id);
  await user.save();

  res.status(200).send({ data: playList });
});



// edit playlist by id
router.put("/edit/:id", [validObjectId, auth], async (req, res) => {
  const schema = joi.object({
    name: joi.string().required(),
    desc: joi.string().allow(""),
    img: joi.string().allow(""),
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });

  const playList = await PlayList.findById(req.params.id);
  if (!playList) return res.status(404).send({ message: "Playlist not found" });

  const user = await User.findById(req.user._id);
  if (!user._id.equals(playList.user))
    return res.status(403).send({ message: "User don't have access to edit " });
  playList.name = req.body.name;
  playList.desc = req.body.desc;
  playList.img = req.body.img;
  await playList.save();

  res.status(200).send({ message: "Update successfully" });
});



// add song to playlist
router.put("/add-song", auth, async (req, res) => {
  const schema = joi.object({
    playListId: joi.string().required(),
    songId: joi.string().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });

  const user = await User.findById(req.user._id);
  const playList = await PlayList.findById(req.body.playListId);
  if (!user._id.equals(playList.user))
    return res.status(403).send({ message: "User don't have access to add" });

  if (playList.songs.indexOf(req.body.songId) === -1) {
    playList.songs.push(req.body.songId);
  }
  await playList.save();
  res.status(200).send({ data: playList, message: "Added to play list" });
});



// remove song from playlist
router.put("/remove-song", auth, async (req, res) => {
  const schema = joi.object({
    playListId: joi.string().required(),
    songId: joi.string().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });

  const user = await User.findById(req.user._id);
  const playList = await PlayList.findById(req.body.playListId);
  if (!user._id.equals(playList.user))
    return res
      .status(403)
      .send({ message: "User don't have access to remove" });

  const index = playList.songs.indexOf(req.body.songId);
  playList.songs.splice(index, 1);
  await playList.save();
  res.status(200).send({ data: playList, message: "Remove from playlist" });
});


// user favourite playlist
router.get("/favourite", auth, async (req, res) => {
  const user = await User.findById(req.user._id);
  const playlist = await PlayList.find({ _id: user.playList });
  res.status(200).send({ data: playlist });
});



// get random playlist
router.get("/random", auth, async (req, res) => {
  const playList = await PlayList.aggregate([{ $sample: { size: 10 } }]);
  res.status(200).send({ data: playList });
});



// get playlist by id
router.get("/:id", [validObjectId, auth], async (req, res) => {
  const playlist = await PlayList.findById(req.params.id);
  if (!playlist) return res.status(400).send({ message: "not found" });

  const songs = await Song.find({ _id: playlist.songs });
  res.status(200).send({ data: { playlist, songs } });
});


// get all playlist
router.get("/", auth, async (req, res) => {
  const playlists = await PlayList.find();
  res.status(200).send({ data: playlists });
});



// delete playlist by id
router.delete("/:id", [validObjectId, auth], async (req, res) => {
  const user = await User.findById(req.user._id);
  const playlist = await PlayList.findById(req.params.id);
  if (!user._id.equals(playlist.user))
    return res
      .status(403)
      .send({ message: "User don't have access to delete" });
  const index = user.playList.indexOf(req.params.id);
  user.playList.splice(index, 1);
  await user.save();
  await playlist.deleteOne();
  res.status(200).send({ message: "Remove from libary" });
});

module.exports = router;
