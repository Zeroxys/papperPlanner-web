import React, { useState } from "react";
import { Drawer, Box } from "@mui/material";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { css } from "@emotion/react";
import colors from "../../utils/colors";
import { useSelector } from "react-redux";

const DrawerMenu = ({ openDrawer, onClose }) => {
  const user = useSelector((state) => state.user);

  console.log(user);

  const Lists = ({ anchor }) => (
    <Box
      // role="presentation"
      // onClick={() => {}}
      // onKeyDown={() => {}}
      css={styles.menuContainer(anchor)}
    >
      <div css={styles.profileContainer}>
        <div css={styles.circle}>
          <div css={styles.circlePic}></div>
        </div>
        <p>Miguel Angel Zavala</p>
        <p>id : 1234123</p>
      </div>
      <Divider />
      <List>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem key={text}>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem key={text}>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
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
    background-color: ${colors.white};
  `,
};

export default DrawerMenu;
