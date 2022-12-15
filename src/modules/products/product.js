import { ErrorHandler } from "../../exeptions/errorHandler.js"
import { allCategories, allProducts, archiveCreateCategory, archiveDeleteCategory, archiveUpdateCategory, createCategory, createdArchiveProducts, createProduct, deleteCategory, deletedArchiveProducts, deleteProduct, updateCategory, updatedArchiveProducts, updateProduct } from "./model.js"

export default {
    GET_CATEGORIES: async(req, res, next) => {
        const data = await allCategories()
        if (data) {
            res.json({
                data: data,
                status: 200
            })
        }
    },
    CREATE_CATEGORY: async(req, res, next) => {
        const { category_name } = req.body

        const data = await createCategory(category_name)
        if (data) {
            res.json({
                message: 'Created succesfully',
                status: 201
            })
        }
    },
    UPDATE_CATEGORY: async(req, res, next) => {
        const { cateId } = req.params
        const { category_name } = req.body
        console.log(cateId,category_name);

        const data = await updateCategory(category_name, cateId).catch(err => next(new ErrorHandler(err.message, 500)))
        if (data) {
            res.json({
                message: 'Updated succesfully',
                status: 200
            })
        }
    },
    DELETE_CATEGORY: async(req, res, next) => {
        const { cateId } = req.params

        const data = await deleteCategory(cateId).catch(err => next(new ErrorHandler(err.message, 500)))
        if (data) {
            res.json({
                message: 'Deleted succesfully',
                status: 200
            })
        }
    },
    GET_ARCHIVE_CREATE_CATEGORIES: async(req, res, next) =>{

        const data = await archiveCreateCategory().catch(err => next(new ErrorHandler(err.message, 500)))
        if (data) {
            res.json({
                data: data,
                status: 200
            })
        }
    },
    GET_ARCHIVE_UPDATE_CATEGORIES: async(req, res, next) =>{

        const data = await archiveUpdateCategory().catch(err => next(new ErrorHandler(err.message, 500)))
        if (data) {
            res.json({
                data: data,
                status: 200
            })
        }
    },
    GET_ARCHIVE_DELETE_CATEGORIES: async(req, res, next) =>{

        const data = await archiveDeleteCategory().catch(err => next(new ErrorHandler(err.message, 500)))
        if (data) {
            res.json({
                data: data,
                status: 200
            })
        }
    },
    GET_ALL_PRODUCTS: async(req, res, next) => {

        const data = await allProducts().catch(err => next(new ErrorHandler(err.message, 500)))
        if (data) {
            res.json({
                data: data,
                status: 200
            })
        }
    },
    CREATE_PRODUCT: async(req, res, next) => {
        const {category, product_name, product_price} = req.body

        const data = await createProduct(category, product_name, product_price).catch(err => next(new ErrorHandler(err.message, 500)))
        if (data) {
            res.json({
                message: 'Created succesfully',
                status: 201
            })
        }
    },
    UPDATE_PRODUCT: async(req, res, next) => {
        const { productId } = req.params
        const { category, product_name, product_price } = req.body
        console.log(category, product_name, product_price );

        const data = await updateProduct(category, product_name, product_price, productId).catch(err => next(new ErrorHandler(err.message, 500)))
        if (data) {
            res.json({
                message: 'Updated succesfully',
                status: 200           
             })
        }
    },
    DELETE_PRODUCT: async(req, res, next) => {
        const { productId } = req.params

        const data = await deleteProduct( productId).catch(err => next(new ErrorHandler(err.message, 500)))
        if (data) {
            res.json({
                message: 'Deleted succesfully',
                status: 200           
             })
        }
    },
    GET_DELETED_PRODUCT_ARCHIVE: async(req, res, next) => {

        const data = await deletedArchiveProducts().catch(err => next(new ErrorHandler(err.message, 500)))
        if (data) {
            res.json({
                data: data,
                status: 200           
             })
        }
    },
    GET_UPDATED_PRODUCT_ARCHIVE: async(req, res, next) => {

        const data = await updatedArchiveProducts().catch(err => next(new ErrorHandler(err.message, 500)))
        if (data) {
            res.json({
                data: data,
                status: 200           
             })
        }
    },
    GET_CREATED_PRODUCT_ARCHIVE: async(req, res, next) => {

        const data = await createdArchiveProducts().catch(err => next(new ErrorHandler(err.message, 500)))
        if (data) {
            res.json({
                data: data,
                status: 200           
             })
        }
    }
}