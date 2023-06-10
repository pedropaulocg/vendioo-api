import { HTTPError } from "../../middlewares/error_handler"
import Product from "../../models/Product"


export const DeleteProductService = async (productId: string | number): Promise<void> => {
  const product = await Product.findOne({
    where: {
      id: productId,
    }
  })
  
  if (!product) {
    throw new HTTPError(404, "Produto não encontrado")
  }

  await product.destroy();
}

