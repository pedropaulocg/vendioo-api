import { HTTPError } from "../../middlewares/error_handler";
import Product from "../../models/Product";
import * as Yup from "yup";

interface Request {
  name?: string;
  price?: number;
  serialNumber?: string;
  description?: string;
  productId: number | string;
}

export const UpdateProductService = async ({
  name,
  price,
  serialNumber,
  description,
  productId
}: Request): Promise<Product> => {

  const product = await Product.findOne({
    where: {
      id: productId,
    }
  })

  if (!product) {
    throw new HTTPError(404, "Produto não encontrado");
  }

  await product.update({
    name,
    description,
    serialNumber,
    price
  })

  product.reload()

  return product
  
}