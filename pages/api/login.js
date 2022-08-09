import nextConnect from 'next-connect'
import auth from '../../middleware/auth'
import passport from '../../lib/passport'

const handler = nextConnect()
// passport.authenticate('local'),
handler.use(auth).post(passport.authenticate('local'), (req, res) => {
  console.log("req.session in login:", req.session)
  console.log("req.user in login:", req.user)
  res.status(200).json({ user: req.user })
})

export default handler
