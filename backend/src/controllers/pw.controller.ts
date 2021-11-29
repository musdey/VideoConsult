import { Handler, NextFunction, Request, Response } from 'express'
import User from '../models/User'
import crypto from 'crypto'
import errors from '../lib/errors'
import ResetUserPassword from '../models/ResetUserPassword'
import sendMail from '../service/mailService'
import bcrypt from 'bcryptjs'
import {MailType} from '../types/index'

const EXPIRYTIME = 60 * 60 * 1000 // 1 hours

const passwordResetRequest: Handler = async (req: Request, res: Response, next: NextFunction) => {
  const email = req.query.email
  console.log(email)
  if (!email && typeof email !== 'string') {
    return res.status(400).send({ message: 'E-Mail address missing.', error: errors.InputMissing })
  }

  const user = await User.findOne({ email: email as string})

  if (!user) {
    return res.status(404).send({ message: 'No user with given E-mail found.', error: errors.BadRequest })
  }

  const token = await crypto.randomBytes(50).toString('hex')

  try {
    const newResetPW = new ResetUserPassword({
      email: email,
      time: Date.now(),
      resetPasswordExpires: Date.now() + EXPIRYTIME,
      resetPasswordToken: token
    })

    const result = await newResetPW.save()

    await sendMail(user.username || user.firstName, email as string, token, MailType.RESETPW)

    res.status(200).end('Successfully requested new password')
    return
  } catch (err) {
    return next(err)
  }
}

const passwordResetCheckToken: Handler = async (req: Request, res:Response, next: NextFunction) => {
  if (!req.query.token) {
    res.status(400).end('Request invalid')
  }
  const restPW = await ResetUserPassword.findOne({
    resetPasswordToken: req.query.token as string,
    resetPasswordExpires: { $gt: new Date() }
  })
  if (!restPW) {
    //res.status(400).end('Password reset token is invalid or has expired.')
    return next('PWTOKENEXP')
  }

  res.status(200).end('Token valid')
}

const passwordReset: Handler = async (req: Request, res: Response, next: NextFunction) => {
  const data = req.body
  if (!data.token || !data.password) {
    return res.status(400).send({ message: 'Token or password missing.', error: errors.InputMissing })
  }

  const resetPassword = await ResetUserPassword.findOne({ resetPasswordToken: data.token })
  if (!resetPassword) {
    return res.status(404).send({ message: 'No PW request with this token found', error: errors.BadRequest })
  }

  try {
    const user = await User.findOne({ email: resetPassword.email })
    if (user) {
      user.password = bcrypt.hashSync(req.body.password, 8)
      await user.save()
      // TODO: inaktivate resetPassword object
    }
    return res.status(200).send({ message: 'New password has been set successfully.' })
  } catch (err) {
    return next(err)
  }
}

export { passwordReset, passwordResetRequest, passwordResetCheckToken }
