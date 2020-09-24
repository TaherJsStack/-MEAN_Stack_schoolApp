// const express    = require("express");
// const mongoose   = require('mongoose');
// const bodyParser = require("body-parser");
// const path       = require('path');

// const parentsRouter   = require('./router/parents');
// const studentsRouter  = require('./router/students');
// const teachersRouter  = require('./router/teachers');
// // const paymentsRouter  = require('./router/payments');
// const employeesRouter = require('./router/employees');
// const classesRouter   = require('./router/classes');
// const libraryRouter   = require('./router/library');
// const busRouter       = require('./router/bus');
// const attendesRouter  = require('./router/attendes');
// const authRouter      = require('./router/auth');
// const mobileLoginRouter = require('./router/mobile/login');
// const notifiRouter      = require('./router/notification')
// const textbookRouter    = require('./router/textbook')
// const examesRouter      = require('./router/exames')

// const app = express();

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// // app.use('/images', express.static(path.join( __dirname, 'images')));
// // app.use('/images', express.static(path.join ( __dirname, '/backend/images')));
// app.use('/images', express.static(path.join ( __dirname, '/images')));

// app.use('/', express.static(path.join( __dirname, 'schoolSystem')));
// // app.use('/data', express.static(path.join('data/invoices/invoiceName')));

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//   );
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, PATCH, PUT, DELETE, OPTIONS"
//   );
//   // res.setHeader('Content-Type', 'application/pdf');
//   next();
// });

// mongoose.connect("mongodb+srv://taher:4xFAzCtfFMUYcBPn@cluster0-f1xjd.mongodb.net/school",  { useNewUrlParser: true })
//         .then( () => {
//           console.log("Connected To Database grolpal .......:::: DB");
//         })
//         .catch( () => {
//           console.log("Connection Failed...:::: DB");
//         });

// // mongoose.connect("mongodb://localhost:27017/school", { useNewUrlParser: true })
// //     .then( () => {
// //       console.log("Connected To Database local scholl.......:::: DB");
// //     })
// //     .catch( () => {
// //       console.log("Connection Failed...:::: DB");
// //     });

// app.use("/api/parents",   parentsRouter);
// app.use("/api/students",  studentsRouter);
// app.use("/api/teachers",  teachersRouter);
// // app.use("/api/payments",  paymentsRouter);
// app.use("/api/employees", employeesRouter);
// app.use("/api/classes",   classesRouter);
// app.use("/api/library",   libraryRouter);
// app.use("/api/textbook",  textbookRouter);
// app.use("/api/exames",    examesRouter);
// app.use("/api/bus",       busRouter);
// app.use("/api/attendes",  attendesRouter);
// app.use("/api/notification",  notifiRouter);
// app.use("/api/auth",  authRouter);
// app.use("/api/ionic-api/login/",  mobileLoginRouter);

// app.use( (req, res, next) => {
//   res.sendFile(path.join( __dirname, 'schoolSystem', "index.html"))
// })


// module.exports = app;
// 