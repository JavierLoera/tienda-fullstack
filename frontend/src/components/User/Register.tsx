import { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  TextField,
  Grid,
  InputAdornment,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import useStyles from "./Register.styles";
import imageShop from "../../img/Catalogue-bro.svg";
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";
import { RegisterUser } from "../../redux/slices/UserSlice";
import { useNavigate } from "react-router-dom";

const formSchema = Yup.object({
  name: Yup.string()
    .required("El nombre es requerido")
    .min(8, "El nombre debe tener 8 caracteres"),
  email: Yup.string()
    .email("Ingresa un email valido")
    .required("El email es requerido"),
  password: Yup.string()
    .trim()
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "La contraseña debe tener minimo 8 caractere, una letra,un numero y un caracter especial"
    )
    .required("La contraseña es requerida"),
  confirmPassword: Yup.string()
    .required("La confirmacion de contraseña es requerida")
    .oneOf([Yup.ref("password"), null], "Las contraseñas deben coincidir"),
});

type Props = {};

const Register = (props: Props) => {
  const [showPassword, setShowPassword] = useState(false);
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, msgError } = useAppSelector((state) => state.users);
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: (values) => {
      dispatch(
        RegisterUser({
          name: values.name,
          email: values.email,
          password: values.password,
        })
      ).then((res: any) => {
        if (!res.error) {
          navigate("/login");
        }
      });
    },
    validationSchema: formSchema,
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
    <Box className={classes.mainContainer}>
      <Grid
        sx={{
          width: { xs: "100%", md: "70%" },
          display: "flex",
          justifyContent: "center",
        }}
      >
        <form className={classes.formContainer} onSubmit={formik.handleSubmit}>
          {msgError ? (
            <Typography
              sx={{ color: "red", textAlign: "center" }}
              variant="body2"
            >
              {msgError}
            </Typography>
          ) : null}
          <TextField
            id="name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange("name")}
            onBlur={formik.handleBlur("name")}
            type="text"
            sx={{ marginTop: "30px", width: { md: "60%" } }}
            className={classes.inputStyle}
            label="nombre"
            variant="outlined"
            helperText={formik.touched.name && formik.errors.name}
            error={formik.touched.name && Boolean(formik.errors.name)}
          />
          <TextField
            id="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange("email")}
            onBlur={formik.handleBlur("email")}
            type="email"
            sx={{ marginTop: "30px", width: { md: "60%" } }}
            className={classes.inputStyle}
            label="email"
            variant="outlined"
            helperText={formik.touched.email && formik.errors.email}
            error={formik.touched.email && Boolean(formik.errors.email)}
          />
          <TextField
            id="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange("password")}
            onBlur={formik.handleBlur("password")}
            type={showPassword ? "text" : "password"}
            className={classes.inputStyle}
            label="password"
            variant="outlined"
            helperText={formik.touched.password && formik.errors.password}
            error={formik.touched.password && Boolean(formik.errors.password)}
            sx={{ marginTop: "30px", width: { md: "60%" } }}
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
          <TextField
            id="confirmPassword"
            name="confirmPassword"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange("confirmPassword")}
            onBlur={formik.handleBlur("confirmPassword")}
            type={showPassword ? "text" : "password"}
            className={classes.inputStyle}
            sx={{ marginTop: "30px", width: { md: "60%" } }}
            label="confirma la contraseña"
            variant="outlined"
            helperText={
              formik.touched.confirmPassword && formik.errors.confirmPassword
            }
            error={
              formik.touched.confirmPassword &&
              Boolean(formik.errors.confirmPassword)
            }
          />
          <LoadingButton
            size="large"
            loading={loading}
            variant="contained"
            type="submit"
            sx={{ marginTop: "40px" }}
          >
            Registrarse
          </LoadingButton>
        </form>
      </Grid>
      <Grid
        sx={{ display: { xs: "none", md: "block" } }}
        className={classes.rightContainer}
      >
        <Typography
          variant="h4"
          sx={{ color: "white", marginTop: "30px" }}
          align="center"
        >
          Empieza ahora
        </Typography>
        <img alt="shop register" src={imageShop}></img>
      </Grid>
    </Box>
  );
};

export default Register;
