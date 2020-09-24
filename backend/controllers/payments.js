const Student = require('../models/student');
const Parent  = require('../models/parent');
const Payment = require('../models/payment');

exports.addAllStudentsPay = (req, res, next) => {
  Student.find({activeAccount: false})
  .then( documents => {
    // console.log('documents===>', documents)

    documents.map( (student, index) => {
      console.log('student id ===>', student._id)

      const stageSate = [true, false];
      let bass    = stageSate[Math.floor(Math.random() * stageSate.length)];
      let books   = stageSate[Math.floor(Math.random() * stageSate.length)];
      let clothes = stageSate[Math.floor(Math.random() * stageSate.length)];
      
      let bassVal = 0;
      let booksVal = 0;
      let clothesVal = 0;
      
      if (bass) {
        bassVal = 300 
      }
      if (books) {
        booksVal = 90
      }
      if (clothes) {
        clothesVal = 99
      }

      const pay = new Payment({
          bass:       bassVal,
          books:      booksVal,
          school:     800,
          clothes:    clothesVal,
          student:    student,
          added_at:   new Date(),
          creator_id: student.creatorId,
          student_id:   student._id,
          studentName:  student.name.firstname + ' ' + student.name.lastname,
          studentStage: student.educationalStage
      })
      pay.save()
        .then( payment => {
          // find student and update 
          // active student account
          const pay = payment;
          // console.log(' =====================>', pay)
          Student.findOne({_id: pay.student_id})
          .then( student => { 
            Student.updateOne(
              {_id: student._id}, 
              { activeAccount: 'true' },
              ).then ( (s) => {
                res.status(201).json({
                  message: 'Payment added successfully:::: DB ID',
                  status: 201
                });
              })
          })
        })
        .catch( err => {
          res.status(500).json({
            message: err + 'Payment error :::: DB',
            status: 500
          });
        });
    })
  })
}

//**************************************************************************************** */
exports.savePay = (req, res, next) => {
    const pay = new Payment({
        bass:       req.body.bass,
        books:      req.body.books,
        school:     req.body.school,
        clothes:    req.body.clothes,
        student:    req.body.student,
        added_at:   req.body.added_at,
        creator_id: req.body.creator_id,
        student_id:   req.body.student_id,
        studentName:  req.body.studentName,
        studentStage: req.body.studentStage,        
    })
    // console.log('ctrl const Student =>', student)
    pay.save()
    .then( payment => {
      // find student and update 
      // active student account
      const pay = payment;
      // console.log(' =====================>', pay)
      let busVal  = req.body.bass  == 300 ? true : false;
      let bookVal = req.body.books == 200 ? true : false;

      Student.findOne({_id: pay.student_id})
      .then( student => { 
        Student.updateOne(
          {_id: student._id}, 
          { activeAccount: 'true', payBus: busVal, payBook: bookVal },
          ).then ( (s) => {
            res.status(201).json({
              message: 'Payment added successfully:::: DB ID',
              status: 201
            });
          })
      })
    })
    .catch( err => {
      res.status(500).json({
        message: err + 'Payment error :::: DB',
        status: 500
      });
    });
}

exports.getAllPayments = (req, res, next) => {

  // Payment.find().then( r => {
  //   // console.log('r =====>', r)
  //     r.map( (document) => {
  //       // console.log('document Payment =====>', document.student_id)
  //       // let  busVal =       false;
  //       // let  bookVal =      false;
  //       // if (document.bass == 300) { busVal = true}
  //       // if (document.books == 90) { bookVal = true}
        
  //       let busVal  = document.bass  == 300 ? true : false;
  //       let bookVal = document.books == 90 ? true : false;
    
  //       console.log('document. =====>', document.bass)
  //       console.log('busVal. =====>', busVal)
  //       console.log('document. =====>', document.books)
  //       console.log('bookVal. =====>', bookVal)
        
  //       Student.update({_id: document.student_id}, {
  //         payBus:        busVal,
  //         hasBus:        false,
  //         payBook:       bookVal,
  //         hasBook:       false,
  //       }, {multi:true})
  //       .then( d => {
  //         // console.log('d =====>', d)
  //       })
  //     })    
  //   })

  const pageSize     = +req.query.pagesize;
  const currentPage  = +req.query.page;
  const payQuery     = Payment.find();
  let fetchedPay;
  if (pageSize && currentPage) {
    payQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }
  // console.log("fetchedStudents => ", StudentQuery);
  payQuery
    .then(documents => {
      fetchedPay = documents;
      return Payment.count();
    })
    .then(count => {
      res.status(200).json({
        message: "Payments fetched successfully!",
        payments: fetchedPay,
        maxPosts: count,
        status: 200
      });
    })
    .catch( err => {
      res.status(500).json({
        message: err + 'Payments fetched error:::: DB',
        status: 500
      });
    });
}

