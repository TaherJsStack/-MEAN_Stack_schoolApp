const Stages   = require('../models/stage')
const Classes  = require('../models/studentsClass');
const Textbook = require('../models/textbook');
const Exames   = require('../models/exames');
const ClassAttend  = require('../models/classAttend')

const Student = require('../models/student');
const Parent  = require('../models/parent');
const mongoose = require('mongoose');

exports.getAllchildesParentAggregate = async (req, res, next) => {

  const classExames = await Exames.aggregate([
    { "$match": { "classId": mongoose.Types.ObjectId("5eeba9743b33762675f7d333") } },
    { 
      "$group": { 
        "_id":        {
          "month": "$month",
          "stage": "$stage",
          "level": "$level",
          "class": "$class",
          "classId": "$classId",
          "term" : "$term",
          "type": "$type",
          "textbook": "$textbook",
          "fullDegree": "$fullDegree",
          "degrees": "$studentsDegree"
        },
    }},    
    {
      "$group": { 
        _id:  "$_id.month",
        data: {
          $push: {
            term : "$_id.term",
            type : "$_id.type",
            month: "$_id.month",
            stage: "$_id.stage",
            level: "$_id.level",
            class: "$_id.class",
            classId: "$_id.classId",
            textbook : "$_id.textbook",
            fullDegree : "$_id.fullDegree",
            degrees: "$_id.degrees"
          }
        }
      }}
  ]);

    res.status(200).json({
      message: "classExames aggregate fetched  successfully!",
      documents: classExames,
      status: 200
    });


  // Parent.aggregate([{
  //     $lookup: {
  //       from: 'students',
  //       localField: "childes.id",
  //       foreignField: "_id",
  //       as: "resultingٍStudentArray"
  //       }
  //     }
  //   ])
  //   .then(documents => {
  //     res.status(200).json({
  //         message: "Parent aggregate fetched  successfully!",
  //         documents: documents,
  //         status: 200
  //       });
  //     })
  //     .catch( err => {
  //       res.status(500).json({
  //         message: err + ' fetched error:::: DB',
  //         status: 500
  //       });
  //     });

}

exports.saveClass = async (req, res, next) => {

  // on add new class name
  // check if stageName exist
  // if !stageName => add new stage, level and class name
  // if stageName exist => check if levelName
  // if !levelName => add new level and class name for stage
  // if levelName  => check if className exist 
  // if className  => message this class name exist
  // if !className => add new class for stage id and level id
  console.log('req body ===>', req.body)

  // Add new stage and class
  Stages.findOne({stageName: req.body.educationStage})
  .then( isStageName => {
    //  find one stage
// ****************** if Stage Name exist ***********************************************************
  if (isStageName) {
        Stages.findOne({stageName: req.body.educationStage}, {leveles: {'$elemMatch': { levelName: req.body.level }}})
        .then( isLevelName => {
    //************************ if level exist ***********************************************************  
         console.log('isLevelName =>', isLevelName)
    
          if(isLevelName && isLevelName.leveles.length == 1) {
            let levelId   = isLevelName.leveles[0]._id;
            let levelName = isLevelName.leveles[0].levelName;
         
            console.log('levelId =>', levelId)
            console.log('levelName =>', levelName)
            
            Classes.findOne({ stageName: req.body.educationStage, levelName: req.body.level, className: req.body.name })
            .then(isClassNameExist => { 
              console.log('isClassNameExist =>', isClassNameExist)
              if (isClassNameExist) {
                return res.status(500).json({
                  message: 'class name is exsist :::: DB',
                  status: 500
                });
              } else {
                console.log('levelId =>', levelId)
                const newClass = new Classes({
                  stageId:   isStageName._id,
                  stageName: isStageName.stageName,
                  levelId:   levelId,
                  levelName: levelName,
                  className: req.body.name,
                  students:  req.body.students
                });
                console.log('newClass =>', newClass)
                newClass.save()
                .then( s => {
                  // console.log('class Name saved =>', s)
                  activeAddClass(req.body.students, req.body.name)
                  return res.status(201).json({
                    message: 'update leveles class Name added successfully:::: DB',
                    status: 201
                  });
                }) 
              }
            })
            .catch(e => { console.log('classNameExist e =>', e) })
             } else {
            console.log('add new level', isLevelName)
            const level = {   
              levelName:  req.body.level,
              classesName:  {
                className: req.body.name
              },
            }
            Stages.updateOne({_id: isStageName._id}, { $push: { leveles: level }})
            .then( levele => {
              console.log('update leveles =>',levele)
              // console.log('stage id =>', isStageName)
              Stages.findOne({stageName: req.body.educationStage}, {leveles: {'$elemMatch': { levelName: req.body.level }}})
                .then( isLevelName => {
                  console.log('the fucking new id', isLevelName)
                  const newClass = new Classes({
                    stageId:   isStageName._id,
                    stageName: isStageName.stageName,
                    levelId:   isLevelName.leveles[0]._id,
                    levelName: isLevelName.leveles[0].levelName,
                    className: req.body.name,
                    students:  req.body.students
                  });
                  newClass.save()
                  .then( s => {
                    console.log('class Name =>', s)
                    activeAddClass(req.body.students, req.body.name)
                    return res.status(201).json({
                      message: 'update leveles class Name added successfully:::: DB',
                      status: 201
                    });
                  }) 
                })

            })
            .catch(e => {
              return res.status(500).json({
                message: 'levele added faild :::: DB ID',
                status: 201
              });
            })
          }
    //************************** end level statment ******************************************************  
        })
        .catch(e => {
          console.log('isLevelName err =>', e)
        })
// ******************** end stage statment **********************************************************************
// ******************** add new stage, level and class name  ****************************************************
    } else {
      // add new stage
      console.log('add stage and new lavel')
      const newStageAndClass = new Stages({    
        stageName:    req.body.educationStage,
        leveles: { 
          levelName:  req.body.level,
          classesName:  {
            className: req.body.name
          },
        },
      })
      newStageAndClass.save()
      .then( newClassAdded => {
        console.log('newStageAndClass  =>', newClassAdded)
        const newClass = new Classes({
          stageId:   newClassAdded._id,
          stageName: newClassAdded.stageName,
          levelId:   newClassAdded.leveles[0]._id,
          levelName: newClassAdded.leveles[0].levelName,
          className: req.body.name,
          students:  req.body.students
        });
        newClass.save()
        .then( s => {
          activeAddClass(req.body.students, req.body.name)
          return res.status(201).json({
            message: 'class Name added successfully:::: DB',
            status: 201
          });
        }) 
      })
      .catch( err => {
        res.status(500).json({
          message: err + ' class error :::: DB',
          status: 500
        });
      });
    }
  }).catch(e => {
    console.log('Stages.findOne false =>', err)
  })
}

