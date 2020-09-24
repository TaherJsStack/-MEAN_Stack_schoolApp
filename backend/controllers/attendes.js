const Attendes     = require('../models/attendes')
const BusAttend    = require('../models/busAttend')
const ClassAttend  = require('../models/classAttend')
const Classes      = require('../models/studentsClass');
const Bus          = require('../models/bus')
const mongoose     = require('mongoose');

var ObjectId = mongoose.Types.ObjectId;

async function addMultiClassAttend() {
  
  let classes = [];
  classes = await Classes.find().sort();
  console.log('classes length =>>', classes.length)
  classes.map( (classx, no) => {

      // console.log("classes map leve =>", classx.levelName)
      // console.log("classes map stage =>", classx.stageName)
      let d = 3;
      let m = "November";
     
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ClassAttend.findOne({ 
      stage: classx.stageName, 
      level: classx.levelName, 
      class: classx.className, 
      day:   d, 
      month: m, 
      type:  "class Attend"})
      .then( findCalss => {
        if (findCalss) {
          return
        } else {

          const classAttend = new ClassAttend({
            day:        d,
            month:      m,
            type:       'class Attend',
            notes:      'classx.notes',
            stage:      classx.stageName,
            level:      classx.levelName,
            class:      classx.className,
            students:   classx.students,
            classId:    classx._id

          });
          classAttend.save()
          .then( newClassAttend => {
            console.log('newClassAttend =>>>>>', newClassAttend)
            // return res.status(201).json({
            //   message: 'new class Attend Added successfully:::: DB',
            //   status: 201
            // });
          })
          .catch(err => { console.log('newClassAttend =>>>', err) })        
        }
        }
      )
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  })
}

async function addMultiBusAttend() {
  let B = [];
  B = await Bus.find().sort();

  B.map( (busX, no) => {
    let d = 5;
    let m = "November"
    // console.log("busX =>", busX)
  BusAttend.findOne({
    day:    d,
    month:  m,
    type:   "bus Attend",
    area:   busX.area,
    busNo:  busX.busNo,
   })
    .then( findBusAttendedDay=> {
      console.log('findBusAttendedDay ...=>', findBusAttendedDay)
      if (findBusAttendedDay) {
        return;
      } else {

        let studentsX = []

        busX.students.map( (student, no) => {
          studentsX.push({ id: student._id, name: student.name.firstname + student.name.lastname })
        })

        // console.log("studentsX => ", studentsX)
        const busAttend = new BusAttend({
          day:        d,
          month:      m,
          type:       "bus Attend",
          area:       busX.area,
          busNo:      busX.busNo,
          notes:      "busx note",
          drivar:     busX.drivar,
          supervisor: busX.supervisor,
          students:   studentsX,
          busId:      busX._id
        });
        busAttend.save()
        .then( newBusAttend => {
          console.log("newBusAttend =>", newBusAttend)
          // res.status(201).json({
          //   message: 'new bus Attend Added successfully:::: DB',
          //   status: 201
          // });
        })
        .catch(err => { console.log('newBusAttend =>>>', err) })
      }
    }) 

  })

}

exports.saveClassAttend = async (req, res, next) => {
  // addMultiClassAttend()
  ClassAttend.findOne({ 
    stage: req.body.stage, 
    level: req.body.level, 
    class: req.body.class, 
    day:   req.body.day, 
    month: req.body.month, 
    type:  req.body.type })
    .then( findCalss => {
      if (findCalss) {
        res.status(500).json({
            message: 'this class attend exist ::: DB'
          })
      } else {
        const classAttend = new ClassAttend({
          day:        req.body.day,
          month:      req.body.month,
          type:       req.body.type,
          notes:      req.body.notes,
          stage:      req.body.stage,
          level:      req.body.level,
          class:      req.body.class,
          students:   req.body.students,
          classId:    req.body.classId
        });
        classAttend.save()
        .then( newClassAttend => {
          console.log('newClassAttend =>>>>>', newClassAttend)
          return res.status(201).json({
            message: 'new class Attend Added successfully:::: DB',
            status: 201
          });
        })
        .catch(err => { console.log('newClassAttend =>>>', err) })        
      }
      }
    )

}

