/** @format */

import asyncHandler from "express-async-handler";
import Password from "../models/passwordModel.js";

// Importing the necessary library
import algoliasearch from "algoliasearch";

// Your Algolia setup
const searchClient = algoliasearch(
  "BC38Z1AKHU",
  "802e2ce9797af17219da6526ac4502ba"
);
const passwordIndex = searchClient.initIndex("passwordDemo");

// Fetch all passwords
// GET /api/passwords
// private
const getPasswords = asyncHandler(async (req, res) => {
  const passwords = await Password.find({});
  res.json(passwords);
});

// Fetch single password
// GET /api/password/:id
// private

const getPasswordById = asyncHandler(async (req, res) => {
  const password = await Password.findById(req.params.id);
  if (password) {
    res.json(password);
  } else {
    res.status(404);
    throw new Error("Password not found by GET.");
  }
});

// @desc     Create a passwords
// @route    POST api/passwords
// @access   Public

const createPassword = asyncHandler(async (req, res) => {
  const newPassword = new Password({
    url: req.body.url,
    username: req.body.username,
    sitePassword: req.body.sitePassword,
    notes: req.body.notes,
  });

  const createdPassword = await newPassword.save();
  res.status(201).json(createdPassword);
});

// @route   PUT /api/password/:id
// @access  Private/Admin
const updatePassword = asyncHandler(async (req, res) => {
  const { url, username, sitePassword, notes } = req.body.values || req.body;

  const password = await Password.findById(req.params.id);
  if (password) {
    password.username = username;
    password.url = url;
    password.sitePassword = sitePassword;
    password.notes = notes;
    const updatedPassword = await password.save();

    // Update the password in the Algolia index
    await passwordIndex.partialUpdateObject({
      objectID: updatedPassword._id.toString(),
      url: updatedPassword.url,
      username: updatedPassword.username,
      sitePassword: updatedPassword.sitePassword,
      notes: updatedPassword.notes,
    });

    res.json(updatedPassword);
  } else {
    res.status(404);
    throw new Error("Password not found by UPDATE.");
  }
});

// @desc    Delete a password
// @route   DELETE /api/password/:id
// @access
const deletePassword = asyncHandler(async (req, res) => {
  const password = await Password.findById(req.params.id);
  if (password) {
    await password.deleteOne();

    // Delete the corresponding index from Algolia
    try {
      await passwordIndex.deleteObject(req.params.id);
      res.json({ message: "Password and corresponding Algolia index removed" });
    } catch (algoliaError) {
      res.status(500).json({
        message: "Password removed, but failed to delete Algolia index",
        error: algoliaError.message,
      });
    }
  } else {
    res.status(404);
    throw new Error("Password not found by DELETE.");
  }
});

export {
  getPasswords,
  getPasswordById,
  deletePassword,
  createPassword,
  updatePassword,
};
