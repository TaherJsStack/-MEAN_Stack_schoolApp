const Parent = require('../models/parent');
const Student = require('../models/student');

const QRCode  = require('qrcode')
var path = require('path');
var appDir = path.dirname(require.main.filename);

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

function makenumberLess5(length) {
  var result           = '';
  var characters       = '12345';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

exports.addGroupOfParent = (req, res, next) => {
  const url = req.protocol + '://' + req.get('host');
  
  for(let i = 0; i<785  ; i++) {

  const ginder = ["mail", "female"];
  let ginderR  = ginder[Math.floor(Math.random() * ginder.length)];

  const cites = ["Cairo", "Giza", "Haram", "Ma'adi", "Mohandeseen", "Nasr City", "Heliopolis", "Downtown", "6 October", "Qatamia"];
  let city = cites[Math.floor(Math.random() * cites.length)];
  
  let firstname = makeSmallString(5);
  let lastname  = makeSmallString(5);
  let email     = makeString(6);
  let phone     = makenumber(8);
  let zipCode   = makenumber(4)

  Parent.findOne({email: email+'@gmail.com', phone: 11+''+phone })
    .then( parentExist => {
      if (parentExist) {
        console.log('ctrl save parent exist =>', parentExist);
        return 
      } else {

        let   date = new Date().toLocaleDateString().split("/").join("");
        const parentCount  = Math.floor(Math.random() * Math.floor(6554));
        const parentCodeId = parentCount+''+date;

        const parent = new Parent({
          name: {
            firstname : firstname,
            lastname  : lastname,
          },
          address: {
            country: 'Egypt',
            street:  city,
            zip:     zipCode,
            city:    city,
          },
          notes:     'req body notes',
          job:       'job',
          email:     email+'@gmail.com',
          phone:     11+''+phone,
          ginder:    ginderR,
          roll:      'parent',
          imageUrl:  '',
          birthdate:    new Date(),
          parentCodeId: parentCodeId,
          activeAccount: true,
          childes:    []
        })
        console.log('ctrl const parent =>', parent)
        parent.save()
        .then( newParentId => {
        console.log('ctrl const parent =>', parent._id)
        res.status(201).json({
            newParentID: newParentId._id,
            message: 'Parent added successfully:::: DB ID',
            status: 201
          });
        })
        .catch( err => {
          res.status(500).json({
            message: err + 'Parent error :::: DB',
            status: 500
          });
        });
      }
    })

  }

}

exports.saveParent = (req, res, next) => {
  const url = req.protocol + '://' + req.get('host');

  console.log('saveParent =>',  req.body)


  Parent.findOne({email: req.body.email})
    .then( parentExist => {
      if (parentExist) {
        console.log('ctrl save parent exist =>', parentExist);
        return res.status(400).json({
          message: 'parent alrady exist Added By '+ parentExist.name.firstname +' :::: DB ',
          status: 400
        });
      } else {

        let   date = new Date().toLocaleDateString().split("/").join("");
        const parentCount  = Math.floor(Math.random() * Math.floor(6554));
        const parentCodeId = parentCount+''+date;

        let imageUrlFilename = '';
        if (req.file != undefined) {
          imageUrlFilename = url + '/images/parents/' + req.file.filename;
        }

        const parent = new Parent({
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
          parentCodeId: parentCodeId,
          activeAccount: req.body.activeAccount,
          childes:    []
        })
        console.log('ctrl const parent =>', parent)
        parent.save()
        .then( newParentId => {
          res.status(201).json({
            newParentID: newParentId._id,
            message: 'Parent added successfully:::: DB ID',
            status: 201
          });
        })
        .catch( err => {
          res.status(500).json({
            message: err + 'Parent error :::: DB',
            status: 500
          });
        });
      }
    })
}

exports.getAllParents = (req, res, next) => {
  const pageSize    = +req.query.pagesize;
  const currentPage = +req.query.page;
  const parentQuery = Parent.find().sort({created_at: -1});
  let fetchedParents;
  if (pageSize && currentPage) {
    parentQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }

  parentQuery
    .then(documents => {

      // *******************************************************************************************************************

    // documents.map( parent => {
    //   // console.log('documents parents =>', parent.childes.length)

    //   if (parent.childes.length == 0) {
      
    //     let num = makenumberLess5(1);
      
    //     console.log('num =>', num)

    //     const url = req.protocol + '://' + req.get('host');
    //     for(let i = 0; i< num; i++) {

    //   let educationalStage = ['preschool', 'elementary', 'middle', 'high'];
    //   let stage  = educationalStage[Math.floor(Math.random() * educationalStage.length)];

    //   let levels;
    //   if (stage == 'preschool') {
    //      levels  = ['level 1', 'level 2'];
    //   } else if(stage == 'elementary') {
    //      levels  = ['level 1', 'level 2', 'level 3', 'level 4', 'level 5', 'level 6'];
    //   } else {
    //      levels  = ['level 1', 'level 2', 'level 3'];
    //   }
    //   let level  = levels[Math.floor(Math.random() * levels.length)];

    //   const ginder = ["mail", "female"];
    //   let ginderR  = ginder[Math.floor(Math.random() * ginder.length)];


    //   let firstname = makeSmallString(5);
    //   let email     = makeString(6);
    //   let phone     = makenumber(8);

    //   Student.findOne({email: email+'@gmail.com', phone: phone})
    //     .then( StudentExist => {
    //       console.log('StudentExist =>', StudentExist)
    //       if (StudentExist) {  
    //         return 
    //       } else {

    //         let   date = new Date().toLocaleDateString().split("/").join("");
    //         const studentCount  = Math.floor(Math.random() * Math.floor(6554));
    //         const studentCardId = studentCount+''+date;
    //         QRCode.toFile(appDir + '/images/qrcode/'+studentCardId+'.png', studentCardId)

    //         const student = new Student({
    //           name: {
    //             firstname : firstname,
    //             lastname  : parent.name.firstname
    //           },
    //           address: {
    //             country: 'Egypt',
    //             street:  parent.address.city,
    //             zip:     parent.address.zip,
    //             city:    parent.address.city,
    //           },
    //           QRCodePath:  url + '/images/qrcode/'+studentCardId+'.png',
    //           QRCodeValue: studentCardId,
    //           cardId:    studentCardId,
    //           notes:     'req.body.notes',
    //           email:     email+'@gmail.com',
    //           phone:     11+''+phone,
    //           ginder:    ginderR,
    //           roll:      'student',
    //           level:     level,
    //           className: '',
    //           imageUrl:  '',
    //           birthdate: new Date(),
    //           created_at:  new Date(),
    //           parentEmail: parent.email,
    //           parentPhone:      parent.phone,
    //           activeAccount:    false,
    //           educationalStage: stage,
    //           creatorId:   '5e6a54e19d245039203152fa',
    //           creatorName: 'taher ahmed', 
    //           expenses: {
    //             bass:       false,
    //             books:      false,
    //             school:     false,
    //             clothes:    false,
    //           }
    //         })
    //         console.log('ctrl const Student =>', student)
    //         student.save()
    //         .then( newStudent => {
    //           // find parent and update 
    //           // add student to parent
    //           const newStudentData =  {id: newStudent._id, phone: newStudent.phone, email: newStudent.email};
    //           console.log('t =====================>', newStudentData)
    //           Parent.findOne({email: newStudent.parentEmail})
    //           .then( parent => { 
    //             // console.log('b =====================>', parent)
    //             Parent.updateOne({_id: parent._id}, 
    //               { $push: { childes: newStudentData }}
    //               ).then ( (d) => {
    //                 console.log('=>>>>>>>>>>d',d )
                    
    //                 res.status(201).json({
    //                 newStudentID: newStudent._id,
    //                 message: 'Student added successfully:::: DB ID',
    //                 status: 201
    //               });
    //               })
    //           })
            
    //         })
    //         .catch( err => {
    //           res.status(500).json({
    //             message: err + 'Student error :::: DB',
    //             status: 500
    //           });
    //         });
    //       }
    //     })

    //     // loop end
    //   }

    // }

    // })

      // ******************************************************************************************************************
      fetchedParents = documents;
      return Parent.count();
    })
    .then(count => {
      res.status(200).json({
        message: "Parents fetched successfully!",
        parents: fetchedParents,
        maxPosts: count,
        status: 200
      });
    })
    .catch( err => {
      res.status(500).json({
        message: err + 'Parent fetched error:::: DB',
        status: 500
      });
    });



  }

exports.updateOne = (req, res, next) => {

  console.log('req.params.id', req.params.id);
  console.log('req.pody', req.body);
  console.log('req.pody', req.body.country);

  const url = req.protocol + '://' + req.get('host');

  let imageUrlFilename = req.body.image;
  if (req.file != undefined) {
    imageUrlFilename = url + '/images/parents/' + req.file.filename;
  }

  const updateParent= new Parent({
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
    activeAccount: req.body.activeAccount,
    childes:    JSON.parse(req.body.childes)
  })
  console.log('updateParent:::: DB => ', updateParent);

  Parent.updateOne({_id: req.params.id}, updateParent)
  .then( (p) => {
    // console.log('p is =>', p)
    res.status(201).json({
      message: 'Product Updated successfully:::: DB',
      status: 201
    });
  })
  .catch( err => {
    res.status(500).json({
      message: err + 'Product updated error:::: DB',
      status: 500
    });
  });
}

exports.updateOneState = (req, res, next) => {
  // console.log('req.params.id', req.file);
  console.log('req.params.id', req.params.id);
  const newProductSatae = new Product({
    _id:         req.body.id,
    showProduct: req.body.showProduct,
  });
  console.log(' => Product:::: DB', newProductSatae);
  Parent.findByIdAndUpdate({_id: req.params.id}, newProductSatae)
  .then( () => {
    res.status(200).json({
      message: 'Product Updated successfully:::: DB',
      status: 200
    });
  })
  .catch( err => {
    res.status(500).json({
      message: err + 'Product updated error:::: DB',
      status: 500
    });
  });
}

exports.getParentChildes = ( req, res, nex ) => {

  const parentEmail = req.params.parentEmail;
  const parentPhone = req.params.parentPhone;
  console.log('parentPhone  ====>', parentPhone);

  Student.find({parentPhone: parentPhone, parentEmail: parentEmail})
  .then( childes => {
    console.log('parent find One =>', childes);
    res.status(200)
    .json({
      message: "product find One successfully!:::: DB",
      childes: childes,
    })
  })
  .catch( err => {
    console.log('parent err ====>', err)
    res.status(500)
    .json({
      message: "'parent err ====>'!:::: DB" + err,
    })

  })
}

exports.findOneById = ( req, res, nex ) => {
  const parentId = req.params.parentId;
  console.log('parent Email ====>', parentId);
  Parent.findOne({_id: parentId})
  .then( parent => {
    console.log('parent find One =>', parent);
    res.status(200)
    .json({
      message: "product find One successfully!:::: DB",
      parent: parent,
    })
  })
  .catch( err => {
    console.log('parent err ====>', err)
    res.status(500)
    .json({
      message: "'parent err ====>'!:::: DB" + err,
    })
  })
}

exports.findOneByEmail = ( req, res, nex ) => {
  const parentEmail = req.params.parentEmail;
  console.log('parent Email ====>', parentEmail);
  Parent.find({email: parentEmail})
  .then( parent => {
    console.log('parent find One =>', parent);
    res.status(200)
    .json({
      message: "product find One successfully!:::: DB",
      parents: parent,
    })
  })
  .catch( err => {
    console.log('parent err ====>', err)
    res.status(500)
    .json({
      message: "'parent err ====>'!:::: DB" + err,
    })

  })
}

exports.deleteOne = (req, res, next) => {
  console.log('deleteOne req params id =>', req.params.id);
  console.log('deleteOne req params id =>', req.params.emai);
  console.log('deleteOne req params id =>', req.params.phone);

  Student.deleteMany( { parentEmail: req.params.emai, parentPhone: req.params.phone})
  .then( students => {
    console.log('deleteMany =>', students.length)
    Parent.deleteOne({_id: req.params.id})
      .then( result => {
        res.status(200).json({
          message: "product Deleted One successfully!:::: DB",
          status: 200
        });
      })
      .catch( err => {
        res.status(500).json({
          message: err + 'Product Deleted error:::: DB',
          status: 500
        });
      });  
  })

}