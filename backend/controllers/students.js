const Exames       = require('../models/exames');
const Parent       = require('../models/parent');
const Student      = require('../models/student');
const Classes      = require('../models/studentsClass');
const Textbook     = require('../models/textbook');
const BusAttend    = require('../models/busAttend')
const ClassAttend  = require('../models/classAttend')

const QRCode  = require('qrcode')

const fs = require('fs')

var path = require('path');
var appDir = path.dirname(require.main.filename);

exports.saveStudent = (req, res, next) => {
  const url = req.protocol + '://' + req.get('host');
  // console.log('req.file.filename =>', req.file);
  // console.log(' req.body =>', req.body)
  // console.log('req.authData.userId =>', req.authData.id)
  // console.log('req.authData.userId =>', req.authData.name)
  Student.findOne({email: req.body.email})
    .then( StudentExist => {
      if (StudentExist) {
        // console.log('ctrl save Student exist =>', StudentExist);
        return res.status(400).json({
          message: 'Student alrady exist Added By '+ StudentExist.name.firstname +' :::: DB ',
          status: 400
        });
      } else {
        // console.log('StudentExist =>', StudentExist);
        // console.log('req.body =>', req.body);
        // set rundom student id      
        let   date = new Date().toLocaleDateString().split("/").join("");
        const studentCount  = Math.floor(Math.random() * Math.floor(6554));
        const studentCardId = studentCount+''+date;
        QRCode.toFile(appDir + '/images/qrcode/'+studentCardId+'.png', studentCardId)
        // let QRCodePath = QRCode.toFile(appDir + '/Backend/images/qrcode/'+studentCardId+'.png', studentCardId)
        let imageUrlFilename = '';
        if (req.file != undefined) {
          imageUrlFilename = url + '/images/students/' + req.file.filename;
        }
        const student = new Student({
          name: {
            firstname : req.body.firstname,
            lastname  : req.body.lastname
          },
          address: {
            country: req.body.country,
            street:  req.body.street,
            zip:     req.body.zip,
            city:    req.body.city,
          },
          QRCodePath:  url + '/images/qrcode/'+studentCardId+'.png',
          QRCodeValue: studentCardId,
          cardId:    studentCardId,
          notes:     req.body.notes,
          email:     req.body.email,
          phone:     req.body.phone,
          ginder:    req.body.ginder,
          roll:      req.body.roll,
          level:     req.body.level,
          className: '',
          imageUrl:  imageUrlFilename,
          birthdate: req.body.birthdate,
          created_at:  req.body.created_at,
          parentEmail: req.body.parentEmail,
          parentPhone:      req.body.parentPhone,
          activeAccount:    false,
          educationalStage: req.body.educationalStage,
          creatorId:   req.authData.id,
          creatorName: req.authData.name, 
          expenses: {
            bass:       false,
            books:      false,
            school:     false,
            clothes:    false,
          }
        })
        console.log('ctrl const Student =>', student)
        student.save()
        .then( newStudent => {
          // find parent and update 
          // add student to parent
          const newStudentData = {id: newStudent._id, phone: newStudent.phone, email: newStudent.email};
          // console.log('t =====================>', newStudentData)
          Parent.findOne({email: newStudent.parentEmail})
          .then( parent => { 
            // console.log('b =====================>', parent)
            Parent.updateOne({_id: parent._id}, 
              { $push: { childes: newStudentData }}
             ).then ( (d) => {
               console.log('=>>>>>>>>>>d',d )
               
               res.status(201).json({
                newStudentID: newStudent._id,
                message: 'Student added successfully:::: DB ID',
                status: 201
              });
             })
          })

          // res.status(201).json({
          //   newStudentID: newStudent._id,
          //   message: 'Student added successfully:::: DB ID',
          //   status: 201
          // });
        })
        .catch( err => {
          res.status(500).json({
            message: err + 'Student error :::: DB',
            status: 500
          });
        });
      }
    })
}

