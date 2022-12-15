import { Router } from "express";
import product from "./product.js";

const productRouter = Router()

export default productRouter
.get('/categories', product.GET_CATEGORIES)
.post('/create-category', product.CREATE_CATEGORY)
.put('/update-category/:cateId', product.UPDATE_CATEGORY)
.delete('/delete-category/:cateId', product.DELETE_CATEGORY)
.get('/archive-create-category', product.GET_ARCHIVE_CREATE_CATEGORIES)
.get('/archive-update-category', product.GET_ARCHIVE_UPDATE_CATEGORIES)
.get('/archive-delete-category', product.GET_ARCHIVE_DELETE_CATEGORIES)
.get('/products', product.GET_ALL_PRODUCTS)
.post('/create-product', product.CREATE_PRODUCT)
.put('/update-product/:productId', product.UPDATE_PRODUCT)
.delete('/delete-product/:productId', product.DELETE_PRODUCT)
.get('/delete-archive-product', product.GET_DELETED_PRODUCT_ARCHIVE)
.get('/update-archive-product', product.GET_UPDATED_PRODUCT_ARCHIVE)
.get('/create-archive-product', product.GET_CREATED_PRODUCT_ARCHIVE)
