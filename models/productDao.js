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

module.exports = {
  getProductDetail,
};
