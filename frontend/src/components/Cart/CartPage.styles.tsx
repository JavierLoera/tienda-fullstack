import { makeStyles } from "@mui/styles";

export default makeStyles(() => ({
  infoProductContainer: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    margin: "10px 0",
  },
  imageStyle: {
    width: "100%",
    height: "inherit",
    objectFit: "contain",
  },
  quantity: {
    width: "40px",
    padding: "8px 10px",
    textAlign: "center",
  },
  btnQuantity: {
    background: "#EAECEF",
  },
}));
