// getting-started.js
import mongoose from "mongoose";
main().catch((err) => console.log(err));

async function main() {
  try {
    await mongoose.connect("mongodb://localhost:27017/vgmart");
    console.log("db connected");
  } catch (err) {
    console.log(err);
  }

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
