import { makeStyles } from "@mui/styles";
import { createTheme } from "@mui/material/styles";

const theme = createTheme();

export default makeStyles(() => ({
  containerBanner: {
    width: "70%",
    margin: "0 auto",
    height: "35rem",
    background: "#E9E9E9",
    marginTop: "5%",
    marginBottom: "5%",
  },
  containerTexts: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  boxTexts: {
    width: "70%",
    padding: "7vmin",
  },

  buttonBanner: {
    color: "white",
    fontSize: "2rem",
    marginBottom: "5vmin",
    paddingTop: "1rem",
    paddingBottom: "1rem",
    paddingRight: "2rem",
    paddingLeft: "2rem",
  },
  containerImage: {
    width: "100%",
    height: "50%",
    [theme.breakpoints.up("md")]: {
      height: "100%",
    },
  },
  bannerImage: {
    objectFit: "cover",
    objectPosition: "center",
    height: "100%",
    width: "100%",
  },
}));
