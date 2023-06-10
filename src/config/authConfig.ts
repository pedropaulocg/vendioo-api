import dotenv from 'dotenv'
import dotenvParseVariables from 'dotenv-parse-variables'

let env: any = dotenv.config()
if (env.error) console.log(env.error)
env = dotenvParseVariables(env.parsed!)

export default {
  secret: env.SECRET || "mad4srsZIISQ0G1MJPoQIeq3PVf25EaR",
  expiresIn: "7d",
};