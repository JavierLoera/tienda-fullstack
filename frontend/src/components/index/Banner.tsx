import { Grid } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import useStyles from "./Banner.styles";

type Props = {
  imageOrder: number;
  textOrder: number;
  imageBanner: string;
  texts: string[];
};

export default function Banner({
  imageOrder,
  textOrder,
  imageBanner,
  texts,
}: Props) {
  const classes = useStyles();

  return (
    <>
      <Grid className={classes.containerBanner} container>
        <Grid
          item
          order={textOrder}
          xs={12}
          md={6}
          className={classes.containerTexts}
        >
          <Box className={classes.boxTexts}>
            <h3 style={{ fontSize: "5.5vmin" }}>{texts[0]}</h3>
            <h5 style={{ fontSize: "2.5vmin" }}>{texts[1]}</h5>
            <Box>
              <Button
                style={{ background: "#000000" }}
                variant="contained"
                className={classes.buttonBanner}
                size="large"
              >
                {texts[2]}
              </Button>
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          className={classes.containerImage}
          order={imageOrder}
        >
          <img
            className={classes.bannerImage}
            src={imageBanner}
            alt="imagen del banner"
            loading="lazy"
          />
        </Grid>
      </Grid>
    </>
  );
}