exports.saveBusAttend = async (req, res, next) => {
  // addMultiBusAttend()
  BusAttend.findOne({
    day:    req.body.day,
    month:  req.body.month,
    type:   req.body.type,
    area:   req.body.area,
    busNo:  req.body.busNo,
   })
    .then( findBusAttendedDay=> {
      console.log('findBusAttendedDay ...=>', findBusAttendedDay)
      if (findBusAttendedDay) {
        res.status(500).json({
          message: 'this bus attend exist ::: DB'
        })
      } else {
        const busAttend = new BusAttend({
          day:        req.body.day,
          month:      req.body.month,
          type:       req.body.type,
          area:       req.body.area,
          busNo:      req.body.busNo,
          notes:      req.body.note,
          drivar:     req.body.drivar,
          supervisor: req.body.supervisor,
          students:   req.body.students,
          busId:      req.body.busId
        });
        busAttend.save()
        .then( newBusAttend => {
          res.status(201).json({
            message: 'new bus Attend Added successfully:::: DB',
            status: 201
          });
        })
        .catch(err => { console.log('newBusAttend =>>>', err) })
      }
    }) 
}

// // get all lines attend
exports.getAllAttendes = (req, res, next) => {
  
  Attendes.find()
  .then(documents => {
    // console.log('documents =>' , documents)
    res.status(200).json({
      message: "attendes fetched successfully!",
      attendes: documents,
      status: 200
    });
  })
  .catch( err => {
    res.status(500).json({
      message: err + 'attendes fetched error:::: DB',
      status: 500
    });
  });
}

// get all classes attend
exports.getClassDayesAttend = (req, res, next) => {
  const month = req.params.month;
  // console.log('class month', month)
  ClassAttend.find({month: month})
  .then(documents => {
    // console.log('documents =>' , documents)
    res.status(200).json({
      message: "class attend fetched successfully!",
      dayesAttend: documents,
      status: 200
    });
  })
  .catch( err => {
    res.status(500).json({
      message: err + 'class attend fetched error:::: DB',
      status: 500
    });
  });
}

// get all bus attend
exports.getBUsDayesAttend = (req, res, next) => {
  const month = req.params.month;
  // console.log('bus month', month)

  BusAttend.find({month: month})
  .then(documents => {
    // console.log('documents =>' , documents)
    res.status(200).json({
      message: "Bus attend fetched successfully!",
      dayesAttend: documents,
      status: 200
    });
  })
  .catch( err => {
    res.status(500).json({
      message: err + ' bus attend fetched error:::: DB',
      status: 500
    });
  });
}

function removeDuplicates(array) {
  let a = []
  array.map(x => {if(!a.includes(x)) { a.push(x) }})
  return a
};

function addNewDayClassAttend(day, type, notes, month, levelName, className, students, creator, monthId) {
  ClassAttend.findOne({
    day:    day,
    month:  month,
    type:   type })
    .then( findCalssAttendedDay=> {
      console.log('findCalssAttendedDay ...=>', findCalssAttendedDay)
      if (findCalssAttendedDay) {
        console.log('findCalssAttendedDay update day attend')
        ClassAttend.findOne({day: day, month: month, type: type }, 
                            {classesAttendes: {'$elemMatch': { levelName: levelName, className: className }}})
        .then( isLevelAndName => {
          console.log('isLevelAndName =>', isLevelAndName)
          if (isLevelAndName && isLevelAndName.classesAttendes.length == 1) {
            console.log('isLevelAndName here............')
            res.status(201).json({
              message: 'this class attend exist ::: DB'
            })
          } else {
            console.log('add new leve and class push ............')
            const classAttend = {
              notes:      notes,
              levelName:  levelName,
              className:  className,
              students:   students,
              creator:    creator,
            }
            ClassAttend.updateOne({day: day, month: month, type: type}, { $push: { classesAttendes: classAttend }})
            .then( classAttend => {
              console.log('classAttend =>', classAttend)
              res.status(201).json({
                message: 'add new class name ::: DB'
              })
            })
          }
        })
      } else {
        const classAttend = new ClassAttend({
          day:        day,
          month:      month,
          type:       type,
          classesAttendes: {
            notes:      notes,
            levelName:  levelName,
            className:  className,
            students:   students,
            creator:    creator,
          },
          monthId: monthId,
        })
        classAttend.save()
        .then( newClassAttend => {
          console.log('newClassAttend =>>>>>', newClassAttend)
          return res.status(201).json({
            message: 'new class Attend Added successfully:::: DB',
            status: 201
          });
        })
        .catch(err => { console.log('newClassAttend =>>>', err) })
      }
    })
}

