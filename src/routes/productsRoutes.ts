import { Router } from "express";
import * as ProductController from "../controllers/ProductController";
import auth from "../middlewares/auth";

const productRoutes = Router();

productRoutes.get("/products", auth, ProductController.listarProdutos);

productRoutes.post("/products", auth, ProductController.createProduct);

productRoutes.put("/products/:productId", auth, ProductController.updateProduct)

productRoutes.delete("/products/:productId", auth, ProductController.deleteProduct)

export default productRoutes;
