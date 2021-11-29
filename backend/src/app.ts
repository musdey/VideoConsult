import express, { NextFunction, Request, Response } from 'express'
import routerV1 from './routes/router'
import logger from 'morgan'
import cors from 'cors'
import * as dotenv from 'dotenv'
import connectDB from './db/connect'
import initalizeRoles from './db/initalizeRoles'
import notFoundHandler from "./middleware/not-found-handler";
import errorHandler from "./middleware/error-handler";
import dbNotUp from './middleware/db-not-up'
import crypto from 'crypto'

dotenv.config()

const mongodbHost = process.env.MONGODB_HOST || 'localhost'
const mongodbUser = process.env.MONGO_NON_ROOT_USERNAME || ''
const mongodbPw = process.env.MONGO_NON_ROOT_PASSWORD || ''
const mongodbDBName = process.env.MONGO_INITDB_DATABASE || 'ckd-database'

// Connect mongoose
connectDB(mongodbHost, 27017, mongodbUser, mongodbPw, mongodbDBName, 10000)
initalizeRoles()

// initializeTestUser()
const app = express()

// Setup middleware
app.use(logger('dev'))
app.use(dbNotUp)
app.use(function (req: Request, res: Response, next: NextFunction) {
  res.header(
    'Access-Control-Allow-Headers',
    'x-access-token, Origin, Content-Type, Accept'
  )
  next()
})
app.use(cors())
app.use(express.json())
// app.use(express.static(path.join(__dirname, 'public')))

// Setup routes
app.use('/api/v1', routerV1)
app.get('/hi', (req, res) => {
  res.json({ message: 'Welcome to bezkoder application.' })
})
app.use(notFoundHandler())
app.use(errorHandler())

crypto.randomBytes(24, function(err, buffer) {
  var token = buffer.toString('hex');
  console.log(token)
  });

export default app
