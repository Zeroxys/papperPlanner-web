import React, { useEffect, useState } from "react";
import { Link } from "gatsby";
import { Drawer, Box } from "@mui/material";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import CircularProgress from "@mui/material/CircularProgress";
import MailIcon from "@mui/icons-material/Mail";
import { css } from "@emotion/react";
import colors from "../../utils/colors";
import useApiFetch from "../../hooks/apiFetch";
import { useSelector } from "react-redux";

const Menu = [
  {
    name: "Usuarios",
    path: "",
  },
  {
    name: "Calendario",
    path: "calendar",
  },
  {
    name: "Configuraciones",
    path: "settings",
  },
];

const DrawerMenu = ({ openDrawer, onClose }) => {
  const { fetchApi, loading } = useApiFetch();
  const { user } = useSelector(({ user }) => user);
  const [imageURI, setImageURI] = useState("");

  useEffect(() => {
    getProfileImage();
  }, [user]);

  const getProfileImage = async () => {
    const image = await fetchApi(
      "GET",
      "/profile-image/" + user?.settings?.profilePicture
    );
    setImageURI(image.result);
  };

  const Lists = ({ anchor }) => (
    <Box css={styles.menuContainer(anchor)}>
      <div css={styles.profileContainer}>
        <div css={styles.circle}>
          <div css={styles.circlePic}>
            {loading ? (
              <CircularProgress />
            ) : (
              <img
                css={styles.circlePic}
                src={imageURI}
                alt="Descripción de la imagen"
                style={{ maxWidth: "100%", maxHeight: "100%" }}
              />
            )}
          </div>
        </div>
        <p>{user.username}</p>
        <p>{user.email}</p>
      </div>
      <Divider />
      <List>
        {Menu.map((text, index) => (
          <ListItem key={text} component={Link} to={`/${text.path}`}>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      {/* <List>
        {["Configuraciones"].map((text, index) => (
          <ListItem key={text}>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List> */}
    </Box>
  );

  return (
    <Drawer anchor="left" open={openDrawer} onClose={onClose}>
      <Lists />
    </Drawer>
  );
};

const styles = {
  menuContainer: (anchor) => css`
    margin: 80px 0 0 0;
    width: ${anchor === "top" || anchor === "bottom" ? "auto" : 320}px;
    z-index: -100;
  `,
  profileContainer: css`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  `,
  circle: css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 160px;
    height: 160px;
    border-radius: 100px;
    background-color: ${colors.purple};
  `,
  circlePic: css`
    width: 145px;
    height: 145px;
    border-radius: 100px;
    justify-content: center;
    align-items: center;
    background-color: ${colors.blue};
  `,
};

export default DrawerMenu;
