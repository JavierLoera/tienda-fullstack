import { Stack, Box, Typography, IconButton, Divider } from "@mui/material";
import { ProductType } from "../../types/ProductType";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { useNavigate } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useAppDispatch } from "../../redux/store/hooks";
import { addItemCart } from "../../redux/slices/CartSlice";
import useStyles from "./Product.styles";
import { openDrawer } from "../../redux/slices/CartSlice";

type Props = {
  product: ProductType;
};

const Product = ({ product }: Props) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const addToCart = (product: ProductType) => {
    dispatch(addItemCart({ ...product, quantity: 1 }));
    dispatch(openDrawer());
  };

  return (
    <>
      <Stack className={classes.productContainer}>
        <Box style={{ width: "100%", height: "70%" }}>
          <img
            onClick={() => navigate(`/products/${product.id}`)}
            src={product.fullImagePath}
            className={classes.productImage}
            alt={product.name}
            loading="lazy"
          />
        </Box>
        <Box className={classes.productPriceContainer}>
          <IconButton>
            <AttachMoneyIcon />
            {product.price}
          </IconButton>
          <IconButton
            className={classes.iconAddCart}
            onClick={() => addToCart(product)}
            color="default"
            arial-label="cart icon"
          >
            <ShoppingCartIcon fontSize="large" />
          </IconButton>
        </Box>
        <Box
          style={{
            paddingRight: "10px",
            paddingLeft: "10px",
            overflow: "hidden",
          }}
        >
          <Typography
            sx={{ cursor: "pointer" }}
            variant="h5"
            onClick={() => navigate(`/products/${product.id}`)}
          >
            {product.name}
          </Typography>
          <Typography variant="body1">{product.descriptionCorta}</Typography>
        </Box>
      </Stack>
      <Divider variant="middle" />
    </>
  );
};

export default Product;
