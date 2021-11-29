import express, { Request, Response } from 'express'
import { signup, signin, signinWithOTP, requestOTP } from '../controllers/auth.controller'
import { getLobby, setLobbyToActive, setLobbyToInactive } from '../controllers/lobby.controller'
import { passwordReset, passwordResetRequest, passwordResetCheckToken } from '../controllers/pw.controller'
import { allAccess, userBoard, adminBoard, moderatorBoard } from '../controllers/user.controller'
import { verifyMail } from '../controllers/verifyMail.controller'
import authJwt from '../middleware/authJwt'
import verifyBody from '../middleware/verifyBody'
import verifySignUp from '../middleware/verifySignup'

const router = express.Router()

router.post('*', verifyBody)
router.post('/auth/signup', verifySignUp.checkDuplicateUsernameOrEmail, signup)
router.post('/auth/signin', signin)
router.post('/auth/signinWithOTP', signinWithOTP)
router.post('/auth/requestOTP', requestOTP)

router.get('/pw/reset-pw-request', passwordResetRequest)
router.get('/pw/reset-pw-check', passwordResetCheckToken)
router.post('/pw/reset-pw', passwordReset)

router.post('/lobby/activate',[authJwt.verifyToken, authJwt.isEmployee],setLobbyToActive)
router.post('/lobby/deactivate',[authJwt.verifyToken, authJwt.isEmployee],setLobbyToInactive)
router.post('/lobby/createVideoRoom',[authJwt.verifyToken, authJwt.isEmployee])
router.post('/lobby/closeVideoRoom',[authJwt.verifyToken, authJwt.isEmployee])
router.get('/lobby/:id',[authJwt.verifyToken, authJwt.isCustomer], getLobby)

router.get('/mail/verifyMail', verifyMail)
router.get('/test/all', allAccess)
router.get('/user', [authJwt.verifyToken], userBoard)
router.get(
  '/test/mod',
  [authJwt.verifyToken, authJwt.isEmployee],
  moderatorBoard
)

router.get(
  '/test/admin',
  [authJwt.verifyToken, authJwt.isAdmin],
  adminBoard
)
export default router
