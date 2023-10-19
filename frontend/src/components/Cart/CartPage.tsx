import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";
import { Divider, Box, Typography, Button } from "@mui/material";
import useStyles from "./CartPage.styles";
import {
  deleteProduct,
  incrementDecrement,
} from "../../redux/slices/CartSlice";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import ConditionalLink from "../Auth/ConditionalLink";
import { useNavigate } from "react-router-dom";

type Props = {};

const CartPage = (props: Props) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const MySwal = withReactContent(Swal);
  const { cartItems } = useAppSelector((state) => state?.cart);
  const { userAuth } = useAppSelector((state) => state?.auth);

  const handleDelete = (id: number) => {
    MySwal.fire({
      title: "Estas seguro",
      text: "No se podra revertir esto",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteProduct({ id }));
        Swal.fire("Eliminado!", "Se ha eliminado", "success");
      }
    });
  };

  useEffect(() => {
    if (cartItems.length <= 0) {
      navigate("/", { state: { from: "cart" } });
    }
  }, [cartItems.length, navigate]);

  return (
    <>
      {cartItems.map((article, idx) => {
        return (
          <div key={article.id}>
            <Divider />
            <Box className={classes.infoProductContainer}>
              <Box
                sx={{
                  padding: { md: "0 50px" },
                  width: "40%",
                  height: { xs: 100, sm: 150, md: 200 },
                }}
              >
                <img
                  className={classes.imageStyle}
                  alt={article.name}
                  src={article.fullImagePath}
                />
              </Box>
              <Box
                sx={{
                  padding: "0 10px",
                  width: "60%",
                }}
              >
                <Typography>{article.name}</Typography>
                <Typography>
                  Costo unitario: {article.price.toFixed(2)}
                </Typography>
                <Typography>
                  Total: {Number(article.price * article.quantity).toFixed(2)}
                </Typography>
                <Typography>{article.description}</Typography>
              </Box>
            </Box>
            <Box
              sx={{
                width: 1,
              }}
            >
              <Box
                sx={{
                  width: 1,
                  display: "flex",
                  justifyContent: "end",
                }}
              >
                <Button
                  size="small"
                  variant="contained"
                  color="error"
                  onClick={() => handleDelete(article.id)}
                >
                  Eliminar
                </Button>
                <Button
                  onClick={() =>
                    dispatch(
                      incrementDecrement({ id: article.id, type: "decrement" })
                    )
                  }
                  className={classes.btnQuantity}
                >
                  -
                </Button>
                <span className={classes.quantity}>{article.quantity}</span>
                <Button
                  onClick={() =>
                    dispatch(
                      incrementDecrement({ id: article.id, type: "increment" })
                    )
                  }
                  className={classes.btnQuantity}
                >
                  +
                </Button>
              </Box>
            </Box>
            <Divider />
          </div>
        );
      })}

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "end",
          margin: "5vw 3vmin",
          gap: "15px",
        }}
      >
        <Typography variant="h2" sx={{ fontSize: "2.3rem" }}>
          Total:
          <span style={{ color: "#004DA1" }}>
            {Number(
              cartItems.reduce(
                (acc, elem) => acc + elem.price * elem.quantity,
                0
              )
            ).toFixed(2)}
          </span>
        </Typography>

        <ConditionalLink user={userAuth} to={"/comprar"}>
          <Button variant="contained">Comprar</Button>
        </ConditionalLink>
      </Box>
    </>
  );
};

export default CartPage;
