import dotenv from 'dotenv'
import dotenvParseVariables from 'dotenv-parse-variables'

let env: any = dotenv.config()
if (env.error) console.log(env.error)
env = dotenvParseVariables(env.parsed!)

export const settings = {
  ENV: env.ENV || 'develop',
  PORT: env.PORT || 3000,
  SECRET: env.SECRET || 'somesecrettoken',
  DB: {
    define: {
      charset: "utf8mb4",
      collate: "utf8mb4_bin"
    },
    USER: env.DB_USER,
    PASSWORD: env.DB_PASSWORD,
    HOST: env.DB_HOST,
    PORT: env.DB_PORT,
    NAME: env.DB_NAME,
    DIALECT: env.DB_DIALECT || "postgres",
    TIMEZONE:env.TZ || "UTC",
  }
  // MAILER: {
  //   HOST: env.MAIL_HOST,
  //   PORT: env.MAIL_PORT,
  //   USERNAME: env.MAIL_USERNAME,
  //   PASSWORD: env.MAIL_PASSWORD,
  //   FROM_ADDRESS: env.MAIL_FROM_ADDRESS,
  //   FROM_NAME: env.MAIL_FROM_NAME,
  // },
}
