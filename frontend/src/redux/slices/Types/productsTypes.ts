type initialStateType = {
  loading: boolean;
  productById: Product | null;
  productsList: Product[];
  msgError: string;
  msgErrorProduct: string;
  productsCategorySelected: Product[];
  page: number;
};

export const initialState: initialStateType = {
  productsList: [],
  productById: null,
  loading: true,
  msgError: "",
  msgErrorProduct: "",
  productsCategorySelected: [],
  page: 1,
};

export type Product = {
  id: number;
  name: string;
  description: string;
  descriptionCorta: string;
  image: string;
  fullImagePath: string;
  price: number;
  weight: number;
  height: number;
  size: number;
  productsRelationated: Product[];
};

export type GetProductsResponse = {
  data: Product[];
};
