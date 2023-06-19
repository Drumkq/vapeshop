import {IProduct, Product} from "../models";
import {Request, Response} from "express";
import Products from "../routes/products";

async function addProduct(req: Request, res: Response) {
    const product: IProduct = req.body;

    if (!product) {
        throw new InvalidBodyError();
    }

    const dbProduct = await Product.findOne({name: product.name});
    if (dbProduct) {
        throw new EntityExistsError();
    }

    const createdProduct = await Product.create(product);
    res.json(createdProduct);
}

async function removeProduct(req: Request, res: Response) {
    const {name} = req.body;

    if (!name) {
        throw new InvalidBodyError();
    }

    const dbProduct = await Product.findOne({name});
    if (!dbProduct) {
        throw new EntityNotFoundError();
    }

    await dbProduct.deleteOne();

    res.sendStatus(200);
}

async function getProducts(req: Request, res: Response) {
    const products = await Product.find();

    res.json(products);
}

async function getProduct(req: Request, res: Response) {
    const {name} = req.body;

    const product = await Product.findOne({name});
    if (!product) {
        throw new EntityNotFoundError();
    }

    res.json(product);
}

export {
    addProduct,
    removeProduct,
    getProducts,
    getProduct
};
