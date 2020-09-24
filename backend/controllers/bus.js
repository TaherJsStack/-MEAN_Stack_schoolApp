const Bus       = require('../models/bus')
const Student   = require('../models/student')
const BusAttend = require('../models/busAttend')

exports.saveBus = async (req, res, next) => {
    // add new bus
    const newBus = new Bus({
      area:       req.body.area, 
      city:       req.body.city, 
      busNo:      req.body.busNo, 
      drivar:     req.body.drivar,
      students:   req.body.students,
      supervisor: req.body.supervisor,
      creator:    req.body.creator,
    })
    newBus.save()
    .then( newBusAdded => {
      console.log('newBusAdded =>', newBusAdded)
      
      newBusAdded.students.map( student => {
        console.log('_s _id =>', student._id)
      Student.findOne({_id: student._id})
      .then( student => { 
        Student.updateOne(
          {_id: student._id}, 
          {  hasBus: true },
          ).then ( () => {
            return res.status(201).json({
              message: 'new Bus Added successfully:::: DB',
              status: 201
            });
          })
      })
      
      })
      
    })
    .catch( err => {
      res.status(500).json({
        message: err + ' buss error :::: DB',
        status: 500
      });
    });
}

// all lines
exports.getAllLines = (req, res, next) => {
  Bus.find()
  .then(documents => {
    // console.log('documents =>' , documents)
    res.status(200).json({
      message: "lines fetched successfully!",
      lines: documents,
      status: 200
    });
  })
  .catch( err => {
    res.status(500).json({
      message: err + 'lines fetched error:::: DB',
      status: 500
    });
  });
}

// one line
exports.getLineData = async (req, res, next) => {
  const busId = req.params.busId;
// console.log('const busId =>', busId)

  let busAttend = [] = await BusAttend.find({busId: busId })

  Bus.findOne({_id: busId})
  .then(document => {
    // console.log('document =>' , document)
    res.status(200).json({
      message: "line fetched successfully!",
      bus: document,
      attends: busAttend,
      status: 200
    });
  })
  .catch( err => {
    res.status(500).json({
      message: err + 'lines fetched error:::: DB',
      status: 500
    });
  });
}

// searshByAreaname
exports.searshByAreaname = (req, res, next) => {
  const areaName = req.params.areaName;
console.log(' areaName =>', areaName)
  Bus.find({area: areaName})
  .then(document => {
    console.log('document =>' , document)
    res.status(200).json({
      message: "line fetched successfully!",
      bus: document,
      status: 200
    });
  })
  .catch( err => {
    res.status(500).json({
      message: err + 'lines fetched error:::: DB',
      status: 500
    });
  });
}
