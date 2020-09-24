const Library = require('../models/library');

exports.saveBook = (req, res, next) => {
    const url = req.protocol + '://' + req.get('host');
    // console.log(' newBook =>', req.body);
    const newBook = new Library({
      imageUrl:    url + '/images/library/' + req.file.filename,
      title:       req.body.title,
      bookAuth:    req.body.bookAuth,
      subject:     req.body.subject,
      description: req.body.description,
      created_at:  req.body.created_at,
      creator:     req.body.creator,
    })
    // console.log('ctrl const newBook =>', newBook)
    newBook.save()
    .then( () => {
      res.status(201).json({
        message: 'book added successfully:::: DB ID',
        status: 201
      });
    })
    .catch( err => {
      res.status(500).json({
        message: err + 'book error :::: DB',
        status: 500
      });
    });
}

exports.getAllLibrary = (req, res, next) => {
  const pageSize    = +req.query.pagesize;
  const currentPage = +req.query.page;
  const libraryQuery = Library.find();
  let fetchedBooks;
  if (pageSize && currentPage) {
    libraryQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }
  // console.log("fetchedLibrary => ", libraryQuery);
  libraryQuery
    .then(documents => {
      fetchedBooks = documents;
      return Library.count();
    })
    .then(count => {
      res.status(200).json({
        message: "books fetched successfully!",
        library: fetchedBooks,
        maxPosts: count,
        status: 200
      });
    })
    .catch( err => {
      res.status(500).json({
        message: err + 'books fetched error:::: DB',
        status: 500
      });
    });
}