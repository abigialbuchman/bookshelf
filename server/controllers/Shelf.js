const models = require('../models');

const { Shelf } = models;

// this will be where the Shelf are actually held
const makerPage = (req, res) => {
  Shelf.ShelfModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred' });
    }
    return res.render('app', { csrfToken: req.csrfToken(), Shelf: docs });
  });
};

const addToShelf = (req, res) => {
  console.log('Shelf added');
  if (!req.body.title || !req.body.genre || !req.body.review || !req.body.pageNumber) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // find by title to see if the Shelf already exists
  // if so, just add the review

  const shelfData = {
    title: req.body.title,
    genre: req.body.genre,
    review: req.body.review,
    pageNumber: req.body.pageNumber,
    owner: req.session.account._id,
  };

  const newShelf = new Shelf.ShelfModel(shelfData);

  const shelfPromise = newShelf.save();

  shelfPromise.then(() => res.json({ redirect: '/shelf' }));

  shelfPromise.catch((err) => {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Book already in your shelf' });
    }

    return res.status(400).json({ error: 'An error occurred.' });
  });

  // controllers.Books.add(req, res);

  return shelfPromise;
};

const getShelf = (request, response) => {
  console.log('Getting Shelf');
  const req = request;
  const res = response;

  return Shelf.ShelfModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred' });
    }

    return res.json({ shelf: docs });
  });
};

const getAllBooks = (request, response) => {
  console.log('getting all books');
  // const req = request;
  const res = response;

  return Shelf.ShelfModel.returnAllBooks((err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occured' });
    }

    console.log(docs);

    return res.json({ books: docs });
  });
};

module.exports.makerPage = makerPage;
module.exports.getShelf = getShelf;
module.exports.add = addToShelf;
module.exports.browse = getAllBooks;
