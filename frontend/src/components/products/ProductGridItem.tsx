import { Grid } from "@mui/material";
import { ProductType } from "../../types/ProductType";
import Product from "./Product";

type Props = {
  product: ProductType;
};

const ProductGridItem = ({ product }: Props) => {
  return (
    <>
      <Grid
        sx={{ width: { md: 300 }, height: 370 }}
        key={product.id}
        xs={12}
        sm={6}
        md={3}
        item
        style={{ minHeight: "450px" }}
      >
        <Product product={product}></Product>
      </Grid>
    </>
  );
};

export default ProductGridItem;
