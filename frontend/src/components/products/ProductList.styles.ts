import { makeStyles } from "@mui/styles";

export default makeStyles(() => ({
  imgFluid: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "50% 50%",
  },
  item: {
    height: "clamp(20vw,40vw,60vw);",
    position: "relative",
    // gap: "10px",
  },
  itemContainer: {
    width: "100%",
    height: "100%",
    position: "relative",
  },
  itemFilter: {
    backgroundColor: "rgba(0,0,0,.3)",
    height: "100%",
    left: "0",
    position: "absolute",
    top: "0",
    transition: "all .3s ease-in",
    width: "100%",
    display: "flex",
    alignItems: "end",
    "&:hover": {
      backgroundColor: "rgba(0,0,0,.6)",
    },
  },
  titleFilter: {
    fontSize: "3.5vmin",
    color: "white",
    padding: "2vmin",
  },
}));
