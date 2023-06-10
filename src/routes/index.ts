import { Router } from 'express'

import userRoutes from "./userRoutes" 
import authRoutes from "./sessionRoutes"
import productRoutes from "./productsRoutes"
import appointmentRoutes from "./appointmentRoutes"

const routes = Router();

routes.use(userRoutes)
routes.use(authRoutes)
routes.use(productRoutes)
routes.use(appointmentRoutes)

export default routes
