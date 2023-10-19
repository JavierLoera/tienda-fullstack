import {
  Box,
  Divider,
  List,
  ListItemText,
  ListItemButton,
  Typography,
  ListItem,
  Drawer,
} from "@mui/material";
import { Link } from "react-router-dom";
import { navItems } from "./Navbar";

type Props = {
  window?: () => Window;
  handleDrawerToggle: () => void;
  mobileOpen: boolean;
};

const NavBarDrawer = ({ window, handleDrawerToggle, mobileOpen }: Props) => {
  const container =
    window !== undefined ? () => window().document.body : undefined;
  const drawerWidth = 240;

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Tienda
      </Typography>
      <Divider />
      <List>
        {navItems.map((item, idx) => (
          <Link
            key={idx}
            to={`${item.toRedirect}`}
            style={{ textDecoration: "none" }}
          >
            <ListItem disablePadding>
              <ListItemButton sx={{ textAlign: "center" }}>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </Box>
  );

  return (
    <Box component="nav">
      <Drawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default NavBarDrawer;
