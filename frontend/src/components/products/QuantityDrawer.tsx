import { useState, useEffect } from "react";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import {
  Typography,
  TextField,
  ListItem,
  List,
  ListItemButton,
  ListItemText,
  Button,
  Box,
} from "@mui/material";
import { ElementQuantity } from "./ProductDetails";

type Props = {
  open: boolean;
  handleQuantity: (elem: ElementQuantity) => void;
  toggleDrawer: (newOpen: boolean) => () => void;
  handleInputQuantity: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleClickQuantity: () => void;
};

const QuantityDrawer = ({
  open,
  handleQuantity,
  toggleDrawer,
  handleInputQuantity,
  handleClickQuantity,
}: Props) => {
  const [isDesktop, setIsDesktop] = useState(false);

  const updatePredicate = () => {
    setIsDesktop(window.innerWidth > 850);
  };

  useEffect(() => {
    window.addEventListener("resize", updatePredicate);
    window.addEventListener("load", updatePredicate);

    return () => {
      window.removeEventListener("resize", updatePredicate);
      window.removeEventListener("load", updatePredicate);
    };
  }, []);

  const drawerBleeding = 56;

  const numberItems = [
    { items: 1, title: "1 unidad" },
    { items: 2, title: "2 unidades" },
    { items: 3, title: "3 unidades" },
    { items: 4, title: "4 unidades" },
    { items: 5, title: "5 unidades" },
    { items: 6, title: "6 unidades" },
  ];

  let heightDrawer = isDesktop
    ? `calc(60% - ${drawerBleeding}px)`
    : `calc(50% - ${drawerBleeding}px)`;

  return (
    <>
      <SwipeableDrawer
        anchor="bottom"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
        ModalProps={{
          keepMounted: true,
        }}
        PaperProps={{
          style: { height: heightDrawer }, // Set the desired height for the drawer
        }}
      >
        <Typography sx={{ p: 2, color: "text.primary", fontWeight: "bold" }}>
          Elegir Cantidad
        </Typography>
        <List>
          {numberItems.map((elem, idx) => {
            return (
              <ListItem key={idx} disablePadding>
                <ListItemButton>
                  <ListItemText
                    onClick={(e) => {
                      handleQuantity(elem);
                    }}
                    sx={{ textAlign: "center" }}
                    primary={elem.title}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
          <Box width={1}>
            <TextField
              sx={{ width: 2 / 4 }}
              label="Cantidad"
              variant="outlined"
              type="number"
              onChange={(e) => handleInputQuantity(e)}
            />
            <Button
              onClick={handleClickQuantity}
              sx={{ width: 2 / 4, height: 55 }}
              variant="contained"
              color="primary"
            >
              agregar
            </Button>
          </Box>
        </List>
      </SwipeableDrawer>
    </>
  );
};

export default QuantityDrawer;
