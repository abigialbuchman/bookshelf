const models = require('../models');

const { Books } = models;

const makerPage = (req, res) => {
  Books.BooksModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred' });
    }
    return res.render('app', { csrfToken: req.csrfToken(), domos: docs });
  });
};

const addBooks = (req, res) => {
  if (!req.body.title || !req.body.genre || !req.body.review ||!req.body.pageNumber) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const bookData = {
    title: req.body.title,
    genre: req.body.genre,
    review: req.body.review, 
    pageNumber: req.body.pageNumber,
    owner: req.session.account._id,
  };

  const newBook = new Books.BooksModel(bookData);

  const booksPromise = newBook.save();

  booksPromise.then(() => res.json({ redirect: '/maker' }));

  booksPromise.catch((err) => {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Book already in your shelf' });
    }

    return res.status(400).json({ error: 'An error occurred.' });
  });

  return booksPromise;
};

const getBooks = (request, response) => {
    const req = request;
    const res = response;

    return Books.BooksModel.findByOwner(req.session.account._id, (err, docs) =>{
        if(err){
            console.log(err);
            return res.status(400).json({error: 'An error occurred'});
        }

        return res.json({books: docs});
    });
};

module.exports.makerPage = makerPage;
module.exports.getBooks = getBooks;
module.exports.add = addBooks;
