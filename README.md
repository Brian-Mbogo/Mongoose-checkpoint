# Mongoose Checkpoint

This project implements all Mongoose operations for the GoMyCode checkpoint:

## Features
- Person model with name (required string), age (number), favoriteFoods ([string])
- Database connection with specified options
- Create/Save single person
- Create many people
- Find by name, favoriteFood, _id
- Update favoriteFoods (classic), age by name (findOneAndUpdate)
- Delete by _id (findByIdAndRemove), many by name (remove)
- Chained query: find burritos lovers, sort name, limit 2, exclude age

## Setup
1. Add `MONGO_URI="your_mongodb_atlas_connection_string"` to `.env` (no spaces around =)
2. `npm install`
3. `node server.js` - connects and runs Express server on port 3000

## Tests
Functions exported in `server.js` for testing (e.g., Mocha/Chai).

## Functions
See `server.js` comments. Exported: createAndSavePerson, createManyPeople, etc.


