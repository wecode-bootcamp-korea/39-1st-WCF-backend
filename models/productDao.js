const { appDataSource } = require("./dataSource");
const {
  orderSet,
  makeProductQueryBuilders,
} = require("../models/productQueryBuilder");

const getProductDetail = async (productId) => {
  return await appDataSource.query(
    `
    SELECT
      products.id,
      products.title,
      brands.name AS brand,
      products.price,
      products.thumbnail,
      pi.images,
      po.size
  FROM products
  LEFT JOIN brands ON products.brand_id = brands.id
  LEFT JOIN (
    SELECT
      product_id,
      JSON_ARRAYAGG(
        JSON_OBJECT(
        "id", id,
        "url", image_url)
      ) as images
    FROM product_images
    GROUP BY product_id
  ) as pi ON products.id = pi.product_id
  LEFT JOIN (
    SELECT
      product_id,
      JSON_ARRAYAGG(
        JSON_OBJECT(
        "id", size_id,
        "product_options", product_options.id,
        "size", sizes.size
      )
    ) as size
    FROM product_options
    INNER JOIN sizes ON product_options.size_id = sizes.id
    GROUP BY product_id
  ) as po ON products.id = po.product_id
  WHERE products.id = ?
  GROUP BY products.id;
    `,
    [productId]
  );
};

const getProductList = async (params) => {
  const {
    limit = 10,
    offset = 0,
    sortMethod = "created_at",
    ...filterOptions
  } = params;

  const whereClause = makeProductQueryBuilders(filterOptions);
  const orderbyClause = orderSet[sortMethod];

  const result = await appDataSource.query(
    `
        SELECT 
            sub_categories.name AS subcategory,
            products.id AS productId,
            title,
            price,
            brands.name,
            thumbnail
        FROM products
        INNER JOIN brands ON products.brand_id = brands.id
        INNER JOIN sub_categories ON products.sub_category_id = sub_categories.id
        INNER JOIN product_options ON products.id = product_options.id
        ${whereClause}
        ORDER BY ${orderbyClause}
        `
  );
  return result;
};

module.exports = {
  getProductDetail,
  getProductList,
};
