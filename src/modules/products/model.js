import { fetchData } from "../../utils/postgres.js" 

const ALL_CATEGORIES =
`
    SELECT * FROM categories;
`
const CREATE_CATEGORY =
`
    INSERT INTO categories(category_name) values($1)
`
const UPDATE_CATEGORIES = 
`
    UPDATE categories set category_name = $1 where category_id = $2
`
const DELETE_CATEGORY = 
`
    DELETE FROM categories where category_id = $1
`
const ARCHIVE_CREATED_CATEGORY =
`
 select * from insert_arcive ;
`
const ARCHIVE_UPDATED_CATEGORY =
`
 select * from updateProduct_archive;
`
const ARCHIVE_DELETED_CATEGORY =
`
 select * from updateProduct_archive;
`
const ALL_PRODUCTS = 
`
select 
p.product_id,
p.product_name,
p.product_price,
c.category_name as category
from
products as p
inner join 
categories as c 
on 
p.category = c.category_id;    
`
const CREATE_PRODUCTS =
`
   insert into products(category, product_name, product_price) values($1, $2, $3);
`
const UPDATE_PRODUCT =
`
 update products set category = $1, product_name = $2, product_price = $3 where product_id = $4
// update products set 
//     category = case
//         when $1 is null
//             then category
//                 else $1
// end,
//    product_name = case
//            when $2 is null or $2 = ''
//                then product_name
//                    else $2
// end,
//      product_price = case
//            when $3 is null or $3 = 0
//                then product_price
//                    else $3
// end
// where product_id = $4
`
const DELETE_PRODUCT = 
`
    delete from products where product_id = $1
`
const DELETED_ARCHIVE = 
`
    select * from deleteProduct_archive;
`
const UPDATED_PRODUCT_ARCHIVE = 
`
    select * from updateProduct_archive;
`
const CREATED_PRODUCT_ARCHIVE = 
`
    select * from insertProduct_archive;
`

export const allCategories = () => fetchData(ALL_CATEGORIES)
export const createCategory = category_name => fetchData(CREATE_CATEGORY, category_name)
export const updateCategory = (category_name, cateId) => fetchData(UPDATE_CATEGORIES, category_name, cateId)
export const deleteCategory = cateId => fetchData(DELETE_CATEGORY, cateId)
export const archiveCreateCategory = () => fetchData(ARCHIVE_CREATED_CATEGORY)
export const archiveUpdateCategory = () => fetchData(ARCHIVE_UPDATED_CATEGORY)
export const archiveDeleteCategory = () => fetchData(ARCHIVE_DELETED_CATEGORY)

// from here started products

export const allProducts = () => fetchData(ALL_PRODUCTS)
export const createProduct = (category, product_name, product_price) => fetchData(CREATE_PRODUCTS, category, product_name, product_price)
export const updateProduct = (category, product_name, product_price, productId) => fetchData(UPDATE_PRODUCT, category, product_name, product_price, productId)
export const deleteProduct = productId => fetchData(DELETE_PRODUCT, productId)
export const deletedArchiveProducts = () => fetchData(DELETED_ARCHIVE)
export const updatedArchiveProducts = () => fetchData(UPDATED_PRODUCT_ARCHIVE)
export const createdArchiveProducts = () => fetchData(CREATED_PRODUCT_ARCHIVE)
