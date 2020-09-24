// const Auth  = require('../models/auth')
const jwt     = require('jsonwebtoken');
const bcrypt     = require('bcryptjs');
// const nodemailer = require('nodemailer');
const Student = require('../../models/student');
const Parent  = require('../../models/parent');
const Classes = require('../../models/studentsClass');
const LogeedUser = require('../../models/mobile/logeedUsers')
const Notifications = require('../../models/notifications')

const ClassAttend  = require('../../models/classAttend')
const BusAttend    = require('../../models/busAttend')

exports.onCheckEmail  = (req, res, next) => {
  Parent.findOne({ email: req.params.email })
  .then( parent => {
    // console.log('parent:: =>', parent);
    if (parent == null) {
      Student.findOne({ email: req.params.email })
      .then( student => {
        // console.log('Student:: =>', student);
        if (student == null) {
          return res.status(500).json({
            message: 'this email doesn\'t exist',
            status: 500
          })
        } else {
          return res.status(200).json({
            message: 'Student email',
            status: 200
          })
        }
      })
      .catch( err => {
        return res.status(500).json({
          message: "email does not exist",
          status: 500
        })  
      })
    } else {
      return res.status(200).json({
        message: "parent email",
        status: 200
      })
    }
  })
}

exports.mobileLogin = (req, res, next) => {
  console.log('mobileLogin req.body =>', req.body)
  Parent.findOne({ email: req.body.email })
  .then( parent => {
    console.log('parent:: =>', parent);
    if (parent === null) {
      Student.findOne({ email: req.body.email, cardId:  req.body.password })
      .then( student => {
        console.log('Student:: =>', student);
        const token = jwt.sign(
          {
            email:  student.email,
            userId: student._id,
            roll:   student.roll,
            name:   student.name.firstname + ' ' + student.name.lastname
          },
          'secret_this_should_be_longer',
          {expiresIn: "1h"}
        );
        console.log('student.roll =>', student.roll)
        res.status(200)
          .json({
            token: token,
            message: " parent welcome message ",
            userInfo: student,
            status: 200
          })

      })
      .catch(err => {
        console.log('catch error =>', err.message)
        return res.status(200).json({
          message: "password doesn't match",
          status: 500
        })
      })

    }
    Parent.findOne({ email: req.body.email, parentCodeId: req.body.password })
    .then( parentFound => {
      console.log(' parentFound =>', parentFound)
      const token = jwt.sign(
        {
          email:  parentFound.email,
          userId: parentFound._id,
          roll:   parentFound.roll,
          name:   parentFound.name.firstname + ' ' + parentFound.name.lastname
        },
        'secret_this_should_be_longer',
        {expiresIn: "1h"}
      );
      console.log('parentFound.roll =>', parentFound.roll)
      res.status(200)
        .json({
          token: token,
          message: " parent welcome message ",
          userInfo: parentFound,
          status: 200
        })
    })
    .catch(err => {
      console.log('catch error =>', err.message)
      return res.status(200).json({
        message: "password doesn't match",
        status: 200
      })
    })

  })

}

exports.registerFCMToken = (req, res, next) => {
  // console.log('registerFCMToken req.body =>', req.body)
  LogeedUser.findOne({userId: req.body.userId, uuid: req.body.uuid})
  .then(findUser => {
    console.log('findUser =>', findUser)
    if (findUser == null) {
      
      const register = new LogeedUser({
        uuid:          req.body.uuid,
        userId:        req.body.userId,
        fcmToken:      req.body.fcmToken,
        fullPhoneInfo: req.body.fullPhoneInfo,
        fullUserData:  req.body.fullUserData,
      })
      register.save()
      .then(registered => {
        console.log(' registered done =>', registered)
      })
      .catch( err => {
        console.log(' registered err =>', err)
      })
    } else {
      console.log(' update fcm err =>')

    }

  })
  .catch( err => {
    console.log(' Loged User find err =>', err)
  })


}

exports.getRegisteredFCMToken = (req, res, next) => {

  LogeedUser.find()
  .then(registered => {
    console.log(' registered done =>', registered)
    return res.status(200).json({
      message: "get Registered FCM Token",
      registered: registered,
      status: 200
    })
  })
  .catch( err => {
    console.log('getRegisteredFCMToken => ', err)
    return res.status(500).json({
      message: "get Registered FCM Token err ",
      status: 500
    })
  })

}

exports.getUserNotifications = (req, res, next) => {
  console.log('user id =>', req.params.userId)
  const userId = req.params.userId;

  Notifications.find({ userId: userId })
  .then(Notifications => {
    console.log(' Notifications done =>', Notifications)
    return res.status(200).json({
      message: "get Notifications FCM Token",
      Notifications: Notifications,
      status: 200
    })
  })
  .catch( err => {
    console.log('get Notifications err => ', err)
    return res.status(500).json({
      message: "get Notifications err ",
      status: 500
    })
  })
}

exports.getStudent = (req, res, next) => {
  // console.log('getStudent stage =>', req.params.stage)
  // console.log('getStudent id =>', req.params.studentId)

  Student.findOne({_id: req.params.studentId })
  .then( student => {
    // console.log('Classes.findOne => ', student)
    if (student) {
      Classes.findOne({students: {'$elemMatch': { id: req.params.studentId }}})
      .then( classData => { 
        // console.log('classData =>', classData)
        return res.status(200).json({
          message: "student and class info",
          student: student,
          class: classData,
          status: 200
        })
      })
      .catch( err => {
        console.log('Classes.findOne => ', err)
        return res.status(500).json({
          message: "Class findOne err ",
          status: 500
        })        
      })
    }
  })
  .catch( err => {
    console.log('Classes.findOne => ', err)
    return res.status(500).json({
      message: "student findOne err ",
      status: 500
    })
  })
  
}

exports.getStydentAttend = (req, res, next) => {
  // console.log('getStydentAttend id =>', req.params.studentId)
  
  ClassAttend.find({"classesAttendes.students": {'$elemMatch': { id: req.params.studentId }}})
  .then( classData => { 
    console.log('getStydentAttend class=>', classData)
    // console.log('getStydentAttend class length=>', classData.length)

    if (classData && classData != null) {
        BusAttend.find({"busAttendes.students": {'$elemMatch': { id: req.params.studentId }}})
        .then( busData => { 
          // console.log('getStydentAttend bus=>', busData)
          // console.log('getStydentAttend bus length=>', busData.length)
          return res.status(200).json({
            message: "student attend class and bus info",
            classAttend: classData,
            busAttend:   busData,
            status: 200
          })
        })
        .catch( err => {
          // console.log('getStydentAttend bus err => ', err)
          res.status(500).json({
            message: "catch student bus attend info err ",
            status: 500
          })        
        })
            
    } else {
      // if no bus found data
      return res.status(200).json({
        message: "no bus found data only class",
        classAttend: classData,
        busAttend:   [],
        status: 200
      })
    }

  })
  .catch( err => {
    console.log('getStydentAttend err => ', err)
    return res.status(500).json({
      message: "student attend info err ",
      status: 500
    })        
  })


}
