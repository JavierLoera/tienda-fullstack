import { makeStyles } from "@mui/styles";

export default makeStyles(() => ({
  productContainer: {
    height: "-webkit-fill-available;",
    border: "3px solid #E9E9E9",
    transition: "all .3s ease-in",
    "&:hover": {
      border: "3px solid rgba(0,0,0,.6)",
    },
  },
  productImage: {
    width: "100%",
    height: "100%",
    cursor: "pointer",
    objectFit: "cover",
    objectPosition: "center",
  },
  iconAddCart: {
    fontSize: "4vmin",
    position: "relative",
  },
  productPriceContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
}));
