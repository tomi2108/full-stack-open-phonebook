require("dotenv").config();

const mongoose = require("mongoose");
const url = process.env.MONGODB_URI;

console.log("connecting to MongoDb...");

mongoose
  .connect(url)
  .then(() => console.log("Connected to MongoDb"))
  .catch((err) => console.log("Error connecting to MongoDb:", err));

const entrySchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 3 },
  number: { type: String, required: true, minlength: 8, validate: { validator: (v) => /^\d\d\d?-\d*$/.test(v) } },
});
entrySchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});
module.exports = mongoose.model("Entry", entrySchema);
