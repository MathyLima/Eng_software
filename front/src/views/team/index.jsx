import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  useTheme,
  Button,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { getFullData } from "../../utils/fulldata";
import Header from "../../Components/Header";
import { vendedorFormField } from "../../utils/vendedorFormField";
import axios from "axios";
import ModalEditVendedor from "../../Components/ModalVendedor/ModalEditData";

const Team = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: 'id', headerName: 'ID', flex: 0.5 },
    ...vendedorFormField.map((field) => ({
      field: field.name,
      headerName: field.label,
      flex: 1,
    })),
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      sortable: false,
      renderCell: ({ row }) => {
        return (
          <Box>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                handleEditClick(row);
              }}
              sx={{ mr: 2 }}
            >
              Edit
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                handleDeleteClick(row.id);
              }}
            >
              Delete
            </Button>
          </Box>
        );
      },
    },
  ];

  const [vendedoresData, setVendedoresData] = useState([]);
  const [selectedVendedor, setSelectedVendedor] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    async function fetchVendedoresData() {
      const servicePath = "/search_all_vendedores";
      try {
        const fullData = await getFullData(servicePath);

        const dataWithRenamedId = fullData.map((data) => ({
          id: data.id_vended,
          ...data,
        }));

        setVendedoresData(dataWithRenamedId);
      } catch (error) {
        console.error("Erro ao buscar dados dos vendedores:", error);
      }
    }

    fetchVendedoresData();
  }, []);

  const handleDeleteClick = (vendedorId) => {
    console.log(vendedorId);
    axios
      .delete("http://localhost:3001/api/delete_vendedor", { data: { id: vendedorId } })
      .then((response) => {
        if (response.status === 200) {
          console.log(`Vendedor com ID ${vendedorId} excluído com sucesso!`);
          setVendedoresData(vendedoresData.filter((vendedor) => vendedor.id !== vendedorId));
        } else {
          console.error("Erro ao excluir o vendedor.");
        }
      })
      .catch((error) => {
        console.error("Erro ao excluir o vendedor:", error);
      });
  };

  const handleEditClick = (vendedor) => {
    setSelectedVendedor(vendedor);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedVendedor(null);
  };

  return (
    <Box m="20px">
      <Header title="TEAM" subtitle="Managing the Team Members" />
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
          "& .MuiCheckbox-root": {
            display: "none",
          },
        }}
      >
        <DataGrid rows={vendedoresData} columns={columns} />
      </Box>
      <ModalEditVendedor open={isModalOpen} data={selectedVendedor} onClose={handleModalClose} />
    </Box>
  );
};

export default Team;
