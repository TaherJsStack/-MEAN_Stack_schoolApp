const Employee = require('../models/employee');

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

exports.saveGroupOfEmployee = (req, res, next) => {

  for(let i = 0; i<12 ; i++) {

    const ginder = ["mail", "female"];
    let ginderR  = ginder[Math.floor(Math.random() * ginder.length)];
  
    const cites = ["Cairo", "Giza", "Haram", "Ma'adi", "Mohandeseen", "Nasr City", "Heliopolis", "Downtown", "6 October", "Qatamia"];
    let city = cites[Math.floor(Math.random() * cites.length)];

    employeeWorkType = ['Administrative', 'accountant', 'driver', 'worker', 'baby sitter'];
    let work  = employeeWorkType[Math.floor(Math.random() * employeeWorkType.length)];
    let salary;

    if (work == 'Administrative') {
      salary = 5500;
    } else if(work == 'accountant') {
      salary = 5000;
    } else if(work == 'driver') {
      salary = 4500;
    } else if(work == 'worker') {
      salary = 4300;
    } else if(work == 'baby sitter') {
      salary = 4300;
    }

    let firstname = makeSmallString(5);
    let lastname  = makeSmallString(5);
    let email     = makeString(6);
    let phone     = makenumber(8);

    Employee.findOne({email: email+'@gmail.com'})
    .then( EmployeeExist => {
      if (EmployeeExist) {
        return
      } else {
        const employee = new Employee({
          name: {
            firstname : firstname,
            lastname  : lastname
          },
          address: {
            country: 'Egypt',
            street:  city,
            city:    city,
          },
          notes:     'req body notes',
          job:       req.body.job,
          email:     email+'@gmail.com',
          phone:     11+''+phone,
          ginder:    ginderR,
          roll:      'employee',
          imageUrl:  '',
          birthdate:  new Date(),
          created_at: new Date(),
          activeAccount: true,
          workHours: 0,
          salary:    salary,
          work:      work,
          creatorId: 'creatorId',
          creatorName: 'name', 
        })
        // console.log('ctrl const Employee =>', employee)
        employee.save()
        .then( newEmployeeId => {
          res.status(201).json({
            newEmployeeID: newEmployeeId._id,
            message: 'Employee added successfully:::: DB ID',
            status: 201
          });
        })
        .catch( err => {
          res.status(500).json({
            message: err + 'Employee error :::: DB',
            status: 500
          });
        });
      }
    })

    // ****************************************************************************************
  }

}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



