export type ProductType = {
  id: number;
  name: string;
  description: string;
  image: string;
  fullImagePath: string;
  price: number;
  weight: number;
  height: number;
  size: number;
  descriptionCorta: string;
  productsRelationated: ProductType[];
};

export type dataGetProductsByCategory = {
  categoryId: number | string;
  page: number;
};
