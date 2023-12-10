const mongoose = require("mongoose");

const { Schema } = mongoose;

const gameSchema = new mongoose.Schema({
  title: String,
  description: String,
  thumbnail: String,
  fileURL: String,
});

const Game = mongoose.model("Game", gameSchema);

module.exports = Game;
