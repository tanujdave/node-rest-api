import mongoose from "mongoose";

const BookSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: [true],
  },
  author: {
    type: String,
    required: [true, "Please enter author name"],
  },
  title: {
    type: String,
    required: [true, "Please enter title"],
  },
  isbn: {
    type: String,
    required: [true, "Please enter ISBN"],
    index: true,
  },
  releaseDate: {
    type: Date,
  },
});

export default mongoose.model("Book", BookSchema);
