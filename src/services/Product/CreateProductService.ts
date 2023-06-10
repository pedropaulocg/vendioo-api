import { HTTPError } from "../../middlewares/error_handler";
import Product from "../../models/Product";
import * as Yup from "yup";

interface Request {
  userId: string | number;
  name: string;
  price: number;
  serialNumber?: string;
  description?: string;
}

export const CreateProductService = async ({
  userId,
  name,
  price,
  serialNumber,
  description
}: Request): Promise<Product> => {

  const schema = Yup.object().shape({
    name: Yup.string().required(),
    price: Yup.number().required(),
    serialNumber: Yup.string(),
    description: Yup.string(),
  })

  try {
    await schema.validate({name, price, serialNumber, description});
  } catch (e) {
    console.log(e);
    throw new HTTPError(400, 'Verifique os campos')
  }

  const product = await Product.create({
    name,
    description,
    serialNumber,
    price,
    userId
  })

  return product;
}