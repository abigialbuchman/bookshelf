const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
// const _ = require('underscore');

let ShelfModel = {};

const convertId = mongoose.Types.ObjectId;
// const setName = (name) => _.escape(name).trim();

const ShelfSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  genre: {
    type: String,
    required: true,
    trim: true,
  },
  review: {
    type: String,
    required: true,
    trim: true,
  },
  pageNumber: {
    type: Number,
    min: 0,
    required: true,
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Account',
  },
  createData: {
    type: Date,
    default: Date.now,
  },
});

ShelfSchema.statics.toAPI = (doc) => ({
  title: doc.title,
  genre: doc.genre,
  review: doc.review,
  pageNumber: doc.pageNumber,
});

ShelfSchema.statics.findByOwner = (ownerID, callback) => {
  const search = {
    owner: convertId(ownerID),
  };

  return ShelfModel.find(search).select('title genre review pageNumber').lean().exec(callback);
};

ShelfModel = mongoose.model('Shelf', ShelfSchema);

module.exports.ShelfModel = ShelfModel;
module.exports.ShelfSchema = ShelfSchema;
