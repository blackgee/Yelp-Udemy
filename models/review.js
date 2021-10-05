const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema ({
  body: String,
  rating: Number
});

// reviewSchema.post("findOneAndDelete", async function() {
//   console.log("delted")
// });

module.exports = mongoose.model("Review", reviewSchema);