exports.getAllStudents = (req, res, next) => {

  let stage        = req.query.stage;
  const pageSize     = +req.query.pagesize;
  const currentPage  = +req.query.page;

  let StudentQuery =  Student.find().sort({created_at: -1});
  if (stage != 'all_Stages') {
      StudentQuery = Student.find({educationalStage: req.query.stage}).sort({created_at: -1});
  }
  let fetchedStudents;
  if (pageSize && currentPage) { 
    StudentQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }
  // console.log("fetchedStudents => ", StudentQuery);
  StudentQuery
    .then(documents => {

      fetchedStudents = documents;
      // // add  QRCode Value if not found
      // let dir = '/home/darkside/Desktop/school/schoolApp MEAN Stack/backend/images/qrcode';
      // let files  = fs.readdirSync(dir)
      // documents.map( document => {
      //   let index = files.findIndex(e => { return e === document.QRCodeValue+'.png' })
      //   console.log('findIndex=>', index)          
      //   if (index == -1) {
      //     QRCode.toFile(appDir + '/images/qrcode/'+document.QRCodeValue+'.png', document.QRCodeValue)
      //   }
      // })
      let studentSCount = Student.count()
      if (stage != 'all_Stages') {
        studentSCount = Student.count({educationalStage: req.query.stage})
      }
      return studentSCount;
    })
    .then(count => {
      res.status(200).json({
        message: "Students fetched successfully!",
        students: fetchedStudents,
        maxPosts: count,
        status: 200
      });
    })
    .catch( err => {
      res.status(500).json({
        message: err + 'Student fetched error:::: DB',
        status: 500
      });
    });
}

exports.getStudentsPayBus = (req, res, next) => {

  const pageSize     = +req.query.pagesize;
  const currentPage  = +req.query.page;

  // console.log('pageSize ==========>', pageSize)
  // console.log('currentPage ==========>', currentPage)

  let StudentQuery =  Student.find({payBus: true, hasBus: false}).sort({created_at: -1, 'address.city':'asc', educationalStage:'asc'});
  let fetchedStudents;
  if (pageSize && currentPage) { 
    StudentQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }
  StudentQuery
    .then(documents => {
      fetchedStudents = documents;
      return Student.count();
    })
    .then(count => {
      res.status(200).json({
        message: "Students fetched successfully!",
        students: fetchedStudents,
        maxPosts: count,
        status: 200
      });
    })
    .catch( err => {
      res.status(500).json({
        message: err + 'Student fetched error:::: DB',
        status: 500
      });
    });
}

exports.studentSearch = (req, res, next) => {
  const phoneNo = req.params.phoneNo;
  Student.findOne({ 'phone': phoneNo })
    .then(document => {
      if ( document == null) {
        res.status(404).json({
          message: "no student you.......!",
        });
      }
      res.status(200).json({
        message: "fiendyyyyyyy student successfully!",
        student: document,
        status: 200
      });
    })
    .catch( err => {
      res.status(500).json({
        message: err + 'Student fetched error:::: DB',
        status: 500
      });
    });
}

exports.studentSearchById = (req, res, next) => {
  const id = req.params.id;
  Student.findOne({ '_id': id })
    .then(document => {
      if ( document == null) {
        res.status(404).json({
          message: "no student by id you.......!",
        });
      }
      res.status(200).json({
        message: "fiendyyyyyyy student successfully!",
        student: document,
        status: 200
      });
    })
    .catch( err => {
      res.status(500).json({
        message: err + 'Student fetched error:::: DB',
        status: 500
      });
    });
}

exports.updateOne = (req, res, next) => {
  const url = req.protocol + '://' + req.get('host');

  console.log('req.body =======>', req.body)

  let imageUrlFilename = '';
  if (req.file != undefined) {
    imageUrlFilename = url + '/images/students/' + req.file.filename;
  } else if(req.body.imageUrl) {
    imageUrlFilename = req.body.imageUrl
  }

  const newStudent = new Student({
    _id:         req.params.id,
    name: {
      firstname : req.body.firstname,
      lastname  : req.body.lastname
    },
    address: {
      country: req.body.country,
      street:  req.body.street,
      zip:     req.body.zip,
      city:    req.body.city,
    },
    notes:     req.body.notes,
    email:     req.body.email,
    phone:     req.body.phone,
    ginder:    req.body.ginder,
    imageUrl:  imageUrlFilename,
    birthdate: req.body.birthdate,
    level:     req.body.level,
    educationalStage: req.body.educationalStage,
    expenses: {
      bass:       req.body.bass,
      books:      req.body.books,
      school:     req.body.school,
      clothes:    req.body.clothes,
    }
  })
  // console.log(Student, ' => Student:::: DB');
  Student.updateOne({_id: req.params.id}, newStudent)
  .then( () => {
    res.status(201).json({
      message: 'Student Updated successfully:::: DB',
      status: 201
    });
  })
  .catch( err => {
    res.status(500).json({
      message: err + 'Student updated error:::: DB',
      status: 500
    });
  });
}

