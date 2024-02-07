import React, { useState, useEffect } from "react";
import { Box, Alert, Snackbar } from "@mui/material";
import Layout from "../components/Layout";
import UserTypeLegend from "../components/UserTable/userTypes";
import UserTable from "../components/UserTable";
import useApiFetch from "../hooks/apiFetch";
import { useDispatch } from "react-redux";
import { css } from "@emotion/react";
import { enableBackdropAction } from "../redux/actions/userActions";
import UpdateUserModal from "../components/ModalCustom/UpdateUserModal";
import DeleteUsersModal from "../components/ModalCustom/DeleteUsersModal";
import CreateUserModal from "../components/ModalCustom/CreateUserModal";

const IndexPage = () => {
  const [rows, setRows] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openUpdateRoleModal, setOpenUpdateRoleModal] = useState(false);
  const [openCreateUserModal, setOpenCreateUserModal] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const { fetchApi } = useApiFetch();
  const dispatch = useDispatch();

  useEffect(() => {
    getUsers();
  }, []);

  const handleSelectionChange = (newSelection) => {
    setSelectedRows([...newSelection]);
  };

  const getUsers = async () => {
    const res = await fetchApi("GET", "/users");

    if (res.success) {
      const formattedData = res.data.map((user) => ({
        id: user._id,
        lastName: user.username,
        rol: user.role,
        firstName: user.email,
        loginCount: user.loginCount,
      }));
      setRows(formattedData);
    }
  };

  const deleteUsers = async () => {
    const IDs = [...selectedRows].splice(" ").join(",");
    dispatch(enableBackdropAction(true));
    const res = await fetchApi("DELETE", `/users/${IDs}`);
    dispatch(enableBackdropAction(false));
    if (res.success) {
      getUsers();
      setMessage(res.message);
    } else {
      console.log(res);
      setMessage(res.message);
    }
    setOpen(true);
    setOpenDeleteModal(false);
  };

  const updateUser = async (role) => {
    const id = selectedRows[0];
    dispatch(enableBackdropAction(true));
    const res = await fetchApi("PATCH", `/users/${id}`, { role });
    setOpenUpdateRoleModal(false);
    if (res.success) {
      await getUsers();
      setMessage(res.message);
    } else {
      console.log(res);
      setMessage(res.message);
    }
    setOpen(true);
    dispatch(enableBackdropAction(false));
  };

  const createuser = async (user) => {
    dispatch(enableBackdropAction(true));
    const res = await fetchApi("POST", `/users/create`, user);
    if (res.success) {
      await getUsers();
      setMessage(res.message);
    } else {
      setMessage(res.error);
    }
    setOpen(true);

    dispatch(enableBackdropAction(false));
  };

  const handleDeleteSelected = () => {
    setOpenDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };

  const handleUpdateSelected = () => {
    setOpenUpdateRoleModal(true);
  };

  const handleCloseUpdateRoleModal = () => {
    setOpenUpdateRoleModal(false);
  };

  const handleCreatedSelected = () => {
    setOpenCreateUserModal(true);
  };

  const handleCreateUser = async (userData) => {
    createuser(userData);
  };

  const handleCloseCreateUserModal = () => {
    setOpenCreateUserModal(false);
  };

  const handleClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <Layout>
      <CreateUserModal
        open={openCreateUserModal}
        onClose={handleCloseCreateUserModal}
        onCreateUser={handleCreateUser}
      />

      <UpdateUserModal
        open={openUpdateRoleModal}
        onClose={handleCloseUpdateRoleModal}
        onUpdateRole={(newRole) => updateUser(newRole)}
      />

      <DeleteUsersModal
        open={openDeleteModal}
        onClose={handleCloseDeleteModal}
        onConfirm={deleteUsers}
      />
      <div css={styles.container}>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="success"
            variant="filled"
            sx={{ width: "100%" }}
            severity={message.includes("error") ? "error" : "success"}
          >
            {message}
          </Alert>
        </Snackbar>

        <Box css={styles.tableContainer}>
          <UserTypeLegend
            handleCreatedSelected={handleCreatedSelected}
            handleUpdateSelected={handleUpdateSelected}
            handleDeleteSelected={handleDeleteSelected}
            selectedRows={selectedRows}
          />
          <div css={styles.usersTableContainer}>
            <UserTable
              loading={false}
              rows={rows}
              handleSelectionChange={handleSelectionChange}
            />
          </div>
        </Box>
      </div>
    </Layout>
  );
};

const styles = {
  container: css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
  `,
  tableContainer: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    width: 80%;
    height: 80%;
  `,
  usersTableContainer: css`
    padding: 10px;
    height: 100%;
    width: 100%;
    border-radius: 22px;
    background-color: white;
    box-shadow: 7px 8px 16px -2px rgba(0, 0, 0, 0.43);
  `,
};

export default IndexPage;
