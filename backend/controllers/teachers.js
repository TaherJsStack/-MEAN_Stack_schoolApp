const Teacher = require('../models/teacher');

function makeString(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function makeSmallString(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function makenumber(length) {
  var result           = '';
  var characters       = '0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

exports.saveGroupOfTeachers = (req, res, next) => {

  for(let i = 0; i<30 ; i++) {

    const salaryL = [7500, 6000, 5000, 4000];
    let salary  = salaryL[Math.floor(Math.random() * salaryL.length)];

    const JobTypeL = ["fullTime", "partTime"];
    let JobType  = JobTypeL[Math.floor(Math.random() * JobTypeL.length)];
  
    const ginder = ["mail", "female"];
    let ginderR  = ginder[Math.floor(Math.random() * ginder.length)];
  
    const cites = ["Cairo", "Giza", "Haram", "Ma'adi", "Mohandeseen", "Nasr City", "Heliopolis", "Downtown", "6 October", "Qatamia"];
    let city = cites[Math.floor(Math.random() * cites.length)];
  
    subjects = [ 'Mathematics', 'Science', 'Handwriting', 
      'Physical Education (P.E.)', 
      'Art',   'Music',
      'Dance', 'Sports',
      'Remedial', 'Math',
      'Fundamental', 'Basic Math',
      'Mathematics',
      'Pre-Algebra',
      'Geometry',
      'Trigonometry',
      'Precalculus',
      'Calculus,',
      'Statistics',
      'Business Math',
      'Consumer Math',
      'Accounting'
    ];
    
    let subject = subjects[Math.floor(Math.random() * subjects.length)];

    const stageSate = [true, false];
    let preschool   = stageSate[Math.floor(Math.random() * stageSate.length)];
    let elementary  = stageSate[Math.floor(Math.random() * stageSate.length)];
    let middle      = stageSate[Math.floor(Math.random() * stageSate.length)];
    let high        = stageSate[Math.floor(Math.random() * stageSate.length)];

    let educationalStage = ['preschool', 'elementary', 'middle', 'high'];
    let stage  = educationalStage[Math.floor(Math.random() * educationalStage.length)];

    let levels;
    if (stage == 'preschool') {
      levels  = ['level 1', 'level 2'];
    } else if(stage == 'elementary') {
      levels  = ['level 1', 'level 2', 'level 3', 'level 4', 'level 5', 'level 6'];
    } else {
      levels  = ['level 1', 'level 2', 'level 3'];
    }
    let level  = levels[Math.floor(Math.random() * levels.length)];

    let isActive = true;
    if (preschool == false && elementary == false && middle == false && high == false ) {
      isActive = false
    }

    let firstname = makeSmallString(5);
    let lastname  = makeSmallString(5);
    let email     = makeString(6);
    let phone     = makenumber(8);
    let zipCode   = makenumber(4)

  Teacher.findOne({email: email+'@gamil.com'})
    .then( TeacherExist => {
      if (TeacherExist) { return } else {
        
        const teacher = new Teacher({
          name: {
            firstname : firstname,
            lastname  : lastname
          },
          address: {
            country: 'Egypr',
            street:  city,
            zip:     zipCode,
            city:    city
          },
          notes:     'req body notes',
          email:     email+'@gamil.com',
          phone:     11+''+phone,
          ginder:    ginderR,
          roll:      'teacher',
          creatorId: 'creatorId',
          workHours: 0,
          salary:    salary,
          subject:   subject,
          level:     level,
          JobType:   JobType,
          imageUrl:  '',
          birthdate:     new Date(),
          created_at:    new Date(),
          activeAccount: isActive,
          educationalStage: [{ 
            preschool:  preschool,
            elementary: elementary,
            middle:     middle,
            high:       high,
           }],
        })
        // console.log('ctrl const Teacher =>', Teacher)
        teacher.save()
        .then( newTeacherId => {
          res.status(201).json({
            newTeacherID: newTeacherId._id,
            message: 'Teacher added successfully:::: DB ID',
            status: 201
          });
        })
        .catch( err => {
          res.status(500).json({
            message: err + 'Teacher error :::: DB',
            status: 500
          });
        });
      }
    })

    // ****************************************************************************************
  }

}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
exports.saveTeacher = (req, res, next) => {
  const url = req.protocol + '://' + req.get('host');
  Teacher.findOne({email: req.body.email})
    .then( TeacherExist => {
      if (TeacherExist) {
        // console.log('ctrl save Teacher exist =>', TeacherExist);
        return res.status(400).json({
          message: 'Teacher alrady exist Added By '+ TeacherExist.name.firstname +' :::: DB ',
          status: 400
        });
      } else {
        
        let imageUrlFilename = '';
        if (req.file != undefined) {
          imageUrlFilename = url + '/images/teachers/' + req.file.filename;
        } else if(req.body.image) {
          imageUrlFilename = req.body.image
        }

       
        const teacher = new Teacher({
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
          roll:      req.body.roll,
          creatorId: req.body.creatorId,
          workHours: req.body.workHours,
          salary:    req.body.salary,
          subject:   req.body.subject,
          level:     req.body.level,
          JobType:   req.body.JobType,
          imageUrl:  imageUrlFilename,
          birthdate: req.body.birthdate,
          created_at:    new Date(),
          activeAccount: req.body.activeAccount,
          educationalStage: { 
            preschool:  req.body.preschool,
            elementary: req.body.elementary,
            middle:     req.body.middle,
            high:       req.body.high,
           },
        })
        // console.log('ctrl const Teacher =>', Teacher)
        teacher.save()
        .then( newTeacherId => {
          res.status(201).json({
            newTeacherID: newTeacherId._id,
            message: 'Teacher added successfully:::: DB ID',
            status: 201
          });
        })
        .catch( err => {
          res.status(500).json({
            message: err + 'Teacher error :::: DB',
            status: 500
          });
        });
      }
    })
}

exports.getAllTeachers = (req, res, next) => {

  let   stage        = req.query.stage;
  const pageSize     = +req.query.pagesize;
  const currentPage  = +req.query.page;

  let TeacherQuery = Teacher.find().sort({created_at: -1});
  if (stage != 'all Stages') {
    TeacherQuery = Teacher.find().sort({created_at: -1});
  }

  let fetchedTeachers;
  if (pageSize && currentPage) {
    TeacherQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }
  TeacherQuery
    .then(documents => {
      fetchedTeachers = documents;
      return Teacher.count();
    })
    .then(count => {
      res.status(200).json({
        message: "Teachers fetched successfully!",
        teachers: fetchedTeachers,
        maxPosts: count,
        status: 200
      });
    })
    .catch( err => {
      res.status(500).json({
        message: err + 'Teacher fetched error:::: DB',
        status: 500
      });
    });
}

exports.updateOne = (req, res, next) => {
  const url = req.protocol + '://' + req.get('host');
          
  console.log('req.body =>>>>>', req.body)

  let imageUrlFilename = '';
  if (req.file != undefined) {
    imageUrlFilename = url + '/images/teachers/' + req.file.filename;
  } else if(req.body.imageUrl) {
    imageUrlFilename = req.body.imageUrl
  }


  const newTeacher = new Teacher({
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
    job:       req.body.job,
    email:     req.body.email,
    phone:     req.body.phone,
    ginder:    req.body.ginder,
    roll:      req.body.roll,
    imageUrl:  imageUrlFilename,
    birthdate: req.body.birthdate,
    activeAccount: req.body.activeAccount,

  })
  Teacher.updateOne({_id: req.params.id}, newTeacher)
  .then( () => {
    res.status(201).json({
      message: 'Teacher Updated successfully:::: DB',
      status: 201
    });
  })
  .catch( err => {
    res.status(500).json({
      message: err + 'Teacher updated error:::: DB',
      status: 500
    });
  });
}

exports.updateOneState = (req, res, next) => {
  console.log('req.params.id', req.params.id);
  const newTeacherSatae = new Teacher({
    _id:         req.body.id,
    // showStudent: req.body.showStudent,
  });
  console.log(' => Teacher:::: DB', newTeacherSatae);
  Teacher.findByIdAndUpdate({_id: req.params.id}, newTeacherSatae)
  .then( () => {
    res.status(200).json({
      message: 'Teacher Updated successfully:::: DB',
      status: 200
    });
  })
  .catch( err => {
    res.status(500).json({
      message: err + 'Teacher updated error:::: DB',
      status: 500
    });
  });
}

exports.deleteOne = (req, res, next) => {
  console.log('Teacher req params id =>', req.params.id);
  Teacher.deleteOne({_id: req.params.id})
    .then( result => {
      res.status(200).json({
        message: "Teacher Deleted One successfully!:::: DB",
        status: 200
      });
    })
    .catch( err => {
      res.status(500).json({
        message: err + 'Teacher Deleted error:::: DB',
        status: 500
      });
    });
}

exports.findOneByEmail = ( req, res, next ) => {
  let teacherEmail = req.params.teacherEmail;
  // console.log('teacherEmail =>', teacherEmail)
  Teacher.find({email: teacherEmail})
  .then( teacher => {
    // console.log('findOne teacher =>', teacher)
    res.status(200).json({
      teacher: teacher,
      message: "teacher find One successfully!:::: DB",
      status: 200
    })
  })
  .catch( err => {
    // console.log('findOne teacher err =>', err)
    res.status(404).json({
      message: "teacher find One error !:::: DB",
      status: 404
    })
  })
}

exports.educationalStageFillter = (req, res, next ) => {
  let stage          = req.query.stage;
  const pageSize     = +req.query.pagesize;
  const currentPage  = +req.query.page;

  console.log('f stage ====>', stage)
  console.log('f pageSize ====>', pageSize)
  console.log('f currentPage ====>', currentPage)

  let TeacherQuery =  Teacher.find().sort({created_at: -1});
  if (stage != 'all Stages') {
      TeacherQuery = Teacher.find().sort({created_at: -1});
  }
  let fetchedTeachers;
  if (pageSize && currentPage) { 
    TeacherQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }
  // console.log("fetchedTeachers => ", TeacherQuery);
  TeacherQuery
  .then(documents => {

    console.log('documents ==>', documents)

    fetchedTeachers = documents;
 
    let studentSCount = Student.count()
    if (stage != 'all Stages') {
      studentSCount = Student.count()
    }
    return studentSCount;
  })
  .then( teachers => {
    console.log('findOne Teacher =>', teachers)
    res.status(200).json({
      teachers: teachers,
      message: "teachers find successfully!:::: DB",
      status: 200
    })
  })
  .catch( err => {
    // console.log('find Teacher err =>', err)
    res.status(404).json({
      message: "teachers find error !:::: DB",
      status: 404
    })
  })
}

exports.teatcherByStage = (req, res, next ) => {

  console.log('stage ====>', req.params.stage)
  

  Teacher.find({stages: {$all: req.params.stage}})
  .then( teachers => {

    res.status(200).json({
      teachers: teachers,
      message: "teachers find successfully!:::: DB",
      status: 200
    })
  })
  .catch( err => {
    // console.log('find Teacher err =>', err)
    res.status(404).json({
      teachers: coll,
      message: "teachers find error !:::: DB",
      status: 404
    })
  })
}