function activeAddClass(s, cName) {
  // console.log('req.body.students =>', s)
  let jsonData = s;
  
  Object.keys(jsonData).forEach(function(key) {
    var value = jsonData[key];
    // console.log('v =>>>>>>>>>>', value.id)
    const activeClass = new Student({
      _id:       value.id,
      haveClass: true,
      className: cName
    });
    Student.findByIdAndUpdate({_id: value.id}, activeClass)
    .then( s => {
      // console.log('activeClass => ', s)
    })
    .catch( err => {
      console.log('activeClass err => ', err)
    });
  });

}

// all stages
exports.getAllStages = (req, res, next) => {

  Stages.find()
    .then(documents => {
      res.status(200).json({
        message: "stages fetched successfully!",
        stages: documents,
        status: 200
      });
    })
    .catch( err => {
      res.status(500).json({
        message: err + 'stages fetched error:::: DB',
        status: 500
      });
    });
}

// get class info
exports.getClassInfo = async (req, res, next) => {
  
  const classId = req.params.classId;
  const classAttendes = await ClassAttend.aggregate([
    { "$match": { "classId": mongoose.Types.ObjectId(classId) } },
    { 
      "$group": { 
        "_id":        {
          "month": "$month",
          "day": "$day",
          "students": "$students",
          "stage": "$stage",
          "level": "$level",
          "class": "$class",
          "classId": "$classId"
        },
    }},
    {
      "$group": { 
        _id:  "$_id.month",
        data: {
          $push: {
            stage: "$_id.stage",
            level: "$_id.level",
            class: "$_id.class",
            classId: "$_id.classId",
            day: "$_id.day",
            student: "$_id.students"
          }
        }
      }
    },
    { '$sort': { '_id': 1, "data.stage": 1, "data.day": 1 } },
  ]);

  const classExames = await Exames.aggregate([
    { "$match": { "classId": mongoose.Types.ObjectId("5eeba9743b33762675f7d333") } },
    { 
      "$group": { 
        "_id":        {
          "month": "$month",
          "stage": "$stage",
          "level": "$level",
          "class": "$class",
          "classId": "$classId",
          "term" : "$term",
          "type": "$type",
          "textbook": "$textbook",
          "fullDegree": "$fullDegree",
          "degrees": "$studentsDegree"
        },
    }},    
    {
      "$group": { 
        _id:  "$_id.month",
        data: {
          $push: {
            term : "$_id.term",
            type : "$_id.type",
            month: "$_id.month",
            stage: "$_id.stage",
            level: "$_id.level",
            class: "$_id.class",
            classId: "$_id.classId",
            textbook : "$_id.textbook",
            fullDegree : "$_id.fullDegree",
            degrees: "$_id.degrees"
          }
        }
      }}
  ]);

  Classes.findOne({_id: classId})
  .then( classData => {
    // console.log('classData =?>>>>', classData)

    Textbook.find({ stage: classData.stageName, level: classData.levelName })
    .then( textbook => {

      res.status(201).json({
        class:    classData,
        students: classData,
        textbook: textbook,
        exames:   classExames,
        attends: classAttendes,
        message: '',
        stages: 201
      })
    }) 

  })
  .catch( err => {
    res.status(400).json({
      message: '' + err,
      stages: 400
    })
  });
} 

