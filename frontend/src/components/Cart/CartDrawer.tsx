import {
  Drawer,
  List,
  ListItem,
  Box,
  Typography,
  Divider,
  Button,
} from "@mui/material";
import useStyles from "./CartDrawer.styles";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../redux/store/hooks";
import { openDrawer } from "../../redux/slices/CartSlice";
import { item } from "../../types/ItemType";

type Props = {
  open: boolean;
  handleOpen: () => void;
  cartItems: item[];
};

const CartDrawer = ({ open, handleOpen, cartItems }: Props) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const handleClickOrder = () => {
    dispatch(openDrawer());
  };

  return (
    <Drawer
      className={classes.customDrawer}
      onClose={handleOpen}
      open={open}
      anchor={"right"}
    >
      <Box className={classes.BoxDrawer}>
        <List>
          {cartItems.map((article, idx) => (
            <div key={idx}>
              <ListItem className={classes.listItem} disablePadding>
                <Box className={classes.itemProductImage}>
                  <img
                    alt={article.name}
                    className={classes.imageProduct}
                    src={article.fullImagePath}
                  />
                </Box>
                <Box className={classes.itemData}>
                  <Typography>{article.name}</Typography>
                  <Typography>${article.price}</Typography>
                  <Typography>Cantidad: {article.quantity}</Typography>
                </Box>
              </ListItem>
              <Divider />
            </div>
          ))}
        </List>
        <Link to="/cart" style={{ textDecoration: "none" }}>
          <Box className={classes.btn}>
            <Button onClick={handleClickOrder}>Ir al carrito</Button>
          </Box>
        </Link>
      </Box>
    </Drawer>
  );
};

export default CartDrawer;