exports.saveEmployee = (req, res, next) => {
  const url = req.protocol + '://' + req.get('host');
  Employee.findOne({email: req.body.email})
    .then( EmployeeExist => {
      if (EmployeeExist) {
        // console.log('ctrl save Employee exist =>', EmployeeExist);
        return res.status(400).json({
          message: 'Employee alrady exist Added By '+ EmployeeExist.name.firstname +' :::: DB ',
          status: 400
        });
      } else {

        let imageUrlFilename = '';
        if (req.file != undefined) {
          imageUrlFilename = url + '/images/employees/' + req.file.filename;
        }

        const employee = new Employee({
          name: {
            firstname : req.body.firstname,
            lastname  : req.body.lastname
          },
          address: {
            country: req.body.country,
            street:  req.body.street,
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
          created_at: req.body.created_at,
          activeAccount: req.body.activeAccount,
          creatorId: req.body.creatorId,
          workHours: req.body.workHours,
          salary:    req.body.salary,
          work:      req.body.work,
          creatorId:   req.authData.id,
          creatorName: req.authData.name, 
        })
        // console.log('ctrl const Employee =>', employee)
        employee.save()
        .then( newEmployeeId => {
          res.status(201).json({
            newEmployeeID: newEmployeeId._id,
            message: 'Employee added successfully:::: DB ID',
            status: 201
          });
        })
        .catch( err => {
          res.status(500).json({
            message: err + 'Employee error :::: DB',
            status: 500
          });
        });
      }
    })
}

exports.getAllEmployees = (req, res, next) => {
  const pageSize    = +req.query.pagesize;
  const currentPage = +req.query.page;
  const EmployeeQuery = Employee.find();
  let fetchedEmployees;
  if (pageSize && currentPage) {
    EmployeeQuery.skip(pageSize * (currentPage - 1)).limit(pageSize).sort({work:1, created_at: -1});
  }
  // console.log("fetchedEmployee => ", EmployeeQuery);
  EmployeeQuery
    .then(documents => {
      fetchedEmployees = documents;
      return Employee.count();
    })
    .then(count => {
      res.status(200).json({
        message: "Employees fetched successfully!",
        employees: fetchedEmployees,
        maxPosts: count,
        status: 200
      });
    })
    .catch( err => {
      res.status(500).json({
        message: err + 'Employee fetched error:::: DB',
        status: 500
      });
    });
}

exports.updateOne = (req, res, next) => {

  const url = req.protocol + '://' + req.get('host');

  let imageUrlFilename = '';
        if (req.file != undefined) {
          imageUrlFilename = url + '/images/employees/' + req.file.filename;
        } else if(req.body.imageUrl) {
          imageUrlFilename = req.body.imageUrl
        }

  const newEmployee = new Employee({
    _id:         req.params.id,
    name: {
      firstname : req.body.firstname,
      lastname  : req.body.lastname
    },
    address: {
      country: req.body.country,
      street:  req.body.street,
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
    created_at: req.body.created_at,
    activeAccount: req.body.activeAccount,
    creatorId: req.body.creatorId,
    workHours: req.body.workHours,
    salary:    req.body.salary,
    work:      req.body.work,
  })

  Employee.updateOne({_id: req.params.id}, newEmployee)
  .then( () => {
    res.status(201).json({
      message: 'Employee Updated successfully:::: DB',
      status: 201
    });
  })
  .catch( err => {
    res.status(500).json({
      message: err + 'Employee updated error:::: DB',
      status: 500
    });
  });
}

exports.updateOneState = (req, res, next) => {
  console.log('req.params.id', req.params.id);
  const newEmployeeSatae = new Employee({
    _id:         req.body.id,
    // showStudent: req.body.showStudent,
  });
  console.log(' => Employee:::: DB', newEmployeeSatae);
  Employee.findByIdAndUpdate({_id: req.params.id}, newEmployeeSatae)
  .then( () => {
    res.status(200).json({
      message: 'Employee Updated successfully:::: DB',
      status: 200
    });
  })
  .catch( err => {
    res.status(500).json({
      message: err + 'Employee updated error:::: DB',
      status: 500
    });
  });
}

exports.deleteOne = (req, res, next) => {
  console.log('Employee req params id =>', req.params.id);
  Employee.deleteOne({_id: req.params.id})
    .then( result => {
      res.status(200).json({
        message: "Employee Deleted One successfully!:::: DB",
        status: 200
      });
    })
    .catch( err => {
      res.status(500).json({
        message: err + 'Employee Deleted error:::: DB',
        status: 500
      });
    });
}

exports.findOneByEmail = ( req, res, next ) => {
  let employeeEmail = req.params.employeeEmail;

  Employee.find({email: employeeEmail})
  .then( employee => {
    console.log('findOne employee =>', employee)
    res.status(200).json({
      employee: employee,
      message: "employee find One successfully!:::: DB",
      status: 200
    })
  })
  .catch( err => {
    console.log('findOne employee err =>', err)
    res.status(404).json({
      message: "employee find One error !:::: DB",
      status: 404
    })
  })
}

exports.workTypeFillter = ( req, res, next ) => {
  let workType = req.params.workType;

  Employee.find({work: workType})
  .then( employees => {
    console.log('findOne employees =>', employees)
    res.status(200).json({
      employees: employees,
      message: "employee find successfully!:::: DB",
      status: 200
    })
  })
  .catch( err => {
    // console.log('find employee err =>', err)
    res.status(404).json({
      message: "employee find error !:::: DB",
      status: 404
    })
  })
} 
