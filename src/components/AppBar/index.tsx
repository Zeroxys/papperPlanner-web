import React, { useState } from "react";
import Layout from "../Layout";
import { AppBar, IconButton, Toolbar, Typography, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { css } from "@emotion/react";
import colors from "../../utils/colors";
import DrawerMenu from "./Drawer";

const MenuBar = () => {
  const [openDrawer, setOpenDrawer] = useState(false);

  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  return (
    <div>
      <AppBar
        css={styles.appBar()}
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleDrawerOpen}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div">
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <DrawerMenu openDrawer={openDrawer} onClose={handleDrawerClose} />
    </div>
  );
};

const styles = {
  appBar: (theme) => css`
    background-color: ${colors.purple};
  `,
};

export default MenuBar;
