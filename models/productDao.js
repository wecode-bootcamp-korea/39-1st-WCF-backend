const { appDataSource } = require("./dataSource");

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

const getProductList = async (whereClause, orderbyClause) => {
  return await appDataSource.query(
    `
        SELECT 
            sub_categories.name AS subcategory,
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
};

const getBrands = async (subCategoryId) => {
  return await appDataSource.query(
    `
    SELECT
    a.id,
    name
  FROM brands AS a
  INNER JOIN products AS b ON b.brand_id = a.id
  WHERE b.sub_category_id = ?
  GROUP BY a.id`,
    [subCategoryId]
  );
};

const getSizes = async () => {
  return await appDataSource.query(`
    SELECT
        id,
        size
    FROM sizes;
    `);
};

module.exports = {
  getProductDetail,
  getProductList,
  getBrands,
  getSizes,
};
