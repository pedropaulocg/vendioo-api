import { HTTPError } from "../../middlewares/error_handler";
import Product from "../../models/Product";


interface Request {
  userId: string | number;
  pageNumber?: string | number;
  searchParams?: string;
}

interface Response {
  products: Product[];
  count: number;
}

const ListarProdutosService = async ({
  userId,
}: Request): Promise<Response> => {
  
  const { count, rows: products } = await Product.findAndCountAll({
    where: {
      userId
    }
  })

  return {
    products,
    count
  };
} 

export default ListarProdutosService;

