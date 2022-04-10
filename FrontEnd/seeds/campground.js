const mongoose = require("mongoose");
const Review = require("./review");
const Schema = mongoose.Schema;
const Image = require("./images");

const CampgroundSchema = new Schema({
  title: String,

  location: String,
  city: String,
  state: String,
  country: String,
  geometry: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  price: Number,
  description: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],

  images: [
    {
      type: Schema.Types.ObjectId,
      ref: "Image",
    },
  ],
});

CampgroundSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    await Review.deleteMany({
      _id: {
        $in: doc.reviews,
      },
    });
  }
});
CampgroundSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    await Image.deleteMany({
      _id: {
        $in: doc.images,
      },
    });
  }
});
module.exports = mongoose.model("Campground", CampgroundSchema);
