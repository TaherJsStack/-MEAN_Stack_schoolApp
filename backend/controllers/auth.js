const Auth      = require('../models/auth')
const SocialLogin  = require('../models/socialLogin')
const jwt        = require('jsonwebtoken');
const bcrypt     = require('bcryptjs');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key: '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'
    }
  })
);

exports.checkEmail = (req, res, next) => {
  console.log('===============================')
  const month = req.params.email;
  Auth.findOne({ email: req.params.email })
  .then( user => {
    // console.log('user:: =>', user);
    if (user === null) {
      // console.log('user:: 2=>', user.error);
      return res.status(500).json({
        message: 'this email doesn\'t exist',
        status: 500
      })
    } else {
      return res.status(200).json({
        message: 'this email exist',
        status: 200
      })
    }

  })
  .catch(err => {
    console.log('catch error =>', err.message)
    return res.status(500).json({
      message: 'err => ::: error catch' + err.message,
      status: 500
    })
  })
}

exports.saveAuth = (req, res, next) => {
  console.log('req.body =>', req.body)
  bcrypt.hash(req.body.password, 10)
    .then( hash => {
    const newAuth = new Auth({
      auth:        req.body.auth, 
      roll:        req.body.roll, 
      email:       req.body.email,
      password:    hash,
    });
    console.log('newAuth =>', newAuth);
    newAuth.save()
    .then( newAuthId => {
      res.status(201).json({
        newAuthID: newAuthId._id,
        message: 'check email added successfully:::: DB ',
        status: 201
      });
      console.log('newAuthId.email', newAuthId.email);
      return transporter.sendMail({
        to:    newAuthId.email,
        from: 't.taher.php@gmail.com',
        subject: 'Signup succeeded!',
        html: ` <h1>You successfully signed up!</h1>
                <br>
                your name is: ${ newAuthId.email }
                <br>
                your mail is: ${ newAuthId } `,

      });
    })
    .catch(err => {
      res.status(500).json({
        error: 'the email is already used ',
        message: err.errors.email.message,
        status: 500
      });
      // console.log('err =>',  err.errors.email.message)
    })
  });
}

exports.login = (req, res, next) => {
  let fetchedAuth;
  Auth.findOne({ email: req.body.authEmail })
  .then( user => {
    if (user === null) {
      return res.status(401).json({
        message:  'this email doesn\'t exist ::: DB',
        status: 401
      })
    }
    fetchedAuth = user;
    return bcrypt.compare( req.body.authPassword, user.password )
  })
  .then( result => {
    if (!result) {
      return res.status(401).json({
        message: 'this password doesn\'t compare ::: DB',
        status: 401
      })
    }
    const token = jwt.sign(
        {
          email:  fetchedAuth.email,
          userId: fetchedAuth._id,
          roll:   fetchedAuth.roll,
          name:   fetchedAuth.auth[0].name.firstname + ' ' + fetchedAuth.auth[0].name.lastname
        },
        'secret_this_should_be_longer',
        {expiresIn: "5h"}
      );
      // console.log('fetchedAuth.roll =>', fetchedAuth.roll)
      res.status(200)
        .json({
          name:  fetchedAuth.auth[0].name.firstname + ' ' + fetchedAuth.auth[0].name.lastname,
          image: fetchedAuth.auth[0].imageUrl,
          token: token,
          message: token,
          expiresIn: 3600,      /// 1 hour  to => 3600 seconds
          roll: fetchedAuth.roll,
          authId: fetchedAuth._id,
          status: 200
        })
  })
  .catch(err => {
      console.log('catch error =>', err.message)
      return res.status(500).json({
        message: 'err => ::: error catch' + err.message,
        status: 500
      })
    })
}

exports.onSocialLogin = (req, res, next) => {
  // console.log('SocialLogin req =>>>>>>>>>>', req.body)
  SocialLogin.findOne({ email: req.body.email })
  .then( user => {
    console.log('user:: =>', user);
    if (user !== null) {
      console.log('SocialLogin :: 2=>', user);
      const token = jwt.sign(
        {
          email:  user.email,
          userId: user._id,
          roll:   user.provider,
          name:   user.name
        },
        'secret_this_should_be_longer',
        {expiresIn: "1h"}
      );
      return res.status(200).json({
          user: user,
          message: 'this email exist ::: DB',
          id: user._id, 
          authToken: token,
          status: 201
      })
    } else {
      const newSocialLogin = new SocialLogin({
        id:        req.body.id,
        name:      req.body.name,
        email:     req.body.email,
        photoUrl:  req.body.photoUrl,
        firstName: req.body.firstName,
        lastName:  req.body.lastName,
        authToken: req.body.authToken,
        facebook:  req.body.facebook,
        provider:  req.body.provider,
      });
      newSocialLogin.save()
      .then( addedSocial => {
        res.status(201).json({
          user: addedSocial,
          id: addedSocial._id, 
          authToken: addedSocial.authToken,
          message: 'check email added successfully:::: DB ',
          status: 201
        });
      })
    }
  })
  .catch(err => {
    console.log('catch error =>', err.message)
    return res.status(500).json({
      message: 'err => ::: error catch' + err.message,
      status: 500
    })
  })
}

exports.getSocialAuth = (req, res, next) => {
  SocialLogin.find()
  .then( user => {
    return res.status(200).json({
      authors: user,
      message: 'get Social Auth ::: DB',
      status: 200
    })
  })
  .catch(err => {
    console.log('catch error =>', err.message)
    return res.status(500).json({
      message: 'err => ::: error catch' + err.message,
      status: 500
    })
  })
}

exports.getAuthInfo = (req, res, next) => {
  // console.log('SocialLogin req =>>>>>>>>>>', req.params)
  Auth.findOne({ _id: req.params.authId })
  .then( user => {
    // console.log('user:: =>', user);
    // console.log('getAuthInfo :: 2=>', user);
    return res.status(200).json({
        auth: user,
        message: 'get Auth Info ::: DB',
        status: 200
    })
  })
  .catch(err => {
    console.log('catch error =>', err.message)
    return res.status(500).json({
      message: 'err => ::: error catch' + err.message,
      status: 500
    })
  })
}

exports.getAuthors = (req, res, next) => {
  Auth.find()
  .then( Authors => {
    return res.status(200).json({
        authors: Authors,
        message: 'get Authors Info ::: DB',
        status: 200
    })
  })
  .catch(err => {
    console.log('catch error =>', err.message)
    return res.status(500).json({
      message: 'err => ::: error catch' + err.message,
      status: 500
    })
  })
}

