// import { mongoose } from "mongoose";
const mongoose = require("mongoose");
const dbConn = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {});
    console.log("Conectado a mongoDB");
  } catch (error) {
    console.log(error);
    throw new Error("Error en la base de datos");
  }
};

module.exports = {
  dbConn,
};
