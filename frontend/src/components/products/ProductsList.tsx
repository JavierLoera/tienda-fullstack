import { Grid } from "@mui/material";
import ProductGridItem from "./ProductGridItem";
import imgCategoria1 from "../../assets/home-img.jpg";
import imgCategoria2 from "../../assets/home-img-2.jpg";
import imgCategoria3 from "../../assets/home-img-3.jpg";
import imgCategoria4 from "../../assets/home-img-4.jpg";
import useStyles from "./ProductList.styles";
import Banner from "../index/Banner";
import imgBanner from "../../assets/banner1.jpg";
import imgBanner2 from "../../assets/banner2.jpg";
import Slider from "../index/Slider";
import { ProductType } from "../../types/ProductType";
import { useEffect, useState } from "react";
import { getNewProducts, getTrendingProducts } from "../../api/products";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const ProductsList = () => {
  const classes = useStyles();
  const [newProducts, setNewProducts] = useState<ProductType[]>([]);
  const [trendingProducts, setTrendingProducts] = useState<ProductType[]>([]);
  const location = useLocation();
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);
  const isFromCart = location.state && location.state.from === "cart";

  useEffect(() => {
    if (isFromCart) {
      MySwal.fire({
        title: "Sin articulos",
        text: "Primero debes agregar productos a tu carrito",
        icon: "error",
      });
      navigate(location.pathname, {});
    }

    getNewProducts().then((res: ProductType[]) => setNewProducts(res));
    getTrendingProducts().then((res: ProductType[]) =>
      setTrendingProducts(res)
    );
  }, [MySwal, isFromCart, location.state]);

  return (
    <>
      <Grid
        style={{ width: "90%", margin: "0 auto", height: "auto" }}
        container
        rowSpacing={{ xs: 1, sm: 2, md: 2 }}
        columnSpacing={{ xs: 1, sm: 2, md: 2 }}
      >
        <Grid className={classes.item} item xs={6} md={6}>
          <div className={classes.itemContainer}>
            <div className={classes.itemFilter}>
              <h1 className={classes.titleFilter}>Live Comfortability</h1>
            </div>
            <img
              className={classes.imgFluid}
              src={imgCategoria1}
              alt="imagen de categoria"
              loading="lazy"
            />
          </div>
        </Grid>
        <Grid className={classes.item} item xs={6} md={3}>
          <div className={classes.itemContainer}>
            <div className={classes.itemFilter}>
              <h1 className={classes.titleFilter}>Skincare</h1>
            </div>
            <img
              className={classes.imgFluid}
              src={imgCategoria2}
              alt="imagen de categoria"
              loading="lazy"
            />
          </div>
        </Grid>
        <Grid
          className={classes.item}
          item
          container
          xs={12}
          md={3}
          rowSpacing={1}
          columnSpacing={2}
        >
          <Grid item xs={6} md={12}>
            <div className={classes.itemContainer}>
              <div className={classes.itemFilter}>
                <h1 className={classes.titleFilter}>Kitchen</h1>
              </div>
              <img
                className={classes.imgFluid}
                src={imgCategoria3}
                alt="imagen de categoria"
                loading="lazy"
              />
            </div>
          </Grid>
          <Grid item xs={6} md={12}>
            <div className={classes.itemContainer}>
              <div className={classes.itemFilter}>
                <h1 className={classes.titleFilter}>Electronics</h1>
              </div>
              <img
                className={classes.imgFluid}
                src={imgCategoria4}
                alt="imagen de categoria"
                loading="lazy"
              />
            </div>
          </Grid>
        </Grid>
      </Grid>

      <Grid
        style={{ width: "90%", margin: "0 auto", height: "auto" }}
        container
        rowSpacing={{ xs: 1, sm: 2, md: 3 }}
        columnSpacing={{ xs: 1, sm: 2, md: 5 }}
      >
        {newProducts.map((product: ProductType, idx) => {
          return (
            <ProductGridItem
              key={product.id}
              product={product}
            ></ProductGridItem>
          );
        })}
      </Grid>

      <Grid
        style={{ width: "90%", margin: "0 auto", height: "auto" }}
        container
        rowSpacing={{ xs: 1, sm: 2, md: 3 }}
        columnSpacing={{ xs: 1, sm: 2, md: 5 }}
      >
        <Banner
          textOrder={1}
          imageOrder={2}
          imageBanner={imgBanner}
          texts={[
            "Creative harmonious living",
            "RAOUF Products are all made to standard sizes so that you can mix and match them freely.",
            "SHOP NOW",
          ]}
        ></Banner>

        <Slider products={trendingProducts}></Slider>

        <Banner
          textOrder={2}
          imageOrder={1}
          imageBanner={imgBanner2}
          texts={[
            "Comfortable & Elegante Living",
            "RAOUF Products are all made to standard sizes so that you can mix and match them freely.",
            "SHOP NOW",
          ]}
        ></Banner>
      </Grid>
    </>
  );
};

export default ProductsList;
