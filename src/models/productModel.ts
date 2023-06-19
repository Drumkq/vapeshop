import {Schema, SchemaTypes, model} from "mongoose";

interface IProduct extends Document {
    name: string,
    description: string,
    imagePaths: [string]
}

const ProductSchema = new Schema({
        name: {
            type: SchemaTypes.String,
            required: true
        },
        description: {
            type: SchemaTypes.String,
            required: true
        },
        imagePaths: {
            type: [SchemaTypes.String],
            required: true
        }
    }
);

const Product = model<IProduct>('Product', ProductSchema, 'products');

export {
    IProduct,
    Product
}