// all classes
exports.getAllClasses = (req, res, next) => {
 
  console.log('getAllClasses =>' , req.params.levelId)
 
  const levelId = req.params.levelId;

  Classes.find({levelId: levelId})
    .then(documents => {
      // console.log('getAllClasses =>' , documents)
      res.status(200).json({
        message: "classes fetched successfully!",
        classes: documents,
        status: 200
      });
    })
    .catch( err => {
      res.status(500).json({
        message: err + 'levelId fetched error:::: DB',
        status: 500
      });
    });
}

// add subjects
exports.addTextbooks = (req, res, next) => {
  Classes.find({stageName: req.body.stage, levelName: req.body.level, subjects: {'$elemMatch': { term: req.body.term }}})
    .then(documents => {
      console.log('Classes documents =>' , documents)

      // documents.map( textbook => {
      //   console.log(' textbook =>', textbook.subjects.length )

      //   if (textbook.subjects.length == 0) {

      //     const subjects = {
      //       term:       req.body.term,
      //       termSubjects: [{
      //         notes:      req.body.notes,
      //         stage:      req.body.stage,
      //         level:      req.body.level,
      //         creator:    req.body.creator,
      //         classSubjects: req.body.classSubjects
      //       }],
      //     }

      //   console.log(' subjects  ===>', subjects )

      //     Classes.update( { stageName: req.body.stage, levelName: req.body.level}, 
      //                     { '$push': { subjects: subjects }})
      //     .then( subjectesUpdated => { 
      //       console.log('subjectesUpdated =>', subjectesUpdated)
      //       res.status(200).json({
      //         message: "add subjectes successfully! ::: DB",
      //         status: 200
      //       });
      //     })
      //   }

      // })


      // Classes.findOne( 
      //   {stageName: req.body.stage, levelName: req.body.level, className: req.body.class}, 
      //   {subjects: {'$elemMatch': { term: req.body.term }}})
      //   .then( isTerm => {

      //     if(isTerm && isTerm.subjects.length == 1) {
      //       console.log('term elemMatch  .....',)
      //       res.status(200).json({
      //         message: "this term is exist ::: DB",
      //         status: 200
      //       });
      //     } else {
      //       console.log('term not elemMatch  !!!!!!!!!!!',)
      //       const subjects = {
      //         term:       req.body.term,
      //         termSubjects: [{
      //           notes:      req.body.notes,
      //           stage:      req.body.stage,
      //           level:      req.body.level,
      //           class:      req.body.class,
      //           creator:    req.body.creator,
      //           classSubjects: req.body.classSubjects
      //         }],
      //       }
      //       Classes.updateOne({stageName: req.body.stage, levelName: req.body.level, className: req.body.class}, 
      //                         { $push: { subjects: subjects }})
      //       .then( subjectesUpdated => { 
      //         console.log('subjectesUpdated =>', subjectesUpdated)
      //         res.status(200).json({
      //           message: "add subjectes successfully! ::: DB",
      //           status: 200
      //         });
      //       })
      //     }
      //   })
    })
    .catch( err => {
      res.status(500).json({
        message: err + 'levelId fetched error:::: DB',
        status: 500
      });
    });
}

// // add exames Degree
// exports.addExamesDegree = (req, res, next) => {
//   Classes.find({stageName: req.body.stage, levelName: req.body.level, className: req.body.class})
//     .then(documents => {
//       console.log('levelId documents =>' , documents)
//       Classes.findOne({stageName: req.body.stage, levelName: req.body.level, className: req.body.class}, 
//                       {exameDegree: {'$elemMatch': { term: req.body.term, subject: req.body.subject, type: req.body.type}}})
//                       .then( isTerm => {

//                         if(isTerm && isTerm.exameDegree.length == 1) {
//                           console.log('term elemMatch  .....',)
//                           res.status(200).json({
//                             message: "this term is exist ::: DB",
//                             status: 200
//                           });
//                         } else {
//                           console.log('term not elemMatch  !!!!!!!!!!!',)
//                           const exameDegree = {
//                             term:       req.body.term,
//                             stage:      req.body.stage,
//                             level:      req.body.level,
//                             class:      req.body.class,
//                             term:       req.body.term,
//                             subject:    req.body.subject,
//                             notes:      req.body.notes,
//                             month:      req.body.month,
//                             type:       req.body.type,
//                             creator:    req.body.creator,
//                             studentsDegree: req.body.studentsDegree
//                           }
//                           Classes.updateOne({stageName: req.body.stage, levelName: req.body.level, className: req.body.class}, 
//                                             { $push: { exameDegree: exameDegree }})
//                           .then( exameDegreeUpdated => { 
//                             console.log('exameDegreeUpdated =>', exameDegreeUpdated)
//                             res.status(200).json({
//                               message: "add exame degree successfully! ::: DB",
//                               status: 200
//                             });
//                           })
//                         }
//                       })
//     })
//     .catch( err => {
//       res.status(500).json({
//         message: err + 'levelId fetched error:::: DB',
//         status: 500
//       });
//     });
// }


// all classes jouin

