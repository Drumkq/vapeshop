import {addProduct, getProduct, getProducts, removeProduct} from "../controllers/assortmentController";
import {roleRequired} from "../middleware";
import {Router} from "express";

const router = Router();

router.post('/products/add', roleRequired(['ADMIN']), addProduct);
router.post('/products/remove', roleRequired(['ADMIN']), removeProduct);
router.get('/products/get/all', getProducts);
router.get('/products/get/one', getProduct);

export default router;