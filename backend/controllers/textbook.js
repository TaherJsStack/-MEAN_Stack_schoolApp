
const Textbook = require('../models/textbook');

// add textbook
exports.addTextbooks = (req, res, next) => {

  Textbook.find({stage: req.body.stage, level: req.body.level, term: req.body.term})
    .then(document => {
      
      if (document.length != 0 ) {
        return res.status(500).json({
          message: "textbook existing! ::: DB",
          status: 500
        });
      }
      
      const textbook = new Textbook({
        term:       req.body.term,
        notes:      req.body.notes,
        stage:      req.body.stage,
        level:      req.body.level,
        termTextbooks: req.body.textBooks,
      })
      textbook.save()
      .then( () => { 
        res.status(200).json({
          message: "add textbook successfully! ::: DB",
          status: 200
        });
      })
    })
    .catch( err => {
      res.status(500).json({
        message: err + 'levelId fetched error:::: DB',
        status: 500
      });
    });
}

// descending
// desc
exports.getTextbooks = (req, res, next) => {
  Textbook.find().sort({'stage': 'desc'})
  .then( textBooks => { 
    res.status(200).json({
      textBooks: textBooks,
      message: "get textbook successfully! ::: DB",
      status: 200
    });
  })
  .catch( err => {
    res.status(500).json({
      message: err + ' fetched error:::: DB',
      status: 500
    });
  })
}

exports.getClassTextbooks = (req, res, next) => {
  
  Textbook.findOne({ stage: req.params.stage, level: req.params.level, term: req.params.term }).sort({'stage': 'desc'})
  .then( textBooks => { 
    res.status(200).json({
      textBooks: textBooks,
      message: "get textbook successfully! ::: DB",
      status: 200
    });
  })
  .catch( err => {
    res.status(500).json({
      message: err + ' fetched error:::: DB',
      status: 500
    });
  })

}











