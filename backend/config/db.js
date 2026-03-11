/** @format */

import mongoose from "mongoose";

const connectDB = async () => {
  const hasMongoUri = Boolean(process.env.MONGO_URI);
  const hasLegacyCredentials = Boolean(
    process.env.DB_USER && process.env.DB_PASS
  );

  if (!hasMongoUri && !hasLegacyCredentials) {
    throw new Error(
      "Missing MongoDB configuration. Set MONGO_URI or both DB_USER and DB_PASS in .env."
    );
  }

  const mongoUri =
    process.env.MONGO_URI ||
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.jcidy.mongodb.net/passManDemo?retryWrites=true&w=majority`;

  const conn = await mongoose.connect(mongoUri);

  console.log(`MongoDB Connected: ${conn.connection.host}`);
  return conn;
};

export default connectDB;
