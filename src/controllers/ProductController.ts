import { Request, Response, NextFunction } from "express";
import ListarProdutosService from "../services/Product/ListarProdutosService";
import { CreateProductService } from "../services/Product/CreateProductService";
import { UpdateProductService } from "../services/Product/UpdateProductService";
import { DeleteProductService } from "../services/Product/DeleteProductService";

type IndexQuery = {
  searchParams?: string;
  pageNumber?: string | number;
};

export const listarProdutos = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.user
    // const {searchParams, pageNumber} = req.query as IndexQuery

    const products = await ListarProdutosService({userId})

    res.status(200).json(products);
  } catch (error) {
    next(error); 
  }
};

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.user;
    const {name, price, description, serialNumber} = req.body;
    const products = await CreateProductService({userId, name, price, description, serialNumber})

    res.status(200).json(products);
  } catch (error) {
    next(error); 
  }
};

export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { productId } = req.params
    const { name, price, description, serialNumber } = req.body;
    const products = await UpdateProductService({ productId, name, price, description, serialNumber })

    res.status(200).json(products);
  } catch (error) {
    next(error); 
  }
};

export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { productId } = req.params
    await DeleteProductService(productId)

    res.status(200).json({message: "Produto deletado"});
  } catch (error) {
    next(error); 
  }
};