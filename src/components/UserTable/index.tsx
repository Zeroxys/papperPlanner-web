import React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { css } from "@emotion/react";
import CircularProgress from "@mui/material/CircularProgress";
import userColors from "../../utils/userColors";

const columns = [
  { field: "id", headerName: "ID", width: 250 },
  { field: "firstName", headerName: "Email", width: 300 },
  { field: "rol", headerName: "Rol", width: 150 },
  { field: "lastName", headerName: "Username", width: 150 },
  { field: "loginCount", headerName: "Login", type: "number", width: 150 },
];

const UserTable = ({ loading, rows, handleSelectionChange }) => {
  return (
    <Box css={styles.chartContainer}>
      {loading ? (
        <CircularProgress />
      ) : (
        <DataGrid
          rows={rows}
          css={styles.dataGridStyles}
          columns={columns}
          checkboxSelection
          disableRowSelectionOnClick
          rowHeight={40}
          onRowSelectionModelChange={handleSelectionChange}
          pageSizeOptions={[5]}
          autoPageSize
          getRowClassName={({ row: { rol } }) => {
            if (rol === "admin") {
              return "admin";
            }

            if (rol === "vip") {
              return "vip";
            }

            if (rol === "free") {
              return "free";
            }

            if (rol === "demo") {
              return "demo";
            }
          }}
        />
      )}
    </Box>
  );
};

const styles = {
  dataGridStyles: css`
    color: black;
    font-weight: bold;
    font-size: 12px;
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.1);
    border: 2px solid gray;
    border-radius: 4px;
    overflow: hidden;

    .MuiDataGrid-row:hover {
      color: black;
      background-color: #8f9aa4;
    }
  `,
  chartContainer: css`
    width: 100%;
    height: 80%;
    background-color: white;
    & .admin {
      background-color: ${userColors.admin};
    }

    & .free {
      background-color: ${userColors.free};
    }
    & .demo {
      background-color: ${userColors.demo};
    }
    & .vip {
      background-color: ${userColors.vip};
    }
  `,
};

export default UserTable;
