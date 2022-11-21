const orderSet = {
  price_DESC: "price DESC",
  price_ASC: "price ASC",
};

const brandFilterBuilder = (value) => {
  return `brands.id = ${value}`;
};

const sizeFilterBuilder = (value) => {
  return `product_options.size_id = ${value}`;
};

const subcategoryFilterBuilder = (value) => {
  return `sub_category_id = ${value}`;
};

const makeProductQueryBuilders = (params) => {
  const builderSet = {
    subCategoryId: subcategoryFilterBuilder,
    brandId: brandFilterBuilder,
    sizeId: sizeFilterBuilder,
  };

  const wherePhrase = Object.entries(params).map(([key, value]) => {
    return builderSet[key](value);
  });

  if (wherePhrase.length !== 0) {
    return `WHERE ${wherePhrase.join(" AND ")}`;
  } else {
    return " ";
  }
};

module.exports = { orderSet, makeProductQueryBuilders };
