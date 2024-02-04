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
import { useDispatch, useSelector } from "react-redux";
import MenuIcon from "@mui/icons-material/Menu";
import { css } from "@emotion/react";
import LogoutIcon from "@mui/icons-material/Logout";
import useApiFetch from "../../hooks/apiFetch";
import colors from "../../utils/colors";
import DrawerMenu from "./Drawer";
import AccountCircle from "@mui/icons-material/AccountCircle";
import {
  enableBackdropAction,
  setUserAction,
} from "../../redux/actions/userActions";
import { setLogOutAction } from "../../redux/actions/authActions";

const MenuBar = () => {
  const dispatch = useDispatch();
  const { fetchApi } = useApiFetch();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const { userId, refreshToken } = useSelector(({ auth }) => auth);
  const user = useSelector(({ user }) => user);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const data = await fetchApi("GET", `/users/${userId}`);
    if (data.success) {
      const { user } = data;
      console.log(data);
      dispatch(setUserAction(user));
    }
    dispatch(enableBackdropAction(false));
  };

  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  const handleMenu = (e) => {
    setAnchorEl(e.currentTarget);

    setOpenMenu(true);
  };

  const handleCloseMenu = () => {
    setOpenMenu(!openMenu);
  };

  const handleCloseSession = async (e) => {
    setAnchorEl(null);
    setOpenMenu(!openMenu);
    const res = await fetchApi("POST", "/auth/logout", {
      refreshToken,
      userId,
    });

    if (res.success) {
      console.log("res logout", res);
      dispatch(setLogOutAction());
    }
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
            anchorEl={anchorEl}
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
            onClose={handleCloseMenu}
          >
            <MenuItem onClick={handleCloseSession}>
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
