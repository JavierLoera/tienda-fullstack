import { Grid, Typography, Box, Button } from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { useState, useEffect } from "react";
import QuantityDrawer from "./QuantityDrawer";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";
import { addItemCart } from "../../redux/slices/CartSlice";
import { fetchProductDetails } from "../../redux/slices/productsSlice";
import { useNavigate, useParams } from "react-router-dom";
import Slider from "../index/Slider";

export type ElementQuantity = {
  items: number;
  title: string;
};

const DrawerItemsCountProduct = () => {
  const dispatch = useAppDispatch();
  const [quantity, setQuantity] = useState<number>(1);
  const [inputQuantity, setInputQuantity] = useState<number>(1);
  const [open, setOpen] = useState(false);
  const { id } = useParams();
  const { productById } = useAppSelector((state) => state?.products);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      dispatch(fetchProductDetails(parseInt(id)));
    }
  }, [dispatch, id]);

  useEffect(() => {
    let timer = setTimeout(() => {
      if (!productById) {
        navigate("/");
      }
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [productById, navigate]);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const handleQuantity = (elem: ElementQuantity) => {
    setQuantity(elem.items);
    setOpen(false);
  };

  const handleInputQuantity = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputQuantity(parseInt(e.target.value));
  };

  const handleClickQuantity = () => {
    setQuantity(inputQuantity);
    setOpen(false);
  };

  const addItemsToCart = () => {
    if (productById) {
      dispatch(addItemCart({ ...productById, quantity }));
    }
  };

  return (
    <>
      <Grid
        container
        style={{
          width: "90%",
          margin: "0 auto",
          height: "auto",
          marginTop: "10vw",
        }}
      >
        <Grid
          sx={{
            width: 1,
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
          }}
          xs={12}
          md={6}
          item
        >
          <Box
            component="img"
            sx={{
              height: 303,
              width: 1,
              maxHeight: { xs: 353 },
              maxWidth: { xs: 400 },
              mx: "auto",
              objectFit: "contain",
            }}
            alt={productById?.name}
            src={productById?.fullImagePath}
          />
        </Grid>
        <Grid
          sx={{
            width: 1,
            background: "#E5E5E5",
            marginBottom: "5vw",
            minHeight: "50vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
          xs={12}
          md={6}
          item
        >
          <Typography
            sx={{ padding: 2, marginBottom: 2 }}
            variant="h3"
            component="h2"
          >
            {productById?.name}
          </Typography>

          <Typography sx={{ paddingX: 3, marginTop: 2 }} variant="body1">
            {productById?.description}
          </Typography>
          <Box sx={{ fontSize: 32, marginTop: 3, padding: 2 }}>
            <AttachMoneyIcon sx={{ fontSize: 32 }} />
            {productById?.price}
          </Box>
          <Box
            sx={{
              width: 1,
              display: "flex",
              alignItems: "center",
              boxSizing: "border-box",
              paddingLeft: "15px",
              paddingRight: "15px",
            }}
          >
            <Button
              onClick={toggleDrawer(true)}
              sx={{ width: 1 }}
              endIcon={<ArrowForwardIosIcon />}
            >
              Cantidad: {quantity}
            </Button>
            <Button
              variant="contained"
              onClick={addItemsToCart}
              sx={{ width: "80%", backgroundColor: "#d6445b" }}
            >
              Agregar al carrito
            </Button>
          </Box>
        </Grid>
        <QuantityDrawer
          open={open}
          handleQuantity={handleQuantity}
          toggleDrawer={toggleDrawer}
          handleInputQuantity={handleInputQuantity}
          handleClickQuantity={handleClickQuantity}
        />
      </Grid>
      <Grid
        container
        rowSpacing={{ xs: 1, sm: 2, md: 5 }}
        columns={12}
        style={{
          width: "90%",
          margin: "0 auto",
          height: "auto",
          gap: "10px",
        }}
        alignItems="center"
        justifyContent="space-evenly"
      >
        <Grid
          item
          sx={{
            background: "#E5E5E5",
            paddingLeft: "3vmin",
            paddingRight: "3vmin",
          }}
          xs={12}
          md={3}
        >
          <Typography sx={{ marginBottom: 2 }} variant="h3" component="h2">
            <b>Peso</b>
          </Typography>
          <Typography sx={{ marginBottom: 2 }} variant="body1" component="p">
            {productById?.weight}
          </Typography>
        </Grid>
        <Grid
          item
          sx={{
            background: "#E5E5E5",
            paddingLeft: "3vmin",
            paddingRight: "3vmin",
          }}
          xs={12}
          md={3}
        >
          <Typography sx={{ marginBottom: 2 }} variant="h3" component="h2">
            Altura
          </Typography>
          <Typography sx={{ marginBottom: 2 }} variant="body1" component="p">
            {productById?.height}
          </Typography>
        </Grid>
        <Grid
          item
          sx={{
            background: "#E5E5E5",
            paddingLeft: "3vmin",
            paddingRight: "3vmin",
          }}
          xs={12}
          md={3}
        >
          <Typography sx={{ marginBottom: 2 }} variant="h3" component="h2">
            Tamaño
          </Typography>
          <Typography sx={{ marginBottom: 2 }} variant="body1" component="p">
            {productById?.size}
          </Typography>
        </Grid>

        {productById?.productsRelationated &&
          productById?.productsRelationated.length > 0 && (
            <Box sx={{ margin: "5vw 0" }}>
              <Typography variant="h5">Productos relacionados</Typography>
              <Slider products={productById?.productsRelationated}></Slider>
            </Box>
          )}
      </Grid>
    </>
  );
};

export default DrawerItemsCountProduct;
