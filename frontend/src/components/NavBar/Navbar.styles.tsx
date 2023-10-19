import { makeStyles } from "@mui/styles";

export default makeStyles(() => ({
  navBar: {
    minHeight: "100px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0 5vmin",
    backgroundColor: "white",
  },
  toolBar: {
    width: "100%",
    height: "100%",
  },
  links: {
    color: "black",
    textDecoration: "none",
    fontSize: "3vmin",
    margin: "0 10px",
  },
  cartIcon: {
    fontSize: "4vmin",
    position: "relative",
  },
  cartCount: {
    position: "absolute",
    width: "25px",
    height: "25px",
    backgroundColor: "red",
    fontSize: "1.3rem",
    top: "-25%",
    right: "0",
    borderRadius: "50%",
    color: "white",
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));
