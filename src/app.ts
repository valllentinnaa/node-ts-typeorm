import dotenv from 'dotenv'

dotenv.config({
  path: process.env.NODE_ENV !== 'production' ? `.env.${process.env.NODE_ENV}` : '.env',
})

import express from 'express'
import { createConnection } from 'typeorm'
import router from './routes'
import logger from 'morgan'
import cors from 'cors'
import swaggerUI from 'swagger-ui-express'
import errorMiddleware from './middleware/error.middleware'
import log from './lib/utils/log'
import swaggerJSDoc from 'swagger-jsdoc'
import { swaggerOptions } from './docs/swagger-options'

const port: number = parseInt(`${process.env.PORT}`, 10) || 4000
const host: string = process.env.HOST || '127.0.0.1'
const specs = swaggerJSDoc(swaggerOptions)

// create and setup express app
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(logger('dev'))
app.use(cors())

// Documentation setup
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs))

// Router setup
app.use('/api', router)

// Not covered in router pages setup
app.get('*', (req, res) => {
  res.redirect('/api-docs')
})

// Initializing middleware
app.use(errorMiddleware)

createConnection()
  .then(_connection => {
    app.listen(port, () => {
      log.info(`Server listening on http://${host}:${port} in ${process.env.NODE_ENV} mode`)
    })
  })
  .catch(e => log.error('TypeORM connection error: ', e))

export default app
