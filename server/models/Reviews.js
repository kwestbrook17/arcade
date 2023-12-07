const mongoose = require("mongoose");

const { Schema } = mongoose;

const ReviewSchema = new Schema({
  content: {
    type: String,
    require: true,
    trim: true,
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  product_id: {
    type: Schema.Types.ObjectId,
    ref: "Product",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Reviews = mongoose.model("Reviews", ReviewSchema);

module.exports = Reviews;
