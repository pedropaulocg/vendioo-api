import './alias'
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import helmet from 'helmet'
import logger from './helpers/logger'
import routes from './routes'
import { rateLimiterMiddleware } from './middlewares/rate_limiter'
import { settings } from './config/settings'
import { handleErrorMiddleware } from './middlewares/error_handler'
import sequelize from './database/index'

class Server {
  public app: express.Application

  constructor() {
    this.app = express()
    this.middlewares()
    this.routes()
    this.initSequelize()
  }

  middlewares() {
    this.app.use(morgan('[:date[iso]] (:status) ":method :url HTTP/:http-version" :response-time ms - [:res[content-length]]'))
    this.app.use(cors())
    this.app.use(rateLimiterMiddleware)
    this.app.use(helmet())
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: false }))
  }

  routes() {
    this.app.use(routes)
    this.app.use(handleErrorMiddleware)
  }

  async initSequelize() {
    sequelize.authenticate().then(() => {
      console.log('🌐 Connection to database has been established successfully.');
    }).catch((error) => {
      console.error('Unable to connect to the database: ', error);
    });
  }

  start() {
    this.app.listen(settings.PORT, () => {
      logger.info('🚀 Server listen on port ' + settings.PORT)
    })
  }
}

const server = new Server()
server.start()
