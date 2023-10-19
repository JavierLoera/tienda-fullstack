import { useEffect, useRef, useState } from "react";
import { TextField, Grid, Typography, Divider, Box } from "@mui/material";
import * as Yup from "yup";
import { useFormik } from "formik";
import LoadingButton from "@mui/lab/LoadingButton";
import { useAppSelector } from "../../redux/store/hooks";
import { useNavigate } from "react-router-dom";

type Props = {};

const formSchema = Yup.object({
  nombre: Yup.string().required("El campo Nombre es requerido"),
  apellidos: Yup.string().required("El campo Apellidos es requerido"),
  telefono: Yup.number().required("El teléfono de contacto es requerido"),
  email: Yup.string()
    .email("Ingresa un email valido")
    .required("El email es requerido"),
  codigoPostal: Yup.number().required("El codifo postal es requerido"),
  ciudad: Yup.string().required("La ciudad es requerida"),
  estado: Yup.string().required("El estado es requerido"),
  calle: Yup.string().required("La calle es requerida"),
  numeroInterior: Yup.string().required("El numero interior es requerido"),
  colonia: Yup.string().required("La colonia es requerida"),
  pais: Yup.string().required("El pais es requerido"),
  entreCalles: Yup.string().required("El campo entre calles es requerido"),
  referencias: Yup.string().required("El campo referencias es requerido"),
  formaPago: Yup.string().required("La froma de pago es requerida"),
});

