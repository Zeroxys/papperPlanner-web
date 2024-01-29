import React, { useState, useEffect } from "react";
import Layout from "../Layout";
import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
  ListItemIcon,
} from "@mui/material";
import { navigate } from "gatsby";
import { useDispatch, useSelector } from "react-redux";
import MenuIcon from "@mui/icons-material/Menu";
import { css } from "@emotion/react";
import LogoutIcon from "@mui/icons-material/Logout";
import useApiFetch from "../../hooks/apiFetch";
import colors from "../../utils/colors";
import DrawerMenu from "./Drawer";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { enableBackdropAction } from "../../redux/actions/authActions";

const MenuBar = () => {
  const dispatch = useDispatch();
  const { fetchApi } = useApiFetch();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const auth = useSelector(({ auth }) => auth);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const data = await fetchApi("GET", `/users/${auth.userId}`);
    if (data.success) {
      const { user } = data;
      delete user.__v;
      dispatch(enableBackdropAction());
    }
  };

  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  const handleMenu = () => {
    setOpenMenu(true);
  };

  const handleClose = () => {
    navigate("/login");
    setOpenMenu(!openMenu);
  };

  return (
    <div>
      <AppBar
        css={styles.appBar}
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

        <div>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <AccountCircle fontSize={"28"} />
          </IconButton>
          <Menu
            id="menu-appbar"
            css={styles.menuOptions}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={openMenu}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <LogoutIcon fontSize="small" />
              </ListItemIcon>
              Cerrar sesión
            </MenuItem>
          </Menu>
        </div>
      </AppBar>
      <DrawerMenu openDrawer={openDrawer} onClose={handleDrawerClose} />
    </div>
  );
};

const styles = {
  appBar: css`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background-color: ${colors.purple};
  `,
  menuOptions: css`
    margin-top: 30px;
  `,
};

export default MenuBar;
