const bCrypt = require('bcrypt-nodejs');
var Sequelize = require('sequelize')

module.exports = function (passport, user) {
    const User = user;
    const LocalStrategy = require('passport-local').Strategy;

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id).then(function (user) {
            if (user) {
                done(null, user.get());
            }
            else {
                done(user.errors, null);
            }
        });

    });

    //LOCAL REGISTER
    passport.use('local-register', new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },
        function (req, email, password, done) {
            const generateHash = function (password) {
                return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
            };
            User.findOne({
                where: {
                    email: email
                }
            }).then(function (user) {
              const userPassword = generateHash(password);
              const data = {
                email: email,
                password: userPassword,
                firstName: req.body.firstName,
                lastName: req.body.lastName
              };

              User.create(data).then(function (newUser, created) {
                if (!newUser) {
                  return done(null, false);
                }
                if (newUser) {
                  return done(null, newUser);
                }
              }).catch(Sequelize.ValidationError, function (err) {
                // print the error details
                console.log('ERROR: **** ' + err, req.body.email);

              });
            }).catch(function (err) {
              // handle error;
              console.log('ERROR: **** ', err);
            });
        }
    ));

    //LOCAL SIGN IN
    passport.use('local-login', new LocalStrategy(
        {// by default, local strategy uses username and password, we will override with email
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },

        function (req, email, password, done) {
            // const User = user;
            const isValidPassword = function (userpass, password) {
                return bCrypt.compareSync(password, userpass);
            };

            User.findOne({
                where: {
                    email: email
                }
            }).then(function (user) {
                if (!user) {
                    return done(null, false, {
                        message: 'Email does not exist'
                    });
                }
                if (!isValidPassword(user.password, password)) {
                    return done(null, false, {
                        message: 'Incorrect password.'
                    });
                }
                const userinfo = user.get();
                return done(null, userinfo);

            }).catch(function (err) {
                console.log("Error:", err);
                return done(null, false, {
                    message: 'Something went wrong with your Signin'
                });
            });
        }
    ));
}