exports.updateOneState = (req, res, next) => {
  console.log('req.params.id', req.params.id);
  const newStudentSatae = new Student({
    _id:         req.body.id,
    showStudent: req.body.showStudent,
  });
  console.log(' => Student:::: DB', newStudentSatae);
  Student.findByIdAndUpdate({_id: req.params.id}, newStudentSatae)
  .then( () => {
    res.status(200).json({
      message: 'Student Updated successfully:::: DB',
      status: 200
    });
  })
  .catch( err => {
    res.status(500).json({
      message: err + 'Student updated error:::: DB',
      status: 500
    });
  });
}

exports.deleteOne = (req, res, next) => {
  console.log('Student req params id =>', req.params.id);
  console.log('Student req params id =>', req.params.parentEmail);
  console.log('Student req params id =>', req.params.parentPhone);
  Parent.findOne({email: req.params.parentEmail, phone: req.params.parentPhone})
  .then(parent => {
    console.log('parent1111111 =========>' ,parent)
  })

  // Parent.findOne({email: req.params.parentEmail, phone: req.params.parentPhone})
  Parent.update(
    { email: req.params.parentEmail, phone: req.params.parentPhone }, 
    { $pull: { "childes": { "id": req.params.id } }}, 
    { safe: true, multi:true },)
  .then(parent => {
    // console.log('parent Dooooooooone =========>' ,parent)
    Parent.findOne({email: req.params.parentEmail, phone: req.params.parentPhone})
    .then(parent => {
      console.log('parent Dooooooooone 2 =========>' ,parent)
    })
 
    // Student.deleteOne({_id: req.params.id})
  //   .then( result => {
  //     res.status(200).json({
  //       message: "Student Deleted One successfully!:::: DB",
  //       status: 200
  //     });
  //   })
  //   .catch( err => {
  //     res.status(500).json({
  //       message: err + 'Student Deleted error:::: DB',
  //       status: 500
  //     });
    // });
  },
  err => {
    console.log('parent Errrrrrrrrrr =========>', err)
  })


}

exports.findOneByEmail = (req, res, next ) => {
  let studentEmail = req.params.studentEmail;

  Student.find({email: studentEmail})
  .then( student => {
    // console.log('findOne student =>', student)
    res.status(200).json({
      student: student,
      message: "Student find One successfully!:::: DB",
      status: 200
    })
  })
  .catch( err => {
    // console.log('findOne student err =>', err)
    res.status(404).json({
      message: "Student find One error !:::: DB",
      status: 404
    })
  })
}

exports.educationalStageFillter = (req, res, next ) => {

  let stage        = req.query.stage;
  const pageSize     = +req.query.pagesize;
  const currentPage  = +req.query.page;

  let StudentQuery =  Student.find().sort({created_at: -1});
  if (stage != 'all_Stages') {
      StudentQuery = Student.find({educationalStage: req.query.stage}).sort({created_at: -1});
  }
  let fetchedStudents;
  if (pageSize && currentPage) { 
    StudentQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }
  StudentQuery.then(documents => {
    fetchedStudents = documents;
    let studentSCount = Student.count()
    if (req.query.stage != 'all_Stages') {
      studentSCount = Student.count({educationalStage: req.query.stage})
    }
    return studentSCount;
  })
  .then( count => {
    console.log('find student =>', count)
    res.status(200).json({
      students: fetchedStudents,
      maxPosts: count,
      message: "Students find  successfully!:::: DB",
      status: 200
    })
  })
  .catch( err => {
    res.status(404).json({
      message: "Students find error !:::: DB",
      status: 404
    })
  })
}

exports.studentsFillterStageAndLevel = (req, res, next) => {
  let stage = req.params.stage;
  let level = req.params.level;
  console.log('stage =>', req.params)
  Student.find({educationalStage: stage, level: level, haveClass: false})
  .then( students => {
    // console.log('find student =>', students)
    res.status(200).json({
      students: students,
      message: "Students find  successfully!:::: DB",
      status: 200
    })
  })
  .catch( err => {
    // console.log('find students err =>', err)
    res.status(404).json({
      message: "Students find error !:::: DB",
      status: 404
    })
  })
}