const Comprar = (props: Props) => {
  const navigate = useNavigate();
  const { cartItems } = useAppSelector((state) => state?.cart);
  const [formaPago, setFormaPago] = useState("");
  const formasPagoRef = useRef<Array<HTMLDivElement | null>>([]);
  const formik = useFormik({
    validationSchema: formSchema,
    initialValues: {
      nombre: "",
      apellidos: "",
      telefono: "",
      email: "",
      codigoPostal: "",
      ciudad: "",
      estado: "",
      calle: "",
      numeroInterior: "",
      colonia: "",
      pais: "",
      entreCalles: "",
      referencias: "",
      formaPago: "",
    },
    onSubmit: (values) => {},
  });

  useEffect(() => {
    if (cartItems.length <= 0) {
      navigate("/", { state: { from: "cart" } });
    }
  }, [cartItems.length, navigate]);

  useEffect(() => {
    const formasPago = formasPagoRef.current;

    formasPago.forEach((e) => {
      if (e) {
        e.addEventListener("click", handleClick);
      }
    });

    console.log(formaPago);
    return () => {
      formasPago.forEach((e) => {
        if (e) {
          e.removeEventListener("click", handleClick);
        }
      });
    };
  }, [formaPago]);

  const handleClick = (e: MouseEvent) => {
    const target = e.target as HTMLDivElement;
    let formaPago = target.dataset.formapago!;
    setFormaPago(formaPago);
    formik.setFieldTouched("formaPago", true);
    formik.setFieldValue("formaPago", formaPago);
  };

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Grid
          container
          sx={{
            backgroundColor: "#F0F0F0",
            margin: "2.5vw auto",
            width: "90%",
          }}
          spacing={2}
        >
          <Grid item xs={12}>
            <Typography variant="h3" sx={{ color: "#004DA1" }}>
              DATOS DE CONTACTO
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              sx={{ width: 1, backgroundColor: "#F0F0F0" }}
              id="nombre"
              name="nombre"
              value={formik.values.nombre}
              onChange={formik.handleChange("nombre")}
              onBlur={formik.handleBlur("nombre")}
              label="Nombre"
              variant="outlined"
              helperText={formik.touched.nombre && formik.errors.nombre}
              error={formik.touched.nombre && Boolean(formik.errors.nombre)}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              sx={{ width: 1, backgroundColor: "#F0F0F0" }}
              id="apellidos"
              name="apellidos"
              value={formik.values.apellidos}
              onChange={formik.handleChange("apellidos")}
              onBlur={formik.handleBlur("apellidos")}
              label="Apellidos"
              variant="outlined"
              helperText={formik.touched.apellidos && formik.errors.apellidos}
              error={
                formik.touched.apellidos && Boolean(formik.errors.apellidos)
              }
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              sx={{ width: "100%", backgroundColor: "#F0F0F0" }}
              id="telefono"
              name="telefono"
              value={formik.values.telefono}
              onChange={formik.handleChange("telefono")}
              onBlur={formik.handleBlur("telefono")}
              label="Teléfono"
              variant="outlined"
              helperText={formik.touched.telefono && formik.errors.telefono}
              error={formik.touched.telefono && Boolean(formik.errors.telefono)}
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <TextField
              sx={{ width: "100%", backgroundColor: "#F0F0F0" }}
              id="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange("email")}
              onBlur={formik.handleBlur("email")}
              label="Email"
              variant="outlined"
              helperText={formik.touched.email && formik.errors.email}
              error={formik.touched.email && Boolean(formik.errors.email)}
            />
          </Grid>
          <Grid item xs={12} md={4}></Grid>
          <Grid item xs={12} sx={{ margin: "3vw 0" }}>
            <Divider sx={{ width: "90%", color: "black" }} />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h3" sx={{ color: "#004DA1" }}>
              DIRECCIÓN
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              sx={{ width: "100%", backgroundColor: "#F0F0F0" }}
              id="codigoPostal"
              name="codigoPostal"
              value={formik.values.codigoPostal}
              onChange={formik.handleChange("codigoPostal")}
              onBlur={formik.handleBlur("codigoPostal")}
              label="Codigo Postal"
              variant="outlined"
              helperText={
                formik.touched.codigoPostal && formik.errors.codigoPostal
              }
              error={
                formik.touched.codigoPostal &&
                Boolean(formik.errors.codigoPostal)
              }
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              sx={{ width: "100%", backgroundColor: "#F0F0F0" }}
              id="ciudad"
              name="ciudad"
              value={formik.values.ciudad}
              onChange={formik.handleChange("ciudad")}
              onBlur={formik.handleBlur("ciudad")}
              label="Ciudad"
              variant="outlined"
              helperText={formik.touched.ciudad && formik.errors.ciudad}
              error={formik.touched.ciudad && Boolean(formik.errors.ciudad)}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              sx={{ width: "100%", backgroundColor: "#F0F0F0" }}
              id="estado"
              name="estado"
              value={formik.values.estado}
              onChange={formik.handleChange("estado")}
              onBlur={formik.handleBlur("estado")}
              label="Estado"
              variant="outlined"
              helperText={formik.touched.estado && formik.errors.estado}
              error={formik.touched.estado && Boolean(formik.errors.estado)}
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <TextField
              sx={{ width: "100%", backgroundColor: "#F0F0F0" }}
              id="calle"
              name="calle"
              value={formik.values.calle}
              onChange={formik.handleChange("calle")}
              onBlur={formik.handleBlur("calle")}
              label="Calle"
              variant="outlined"
              helperText={formik.touched.calle && formik.errors.calle}
              error={formik.touched.calle && Boolean(formik.errors.calle)}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              sx={{ width: "100%", backgroundColor: "#F0F0F0" }}
              id="numeroInterior"
              name="numeroInterior"
              value={formik.values.numeroInterior}
              onChange={formik.handleChange("numeroInterior")}
              onBlur={formik.handleBlur("numeroInterior")}
              label="Numero Interior"
              variant="outlined"
              helperText={
                formik.touched.numeroInterior && formik.errors.numeroInterior
              }
              error={
                formik.touched.numeroInterior &&
                Boolean(formik.errors.numeroInterior)
              }
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              sx={{ width: "100%", backgroundColor: "#F0F0F0" }}
              id="colonia"
              name="colonia"
              value={formik.values.colonia}
              onChange={formik.handleChange("colonia")}
              onBlur={formik.handleBlur("colonia")}
              label="Colonia"
              variant="outlined"
              helperText={formik.touched.colonia && formik.errors.colonia}
              error={formik.touched.colonia && Boolean(formik.errors.colonia)}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              sx={{ width: "100%", backgroundColor: "#F0F0F0" }}
              id="pais"
              name="pais"
              value={formik.values.pais}
              onChange={formik.handleChange("pais")}
              onBlur={formik.handleBlur("pais")}
              label="País"
              variant="outlined"
              helperText={formik.touched.pais && formik.errors.pais}
              error={formik.touched.pais && Boolean(formik.errors.pais)}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              sx={{ width: "100%", backgroundColor: "#F0F0F0" }}
              id="entreCalles"
              name="entreCalles"
              value={formik.values.entreCalles}
              onChange={formik.handleChange("entreCalles")}
              onBlur={formik.handleBlur("entreCalles")}
              label="Entre Calles"
              variant="outlined"
              helperText={
                formik.touched.entreCalles && formik.errors.entreCalles
              }
              error={
                formik.touched.entreCalles && Boolean(formik.errors.entreCalles)
              }
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField
              sx={{ width: "100%", backgroundColor: "#F0F0F0" }}
              id="referencias"
              name="referencias"
              value={formik.values.referencias}
              onChange={formik.handleChange("referencias")}
              onBlur={formik.handleBlur("referencias")}
              label="Referencias"
              variant="outlined"
              helperText={
                formik.touched.referencias && formik.errors.referencias
              }
              error={
                formik.touched.referencias && Boolean(formik.errors.referencias)
              }
            />
          </Grid>

          <Grid item xs={12} md={12}>
            <Divider sx={{ width: "100%", color: "black" }} />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h3" sx={{ color: "#004DA1" }}>
              Forma de pago
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Box
              ref={(el: HTMLDivElement) => formasPagoRef.current.push(el)}
              sx={{
                width: "100%",
                height: 200,
                backgroundColor:
                  formaPago === "1" ? "primary.dark" : "primary.light",
                color: "white",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
              data-formapago="1"
            >
              <Typography variant="h5">Pago con tarjeta</Typography>
              <p>Pago con mercado pago</p>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Box
              ref={(el: HTMLDivElement) => formasPagoRef.current.push(el)}
              sx={{
                width: "100%",
                height: 200,
                backgroundColor:
                  formaPago === "2" ? "primary.dark" : "primary.light",
                color: "white",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
              data-formapago="2"
            >
              <Typography variant="h5">Pago en efectivo</Typography>
              <p>Pago en efectivo</p>
            </Box>
          </Grid>

          {formik.errors.formaPago && formik.touched.formaPago && (
            <Grid item xs={12}>
              <Typography variant="subtitle1" style={{ color: "red" }}>
                {formik.errors.formaPago}
              </Typography>
            </Grid>
          )}

          <Grid item xs={12} md={8}></Grid>
          <Grid
            item
            xs={12}
            md={4}
            sx={{ display: "flex", justifyContent: "end" }}
          >
            <LoadingButton
              size="large"
              sx={{
                marginTop: "40px",
                backgroundColor: "primary.dark",
                width: { xs: "100%", md: "80%" },
              }}
              loading={false}
              variant="contained"
              type="submit"
            >
              Comprar
            </LoadingButton>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default Comprar;
