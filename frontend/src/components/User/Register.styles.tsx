import { makeStyles } from "@mui/styles";

export default makeStyles(() => ({
  mainContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
  },
  formContainer: {
    width: "70%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderColor: "#eeeee4",
    borderStyle: "solid",
    borderWidth: "0 5px 5px 0",
  },
  rightContainer: {
    width: "30%",
    height: "80vh",
    background: "#1a4cc3",
  },
  inputStyle: {
    width: "90%",
    marginTop: "50px",
  },
}));
