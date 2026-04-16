const express = require("express");
const mongoose = require("mongoose");

// --- Person Schema ---
// Basic schema as per instructions: name (string, required), age (number), favoriteFoods (array of strings)
const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});

const Person = mongoose.model("Person", personSchema);

// --- Create and Save a Record of a Model ---
// Create a document instance using the Person constructor. Pass fields name, age, favoriteFoods.
// Their types must conform to the schema. Then call document.save() with Node callback.
const createAndSavePerson = function(personData, done) {
  const person = new Person(personData);
  person.save(function(err, data) {
    if (err) return done(err);
    done(null, data);
  });
};

// --- Create Many Records with model.create() ---
/*
Sometimes you need to create many instances of your models.
Model.create() takes an array of objects and saves them all.
*/
const createManyPeople = function(arrayOfPeople, done) {
  Person.create(arrayOfPeople, function(err, people) {
    if (err) return done(err);
    done(null, people);
  });
};

// --- Use model.findOne() to Return a Single Matching Document ---
/* Find just one person with a certain food in favorites, using Model.findOne() -> Person */
const findOneByFavFood = function(food, done) {
  Person.findOne({ favoriteFoods: food }, function (err, person) {
    if (err) return done(err);
    done(null, person);
  });
};

// --- Perform Classic Updates by Running Find, Edit, then Save ---
/*
Find person by _id with personId. Add "hamburger" to favoriteFoods (Array.push()).
Inside findById callback, call save() on the updated Person.
Since favoriteFoods is [String], no markModified needed.
*/
const updateFavoriteFoodById = function(personId, done) {
  Person.findById(personId, function(err, person) {
    if (err) return done(err);
    person.favoriteFoods.push("hamburger");
    person.save(function(err, updatedPerson) {
      if (err) return done(err);
      done(null, updatedPerson);
    });
  });
};

// --- Perform New Updates on a Document Using model.findOneAndUpdate() ---
/*
Find person by name (personName) and set age to 20.
Pass { new: true } as 3rd arg to return updated document.
*/
const findOneAndUpdateAgeByName = function(personName, done) {
  Person.findOneAndUpdate(
    { name: personName }, 
    { $set: { age: 20 } }, 
    { new: true },
    function(err, updatedPerson) {
      if (err) return done(err);
      done(null, updatedPerson);
    }
  );
};

// --- Delete One Document Using model.findByIdAndRemove ---
/*
Delete the person by _id using findByIdAndRemove(personId).
Passes the removed document to callback.
*/
const deleteOnePersonById = function(personId, done) {
  Person.findByIdAndRemove(personId, function(err, removedPerson) {
    if (err) return done(err);
    done(null, removedPerson);
  });
};

// --- MongoDB and Mongoose - Delete Many Documents with model.remove() ---
/*
Delete all people whose name matches personName ("Mary").
Model.remove() returns JSON with n (affected count), not documents.
*/
const removeManyPeople = function(personName, done) {
  Person.remove({ name: personName }, function(err, result) {
    if (err) return done(err);
    done(null, result);
  });
};

// --- Chain Search Query Helpers to Narrow Search Results ---
/*
Find people who like "burritos". Sort by name, limit to 2, hide age.
Chain .find().sort().limit().select().exec(done).
*/
const findEditQuery = function(done) {
  Person.find({ favoriteFoods: "burritos" })
    .sort("name")
    .limit(2)
    .select("-age")
    .exec(function(err, people) {
      if (err) return done(err);
      done(null, people);
    });
};

// --- Use model.findById() to Search Your Database By _id ---
/* Find the person having a given _id, using Model.findById() -> Person */
const findPersonById = function(personId, done) {
  Person.findById(personId, function (err, person) {
    if (err) return done(err);
    done(null, person);
  });
};

// --- Use model.find() to Search Your Database ---
/* Find all the people having a given name, using Model.find() -> [Person] */
const findPeopleByName = function(name, done) {
  Person.find({ name: name }, function (err, people) {
    if (err) return done(err);
    done(null, people);
  });
};
// --- Export all functions for use in tests ---
module.exports = {
  createAndSavePerson,
  createManyPeople,
  findPeopleByName,
  findOneByFavFood,
  findPersonById,
  updateFavoriteFoodById,
  findOneAndUpdateAgeByName,
  deleteOnePersonById,
  removeManyPeople,
  findEditQuery
};

require("dotenv").config();

const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
  if (err) console.log(err);
  else console.log("MongoDB connected");
});

app.get("/", (req, res) => {
  res.send("API running");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});