import React from "react";
import { css } from "@emotion/react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateIcon from "@mui/icons-material/Update";
import userColors from "../../utils/userColors";
import PersonIcon from "@mui/icons-material/Person";
import PeopleIcon from "@mui/icons-material/People";

const UserTypeLegend = ({
  handleUpdateSelected,
  handleDeleteSelected,
  handleCreatedSelected,
  selectedRows,
}) => {
  return (
    <div css={styles.container}>
      <div css={styles.typesContainer}>
        {Object.keys(userColors).map((type) => (
          <div
            key={type}
            style={{
              marginRight: "10px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: "20px",
                height: "20px",
                marginBottom: "8px",
                backgroundColor: userColors[type],
                marginRight: "5px",
              }}
            />
            <strong>{type}</strong>
          </div>
        ))}
      </div>
      <div css={styles.buttonsContainer}>
        <Button
          sx={styles.addPeople}
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleCreatedSelected}
        >
          <PersonIcon />
        </Button>
        <Button
          sx={styles.addPeople}
          variant="contained"
          color="secondary"
          startIcon={<DeleteIcon />}
          onClick={handleDeleteSelected}
          disabled={selectedRows?.length === 0}
        >
          <PeopleIcon />
        </Button>
        <Button
          sx={styles.addPeople}
          variant="contained"
          color="primary"
          startIcon={<UpdateIcon />}
          onClick={handleUpdateSelected}
          disabled={selectedRows?.length === 0}
        >
          <PersonIcon />
        </Button>
      </div>
    </div>
  );
};

const styles = {
  container: css`
    display: flex;
    width: 100%;
  `,
  typesContainer: css`
    display: flex;
    flex-direction: column;
    width: 100%;
  `,
  buttonsContainer: css`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: flex-start;
    width: 300px;
  `,
  addPeople: css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px;
    border-radius: 100px;
  `,
};

export default UserTypeLegend;
