import { useCallback, useEffect, useState } from "react";
import {
  Box,
  Typography,
  AppBar,
  Toolbar,
  Avatar,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link, useNavigate } from "react-router-dom";
import CartDrawer from "../Cart/CartDrawer";
import NavBarDrawer from "./NavBarDrawer";
import { useAppSelector, useAppDispatch } from "../../redux/store/hooks";
import useStyles from "./Navbar.styles";
import { openDrawer } from "../../redux/slices/CartSlice";
import decode from "jwt-decode";
import { logout } from "../../redux/slices/AuthSlice";
import Button from "@mui/material/Button";

export const navItems = [
  {
    name: "Products",
    toRedirect: "/",
  },
];

interface MyToken {
  name: string;
  exp: number;
}

const Navbar = () => {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { userAuth } = useAppSelector((state) => state.auth);
  const { cartItems, isCartDrawer } = useAppSelector((state) => state?.cart);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  if (userAuth?.user.role === "admin") {
    navItems.push({ name: "Admin", toRedirect: "/admin" });
  }

  const handleLogout = useCallback(() => {
    dispatch(logout());
    navigate("/login");
  }, [dispatch, navigate]);

  useEffect(() => {
    const token = userAuth?.accessToken;
    if (token) {
      const decodedToken = decode<MyToken>(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        handleLogout();
      }
    }
  }, [handleLogout, userAuth]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const toggleCartDrawer = () => {
    dispatch(openDrawer());
  };

  const numberItems = cartItems.reduce(
    (acc: number, current) => acc + current.quantity,
    0
  );

  return (
    <Box
      style={{ marginBottom: "100px" }}
      sx={{ display: "flex", marginBottom: 10 }}
    >
      <AppBar
        component="nav"
        className={classes.navBar}
        style={{ background: "#f2f2f2" }}
      >
        <Toolbar className={classes.toolBar}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerToggle}
            sx={{ justifySelf: "end", mr: 2, display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Box
            sx={{
              display: "flex",
              flexGrow: 1,
              flexDirection: "row",
              textAlign: { xs: "start", md: "start" },
              justifyContent: { xs: "end", md: "start" },
            }}
          >
            {userAuth?.user ? (
              <Avatar sx={{ alignSelf: "end" }}>
                {userAuth.user.name.substring(0, 2)}
              </Avatar>
            ) : null}

            <Typography variant="h6" component="div">
              <Link
                className={classes.links}
                to="/"
                style={{ textDecoration: "none" }}
              >
                MUI
              </Link>
            </Typography>
          </Box>

          <Box sx={{ display: { xs: "none", md: "block" } }}>
            {!userAuth && (
              <Link className={classes.links} to={"/login"}>
                Login
              </Link>
            )}
            {userAuth && (
              <Button
                variant="text"
                style={{ color: "black", fontSize: "2.3vmin" }}
                onClick={handleLogout}
              >
                Logout
              </Button>
            )}
            {!!userAuth?.user && userAuth?.user?.role === "admin" && (
              <Link className={classes.links} to={"/admin"}>
                admin
              </Link>
            )}
            <Link className={classes.links} to={"/"}>
              Products
            </Link>
          </Box>
          <Box>
            <IconButton
              className={classes.cartIcon}
              onClick={toggleCartDrawer}
              color="default"
              arial-label="cart icon"
            >
              <ShoppingCartIcon fontSize="large" />
              <div className={classes.cartCount}>{numberItems}</div>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <NavBarDrawer
        handleDrawerToggle={handleDrawerToggle}
        mobileOpen={mobileOpen}
      />
      <CartDrawer
        open={isCartDrawer}
        handleOpen={toggleCartDrawer}
        cartItems={cartItems}
      />
    </Box>
  );
};

export default Navbar;
