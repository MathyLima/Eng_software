import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../Components/Header";
import { useEffect, useState } from "react";
import { ColumnInfoClients } from "../../data/mockData";
import { getFullData } from "../../utils/fulldata";

const Team = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [clients, setClients] = useState([]);
  
  
  useEffect(() => {
      async function fetchData() {
          try {
              const result = await getFullData("search_all_clients");
              setClients(result);
          } catch (error) {
              console.error(error);
          }
      }

      fetchData();
  }, []);




  return (
    <Box m="20px">
      <Header title={"TEAM"} subtitle="Managing the Team Members" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none"
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none"
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none"
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400]
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700]
          },
          "& .nome-column--cell":{
            color:colors.greenAccent[300]
        },
          
        }}>
        <DataGrid rows={clients} columns={ColumnInfoClients} />
      </Box>
    </Box>
  );
};

export default Team;