exports.getAllStudentstPayBus = (req, res, next) => {
  const pageSize     = +req.query.pagesize;
  const currentPage  = +req.query.page;

  const payQuery     = Payment.find({bass: 300});
  let fetchedPay;
  if (pageSize && currentPage) {
    payQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }
  payQuery
    .then(documents => {
      fetchedPay = documents;
      return Payment.count();
    })
    .then(count => {
      res.status(200).json({
        message: "Payments fetched successfully!",
        payments: fetchedPay,
        maxPosts: count,
        status: 200
      });
    })
    .catch( err => {
      res.status(500).json({
        message: err + 'Payments fetched error:::: DB',
        status: 500
      });
    });
}

exports.paySearch = async(req, res, next) => {
  const id = req.params.id;
  try {
    await  Payment.findOne({ 'student_id': id })
    .then(document => {
      res.status(200).json({
        message: "paySearch student successfully!",
        student: document,
        status: 200
      });
    })    
  } catch (err) {
    console.log('awit err=>', err)
    return next(err);
  }

}

exports.updateOne = (req, res, next) => {

  console.log('req.body =>', req.body)

  const newPayment = new Payment({
    _id:        req.params.id,
    bass:       req.body.bass,
    books:      req.body.books,
    school:     req.body.school,
    clothes:    req.body.clothes,
    student_id: req.body.student_id,
    creator_id: req.body.creator_id,
  })
  // console.log(payments, ' => payment:::: DB');
  Payment.updateOne({_id: req.params.id}, newPayment)
  .then( (pay) => {

    let busVal  = req.body.bass  == 300 ? true : false;
    let bookVal = req.body.books == 90 ? true : false;

    console.log('pay =>', pay)
    console.log('busVal =>', busVal)
    console.log('bookVal =>', bookVal)
    console.log(' =>', )
    Student.findOne({_id: req.body.student_id})
    .then( student => { 

      console.log(' student =>', student)

      Student.updateOne(
        {_id: req.body.student_id}, 
        { activeAccount: 'true', payBus: busVal, payBook: bookVal },
        ).then ( (s) => {
          res.status(201).json({
            message: 'payment Updated successfully:::: DB',
            status: 201
          });
        })
    })

  })
  .catch( err => {
    res.status(500).json({
      message: err + 'Student updated error:::: DB',
      status: 500
    });
  });
}

exports.payStatistics = async ( req, res, next ) => {

  try {
    let payLenght  = await Payment.find().countDocuments();
    let payBuss    = await Payment.find({ bass : { $gt : 0}} ).countDocuments();
    let payBooks   = await Payment.find({ books : { $gt : 0}} ).countDocuments();
    let paySchool  = await Payment.find({ school : { $gt : 0}} ).countDocuments();
    let payClothes = await Payment.find({ clothes : { $gt : 0}} ).countDocuments(); 
    // console.log(
    //   'payLenght =>', payLenght, 
    //   " payBuss =>", payBuss, 
    //   " payBooks =>", payBooks, 
    //   " paySchool =>", paySchool, 
    //   " payClothes =>", payClothes 
    //   );

      let bussValue    = ( payBuss/payLenght )*100; 
      let booksValue   = ( payBooks/payLenght )*100; 
      let schoolValue  = ( paySchool/payLenght )*100; 
      let clothesValue = ( payClothes/payLenght )*100; 
  
      res.status(200).json({

        message: "payStatistics fetched successfully!",
        status: 200,
        states: {
          payLength:    payLenght,
          bussState:    Math.round( bussValue ),
          booksState:   Math.round( booksValue ),
          schoolState:  Math.round( schoolValue ),
          clothesState: Math.round( clothesValue ) 
        }
      })

  } catch (error) {
    res.status(500).json({
      message: error + " payStatistics fetched error! ::::DB",
      status: 500
    })
  }

}

