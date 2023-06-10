import { Sequelize } from "sequelize-typescript";
import User from "../models/User";
import Product from "../models/Product";
import Appointment from "../models/Appointment";
// eslint-disable-next-line
const dbConfig = require("../config/database");
// import dbConfig from "../config/database";

const sequelize: Sequelize = new Sequelize(dbConfig);

const models =[
  User,
  Product,
  Appointment
]

sequelize.addModels(models);


export default sequelize