exports.studentsChart = (req, res, next) => {
  console.log('studentsChart')
    res.status(200).json({
      message: "Students find  successfully!:::: DB",
    
    })
  // Student.find()
  // .then( students => {
  //   // let Qena    = documents.filter( student => {return student.address.city ==  "Qena"}).length;
  //   // let Giza    = documents.filter( student => {return student.address.city ==  "Giza"}).length;
  //   // let Suez    = documents.filter( student => {return student.address.city ==  "Suez"}).length;
  //   // let Cairo   = documents.filter( student => {return student.address.city ==  "Cairo"}).length;
  //   // let Aswan   = documents.filter( student => {return student.address.city ==  "Aswan"}).length;
  //   // let Qalyub  = documents.filter( student => {return student.address.city ==  "Qalyub"}).length;
  //   // let Fayoum  = documents.filter( student => {return student.address.city ==  "Fayoum"}).length;
  //   // let ElArish = documents.filter( student => {return student.address.city ==  "El Arish"}).length;


  //   // console.log('find student Qena =>', Qena)
  //   // res.status(200).json({
  //   //   students: students,
  //   //   citesLingth: [Cairo, Giza, Suez, Aswan, Qena, ElArish, Qalyub, Fayoum],
  //   //   message: "Students find  successfully!:::: DB",
  //   //   status: 200
  //   // })
  // })
  // .catch( err => {
  //   // console.log('find students err =>', err)
  //   res.status(404).json({
  //     message: "Students find error !:::: DB",
  //     status: 404
  //   })
  // })
}

exports.getStudent = async (req, res, next) => {
  const studentParamId = req.params.id;

  try {
    
    const studentExames = await Exames.aggregate([
      {$unwind:'$studentsDegree'},
      { "$match": { "studentsDegree.id": studentParamId } },
      { 
        "$group": { 
          "_id":   {
            month: "$month",
            classId: "$classId",
            term: "$term",
            type: "$type",
            textbook: "$textbook",
            fullDegree: "$fullDegree",
            degrees: "$studentsDegree",
          },
      }},
      {
        "$group": { 
          _id:  "$_id.month",
          data: {
            $push: {
              term : "$_id.term",
              month: "$_id.month",
              classId: "$_id.classId",
              textbook : "$_id.textbook",
              fullDegree : "$_id.fullDegree",
              degrees: "$_id.degrees",
              fullMonthDegrees: "$totalMonthDegrees",
              fullDegree2: "$_id.fullDegree2",
              studentsDegree: "$_id.studentsDegree"
            },
          },
          totalMonthDegrees: {$sum: "$_id.degrees.degree"},
          fullMonthDegrees:  {$sum: "$_id.fullDegree"}
        
        }},
      { '$sort': { '_id': 1 } },

    ]);
  
    const studentClassAttend = await ClassAttend.aggregate([
      { "$match": { "students.id": studentParamId } },
      { 
        "$group": { 
          "_id":   {
            month: "$month",
            classId: "$classId",
            day: "$day",
          },
      }},
      {
        "$group": { 
          _id:  "$_id.month",
          data: {
            $push: {
              month: "$_id.month",
              classId: "$_id.classId",
              day : "$_id.day",
            },
          },
          // totalMonthAttendedDaysCount: {$sum: "$data.length"},

        }},
      { '$sort': { '_id': 1 } },
    ]);
    
    const studentBusAttend = await BusAttend.aggregate([
      { "$match": { "students.id": studentParamId } },
      { 
        "$group": { 
          "_id":   {
            month: "$month",
            classId: "$classId",
            day: "$day",
          },
      }},
      {
        "$group": { 
          _id:  "$_id.month",
          data: {
            $push: {
              month: "$_id.month",
              classId: "$_id.classId",
              day : "$_id.day",
            },
          },
          // totalMonthAttendedDaysCount: {$sum: "$data.length"},

        }},
      { '$sort': { '_id': 1 } },
    ]);

    const student = await Student.findById({_id: studentParamId});
    const slass   = await Classes.findOne({students: {'$elemMatch': { id: studentParamId }}})
    const classTextbook = await Textbook.find({ "stage": slass.stageName, "level": slass.levelName});

      // res.status(200).json({
      //   message: "classTextbook successfully!",
      //   documents: classTextbook,
      //   status: 200
      // });
  
      // Textbook

    res.status(200).json({
      message: "full student info",
      class:   slass,
      student: student,
      classTextbook: classTextbook,
      CAttend: studentClassAttend,
      BAttend: studentBusAttend,
      degrees: studentExames,
      status: 200
    })

  } catch (error) {
    console.log('getStudent catch error =>', error)
  }

  
}
