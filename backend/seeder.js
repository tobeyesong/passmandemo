/** @format */

import dotenv from "dotenv";
import Password from "./models/passwordModel.js";
import Note from "./models/noteModel.js";
import connectDB from "./config/db.js";
import { availableSeedModes, createSeedData } from "./data/seedFactory.js";

dotenv.config();

connectDB();

const arg = process.argv[2];
const requestedMode = availableSeedModes.includes(arg) ? arg : "demo";

const importData = async () => {
  try {
    await Password.deleteMany();
    await Note.deleteMany();

    const { passwords, notes } = createSeedData(requestedMode);

    await Password.insertMany(passwords);
    await Note.insertMany(notes);

    console.log(
      `data imported (${requestedMode} mode: ${passwords.length} passwords, ${notes.length} notes)`
    );
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Password.deleteMany();
    await Note.deleteMany();

    console.log("data DESTROYED");
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

if (arg === "-d") {
  destroyData();
} else {
  importData();
}