function addNewDayBusAttend(day, type, notes, month, area, busNo, drivar, students, creator, supervisor, monthId) {

  // new one
      BusAttend.findOne({
        day:    day,
        month:  month,
        type:   type })
        .then( findBusAttendedDay=> {
          console.log('findBusAttendedDay ...=>', findBusAttendedDay)
          if (findBusAttendedDay) {
            console.log('findBusAttendedDay update day attend')
            BusAttend.findOne({day: day, month: month, type: type }, 
                                {busAttendes: {'$elemMatch': { area: area, busNo: busNo }}})
            .then( isAreaAndBusNo => {
              console.log('isAreaAndBusNo =>', isAreaAndBusNo)
              if (isAreaAndBusNo && isAreaAndBusNo.busAttendes.length == 1) {
                console.log('isAreaAndBusNo here............')
                res.status(201).json({
                  message: 'this bus attend exist ::: DB'
                })
              } else {
                console.log('add new area and bus no push ............')
                const busAttend = {
                  area:       area,
                  busNo:      busNo,
                  notes:      notes,
                  drivar:     drivar,
                  supervisor: supervisor,
                  students:   students,
                  creator:    creator,
                }
                BusAttend.updateOne({day: day, month: month, type: type}, { $push: { busAttendes: busAttend }})
                .then( busAttend => {
                  console.log('busAttend =>', busAttend)
                  res.status(201).json({
                    message: 'add new class name ::: DB'
                  })
                })
              }
            })
          } else {
            const busAttend = new BusAttend({
              day:        day,
              month:      month,
              type:       type,
              busAttendes: {
                area:       area,
                busNo:      busNo,
                notes:      notes,
                drivar:     drivar,
                supervisor: supervisor,
                students:   students,
                creator:    creator,
              },
              monthId: monthId,
            })
            busAttend.save()
            .then( newBusAttend => {
              console.log('newBusAttend =>>>>>', newBusAttend)
              return res.status(201).json({
                message: 'new bus Attend Added successfully:::: DB',
                status: 201
              });
            })
            .catch(err => { console.log('newBusAttend =>>>', err) })
          }
        }) 
}

exports.getClassfillters = async (req, res, next) => {
  


  // const m = await ClassAttend.aggregate([
  //   // {
  //   //   $sort: { "$month": -1 }
  //   // },
  //   { "$group": 
  //     { 
  //       "_id": "$type", 
  //       "month": { $addToSet: "$month"}, 
  //     }
  //   },
  //   {
  //     "$sort": { "month": 1 } 
  //   }
  // ])

  const d = await ClassAttend.aggregate([
    // { $unwind: "$details" },
    // { $match: { _id: ObjectId('5eeba9743b33762675f7d333')}},
    { "$match": { "classId": mongoose.Types.ObjectId('5eeba9743b33762675f7d333') } },

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
        //  "day":       { $addToSet: "$day"},
        //  "students":  { $addToSet: "$students"},
    }},
    {
      "$group": { 
        _id: {
          month: "$_id.month",
        },
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


  res.status(200).json({
    message: "get Class fillters fetched successfully!",
    // m: m,
    d: d,
  });






//   db.orders.aggregate({
//     $unwind: "$details"
// }, {
//     $group: {
//         _id: {
//             month: {$month: "$timestamp"},
//             day: {$dayOfMonth: "$timestamp"},
//             year: {$year: "$timestamp"},
//             item: "$details.item"
//         },
//         totalqty: {$sum: "$details.qty"},
//         totalamt: {$sum: "$details.amt"}
//     }
// }, {
//     $group: {
//         _id: {
//             month: "$_id.month",
//             day: "$_id.day",
//             year: "$_id.year"
//         },
//         products: {
//             $push: {
//                 item: "$_id.item",
//                 totalqty: "$totalqty",
//                 totalamt: "$totalamt"
//             }
//         }
//     }
// })




  // ClassAttend.find()
  // .then(attend => {
  //   let a = []
  //   attend.map(month => {if(!a.includes(month)) { a.push(month) }})
  //   console.log('a =>', a)
      
  //   res.status(200).json({
  //     a: a.length ,
  //     message: "get Class fillters fetched successfully!",
  //     attend: attend,
  //     status: 200
  //   });
    
  // })

}

