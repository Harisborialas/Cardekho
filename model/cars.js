import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  color: String,
  model: String,
  make: String,
  registrationNo: String,
});

const Car = mongoose.model("Cars", categorySchema);

export default Car;
