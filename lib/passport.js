import passport from 'passport'
import LocalStrategy from 'passport-local'
import { findUserByUsername, validatePassword } from './db'

// done(null, user) 似乎此函数会将user放入req.user

passport.serializeUser(function (user, done) {
  // serialize the username into session

  console.log('user in serializeUser:',user)
  done(null, user.username)
})

passport.deserializeUser(function (req, username, done) {
  // deserialize the username back into user object
  console.log('username in deserializeUser:',username)
  const user = findUserByUsername(req, username)
  done(null, user)
})

passport.use(
  new LocalStrategy(
    { passReqToCallback: true },
    (req, username, password, done) => {
      // Here you lookup the user in your DB and compare the password/hashed password
      console.log('username in LocalStrategy:', username)
      const user = findUserByUsername(req, username)
      console.log('user in LocalStrategy:', user)
      // Security-wise, if you hashed the password earlier, you must verify it
      // if (!user || await argon2.verify(user.password, password))
      if (!user || !validatePassword(user, password)) {
        console.log('dddddf----fff')
        done(null, null)
      } else {
        console.log('true true true')
        done(null, user)
      }
    }
  )
)

export default passport
