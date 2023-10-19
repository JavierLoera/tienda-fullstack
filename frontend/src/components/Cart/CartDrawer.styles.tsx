import { makeStyles } from "@mui/styles";

export default makeStyles(() => ({
  BoxDrawer: {
    width: "250px",
    background: "primary.main",
  },
  listItem: {
    padding: "0 10px 0 10px",
    height: "100px",
    display: "flex",
  },
  itemProductImage: {
    width: "40%",
  },
  imageProduct: {
    width: "100%",
    height: "70px",
  },
  itemData: {
    height: "90%",
    width: "60%",
    paddingRight: "15px",
    textAlign: "end",
  },
  btn: {
    width: "130px",
    margin: "0 auto",
  },
  imageStyle: {
    width: "100%",
    height: "inherit",
  },

  customDrawer: {
    minHeight: "100vh",
  },
}));
