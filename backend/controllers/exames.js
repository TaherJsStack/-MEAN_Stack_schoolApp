const Exames   = require('../models/exames');
const Classes  = require('../models/studentsClass');
const Textbook = require('../models/textbook');

exports.saveExamesDegree = (req, res, next) => {

  console.log('req.body ===>', req.body)

  Exames.findOne({stage: req.body.stage, level: req.body.level, class: req.body.class, term: req.body.term, month: req.body.month })
    .then( isExameExist => {
      if (isExameExist) {
        return res.status(400).json({
          message: 'exame alrady exist Added By '+ isExameExist.class +' :::: DB ',
          status: 400
        });
      } else {
        const exame = new Exames({
          term:       req.body.term,
          notes:      req.body.notes,
          stage:      req.body.stage,
          level:      req.body.level,
          class:      req.body.class,
          month:      req.body.month,
          type:       req.body.type,
          textbook:   req.body.textbook,
          studentsDegree: req.body.studentsDegree,
        })

        exame.save()
        .then( newExameId => {
          res.status(201).json({
            message: 'Exame added successfully:::: DB ID',
            status: 201
          });
        })
        .catch( err => {
          res.status(500).json({
            message: err + ' Exame error :::: DB',
            status: 500
          });
        });
      }
    })
}


// get All exames with pagination
exports.getAllEx = (req, res, next) => {
  const pageSize    = +req.query.pagesize;
  const currentPage = +req.query.page;
  const ExamesQuery = Exames.find();
  let fetchedExames;
  if (pageSize && currentPage) {
    ExamesQuery.skip(pageSize * (currentPage - 1)).limit(pageSize).sort({work:1, created_at: -1});
  }
  // console.log("fetchedExames => ", ExamesQuery);
  ExamesQuery
    .then(documents => {
      fetchedExames = documents;
      return Exames.count();
    })
    .then(count => {
      res.status(200).json({
        message: "Examess fetched successfully!",
        Exames: fetchedExames,
        maxPosts: count,
        status: 200
      });
    })
    .catch( err => {
      res.status(500).json({
        message: err + 'Exames fetched error:::: DB',
        status: 500
      });
    });
}

// get All exames without pagination
exports.getAllExames = (req, res, next) => {
  Exames.find()
    .then(documents => {
      res.status(200).json({
        message: "Examess fetched successfully!",
        exames: documents,
        status: 200
      });
    })
    .catch( err => {
      res.status(500).json({
        message: err + 'Exames fetched error:::: DB',
        status: 500
      });
    });
}

exports.getAllTextbookExamResult = (req, res, next) => {

  console.log('stage  =>',     req.query.stage )
  console.log('level  =>',     req.query.level )
  console.log('className  =>', req.query.className )
  console.log('term  =>',      req.query.term )
  console.log('month  =>',     req.query.month )
  console.log('textbook  =>',  req.query.textbook )
  //   
  Exames.findOne({stage: req.query.stage, level: req.query.level, class: req.query.className, term: req.query.term, month: req.query.month, textbook: req.query.textbook})
  .then( exameResults => {
    console.log('exameResults =>', exameResults)
    res.status(201).json({
      exameResults: exameResults,
      message: 'get exame successfully:::: DB',
      status: 201
    });
  })
  .catch( err => {
    res.status(500).json({
      message: err + ' Exame error :::: DB',
      status: 500
    });
  });


}

// loop adding collect
exports.addStudentsResult = async (req, res, next) => {
  
  Classes.find()
  .then( classes => {
    // console.log('classes =>', classes)

    classes.map( (classx, no) => {
      //  console.log('classes.map =>', classx._id)

       Textbook.findOne({ stage: classx.stageName, level: classx.levelName, term: "first term" }).sort({'stage': 'desc'})
       .then( textBooks => { 

          // console.log('textBooks =>', textBooks)
          textBooks.termTextbooks.map( (book, no) => {
            // console.log(' book =>', book)

            Exames.findOne({stage: classx.stageName, level: classx.levelName, class: classx.className, textbook: book.subjectName, term: "first term", month: "December", type: "term end"})
            .then( isExameExist => {
              if (isExameExist) { return } else {

                let degree = [20, 25, 30];
                let fullDegree  = degree[Math.floor(Math.random() * degree.length)];

                let studentsDegree = [];
                classx.students.map( (student, no) => {
                  let sdegree = { id: student.id, name: student.name, degree: Math.round(Math.random() * fullDegree) }
                  studentsDegree.push(sdegree)
                })
                // console.log('studentsDegree ->', studentsDegree)
    
                const exame = new Exames({
                  term:       "first term",
                  notes:      "no notes",
                  stage:      classx.stageName,
                  level:      classx.levelName,
                  class:      classx.className,
                  month:      "December",
                  type:       "term end",
                  textbook:   book.subjectName,
                  studentsDegree: studentsDegree,
                  fullDegree: fullDegree,
                  classId:    classx._id
                })
        
                exame.save()
                .then( newExameId => {
                  res.status(201).json({
                    message: 'Exame added successfully:::: DB ID',
                    status: 201
                  });
                })
                .catch( err => {
                  res.status(500).json({
                    message: err + ' Exame error :::: DB',
                    status: 500
                  });
                });
              }
            })

          })

       })

    })

    res.status(201).json({
      // classes: classes,
      message: 'Classes find successfully:::: DB ID',
      status: 201
    });
  })
  


}
