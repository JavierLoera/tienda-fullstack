import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";
import {
  Typography,
  Grid,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import * as Yup from "yup";
import { useFormik } from "formik";
import LoadingButton from "@mui/lab/LoadingButton";
import useStyles from "./Login.styles";
import imageAuth from "../../img/Authentication-bro.svg";
import { loginUser } from "../../redux/slices/AuthSlice";
import { useNavigate } from "react-router-dom";

const formSchema = Yup.object({
  username: Yup.string()
    .email("Ingresa un email valido")
    .required("El campo email es requerido"),
  password: Yup.string().required("El campo password es requerido"),
});
const Login = () => {
  const { msgError, loading } = useAppSelector((state) => state.auth);
  const { msgSuccess } = useAppSelector((state) => state.users);
  const [showPassword, setShowPassword] = useState(false);
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("userData")) {
      return navigate("/");
    }
  }, [navigate]);

  const formik = useFormik({
    validationSchema: formSchema,
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: (values) => {
      dispatch(loginUser(values)).then((data) => {
        if (data.meta.requestStatus === "fulfilled") {
          navigate("/");
        }
      });
    },
  });

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <Grid
      sx={{
        width: 1,
        display: "flex",
        height: { xs: "70vh", md: "80vh" },
        justifyContent: "center",
      }}
    >
      <Grid
        sx={{
          display: { xs: "none", md: "flex", width: "30%" },
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Typography variant="h4" sx={{ marginTop: "30px" }} align="center">
          Empieza ahora
        </Typography>
        <img alt="shop register" src={imageAuth} />
      </Grid>

      <Grid
        sx={{
          width: { xs: "100%", md: "70%" },
          height: { xs: "100%" },
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <form className={classes.form} onSubmit={formik.handleSubmit}>
          {msgSuccess ? (
            <Typography
              sx={{ color: "green", textAlign: "center" }}
              variant="body1"
            >
              "Genial,ahora puedes iniciar sesion"
            </Typography>
          ) : null}
          {msgError ? (
            <Typography
              sx={{ color: "red", textAlign: "center" }}
              variant="body2"
            >
              {msgError}
            </Typography>
          ) : null}

          <TextField
            id="username"
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange("username")}
            onBlur={formik.handleBlur("username")}
            type="text"
            sx={{ marginTop: "30px", width: { xs: "100%", md: "80%" } }}
            label="email"
            variant="outlined"
            helperText={formik.touched.username && formik.errors.username}
            error={formik.touched.username && Boolean(formik.errors.username)}
          />
          <TextField
            id="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange("password")}
            onBlur={formik.handleBlur("password")}
            type={showPassword ? "text" : "password"}
            label="password"
            variant="outlined"
            helperText={formik.touched.password && formik.errors.password}
            error={formik.touched.password && Boolean(formik.errors.password)}
            sx={{ marginTop: "30px", width: { xs: "100%", md: "80%" } }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <LoadingButton
            size="large"
            sx={{ marginTop: "40px", width: { xs: "100%", md: "80%" } }}
            loading={loading}
            variant="contained"
            type="submit"
          >
            Iniciar sesion
          </LoadingButton>
        </form>
      </Grid>
    </Grid>
  );
};

export default Login;
