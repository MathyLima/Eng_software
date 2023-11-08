import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  useTheme,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../Components/Header";
import { getFullData } from "../../utils/fulldata";
import { clientFormFields } from "../../utils/clientFormField";
import ModalEditData from "../../Components/ModalCliente/ModalEditData";
import ModalShowData from "../../Components/ModalCliente/ModalShowData";

const Clientes = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    { field: 'id', headerName: 'ID', flex: 0.5 },
    ...clientFormFields.map((field) => ({
      field: field.name,
      headerName: field.label,
      flex: 1,
    })),
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      width: 200,
      renderCell: (params) => {
        return (
          <Box>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleModalOpen(params.row, "view")}
              sx={{ marginRight: 2 }}
            >
              View
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleModalOpen(params.row, "edit")}
            >
              Edit
            </Button>
          </Box>
        );
      },
    },
  ];

  const [clientesData, setClientesData] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [modalType, setModalType] = useState(null);

  useEffect(() => {
    async function fetchClientesData() {
      const servicePath = "/search_all_clients"; // Defina o serviço correto
      try {
        const fullData = await getFullData(servicePath);

        // Renomeia a propriedade id_cliente para id em cada objeto
        const dataWithRenamedId = fullData.map((data) => ({
          id: data.id_cliente,
          ...data,
        }));

        setClientesData(dataWithRenamedId);
      } catch (error) {
        console.error("Erro ao buscar dados dos clientes:", error);
      }
    }

    fetchClientesData();
  }, []);

  const handleModalOpen = (client, type) => {
    setSelectedClient(client);
    setModalType(type);
  };

  const handleModalClose = () => {
    setSelectedClient(null);
    setModalType(null);
  };

  return (
    <Box m="20px">
      <Header title={"Clientes"} subtitle="Lista com todos os clientes" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={clientesData}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
      {modalType === "view" && (
        <ModalShowData open={Boolean(selectedClient)} data={selectedClient} onClose={handleModalClose} />
      )}
      {modalType === "edit" && (
        <ModalEditData open={Boolean(selectedClient)} data={selectedClient} onClose={handleModalClose} />
      )}
    </Box>
  );
};

export default Clientes;
