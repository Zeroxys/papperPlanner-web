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
      <div css={styles.generalConfigs}></div>

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

      <div css={styles.optionsContainer}>
        <div css={styles.usersOnlineContainer}>
          <p>Usuarios conectados:0</p>
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
    </div>
  );
};

const styles = {
  container: css`
    display: flex;
    justify-content: flex-end;
    width: 100%;
    margin-bottom: 20px;
  `,

  generalConfigs: css`
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: center;
    padding: 30px;
    height: 80px;
    border-radius: 20px;
    margin-right: 20px;
    background-color: white;
    box-shadow: 7px 8px 16px -2px rgba(0, 0, 0, 0.43);
  `,

  typesContainer: css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 30px;
    width: 100px;
    height: 80px;
    border-radius: 20px;
    background-color: white;
    box-shadow: 7px 8px 16px -2px rgba(0, 0, 0, 0.43);
  `,
  buttonsContainer: css`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    width: 300px;
    padding: 10px;
    height: 40px;
    border-radius: 22px;
    background-color: white;
    box-shadow: 7px 8px 16px -2px rgba(0, 0, 0, 0.43);
    margin-left: 22px;
  `,
  addPeople: css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 35px;
    border-radius: 100px;
  `,
  usersOnlineContainer: css`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    width: 300px;
    padding: 10px;
    height: 40px;
    border-radius: 22px;
    background-color: white;
    box-shadow: 7px 8px 16px -2px rgba(0, 0, 0, 0.43);
    margin-left: 22px;
    & p {
      font-size: 16px;
      font-weight: bold;
    }
  `,

  optionsContainer: css`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    height: 100%;
  `,
};

export default UserTypeLegend;
